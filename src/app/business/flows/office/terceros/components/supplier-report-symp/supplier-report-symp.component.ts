import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthServiceService } from 'src/app/commons/services/auth-service.service';
import Swal from 'sweetalert2';
import { IGetEntryPass, IMainUser, ISintomas, ISurveyHealth, IViewModule } from '../../../../../../business/models/IModel-module';
import { IRequestReportSymp, IRequestSymp } from '../../models/RequestSupplier';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-report-symp',
  templateUrl: './supplier-report-symp.component.html',
  styleUrls: ['./supplier-report-symp.component.scss']
})
export class SupplierReportSympComponent implements OnInit, AfterViewInit {
  
  requestReport: IRequestReportSymp;
  formMessage: string = "";
  dailyReview: IGetEntryPass;
  ready = false;
  sintomas = [];
  formenable = true;
  myName: string = '';
  viewStatus = null;
  validateAccess: any;
  user: IMainUser = null;
  sympQuestion: Array<IRequestSymp> = [];
  @BlockUI() blockUI: NgBlockUI;
  moduleList: Array<IViewModule>=[];
  sympFormReport: ISintomas[] = [];
  form: ISurveyHealth = null;
  constructor(private sup: SupplierService, private ref: ChangeDetectorRef,
     private router: Router, private auth:AuthServiceService) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.moduleList=JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("TERCEROS","/terceros/sintomas",this.user,this.moduleList);
    this.initStartedData();
  }
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);
  }

  captureValueObjectReport() {
    let postEntry: IRequestReportSymp = {
      campus: this.dailyReview.entryPass.location.campus,
      floor: this.dailyReview.entryPass.location.floor,
      report: "SYMPTOM",
      symptoms: this.sympQuestion,
      userId: this.user.id
    }
    return postEntry;
  }
  changeSymptomOption(id: string, value: boolean) {
    const idx = this.sympFormReport.findIndex(p => p.id === Number(id));
    this.changeSymptomOptionReport(idx, value);
  }
  changeSymptomOptionReport(id: number, value: boolean) {
    this.sympFormReport[id].touched = true;
    this.sympFormReport[id].option = value;
  }
  initStartedData() {
    setTimeout(() => {
      this.verifyAccessPass(this.user.id);
    }, 100);
    setTimeout(() => {
      this.startedSymp(this.user.id, this.user.relatedParty.legalId[0].nationalIDType, this.user.relatedParty.legalId[0].nationalID);
    }, 1000);

  }
  verifyAccessPass(userId: string) {
    this.blockUI.start("Cargando formulario");
    this.sup.accessPass(userId, "", "", "").toPromise().then(
      (daily) => {
        this.subVerifyAccessPass(daily);
      },
      (error: HttpErrorResponse) => {
        this.errorVerifyAccessPass();
      }
    )
  }
  errorVerifyAccessPass() {
    this.blockUI.stop();
    this.viewStatus = 0;
    this.formMessage = "Esta cuenta no tiene asociado a un proveedor."
  }
  subVerifyAccessPass(daily: any) {
    let dictionary: any;
    this.dailyReview = daily;
    dictionary = this.sup.validateStatusToken(this.dailyReview);
    this.ref.detectChanges();
    this.viewStatus = dictionary["viewStatus"];
    this.formMessage = dictionary["formMessage"]
    this.ready = dictionary["ready"];
    this.ref.detectChanges();
    this.blockUI.stop();
  }

  startedSymp(userId: string, nationalType: string, nationalId: string) {
    this.sup.loadSympForm(userId, nationalType, nationalId).subscribe(
      (symp) => {
        this.blockUI.start("Cargando formulario")
        this.addSubStartedSympReport(symp);
      },
      (error: HttpErrorResponse) => {
        this.blockUI.stop();
        Swal.fire({
          icon: "error",
          title: error.message
        })
      }
    );
  }

  addSubStartedSympReport(sympReport: any) {
    this.form = sympReport;
    this.sympFormReport = [];
    let objSympReport: ISintomas;
    this.form.questions.forEach(report => {
      if (report.description !== "¿Has estado en contacto con algún paciente con coronavirus en los últimos 14 días?") {
        objSympReport = {
          id: Number(report.id),
          description: report.description,
          icon: report.code,
          touched: false,
          option: null
        }
        this.sympFormReport.push(objSympReport);
      }
    });
    this.ref.detectChanges();
    this.blockUI.stop();
  }


  requiredOneSymp(n: number) {
    if (n === 0) {
      Swal.fire({
        icon: "info",
        title: "Necesita registrar por lo menos un síntoma, ya que se encuentra en la opción de Reportar Síntomas."
      }).then(resp => {
        if (!resp.dismiss) {
          return;
        }
      })
      return true;
    }
    return false
  }
  addAnswerQuestion() {
    this.sympQuestion = []
    let n: number = 0;
    this.sympFormReport.forEach(question => {
      if (!question.touched) {
        question.touched = true;
      }

      this.sympQuestion.push(
        {
          code: String(question.id),
          description: question.description,
          answer: {
            id: "",
            name: "",
            type: "switch",
            value: question.option == false || question.option == null ? "NO" : "SI"
          }
        }
      )
      
      if (question.option) {
        n = n + 1;
      }
    });
    if (this.requiredOneSymp(n) === false) {
      /* console.log("EXIT"); */
      this.ref.detectChanges();
      this.blockUI.start("Procesando...")
      return true;
    } else {
      return false;
    }
  }

  reportSypmtoms() {
    if (this.addAnswerQuestion()) {
      this.requestReport = this.captureValueObjectReport();
      this.ref.detectChanges();
      this.sup.generateReportSymp(this.requestReport).toPromise().then(
        (rpt) => {
          this.generateMyPass();
        },
        (error: HttpErrorResponse) => {
          this.errorReportSymptoms(error.statusText);
        }
      )
    }

  }
  errorReportSymptoms(message: string) {
    this.blockUI.stop();
    Swal.fire({
      icon: "error",
      title: message
    })
  }
  generateMyPass() {
    this.blockUI.stop();
    this.router.navigate(['/terceros/mypass']);
  }
  generatePass() {
    this.router.navigate(['/terceros/form']);
  }
}
