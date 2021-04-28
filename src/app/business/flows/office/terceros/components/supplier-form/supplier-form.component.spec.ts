import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlockUIModule, BlockUIService } from 'ng-block-ui';
import { of } from 'rxjs';
import { IGetEntryPass, IMainUser, IParameter, IViewModule } from '../../../../../../business/models/IModel-module';
import Swal from 'sweetalert2';
import { IRequestPostEntry } from '../../models/RequestSupplier';
import { SupplierService } from '../../services/supplier.service';
import { ModalSignComponentComponent } from '../modal-sign-component/modal-sign-component.component';
import { MockDialog } from '../supplier-qr/supplier-qr/supplier-qr.component.spec';

import { SupplierFormComponent } from './supplier-form.component';
class SweetAlertMock{
    fire(){
        return {
            then:()=>of({
                name:"any value"
            })
        }
    }
}
describe('SupplierFormComponent', () => {
  let component: SupplierFormComponent;
  let fixture: ComponentFixture<SupplierFormComponent>;
  let symp:any;
  let user:IMainUser;
  let dailyReview:IGetEntryPass;
  let dialog:MatDialog;
  let started: Array<IParameter>; 

  const mockBlockUI= {
    start : ()=>{},
    stop : ()=>{}
  }
  const routerMock={
    navigate:jasmine.createSpy("navigate")
  }
  let block:BlockUIService;
  let router:Router;
  let moduleList: Array<IViewModule>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierFormComponent , ModalSignComponentComponent],
      imports:[ 
        HttpClientTestingModule,RouterTestingModule,BlockUIModule.forRoot()
      ],
      providers:[
        SupplierService,{
          provide:MatDialog,
          useClass:MockDialog
        },
        {
          provide:BlockUIService,
          useValue:mockBlockUI
        },
        {
          provide:Router,
          useValue:routerMock
        },
        {
          provide:MatDialogRef,
          useValue:{}
        },
        {
            provide: Swal,
            useClass: SweetAlertMock //This is the key line
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierFormComponent);
    component = fixture.componentInstance;
    block=TestBed.inject(BlockUIService)
    router=TestBed.inject(Router);
    dialog=TestBed.inject(MatDialog);

  });
  beforeEach(()=>{
    symp={
        "id": "2",
        "title": "Formulario basico",
        "description": "Responde las siguientes preguntas",
        "questions": [
            {
                "id": "39",
                "code": "1",
                "description": "¿Has estado en contacto con algún paciente con coronavirus en los últimos 14 días?",
                "answer": {
                    "id": "1",
                    "type": "switch",
                    "optionsList": [
                        {
                            "id": "1",
                            "code": "",
                            "value": "SI",
                            "selected": false
                        },
                        {
                            "id": "2",
                            "code": "",
                            "value": "NO",
                            "selected": false
                        }
                    ]
                }
            },
            {
                "id": "16",
                "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/icon_tos.png",
                "description": "Tos",
                "answer": {
                    "id": "1",
                    "type": "switch",
                    "optionsList": [
                        {
                            "id": "1",
                            "code": "",
                            "value": "SI",
                            "selected": false
                        },
                        {
                            "id": "2",
                            "code": "",
                            "value": "NO",
                            "selected": false
                        }
                    ]
                }
            },
            {
                "id": "17",
                "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/icon_fiebre.png",
                "description": "Fiebre",
                "answer": {
                    "id": "1",
                    "type": "switch",
                    "optionsList": [
                        {
                            "id": "1",
                            "code": "",
                            "value": "SI",
                            "selected": false
                        },
                        {
                            "id": "2",
                            "code": "",
                            "value": "NO",
                            "selected": false
                        }
                    ]
                }
            },
            {
                "id": "18",
                "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/icon_garganta.png",
                "description": "Dolor de garganta",
                "answer": {
                    "id": "1",
                    "type": "switch",
                    "optionsList": [
                        {
                            "id": "1",
                            "code": "",
                            "value": "SI",
                            "selected": false
                        },
                        {
                            "id": "2",
                            "code": "",
                            "value": "NO",
                            "selected": false
                        }
                    ]
                }
            },
            {
                "id": "19",
                "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/icon_aire.png",
                "description": "Falta de aire",
                "answer": {
                    "id": "1",
                    "type": "switch",
                    "optionsList": [
                        {
                            "id": "1",
                            "code": "",
                            "value": "SI",
                            "selected": false
                        },
                        {
                            "id": "2",
                            "code": "",
                            "value": "NO",
                            "selected": false
                        }
                    ]
                }
            },
            {
                "id": "53",
                "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector-5.png",
                "description": "Pérdida del olfato",
                "answer": {
                    "id": "1",
                    "type": "switch",
                    "optionsList": [
                        {
                            "id": "1",
                            "code": "",
                            "value": "SI",
                            "selected": false
                        },
                        {
                            "id": "2",
                            "code": "",
                            "value": "NO",
                            "selected": false
                        }
                    ]
                }
            },
            {
                "id": "54",
                "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector-6.png",
                "description": "Pérdida del gusto",
                "answer": {
                    "id": "1",
                    "type": "switch",
                    "optionsList": [
                        {
                            "id": "1",
                            "code": "",
                            "value": "SI",
                            "selected": false
                        },
                        {
                            "id": "2",
                            "code": "",
                            "value": "NO",
                            "selected": false
                        }
                    ]
                }
            },
            {
                "id": "55",
                "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/congestion.png",
                "description": "Congestión nasal",
                "answer": {
                    "id": "1",
                    "type": "switch",
                    "optionsList": [
                        {
                            "id": "1",
                            "code": "",
                            "value": "SI",
                            "selected": false
                        },
                        {
                            "id": "2",
                            "code": "",
                            "value": "NO",
                            "selected": false
                        }
                    ]
                }
            }
        ]
    }
    
      dailyReview={
        "userId": "2955",
        "pass": false,
        "token": "",
        "status": "7",
        "startDate": "",
        "endDate": "",
        "entryPass": {
            "contactCoronavirus": false,
            "employee": {
                "employeeId": "3027",
                "name": "JOAO JOSUE HERNANDEZ GODOY",
                "nationalType": "E",
                "nationalId": "73078273",
                "company": "T. PERU"
            },
            "location": {
                "city": "",
                "campus": "",
                "floor": "",
                "transport": {
                    "code": ""
                }
            },
            "symptoms": [],
            "affidavit": {
                "confirm": false,
                "signature": {
                    "image": ""
                }
            }
        },
        "description": "El usuario aún no resuelve el formulario. Necesita resolver el formulario para poder registrar su ingreso/salida.",
        "additionalData": [
            {
                "code": "POPUP",
                "value": "",
                "data": [
                    {
                        "code": "#QuédateEnCasa",
                        "value": "¡Tu salud y bienestar es primero! Permanece en casa trabajando en remoto, tu líder te comunicará cuando llegue el momento de retornar a oficina. Si necesitas acudir a la oficina por un tema urgente, conversa con tu líder y tu Business Partner de RRHH, maria.sandovals@telefonica.com, para autorizar tu ingreso de manera excepcional. Recuerda que en caso presentes algún síntoma de COVID-19 debes comunicarte con tu líder y contactar al médico ocupacional al 964474485 quien te brindará el asesoramiento correspondiente.",
                        "data": [
                            {
                                "code": "positive",
                                "value": "OK, entiendo",
                                "data": []
                            },
                            {
                                "code": "negative",
                                "value": "",
                                "data": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
    started=[
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90029",
            "description": "Amazonas",
            "value1": "20",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90027",
            "description": "Ancash",
            "value1": "21",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90010",
            "description": "Apurimac",
            "value1": "22",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90011",
            "description": "Arequipa",
            "value1": "23",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90017",
            "description": "Ayacucho",
            "value1": "24",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90028",
            "description": "Cajamarca",
            "value1": "25",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90012",
            "description": "Cusco",
            "value1": "26",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90021",
            "description": "Huancavelica",
            "value1": "27",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90020",
            "description": "Huanuco",
            "value1": "28",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90023",
            "description": "Ica",
            "value1": "29",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90022",
            "description": "Junin",
            "value1": "30",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90032",
            "description": "La Libertad",
            "value1": "31",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90030",
            "description": "Lambayeque",
            "value1": "32",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90018",
            "description": "LIMA",
            "value1": "33",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90024",
            "description": "Loreto",
            "value1": "34",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90015",
            "description": "Madre De Dios",
            "value1": "35",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90013",
            "description": "Moquegua",
            "value1": "36",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90031",
            "description": "Piura",
            "value1": "37",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90014",
            "description": "Puno",
            "value1": "38",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90025",
            "description": "San Martin",
            "value1": "39",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90016",
            "description": "Tacna",
            "value1": "40",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90033",
            "description": "Tumbes",
            "value1": "41",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "LG90026",
            "description": "Ucayali",
            "value1": "42",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:15"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Arequipa - Camana 2",
            "value1": "51",
            "value2": "LG90011",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Arequipa - Ejercito",
            "value1": "52",
            "value2": "LG90011",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Arequipa - Mollendo 2",
            "value1": "53",
            "value2": "LG90011",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Chiclayo - Chachapoyas",
            "value1": "54",
            "value2": "LG90029",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Chiclayo - Chiclayo 2",
            "value1": "55",
            "value2": "LG90030",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Chiclayo - Chiclayo 4",
            "value1": "56",
            "value2": "LG90030",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Chiclayo - Chota",
            "value1": "57",
            "value2": "LG90028",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Chiclayo - Jaen 1",
            "value1": "58",
            "value2": "LG90028",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Chimbote - Huacho 2",
            "value1": "59",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Chimbote - Huaraz",
            "value1": "60",
            "value2": "LG90027",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Corporativo",
            "value1": "61",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Cusco - Abancay",
            "value1": "62",
            "value2": "LG90010",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Cusco - Cusco 3",
            "value1": "63",
            "value2": "LG90012",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Cusco - Juliaca",
            "value1": "64",
            "value2": "LG90014",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Cusco - Pto. Maldonado",
            "value1": "65",
            "value2": "LG90015",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Cusco - Puno",
            "value1": "66",
            "value2": "LG90014",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Cusco - Quillabamba",
            "value1": "67",
            "value2": "LG90012",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Huancayo - Huancavelica",
            "value1": "68",
            "value2": "LG90021",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Huancayo - Huanuco",
            "value1": "69",
            "value2": "LG90020",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Huancayo - Satipo",
            "value1": "70",
            "value2": "LG90022",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Huancayo - Tambo",
            "value1": "71",
            "value2": "LG90022",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Huancayo - Tarma 1",
            "value1": "72",
            "value2": "LG90022",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Huancayo - Tingo Maria",
            "value1": "73",
            "value2": "LG90020",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Ica - Ayacucho",
            "value1": "74",
            "value2": "LG90017",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Ica - Cañete",
            "value1": "75",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Ica - Chincha",
            "value1": "76",
            "value2": "LG90023",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Ica - Nazca",
            "value1": "77",
            "value2": "LG90023",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Ica - Pisco",
            "value1": "78",
            "value2": "LG90023",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Iquitos - Moyobamba",
            "value1": "79",
            "value2": "LG90025",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Iquitos - Pucallpa 1",
            "value1": "80",
            "value2": "LG90026",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Iquitos - Tarapoto",
            "value1": "81",
            "value2": "LG90025",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Iquitos - Yurimaguas",
            "value1": "82",
            "value2": "LG90024",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Aeropuerto",
            "value1": "83",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Andres Reyes",
            "value1": "84",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av La Paz 1079",
            "value1": "85",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. Circunvalacion",
            "value1": "86",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. Cruz Del Sur",
            "value1": "87",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. El Rosario",
            "value1": "88",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. Faucett",
            "value1": "89",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. Las Palmeras",
            "value1": "90",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. Nicolas De Pierola",
            "value1": "91",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. Nicolas De Pierola Log N° 1035",
            "value1": "92",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. San Felipe",
            "value1": "93",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. Sucre",
            "value1": "94",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Av. Venezuela",
            "value1": "95",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Camino Real 208",
            "value1": "96",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Chorrillos - Paseo De La Republica",
            "value1": "97",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Esteban Salmon",
            "value1": "98",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Grimaldo Del Solar",
            "value1": "99",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Grimaldo Del Solar Log",
            "value1": "100",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Hals - San Borja",
            "value1": "101",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Higuereta",
            "value1": "102",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Iquitos",
            "value1": "103",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Jr. Washington 1338",
            "value1": "104",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Juan De Arona",
            "value1": "105",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Paseo De La Republica 3755",
            "value1": "106",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Primavera - Tsm",
            "value1": "107",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - San Borja",
            "value1": "108",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - San Juan",
            "value1": "109",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Lima - Zarate",
            "value1": "110",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Mn Lurin",
            "value1": "111",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Principal Lima",
            "value1": "112",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Arequipa",
            "value1": "113",
            "value2": "LG90011",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Chiclayo",
            "value1": "114",
            "value2": "LG90030",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Chimbote",
            "value1": "115",
            "value2": "LG90027",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Cusco",
            "value1": "116",
            "value2": "LG90012",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Huancayo",
            "value1": "117",
            "value2": "LG90022",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Ica",
            "value1": "118",
            "value2": "LG90023",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Iquitos",
            "value1": "119",
            "value2": "LG90024",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Piura",
            "value1": "120",
            "value2": "LG90031",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Tacna",
            "value1": "121",
            "value2": "LG90016",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Oficina Zonal Trujillo",
            "value1": "122",
            "value2": "LG90032",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Piura - Talara",
            "value1": "123",
            "value2": "LG90031",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Piura - Tumbes",
            "value1": "124",
            "value2": "LG90033",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Tacna - Ilo 1",
            "value1": "125",
            "value2": "LG90013",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Tacna - Moquegua",
            "value1": "126",
            "value2": "LG90013",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trujillo - Cajamarca",
            "value1": "127",
            "value2": "LG90028",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trujillo - Larco",
            "value1": "128",
            "value2": "LG90032",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trujillo - Pacasmayo",
            "value1": "129",
            "value2": "LG90032",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trujillo - Trujillo 2",
            "value1": "130",
            "value2": "LG90032",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "131",
            "value2": "LG90029",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "132",
            "value2": "LG90027",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "133",
            "value2": "LG90010",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "134",
            "value2": "LG90011",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "135",
            "value2": "LG90017",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "136",
            "value2": "LG90028",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "137",
            "value2": "LG90012",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "138",
            "value2": "LG90021",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "139",
            "value2": "LG90020",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "140",
            "value2": "LG90023",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "141",
            "value2": "LG90022",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "142",
            "value2": "LG90032",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "143",
            "value2": "LG90030",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "144",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "145",
            "value2": "LG90024",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "146",
            "value2": "LG90015",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "147",
            "value2": "LG90013",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "148",
            "value2": "LG90031",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "149",
            "value2": "LG90014",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "150",
            "value2": "LG90025",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "151",
            "value2": "LG90016",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "152",
            "value2": "LG90033",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Visita Cliente",
            "value1": "153",
            "value2": "LG90026",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "154",
            "value2": "LG90029",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "155",
            "value2": "LG90027",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "156",
            "value2": "LG90010",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "157",
            "value2": "LG90011",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "158",
            "value2": "LG90017",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "159",
            "value2": "LG90028",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "160",
            "value2": "LG90012",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "161",
            "value2": "LG90021",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "162",
            "value2": "LG90020",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "163",
            "value2": "LG90023",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "164",
            "value2": "LG90022",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "165",
            "value2": "LG90032",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "166",
            "value2": "LG90030",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "167",
            "value2": "LG90018",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "168",
            "value2": "LG90024",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "169",
            "value2": "LG90015",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "170",
            "value2": "LG90013",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "171",
            "value2": "LG90031",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "172",
            "value2": "LG90014",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "173",
            "value2": "LG90025",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "174",
            "value2": "LG90016",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "175",
            "value2": "LG90033",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "CAMPUS",
            "description": "Trabajo en Campo",
            "value1": "176",
            "value2": "LG90026",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 12:46"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TT_TDP",
            "description": "Público",
            "value1": "236",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 14:36"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TTP_TDP",
            "description": "Privado",
            "value1": "237",
            "value2": "",
            "value3": "",
            "status": "active",
            "startDate": "12/11/2020 14:36"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TRANSPORT",
            "description": "Bus",
            "value1": "251",
            "value2": "TT_TDP",
            "value3": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector.png",
            "status": "active",
            "startDate": "12/11/2020 15:01"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TRANSPORT",
            "description": "Taxi",
            "value1": "252",
            "value2": "TT_TDP",
            "value3": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector-1.png",
            "status": "active",
            "startDate": "12/11/2020 15:01"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TRANSPORT",
            "description": "Bicicleta",
            "value1": "253",
            "value2": "TT_TDP",
            "value3": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector-2.png",
            "status": "active",
            "startDate": "12/11/2020 15:01"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TRANSPORT",
            "description": "Scooter",
            "value1": "254",
            "value2": "TT_TDP",
            "value3": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector-3.png",
            "status": "active",
            "startDate": "12/11/2020 15:01"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TRANSPORT",
            "description": "Caminata",
            "value1": "258",
            "value2": "TTP_TDP",
            "value3": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Shape.png",
            "status": "active",
            "startDate": "12/11/2020 15:01"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TRANSPORT",
            "description": "Vehiculo particular",
            "value1": "259",
            "value2": "TTP_TDP",
            "value3": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector-4.png",
            "status": "active",
            "startDate": "12/11/2020 15:01"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TRANSPORT",
            "description": "Motocicleta",
            "value1": "260",
            "value2": "TTP_TDP",
            "value3": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Shape-1.png",
            "status": "active",
            "startDate": "12/11/2020 15:01"
        },
        {
            "code": "DATA_FORM",
            "father": "0055",
            "son": "TRANSPORT",
            "description": "Scooter",
            "value1": "261",
            "value2": "TTP_TDP",
            "value3": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector-3.png",
            "status": "active",
            "startDate": "12/11/2020 15:01"
        }
    ] 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
    moduleList=[
        {
        action: "coronavirus$fa fa-user-md",
        description: "CORONAVIRUS",
        id: "7",
        platform:"Web Admin",
        manageableAsset:[
          {
            action: "R",
            endDate: null,
            entityType: "CORONA_HOME",
            href: "/coronavirus/home",
            id: "28",
            reference: null,
            startDate: "2020-10-21T18:11:35"
          },
          {
            action: "R",
            endDate: null,
            entityType: "CORONA_QR",
            href: "/coronavirus/admin",
            id: "33",
            reference: null,
            startDate: "2020-10-21T18:11:35"
          }
        ]
      }]
      localStorage.setItem("modules",JSON.stringify(moduleList));
  })
  afterEach(()=>{
    localStorage.clear();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when init variable',()=>{
    expect(component.postEntry).toBeUndefined();
    expect(component.sympQuestion).toBeUndefined();
    expect(component.parameter).toBeUndefined();
    expect(component.blockUI).not.toBeUndefined();
    expect(component.user).toBeUndefined();
    expect(component.supplier).toBeUndefined();
    expect(component.myName).toMatch('');
    expect(component.id_supplier).toBeUndefined();
    expect(component.ready).toEqual(false);
    expect(component.viewStatus).toBeGreaterThanOrEqual(0);
    expect(component.noFormMessage).toMatch('');
    expect(component.validateAccess).toBeUndefined();
    expect(component.activetab).toBeGreaterThanOrEqual(0);
    expect(component.tab2disabled).toEqual(true);
    expect(component.coronaContactFlag).toEqual(false);
    expect(component.form).toEqual(null);
    expect(component.sympForm.length).toBeGreaterThanOrEqual(0);
    expect(component.checkboxdj).toEqual(false);
    expect(component.cities.length).toBeGreaterThanOrEqual(0);
    expect(component.sedes.length).toBeGreaterThanOrEqual(0);
    expect(component.refreshSedes.length).toBeGreaterThanOrEqual(0);
    expect(component.cityOption).toMatch("");
    expect(component.sedeOption).toBeGreaterThanOrEqual(0);
    expect(component.typeTransport.length).toBeGreaterThanOrEqual(0);
    expect(component.transportsDetail.length).toBeGreaterThanOrEqual(0);
    expect(component.refreshTransportDetail.length).toEqual(0);
    expect(component.transportType).toMatch("");
    expect(component.legalEntity).toMatch("");
    expect(component.dailyReview).toBeUndefined();
  })

  it('when execute ngOnInit',()=> { 
    spyOn(component,'initStartedData').and.callThrough();		
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.user.id).toMatch("2955");
    expect(component.supplier).not.toBeUndefined();
    expect(component.id_supplier).not.toBeUndefined();
    expect(component.legalEntity).toMatch("0055");
    expect(component.myName).toContain("JOAO JOSUE");
  })
  it('when execute initStartedData',fakeAsync(()=>{ 
    spyOn(component,'initStartedData');
    component.ngOnInit();
    component.initStartedData();
    tick(600);
    component.verifyAccessPass(user.id);
    tick(1100);
    component.startedSymp(user.id,"DNI","730078273");
    tick(1600)
    component.startedData();
    expect(component.initStartedData).toHaveBeenCalled();
    flush();
  }))

  it('when execute addValueToArrayForm',fakeAsync(()=>{ 
    expect(component.cities.length).toBeGreaterThanOrEqual(0);
    expect(component.typeTransport.length).toBeGreaterThanOrEqual(0);
    expect(component.refreshSedes.length).toBeGreaterThanOrEqual(0);
    expect(component.transportsDetail.length).toBeGreaterThanOrEqual(0);   
    component.addValueToArrayForm(started);
    }))
    it('when execute addSubStartedSymp',()=>{
        component.addSubStartedSympForm(symp);
        expect(component.form.description).toMatch("Responde las siguientes preguntas");
        expect(component.sympForm.length).toBeGreaterThan(0);
    })
    it('when execute subVerifyAccess',()=>{
      component.subVerifyAcces(dailyReview);
      expect(component.dailyReview.userId).toMatch(dailyReview.userId);
      expect(component.ready).toEqual(true);
      
    })
  
    it('when execute seeAccess',fakeAsync(()=>{
      component.seeAccess();
      expect(router.navigate).toHaveBeenCalled();
    }))
  
    it('when execute methods without http part2', fakeAsync(()=>{
      spyOn(dialog,'open').and.callThrough();
      const e ={
        checked:true
      }
      component.changeCheckbox(e);
      flush();
      expect(component.formReactive.supplierForm.get("imageBase64").value).toMatch("");
      expect(dialog.open).toHaveBeenCalled();
     
  
    }))
  
    it('when execute executeAfterClosedCheck',()=>{ 
        const signed=true;
        component.executeAfterClosedCheck(signed,"dasdaDASDasdasDA");
        expect(component.formReactive.imageBase64.value).toMatch("dasdaDASDasdasDA");
    })
    it('when execute captureValueObject',()=>{
      component.addValueToArrayForm(started);
      component.sympQuestion=[];
      component.formReactive.chkConfirm.setValue(true);
      component.formReactive.imageBase64.setValue("DASDADSAS");
      component.formReactive.contactCoronavirus.setValue(false);
      component.formReactive.cityOption.setValue("LG90029");
      component.formReactive.sedeOption.setValue("19");
      component.formReactive.stageOption.setValue("4F");
      component.formReactive.transportOption.setValue("6");
      component.ngOnInit();
      let postEntry: IRequestPostEntry;
      component.formReactive.cityOption.setValue("");
      postEntry=component.captureValueObjectForm();
      expect(postEntry).not.toEqual(null);
      
    })

    it('when execute nextStep',fakeAsync(()=>{
        component.ngOnInit();
        component.addSubStartedSympForm(symp);
        component.nextStep();
        flush();
        expect(component.activetab).toEqual(1);
      }))
      
      it('when execute showAlertKeepHome',()=>{ 
        spyOn(dialog,'open').and.callThrough();
        component.showAlertKeepHome();
        expect(dialog.open).toHaveBeenCalled();
        
      })

      it('when execute changeCity',()=>{  
        component.ngOnInit();
        component.addValueToArrayForm(started);
        const value={
            target:{
                value:"LG90020"
            }
        };
        component.changeCity(value);
        expect(component.sedeOption).toEqual(0);
        expect(component.sedes.length).toBeGreaterThan(0);
      })

      it('when execute changeTransportType',fakeAsync(()=>{ 
        component.ngOnInit(); 
        component.addValueToArrayForm(started);
        tick(2000);
        component.changeTransportType("TTP_TDP");
        tick(2000);
        expect(component.transportType).toMatch("TTP_TDP");
        expect(component.transportsDetail.length).toBeGreaterThan(0);
      }))

    it('when execute validateFormAccess sede',()=>{
        component.ngOnInit();
        spyOn(Swal,'fire').and.callThrough();
        component.formReactive.supplierForm.get("sedeOption").setValue("");
        component.formReactive.supplierForm.get("contactCoronavirus").setValue(false);
        component.formReactive.supplierForm.get("isSymp").setValue(false);
        component.validateFormAccess()
        expect(Swal.fire).toHaveBeenCalled();
            
    })
    it('when execute validateFormAccess stage',()=>{
        component.ngOnInit();
        spyOn(Swal,'fire').and.callThrough();
        component.formReactive.sedeOption.setValue("HOLA")
        component.formReactive.stageOption.setValue("");
        component.formReactive.contactCoronavirus.setValue(false);
        component.formReactive.isSymp.setValue(false);
        component.validateFormAccess()
        expect(Swal.fire).toHaveBeenCalled();
      })
    it('when execute validateFormAccess transport',()=>{
        spyOn(Swal,'fire').and.callThrough();
        component.formReactive.sedeOption.setValue("HOLA")
        component.formReactive.stageOption.setValue("HOLA2");
        component.formReactive.transportOption.setValue("");
        component.formReactive.contactCoronavirus.setValue(false);
        component.formReactive.isSymp.setValue(false);
        component.validateFormAccess()
        expect(Swal.fire).toHaveBeenCalled();
    
      })
      it('when execute changeSympValueOption',fakeAsync(()=>{
        component.addSubStartedSympForm(symp);
        tick(2000);
        component.changeSympValueOption(2,true);
        tick(2000);
        expect(component.checkboxdj).toEqual(false);
      }))

      it('when execute errorVerifyAccessPass',()=>{
        component.ngOnInit();
        component.errorVerifyAccessPass();
        expect(component.viewStatus).toEqual(0);
        })
      it('when execute addSubStartedSymp',fakeAsync(()=>{ 
            spyOn(component,'showAlertKeepHome');
            component.addSubStartedSympForm(symp);
            component.sympForm[1].option=true;
            component.sympForm[1].touched=true;
            component.sympForm[2].option=true;
            component.sympForm[2].touched=true;
            component.nextStep();
            
        }))
     it('when execute errorGenerateAccessPass',()=>{
         spyOn(Swal,'fire');
         component.errorGenerateAccessPass("HOLA MUNDO");
         expect(Swal.fire).toHaveBeenCalled();
     })

     it('when execute changeToggle',()=>{
         const value={
             checked:true
         };
         component.changeToggle(value);
         expect(component.coronaContactFlag).toEqual(true);
         expect(component.checkboxdj).toEqual(false);
         expect(component.tab2disabled).toEqual(true);
     })

     it('when execute errorStartedSymp',()=>{ 
        spyOn(Swal,'fire');
        component.errorStartedSymp("HOLA MUNDO");
        expect(Swal.fire).toHaveBeenCalled();
     })

     it('when execute errorStatedData',()=>{ 
         spyOn(Swal,'fire');
         component.errorStatedData("HOLA MUNDO");
         expect(Swal.fire).toHaveBeenCalled();
     })

     
});
