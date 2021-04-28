import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IRequestCheck, IResponseCheck } from '../../models/RequestSupplier';
/* import { ZXingScannerComponent } from '@zxing/ngx-scanner'; */
import { SupplierSecurityReactiveService } from './supplier-security-reactive.service';
import { SupplierService } from '../../services/supplier.service';
import { IMainUser, IGetEntryPass, IViewModule } from '../../../../../../business/models/IModel-module';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material/dialog';
import { SupplierAccessResultComponent } from '../supplier-access-result/supplier-access-result.component';
import { QrScannerComponent } from 'angular2-qrscanner';
import { AuthServiceService } from '../../../../../../commons/services/auth-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { element } from 'protractor';
import { ZXingScannerComponent } from '@moukail/angular-scanner';


@Component({
  selector: 'app-supplier-security',
  templateUrl: './supplier-security.component.html',
  styleUrls: ['./supplier-security.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SupplierSecurityComponent implements OnInit, AfterViewInit {
  
  /* @ViewChild(QrScannerComponent, {static:false}) qrScannerComponent: QrScannerComponent; */
  moduleList: Array<IViewModule>=[];
  @BlockUI() blockUI: NgBlockUI;
  eppTouched: boolean = false;
  epps: boolean = false;
  typeMove = "";
  // LECTOR QR
  qrscan: boolean = false;
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  selectedDevice: MediaDeviceInfo = null;
  scannerEnabled = false;
  hasCameras = false;
  availableDevices: MediaDeviceInfo[];
  hasPermission: boolean;
  // BÙSQUEDA
  searchMessage: string = "Aún no realiza una busqueda...";
  searchResult: boolean = false;  // SI LA BÚSQUEDA PRODUJO RESULTADOS
  requestcheck: IRequestCheck;
  // VALIDAR ESTADO
  viewStatus: number = 0;
  formMessage: string = "";
  ready = false;
  dailyReview: IGetEntryPass;
  // USER
  user: IMainUser;
  userType: string = "";
  // FORM
  requestCheck: IRequestCheck = null;
  datetime: string = "";
  platform:string="-";
  os="-";
  rpt="-";
  rptMedia="-";
  label="-";
  videoDevices: MediaDeviceInfo[] = [];
  constructor(private ref: ChangeDetectorRef,
    public security: SupplierSecurityReactiveService,
    public sup: SupplierService,
    private dialogRef: MatDialog,
    private auth:AuthServiceService,
    private deviceService: DeviceDetectorService) { }

  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);    
    /* try {  
    
    this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices)
      
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          this.videoDevices.push(device);
        }
      }
      if(this.deviceService.getDeviceInfo().os.toUpperCase()==="iOS".toUpperCase()){
        // linea para habilitar la pantalla de iphone para usar la camara
        this.qrScannerComponent.videoElement.setAttribute('playsinline', 'true');   
      }
      if(this.videoDevices.length>0){
        if(this.deviceService.getDeviceInfo().os.toUpperCase()==="iOS".toUpperCase()
        ||this.deviceService.getDeviceInfo().os.toUpperCase()==="Android".toUpperCase()){
          console.log("CELULAR");
          this.rpt="iOS/Android"
          this.videoDevices.forEach(element=>{
            if (element.label.split(",").length>1 && element.label.split(",")[1].toUpperCase().trimLeft().trimRight()==="facing back".toUpperCase().trimLeft().trimRight()){
              this.rptMedia="BACK";
              this.qrScannerComponent.chooseCamera.next(element);  
              navigator.mediaDevices.getUserMedia({audio: true, video: {facingMode:{exact:"environment"}}}).then(stream => {
                Swal.fire({ 
                  icon:"info",
                  text:"in "+element.label.split(",")[1].trimLeft().trimRight().toUpperCase()
                })  
                this.qrScannerComponent.chooseCamera.next(element);  
                this.rptMedia="BACK IN"
              });
              Swal.fire({ 
                icon:"info",
                text:element.label.split(",")[1].trimLeft().trimRight().toUpperCase()
              })
              return true;
            }  
          })
      }else{
        console.log("DESKTOP");
        this.rpt="desktop";
        this.videoDevices.forEach(element=>{
          if (element.label.split(",").length>1 &&
          element.label.split(",")[1].toUpperCase().trimLeft().trimRight()==="facing front".toUpperCase().trimLeft().trimRight()){
            this.rptMedia="USER";
            navigator.mediaDevices.getUserMedia({audio: true, video: {facingMode:{exact:"user"}}}).then(stream => {
              this.rptMedia="USER IN"
              Swal.fire({ 
                icon:"info",
                text:"out "+element.label.split(",")[1].trimLeft().trimRight().toUpperCase()
              })
              this.qrScannerComponent.chooseCamera.next(element);  
            });
            Swal.fire({ 
            icon:"info",
            text:element.label.split(",")[1].trimLeft().trimRight().toUpperCase()
          }) 
          return true;
          }
        })
      }
        this.qrScannerComponent.chooseCamera.next(this.videoDevices[0]);  
      }
      console.log("INDEX BACK OR FRONT")
      });
      this.qrScannerComponent.capturedQr.subscribe(result => {
        this.security.token.setValue(null);
        this.security.token.setValue(result);
        this.searchDataByQrCode(this.user.id, "TOKEN", null, this.security.token.value)
        this.cancelQRread();
      });
    } catch (error) {
    } */
    try {
      this.initQrScanner();
    } catch (error) {
      console.log(error)
    }
  }
  initQrScanner(){ 
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDevices = devices;
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }
  handleQrCodeResult() {
    this.scanner.scanSuccess.subscribe(result => {
      this.security.token.setValue(null);
        this.security.token.setValue(result);
        this.searchDataByQrCode(this.user.id, "TOKEN", null, this.security.token.value)
        this.cancelQRread();
    })
  }
  // test success
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.moduleList=JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("TERCEROS","/terceros/security",this.user,this.moduleList);
    this.searchClear();
  }
  // test success
  changeEpp(value) {
    this.security.protectionEquipment.setValue(null);
    this.security.protectionEquipment.setValue(value);
    this.eppTouched = true;
    this.epps = value;
  }
  // test success
  changeMovetype(value) {
    this.typeMove = value;
    this.security.typeMov.setValue(null);
    this.security.typeMov.setValue(value);
  }
  // test success
  cancelQRread() {
    this.qrscan = false;
    this.searchResult = false;
    /* this.scannerEnabled = false; */
  }
  // test success
  readQR() {
    this.qrscan = true;
    this.scannerEnabled = true;
    
  }
  // test success
  validateSearchData(nationalType: string, message: string, action: string) {
    let status: boolean = false;
    if (action === "SEARCH") {
      if (nationalType === "DNI") {
        if (this.security.document.value === "") {
          Swal.fire({
            icon: "info",
            title: "Necesita ingresar el documento del usuario que desea buscar."
          })
          status = true;
          return status;
        }

      } else {
        if (nationalType === "TOKEN") {
          if (this.security.token.value === "") {
            Swal.fire({
              icon: "info",
              title: "El codigo qr escaneado no tiene contenido. Por favor, ingresar un codigo qr correcto."
            })
            status = true;
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "El tipo de operación que intenta realizar no existe."
          })
          status = false;
        }
        return status;
      }
    }
    if (action === "SAVE") {
      if (!(this.security.temperature.value > 27 && this.security.temperature.value < 45)) {
        Swal.fire({
          icon: "info",
          title: "Ingrese una temperatura entre 27° y 45°"
        })
        status = true;
      }
      return status;
    }
  }
  // test success
  showAlertFormByCondition(hour: string, user: IMainUser, dailyStatus: string) {
    let showdefaultMessage: boolean = true; // muestra u oculta mensaje del div sin sintomas
    let defaultMessage: string = "";
    let defaultTitle: string = "";
    let defaultResult: boolean = null; // muestra icono de temperatura o icono de epps
    // inp -> false , out -> true
    let defaultIcon: boolean = false;
    let resultStatus: string = "";
    let point: boolean = false;
    // epp -> false , temp >= 38 -> true
    if (this.security.typeMov.value === "inp") {
      resultStatus = "2";
      defaultTitle = "¡Puede ingresar a oficinas!";
      if (this.security.protectionEquipment.value === false) {
        defaultIcon = false // mostar icono sin like
        defaultResult = false; // mostar div alerta epps
        resultStatus = "4";
        point = true;
      }
      if (this.security.temperature.value > 38) {
        point = true;
        defaultResult = true; // mostar div alerta temp
        defaultIcon = false;// mostar icono sin like
        resultStatus = "3";
      }
      if (point === true) {
        defaultTitle = "¡No Puede ingresar a oficinas!"
        defaultMessage = "El usuario no cumple con los requerimientos mínimos para el ingreso a oficinas, por lo que se le debe denegar el acceso."
      }
    }
    if (this.security.typeMov.value === "out") {
      resultStatus = "2";
      showdefaultMessage = false;
      defaultTitle = "¡Salida registrada con éxito!";
      if (dailyStatus === "4") {
        // en el caso de reportar sintomas luego de generar su acceso
        defaultTitle = "¡Su salida fue registrada y su acceso restringido!";
        defaultMessage = "Se ha detectado que es sospechoso de covid 19, el acceso del usuario será restringido de ahora en adelante.";
        if (this.security.temperature.value >= 38) {
          defaultResult = true; // mostar div alerta temp
          defaultIcon = true;// mostar icono sin like
          resultStatus = "3";
          defaultMessage = "Se ha detectado el registro de temperatura alta, el acceso del usuario será restringido de ahora en adelante.";
          defaultTitle = "¡Su salida fue registrada y su acceso restringido!"
        }
        else {
          if (this.security.protectionEquipment.value === false) {
            defaultIcon = true // mostar icono sin like
            defaultResult = false; // mostar div alerta epps
            resultStatus = "4";
            defaultMessage = "Se ha detactado el no uso de EPP al registrar su salida.";
            defaultTitle = "Su salida fue registrada y presentó una observación";
          }
        }
      } else {
        if (this.security.temperature.value >= 38) {
          defaultResult = true; // mostar div alerta temp
          defaultIcon = true;// mostar icono sin like
          resultStatus = "3";
          defaultMessage = "Se ha detectado el registro de temperatura alta, el acceso del usuario será restringido de ahora en adelante.";
          defaultTitle = "¡Su salida fue registrada y su acceso restringido!"
        }
        else {
          if (this.security.protectionEquipment.value === false) {
            defaultIcon = true // mostar icono sin like
            defaultResult = false; // mostar div alerta epps
            resultStatus = "4";
            defaultMessage = "Se ha detactado el no uso de EPP al registrar su salida.";
            defaultTitle = "Su salida fue registrada y presentó una observación";
          }
        }
      }


    }
    this.dialogRef.open(SupplierAccessResultComponent, {
      width: '600px',
      minHeight: '350px',
      data: {
        user_x: user,
        hour_x: hour,
        showdefaultMessage_x: showdefaultMessage,
        defaultMessage_x: defaultMessage,
        defaultTitle_x: defaultTitle,
        defaultResult_x: defaultResult,
        defaultIcon_x: defaultIcon,
        resultStatus_x: resultStatus,

      }
    })

  }
  // test success
  searchClear() {
    this.searchMessage = "Aún no realiza una busqueda...";
    this.security.token.reset('');
    this.security.document.reset('');
    this.security.temperature.reset('');
    this.security.observations.reset('');
    this.security.typeMov.reset('');
    this.security.protectionEquipment.reset(null);
    this.searchResult = false;
    this.eppTouched = false;
    this.typeMove = "";
  }
  // test success
  searchDataByQrCode(userId: string, nationalType: string, nationalId: string, token: string) {
    this.verifyAccessPass(userId, nationalType, nationalId, token, "TOKEN");
  }
  // test success
  searchDataByNationalId(userId: string, nationalType: string, nationalId: string, token: string) {
    this.verifyAccessPass(userId, nationalType, nationalId, token, "DNI");
  }
  // test success
  showAlertSearchResult(message: string) {
    Swal.fire({
      icon: "info",
      title: message
    })
  }
  // test success
  verifyAccessPass(userId: string, nationalType: string, nationalId: string, token: string, typeSearch: string) {
    if (!this.validateSearchData(typeSearch, "Buscando datos", "SEARCH")) {
      this.blockUI.start("Buscando datos")
      this.sup.accessPass(userId, nationalType, nationalId, token).toPromise().then(
        (daily) => {
          this.blockUI.stop();
          this.subVerifyPass(daily);
        },
        (error: HttpErrorResponse) => {
          console.log(error)
          if(Number(error.status)===404){
            this.errorVerifyAccessPass("Error,no existen datos del colaborador asociados al valor que ingreso en la busqueda. La operación fue cancelada.");
          }
          if(Number(error.status)===500){
            this.errorVerifyAccessPass(error.message);
          }
        }
      )
    }

  }
  
  errorVerifyAccessPass(message: string) {
    this.blockUI.stop();
    this.viewStatus = 0;
    Swal.fire({
      icon: "info",
      title:message
    })
  }
  // test success
  subVerifyPass(daily: any) {
    let dictionary: any;
    this.dailyReview = daily;
    dictionary = this.sup.validateStatusToken(this.dailyReview);
    this.ref.detectChanges();
    this.viewStatus = dictionary["viewStatus"];
    this.ready = dictionary["ready"];
    this.searchMessage = dictionary["modalMessage"];
    this.searchResult = true;
    if (this.viewStatus === 0) {
      this.searchResult = false;
    }
    this.userType = this.dailyReview.entryPass.employee.nationalType;
    this.ref.detectChanges();
    if (this.dailyReview.status === "3" || this.dailyReview.status === "4") {
      this.showAlertSearchResult(this.searchMessage);
    }
  }
  // test success
  captureValueObjectCheck() {
    let requestCheck: IRequestCheck = {
      observations: this.security.observations.value,
      protectionEquipment: this.dailyReview.entryPass.employee.nationalType === "E" ? true : this.security.protectionEquipment.value,
      temperature: this.security.temperature.value,
      type: this.security.typeMov.value,
      userId: this.dailyReview.userId + "_" + this.user.id
    }
    return requestCheck;
  }
  saveCheckInOut() {
    if (!this.validateSearchData("TOKEN", "Registrando asistencia", "SAVE")) {
      this.blockUI.start("Registrando asistencia");
      this.requestCheck = this.captureValueObjectCheck();
      this.sup.generateCheckInOut(this.requestCheck).toPromise().then(
        (resp: IResponseCheck) => {
          if (resp.code === "200") {
            this.blockUI.stop();
            this.subSaveCheckInOut(resp, this.dailyReview.status);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorSaveCheckIntOur(error.statusText);
        }
      )
    }
  }
  errorSaveCheckIntOur(message:string){ 
    this.blockUI.stop();
          Swal.fire({
            icon: "error",
            title: message
          })
  }
  // test success
  subSaveCheckInOut(check: IResponseCheck, status: string) {
    this.datetime = check.registerDate;
    this.ref.detectChanges();
    this.showAlertFormByCondition(this.datetime, this.user, status);
    this.searchClear()
  }
}
