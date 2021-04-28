import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMainUser } from '../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IStandard } from '../../models/response-corona-form';
import { CoronavirusAdminService } from '../../services/coronavirus-admin.service';
import { ModalCoronavirusReportReactiveService } from './modal-coronavirus-report-reactive.service';

@Component({
  selector: 'app-modal-coronavirus-report',
  templateUrl: './modal-coronavirus-report.component.html',
  styleUrls: ['./modal-coronavirus-report.component.scss']
})
export class ModalCoronavirusReportComponent implements OnInit {
  user: IMainUser = null;
  //survey data
  showSurvey: boolean = false;
  arraySurvey: Array<IStandard> = [];
  arrayReservation: Array<IStandard> = [];
  arrayPermissions: Array<any> = [];
  arrayIdRole: Array<any> = [];

  //________________
  @BlockUI() blockUI: NgBlockUI;
  conditionReportAssist: boolean = false;
  constructor(
    private ref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ModalCoronavirusReportComponent>,
    public reportFormReactive: ModalCoronavirusReportReactiveService,
    public reportFormService: CoronavirusAdminService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }
  onNoClickReport(): void {
    this.dialogRef.close();
  }
  // test success
  surveyReport() {
    this.blockUI.start("Generando reporte...")
    const functionAsync = async () => {
      this.reportFormService.surveyReportAsync(this.user.relatedParty.id, this.reportFormReactive.surveyId.value)
        .subscribe(rpt1 => {
          this.responseSurveyReport(rpt1);
        })
    }
    functionAsync();
  }
  responseSurveyReport(rpt1) {
    /* console.log("Tipo de respuesta " + rpt1.type)
        console.log("Evento download : " + HttpEventType.DownloadProgress) */

    if (rpt1.type === HttpEventType.DownloadProgress) {
      /* console.log("Total :" + rpt1.total) */
      const percentDone = Math.round(100 * rpt1.loaded / rpt1.total);
      /* console.log(percentDone); */
    }
    if (rpt1.type === HttpEventType.Response) {
      this.responseReport(rpt1.body, "REPORTE DE ENCUESTAS.xlsx")
    }
    if (rpt1.type == 4) {
      this.blockUI.stop();
    }
  }
  // test success
  reservationReport() {
    this.blockUI.start("Generando reporte...")
    const functionAsync = async () => {
      this.reportFormService.reservationReportAsync(this.user.relatedParty.id, this.reportFormReactive.reservaId.value)
        .subscribe(rpt1 => {
          this.responseReservationReport(rpt1);
        })
    }
    functionAsync();
  }
  responseReservationReport(rpt1) {
    /* console.log("Tipo de respuesta " + rpt1.type)
        console.log("Evento download : " + HttpEventType.DownloadProgress) */

    if (rpt1.type === HttpEventType.DownloadProgress) {
      /* console.log("Total :" + rpt1.total) */
      const percentDone = Math.round(100 * rpt1.loaded / rpt1.total);
      /* console.log(percentDone); */
    }
    if (rpt1.type === HttpEventType.Response) {
      this.responseReport(rpt1.body, "REPORTE DE RESERVAS.xlsx")
    }
    if (rpt1.type == 4) {
      this.blockUI.stop();
    }
  }
  // test success
  generalReport(idRole: any, userId: string) {
    this.blockUI.start("Generando reporte...")
    const functionAsync = async () => {
      this.reportFormService.generalReportAsync(idRole, userId)
        .subscribe(rpt1 => {
          this.responseGeneralReport(rpt1);
        })
    }
    functionAsync();
  }
  responseGeneralReport(rpt1) {
    /* console.log("Tipo de respuesta " + rpt1.type)
        console.log("Evento download : " + HttpEventType.DownloadProgress) */

    if (rpt1.type === HttpEventType.DownloadProgress) {
      /* console.log("Total :" + rpt1.total) */
      const percentDone = Math.round(100 * rpt1.loaded / rpt1.total);
      /* console.log(percentDone); */
    }
    if (rpt1.type === HttpEventType.Response) {
      this.responseReport(rpt1.body, "REPORTE GENERAL CORONARIVURS.xlsx")
    }
  }
  bpReport(employeeId: string) {
    this.blockUI.start("Generando reporte...")
    this.reportFormService.reportBp(employeeId)
      .subscribe(rpt1 => {
        this.responseReport(rpt1, "REPORTE DE BP.xlsx")
      })
  }
  // test success
  requestDetailsReport(idRole: any, userId: string) {
    this.blockUI.start("Generando reporte...")
    this.reportFormService.requestDetailReport(idRole, userId)
      .subscribe(rpt1 => {
        this.responseRequestDetailsReport(rpt1);
      })
  }
  responseRequestDetailsReport(rpt1) {
    /* console.log("Tipo de respuesta " + rpt1.type)
    console.log("Evento download : " + HttpEventType.DownloadProgress) */

    if (rpt1.type === HttpEventType.DownloadProgress) {
      /* console.log("Total :" + rpt1.total) */
      const percentDone = Math.round(100 * rpt1.loaded / rpt1.total);
      /* console.log(percentDone); */
    }
    if (rpt1.type === HttpEventType.Response) {
      this.responseReport(rpt1.body, "REPORTE GENERAL HISTORICO CORONARIVURS.xlsx")
    }
  }


  assistReport(idRole: any, userId: string) {
    this.blockUI.start("Generando reporte...")
    this.reportFormService.assistReportEmployee(idRole, userId)
      .subscribe(rpt1 => {
        this.responseReport(rpt1, "REPORTE DE ASISTENCIAS.xlsx")
      })
  }
  // test success
  cronicaReport(idRole: any, userId: string) {
    this.blockUI.start("Generando reporte...")
    this.reportFormService.cronicaReport(idRole, userId)
      .subscribe(rpt1 => {
        this.responseReport(rpt1, "REPORTE DE ENFERMEDADES CRONICAS POR EMPLEADOS.xlsx")
      })
  }

  fileReport(idRole: any) {
    this.blockUI.start("Generando reporte...")
    this.reportFormService.fileReportEmployee(idRole)
      .subscribe(rpt1 => {
        this.responseReport(rpt1, "REPORTE DE ARCHIVOS DE EMPLEADOS.zip")
      })
  }
  responseReport(rpt1, filename) {
    const data = rpt1;
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(data);
    link.target = "_blank";
    link.download = filename;
    link.click();
    this.blockUI.stop();
  }
  Execute_report() {
    if (this.reportFormReactive.index.value !== 0) {
      switch (this.reportFormReactive.index.value) {
        case "1C":
          this.generalReport(this.arrayIdRole, this.user.id);
          break;
        case "2C":
          this.fileReport(this.arrayIdRole);
          break;
        case "3C":
          this.cronicaReport(this.arrayIdRole, this.user.id);
          break;
        case "4C":
          this.requestDetailsReport(this.arrayIdRole, this.user.id);
          break;
        case "5C":
          this.bpReport(this.user.relatedParty.id);
          break;
        case "6C":
          if (this.reportFormReactive.surveyId.value === 0) {
            Swal.fire({
              icon: "warning",
              title: "Necesita seleccionar una encuesta para poder generar el reporte de encuestas."
            })
          } else {
            this.surveyReport();
          }
          break;
        case "7C":
          if (this.reportFormReactive.reservaId.value === 0) {
            Swal.fire({
              icon: "warning",
              title: "Necesita seleccionar una reserva para poder generar el reporte de reservas."
            })
          } else {
            this.reservationReport();
          }
        case "1A":
          this.assistReport(this.arrayIdRole, this.user.id);
          break;

        default:
          break;
      }
    }
  }

  getAllSurvey() {
    this.blockUI.start("Cargando encuestas disponibles...")
    this.reportFormService.showEnabledSurvey().toPromise().then(resp => {
      if (resp["code"] === "200") {
        this.arraySurvey = resp["survey"];
        this.ref.detectChanges();
      }
      this.blockUI.stop();
    })
  }
  getAllReservation() {
    this.blockUI.start("Cargando reservas disponibles...")
    this.reportFormService.showEnabledSchedule().toPromise().then(
      resp => {
        if (resp["condition"] === true) {
          this.arrayReservation = resp["values"];
          this.ref.detectChanges();
        }
        this.blockUI.stop();
      }
    )
  }

  showCombo(index) {
    if (index === "6C") {
      this.getAllSurvey();
    }
    if (index === "7C") {
      this.getAllReservation();
    }
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.arrayIdRole = this.reportFormService.addPermissionSearchService();
    if (this.data != null) {
      this.conditionReportAssist = this.data.report_assist;
      this.ref.detectChanges();
    }
  }

}
