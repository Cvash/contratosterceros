import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IGetEntryPass, IMainUser, IParameter, IRealtedParty, ISintomas, ISurveyHealth, IViewModule } from '../../../../../../business/models/IModel-module';
import Swal from 'sweetalert2';
import { SupplierFormReactiveService } from './supplier-form-reactive.service';
import { ModalSignComponentComponent } from '../modal-sign-component/modal-sign-component.component';
import { IRequestPostEntry, IRequestSymp } from '../../models/RequestSupplier';
import { SupplierQrComponent } from '../supplier-qr/supplier-qr/supplier-qr.component';
import { SupplierService } from '../../services/supplier.service';
import { AuthServiceService } from '../../../../../../../app/commons/services/auth-service.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit, AfterViewInit {
  moduleList: Array<IViewModule>=[];
  constructor(
    public formReactive: SupplierFormReactiveService,
    private dialog: MatDialog, private router: Router,
    private ref: ChangeDetectorRef,
    public sup: SupplierService,
    public auth:AuthServiceService) {
  }
  
  postEntry: IRequestPostEntry;
  sympQuestion: Array<IRequestSymp>;
  parameter: Array<IParameter>;
  @BlockUI() blockUI: NgBlockUI;
  user: IMainUser;
  supplier: IRealtedParty;
  myName: string = '';
  id_supplier: number;
  ready: boolean = false;
  viewStatus: number = 0;
  noFormMessage: string = '';
  // FINAL RESULT INTERFACE

  validateAccess: any;
  ngOnInit() {
    this.formReactive.sedeOption.disable();
    this.formReactive.transportOption.disable();
    this.formReactive.sedeOption.setValue('');
    this.formReactive.cityOption.setValue('');
    this.formReactive.stageOption.setValue('');
    this.formReactive.transportOption.setValue('');
    this.formReactive.chkConfirm.reset();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.moduleList=JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("TERCEROS","/terceros/form",this.user,this.moduleList); 
    this.supplier = this.user.relatedParty;
    this.id_supplier = this.supplier.id;
    this.legalEntity = "0055";
    this.myName = this.supplier.name.replace("/", " ").replace("/", " ");
    this.ref.detectChanges();
    this.initStartedData();
   
  }

  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);
}
  initStartedData() {
    setTimeout(() => {
      this.verifyAccessPass(this.user.id);
    }, 500);
    setTimeout(() => {
      this.startedSymp(this.user.id, this.user.relatedParty.legalId[0].nationalIDType, this.user.relatedParty.legalId[0].nationalID);
    }, 1000);
    setTimeout(() => {
      this.startedData();
    }, 1500);
  }
  startedData() {
    this.sup.loadDataSupplier("DATA_FORM", this.legalEntity).toPromise().then(
      (started) => {
        this.parameter = [];
        this.addValueToArrayForm(started);
      },
      (error: HttpErrorResponse) => {
        this.errorStatedData(error.message);
      }
    )
  }
  errorStatedData(message: string) {
    Swal.fire({
      icon: 'error',
      title: message
    })
  }
  // test success
  addValueToArrayForm(started: Array<IParameter>) {
    this.parameter = started;
    this.parameter.forEach(element => {
      if (element.son === "CAMPUS") {
        this.refreshSedes.push(element)
      } else {
        if (element.son === "TRANSPORT") {
          this.refreshTransportDetail.push(element);
        } else {
          if (element.son === "TT_TDP") {
            this.typeTransport.push(element)
          } else {
            this.cities.push(element)
          }
        }
      }
      this.ref.detectChanges();
    });
  }
  startedSymp(userId: string, nationalType: string, nationalId: string) {
    this.sup.loadSympForm(userId, nationalType, nationalId).toPromise().then(
      (symp) => {
        this.addSubStartedSympForm(symp);
      },
      (error: HttpErrorResponse) => {
        this.errorStartedSymp(error.message);
      }
    );
  }
  errorStartedSymp(message: string) {
    this.blockUI.stop();
    Swal.fire({
      icon: "error",
      title: message
    })
  }
  // test success
  addSubStartedSympForm(symp: any) {
    this.form = symp;
    this.sympForm = [];
    let objSympFprm: ISintomas;
    this.form.questions.forEach(s => {
      if (s.description !== "¿Has estado en contacto con algún paciente con coronavirus en los últimos 14 días?") {
        objSympFprm = {
          id: Number(s.id),
          description: s.description,
          icon: s.code,
          touched: false,
          option: null
        }
        this.sympForm.push(objSympFprm);
      }
    });
    this.ref.detectChanges();
    this.blockUI.stop();
  }
  //_______________________
  // test success
  dailyReview: IGetEntryPass;
  verifyAccessPass(userId: string) {
    this.sup.accessPass(userId, "", "", "").toPromise().then(
      (daily) => {
        this.subVerifyAcces(daily);
      },
      (error: HttpErrorResponse) => {
        this.errorVerifyAccessPass();
      }
    )
  }
  errorVerifyAccessPass() {
    this.viewStatus = 0;
    this.noFormMessage = "Esta cuenta no tiene asociado a un proveedor."
  }
  // test success
  subVerifyAcces(daily: any) {
    this.dailyReview = daily;
    let dictionary = null;
    dictionary = this.sup.validateStatusToken(this.dailyReview);
    this.ref.detectChanges();
    this.viewStatus = dictionary["viewStatus"];
    this.ready = dictionary["ready"];
    this.noFormMessage = dictionary["formMessage"]
    this.ready = true;
    this.ref.detectChanges();
  }
  //_______________________
  seeAccess() {
    this.blockUI.stop();
    this.router.navigate(['/terceros/mypass']);
  }
  //_______________________
  activetab: number = 0;
  tab2disabled: boolean = true;
  // BLOQUE 1
  coronaContactFlag: boolean = false;
  form: ISurveyHealth = null;
  sympForm: ISintomas[] = [];
  checkboxdj: boolean = false;

  changeToggle(e) {
    this.coronaContactFlag = e.checked;
    this.formReactive.contactCoronavirus.setValue(this.coronaContactFlag);
    // Reglas
    this.checkboxdj = false;
    this.tab2disabled = true;
  }
  changeSymptomOption(id: string, value: boolean) {
    const idx = this.sympForm.findIndex(p => p.id === Number(id));
    this.changeSympValueOption(idx, value);
  }
  changeSympValueOption(idx: number, value: boolean) {
    this.sympForm[idx].touched = true;
    this.sympForm[idx].option = value;
    // Reglas
    this.checkboxdj = false;
    this.tab2disabled = true;
  }
  // test success
  executeAfterClosedCheck(singned: boolean, base64qr: string) {
    if (singned) {
      this.formReactive.supplierForm.get("imageBase64").setValue(base64qr);
    }
    else {
      this.formReactive.imageBase64.setValue("");
      this.formReactive.chkConfirm.setValue(false);
    }
    this.ref.detectChanges();
  }

  changeCheckbox(e) {
    this.tab2disabled = true;
    if (e.checked === true) {
      const dialog = this.dialog.open(ModalSignComponentComponent, {
        width: '700px',
        minHeight: '400px'
      });

      dialog.afterClosed().subscribe(result => {
        const singned = result["flagSign"];
        this.executeAfterClosedCheck(singned, result["base64data"]);

      });
    }
  }
  captureValueObjectForm() {
    let postEntry = {
      affidavid: {
        confirm: this.formReactive.chkConfirm.value,
        signature: {
          image: this.formReactive.imageBase64.value.split(",")[1]
        }
      },
      contactCoronavirus: this.formReactive.contactCoronavirus.value,
      location: this.formReactive.cityOption.value !== '' ? {
        campus: this.formReactive.sedeOption.value,
        city: this.cities.find(d => d.son === this.formReactive.cityOption.value).value1,
        floor: this.formReactive.stageOption.value,
        transport: {
          code: this.formReactive.transportOption.value
        }
      } : null,
      phone: "",
      symptoms: this.sympQuestion,
      userId: this.user.id

    }
    return postEntry;
  }

  // test success
  showAlertKeepHome() {
    const dialog = this.dialog.open(SupplierQrComponent, {
      width: '700px',
      minHeight: '400px'
    });
    dialog.afterClosed().subscribe(result => {
      const homeoficeAcepted = result;
      if (homeoficeAcepted) {
        this.blockUI.start("Procesando...")
        // guardar datos en el caso de presentar sintomas
        this.generateAccessPass();

      }
    })
  }
  nextStep() {
    this.sympQuestion = []
    this.formReactive.contactCoronavirus.setValue(this.coronaContactFlag)
    let n = 0;
    let flagSymptoms = false;
    this.sympForm.forEach(s => {
      if (!s.touched) {
        s.touched = true;
      }
      flagSymptoms = flagSymptoms || s.option;
      // FINAL RESULT guarda las respuestas y preguntas
      this.sympQuestion.push(
        {
          code: String(s.id),
          description: s.description,
          answer: {
            id: "",
            name: "",
            type: "switch",
            value: s.option == false || s.option == null ? "NO" : "SI"
          }
        }
      )
      if (s.option == true) {
        n = n + 1;
      }
    });
    if (n >= 1) {
      flagSymptoms = true;
    }
    if (n === 0) {
      flagSymptoms = false;
    }
    this.formReactive.isSymp.setValue(flagSymptoms);
    if (flagSymptoms == false && this.formReactive.contactCoronavirus.value === false) {
      // PUEDE CONTINUAR EL PROCESO
      setTimeout(() => {
        this.activetab = 1;
        this.tab2disabled = false;
        this.ref.detectChanges();
      }, 100);

    } else {
      // DEBE TRABAJAR DESDE CASA      
      this.showAlertKeepHome();
    }

  }

  // BLOQUE 2
  cities: Array<IParameter> = [];
  sedes: Array<IParameter> = [];
  refreshSedes: Array<IParameter> = [];
  cityOption: string = "";
  sedeOption: number = 0;
  transportOption: number = 0;
  typeTransport: Array<IParameter> = [];
  transportsDetail: Array<IParameter> = [];
  refreshTransportDetail: Array<IParameter> = [];
  transportType: string = '';
  legalEntity = "";

  changeCity(e) {
    let auxSede: Array<IParameter> = []
    this.refreshSedes.forEach(element => {
      if (element.value2 === e.target.value) {
        auxSede.push(element);
      }
    });
    this.sedes = auxSede;
    this.formReactive.supplierForm.get("sedeOption").enable();
    this.sedeOption = 0;
    this.ref.detectChanges();
  }
  changeTransportType(value) {
    this.transportType = value;
    this.transportOption = 0;
    this.formReactive.supplierForm.get("transportOption").enable();
    this.transportsDetail = this.refreshTransportDetail.filter(p => p.value2 == value)
  }
  validateFormAccess() {
    let status = false;
    if ((this.formReactive.supplierForm.get("contactCoronavirus").value === false
      && this.formReactive.supplierForm.get("isSymp").value === false)) {
      if (this.formReactive.supplierForm.get("sedeOption").value === "") {
        Swal.fire({
          icon: 'warning',
          title: "Por favor indique a que sede asistirá hoy."
        })
        status = true;
        return status;
      } else if (this.formReactive.supplierForm.get("stageOption").value === "") {
        Swal.fire({
          icon: 'warning',
          title: "Por favor indique el o los pisos en los que se encontrará."
        });
        status = true;
        return status;
      } else if (this.formReactive.supplierForm.get("transportOption").value === "") {
        Swal.fire({
          icon: 'warning',
          title: "Por favor indique el medio de transporte que usará para asistir a la oficina."
        });
        status = true;
        return status;
      }
      this.blockUI.start("Procesando...")
    }
  }

  generateAccessPass() {
    if (!this.validateFormAccess()) {
      this.postEntry = this.captureValueObjectForm();
      this.sup.generateAccessPass(this.postEntry).toPromise().then(
        (resp) => {
          this.seeAccess();
        },
        (error: HttpErrorResponse) => {
          this.errorGenerateAccessPass(error.statusText);
        }
      )
    }
  }
  errorGenerateAccessPass(message: string) {
    this.blockUI.stop();
    Swal.fire({
      icon: "error",
      title: message
    })
  }
}
