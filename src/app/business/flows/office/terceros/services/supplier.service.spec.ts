import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import {  Observable, of } from 'rxjs';
import { IGetEntryPass, IMainUser, IParameter, ISurveyHealth } from '../../../../../business/models/IModel-module';
import { API_ENTRYPASS, API_GET_HEALTH_SURVEY, API_GET_PARAMETER, API_POST_CHECKINTOUT, API_POST_REPORT_SYMP } from '../../../config/url.constants';
import { IRequestCheck, IRequestPostEntry, IRequestReportSymp, IRequestSymp } from '../models/RequestSupplier';

import { SupplierService } from './supplier.service';
export class MockDialog{
  open(){
    return {
      afterClosed:()=>of(Observable || "any")
  }}
}
describe('SupplierService', () => {
  let service: SupplierService;
  let mockhttpcontroller:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ 
        HttpClientTestingModule,RouterTestingModule
      ],
      providers:[
        SupplierService,{
          provide:MatDialog,
          useClass:MockDialog
        }
      ]
    });
    service = TestBed.inject(SupplierService);
    mockhttpcontroller = TestBed.inject(HttpTestingController);
  });
  beforeEach(()=>{
    
  })
  afterEach(()=>{
    localStorage.removeItem("user");
    mockhttpcontroller.verify();
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when init variable',()=>{ 
    expect(service.user).toBeNull();
    expect(service.emp).toBeNull();
    expect(service.parameter).toEqual([]);
  })
  it('when init variable then execute constructor',()=>{
    let user:IMainUser;
		user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
    service.ngOnInit();
    expect(service.user.id).toMatch("2955");
  })
  it('when execute validateStatusToken status 2',()=>{
    let dailyReview:IGetEntryPass;
    dailyReview={
      userId:"7693",
      pass:true,
      token:"15_7693_2020-11-27",
      status:"2",
      startDate:"2020-11-27",
      endDate:"2020-11-27",
      entryPass:{
        contactCoronavirus:false,
        employee:{
          employeeId:"4",
          name:"Jose Enrique  Castañeda Alcala",
          nationalType:"S",
          nationalId:"70434432",
          company:"Coordinador de Servicios Generales"
        },
        location:{
          city:"LG90029",
          campus:"54",
          floor:"4F",
          transport:{
            code:"259"
          }

        },
        symptoms:[],
        affidavit:{
          confirm:false,
          signature:{
            image:""
          }
        }
      },
      description:"El personal tiene habilitado el acceso, ya que no presento ningun tipo de síntoma al generar su acceso.",
      additionalData:[]
    }

    let result=service.validateStatusToken(dailyReview);
    expect(result["banner"]).toMatch("¡Tu pase está activo! Úsalo para ingresar a oficina.");
    expect(result["modalMessage"]).toMatch("El personal tiene habilitado el acceso, ya que no presento ningun tipo de síntoma al generar su acceso.");
  })

  it('when execute validateStatusToken status 3',()=>{
    let dailyReview:IGetEntryPass;
    dailyReview={
      userId:"7693",
      pass:true,
      token:"15_7693_2020-11-27",
      status:"3",
      startDate:"2020-11-27",
      endDate:"2020-11-27",
      entryPass:{
        contactCoronavirus:false,
        employee:{
          employeeId:"4",
          name:"Jose Enrique  Castañeda Alcala",
          nationalType:"S",
          nationalId:"70434432",
          company:"Coordinador de Servicios Generales"
        },
        location:{
          city:"LG90029",
          campus:"54",
          floor:"4F",
          transport:{
            code:"259"
          }

        },
        symptoms:[],
        affidavit:{
          confirm:false,
          signature:{
            image:""
          }
        }
      },
      description:"El personal tiene inhabilitado el acceso, ya que registro síntomas cuando intento generar su pase de acceso.",
      additionalData:[]
    }

    let result=service.validateStatusToken(dailyReview);
    expect(result["banner"]).toMatch("Su acceso se encuentra inhabilitado temporalmente debido a que reportó posibles síntomas de COVID-19. Por favor comuníquese con el gestor de su empresa para seguir los protocolos de salud correspondientes.");
    expect(result["modalMessage"]).toMatch("El personal tiene inhabilitado el acceso, ya que registro síntomas cuando intento generar su pase de acceso.");
  })

  it('when execute validateStatusToken status 4',()=>{
    let dailyReview:IGetEntryPass;
    dailyReview={
      userId:"7693",
      pass:true,
      token:"15_7693_2020-11-27",
      status:"4",
      startDate:"2020-11-27",
      endDate:"2020-11-27",
      entryPass:{
        contactCoronavirus:false,
        employee:{
          employeeId:"4",
          name:"Jose Enrique  Castañeda Alcala",
          nationalType:"S",
          nationalId:"70434432",
          company:"Coordinador de Servicios Generales"
        },
        location:{
          city:"LG90029",
          campus:"54",
          floor:"4F",
          transport:{
            code:"259"
          }

        },
        symptoms:[],
        affidavit:{
          confirm:false,
          signature:{
            image:""
          }
        }
      },
      description:"Solo podrá registrar su salida por este medio, ya que el empleado es sospechoso de covid-19.",
      additionalData:[]
    }

    let result=service.validateStatusToken(dailyReview);
    expect(result["banner"]).toMatch("Su acceso se encuentra inhabilitado temporalmente debido a que reportó posibles síntomas de COVID-19. Por favor comuníquese con el gestor de su empresa para seguir los protocolos de salud correspondientes.");
    expect(result["modalMessage"]).toMatch("Solo podrá registrar su salida por este medio, ya que el empleado es sospechoso de covid-19.");
  })

  it('when execute validateStatusToken status 1 pass false',()=>{
    let dailyReview:IGetEntryPass;
    dailyReview={
      userId:"7693",
      pass:false,
      token:"15_7693_2020-11-27",
      status:"1",
      startDate:"2020-11-27",
      endDate:"2020-11-27",
      entryPass:{
        contactCoronavirus:false,
        employee:{
          employeeId:"4",
          name:"Jose Enrique  Castañeda Alcala",
          nationalType:"S",
          nationalId:"70434432",
          company:"Coordinador de Servicios Generales"
        },
        location:{
          city:"LG90029",
          campus:"54",
          floor:"4F",
          transport:{
            code:"259"
          }

        },
        symptoms:[],
        affidavit:{
          confirm:false,
          signature:{
            image:""
          }
        }
      },
      description:"El usuario aún no resuelve el formulario. Necesita resolver el formulario para poder registrar su ingreso/salida.",
      additionalData:[]
    }

    let result=service.validateStatusToken(dailyReview);
    expect(result["formMessage"]).toMatch("El usuario aún no resuelve el formulario. Necesita resolver el formulario para poder registrar su ingreso/salida.");
    expect(result["viewStatus"]).toEqual(1);
  })

  it('when execute validateStatusToken status 3 pass false',()=>{
    let dailyReview:IGetEntryPass;
    dailyReview={
      userId:"7693",
      pass:false,
      token:"15_7693_2020-11-27",
      status:"3",
      startDate:"2020-11-27",
      endDate:"2020-11-27",
      entryPass:{
        contactCoronavirus:false,
        employee:{
          employeeId:"4",
          name:"Jose Enrique  Castañeda Alcala",
          nationalType:"S",
          nationalId:"70434432",
          company:"Coordinador de Servicios Generales"
        },
        location:{
          city:"LG90029",
          campus:"54",
          floor:"4F",
          transport:{
            code:"259"
          }

        },
        symptoms:[],
        affidavit:{
          confirm:false,
          signature:{
            image:""
          }
        }
      },
      description:"El personal tiene inhabilitado el acceso, ya que registro síntomas cuando intento generar su pase de acceso.",
      additionalData:[]
    }

    let result=service.validateStatusToken(dailyReview);
    expect(result["modalMessage"]).toMatch("El personal tiene inhabilitado el acceso, ya que registro síntomas cuando intento generar su pase de acceso.");
    expect(result["viewStatus"]).toEqual(3);
  })

  it('when execute loadDataSupplier',()=>{
    service.loadDataSupplier("DATA_FORM","0055").subscribe(
      (resp)=>{
          let parameter:Array<IParameter>=[];
          parameter=resp;
          expect(resp).toBeTruthy();
          expect(parameter.length).toBeGreaterThan(0);
      }
    )
    let param="?code=DATA_FORM&father=0055"
    const req=mockhttpcontroller.expectOne(API_GET_PARAMETER+param);
      expect(req.request.method).toEqual("GET");
      expect(req.request.headers.has("UNICA-PID")).toEqual(true);
      expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
      expect(req.request.headers.has("X-IBM-Client-Id")).toEqual(true);
      expect(req.request.headers.has("UNICA-User")).toEqual(true);
      expect(req.request.headers.has("UNICA-Application")).toEqual(true);

    })

    it('when execute loadDataSupplier 400 bad request',()=>{
      service.loadDataSupplier(null,"0055").subscribe(
        (resp)=>{
            fail("BAD REQUEST");
        },
        (error:HttpErrorResponse)=>{
          expect(error.status).toEqual(400);
        }

      )
      let param="?code=null&father=0055"
      const req=mockhttpcontroller.expectOne(API_GET_PARAMETER+param);
        expect(req.request.method).toEqual("GET");
        expect(req.request.headers.has("UNICA-PID")).toEqual(true);
        expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
        expect(req.request.headers.has("X-IBM-Client-Id")).toEqual(true);
        expect(req.request.headers.has("UNICA-User")).toEqual(true);
        expect(req.request.headers.has("UNICA-Application")).toEqual(true);
  
      })

      it('when execute loadDataSupplier 404 not found',()=>{
        service.loadDataSupplier("d","0055").subscribe(
          (resp)=>{
              fail("NOT FOUND");
          },
          (error:HttpErrorResponse)=>{
            expect(error.status).toEqual(404);
          }
  
        )
        let param="?code=d&father=0055"
        const req=mockhttpcontroller.expectOne(API_GET_PARAMETER+param);
          expect(req.request.method).toEqual("GET");
          expect(req.request.headers.has("UNICA-PID")).toEqual(true);
          expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
          expect(req.request.headers.has("X-IBM-Client-Id")).toEqual(true);
          expect(req.request.headers.has("UNICA-User")).toEqual(true);
          expect(req.request.headers.has("UNICA-Application")).toEqual(true);
    
        })
      it('when execute loadSympForm',()=>{
        service.loadSympForm("7693","DNI","70434432").toPromise()
        .then(
          (resp)=>{
            let form:ISurveyHealth;
            expect(form).toBeTruthy();
          }
        )
        let param="?userId=7693&nationalType=DNI&nationalId=70434432";
        const req=mockhttpcontroller.expectOne(API_GET_HEALTH_SURVEY+param);
          expect(req.request.method).toEqual("GET");
          expect(req.request.headers.has("UNICA-PID")).toEqual(true);
          expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
          expect(req.request.headers.has("UNICA-User")).toEqual(true);
          expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })
      it('when execute loadSympForm 404 not found',()=>{
        service.loadSympForm(null,"DNI","70434432").toPromise().then(
          (resp)=>{
            fail("NOT FOUND")
          },
          (error:HttpErrorResponse)=>{
            expect(error.status).toEqual(404);
          }
        )
        let param="?userId=null&nationalType=DNI&nationalId=70434432";
        const req=mockhttpcontroller.expectOne(API_GET_HEALTH_SURVEY+param);
          expect(req.request.method).toEqual("GET");
          expect(req.request.headers.has("UNICA-PID")).toEqual(true);
          expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
          expect(req.request.headers.has("UNICA-User")).toEqual(true);
          expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })

      it('when execute loadSympForm 500 bad request',()=>{
        service.loadSympForm(null,null,null).toPromise().then(
          (resp)=>{
            fail("NOT FOUND")
          },
          (error:HttpErrorResponse)=>{
            expect(error.status).toEqual(500);
          }
        )
        let param="?userId=null&nationalType=null&nationalId=null";
        const req=mockhttpcontroller.expectOne(API_GET_HEALTH_SURVEY+param);
          expect(req.request.method).toEqual("GET");
          expect(req.request.headers.has("UNICA-PID")).toEqual(true);
          expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
          expect(req.request.headers.has("UNICA-User")).toEqual(true);
          expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })

      it('when execute accessPass',()=>{
        service.accessPass("7693",null,null,null).toPromise().then(
          (resp)=>{
            expect(resp).toBeTruthy();
            expect(resp).not.toBeUndefined();
          }
        )
        let param="?userId=7693&nationalType=null&nationalId=null&token=null";
        const req=mockhttpcontroller.expectOne(API_ENTRYPASS+param);
          expect(req.request.method).toEqual("GET");
          expect(req.request.headers.has("UNICA-PID")).toEqual(true);
          expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
          expect(req.request.headers.has("UNICA-User")).toEqual(true);
          expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })
      it('when execute accessPass 404 not found',()=>{
        service.accessPass("76932222222222222",null,null,null).toPromise().then(
          (resp)=>{
            expect(resp).toBeTruthy();
            expect(resp).not.toBeUndefined();
          },
          (error:HttpErrorResponse)=>{
            expect(error.status).toEqual(404);
          }
        )
        let param="?userId=76932222222222222&nationalType=null&nationalId=null&token=null";
        const req=mockhttpcontroller.expectOne(API_ENTRYPASS+param);
          expect(req.request.method).toEqual("GET");
          expect(req.request.headers.has("UNICA-PID")).toEqual(true);
          expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
          expect(req.request.headers.has("UNICA-User")).toEqual(true);
          expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })
      it('when execute accessPass 400 bad request',()=>{
        service.accessPass(null,null,null,null).toPromise().then(
          (resp)=>{
            expect(resp).toBeTruthy();
            expect(resp).not.toBeUndefined();
          },
          (error:HttpErrorResponse)=>{
            expect(error.status).toEqual(400);
          }
        )
        let param="?userId=null&nationalType=null&nationalId=null&token=null";
        const req=mockhttpcontroller.expectOne(API_ENTRYPASS+param);
          expect(req.request.method).toEqual("GET");
          expect(req.request.headers.has("UNICA-PID")).toEqual(true);
          expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
          expect(req.request.headers.has("UNICA-User")).toEqual(true);
          expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })
      it('when execute accessPass 500 bad request',()=>{
        service.accessPass("ddfd",null,null,null).toPromise().then(
          (resp)=>{
            expect(resp).toBeTruthy();
            expect(resp).not.toBeUndefined();
          },
          (error:HttpErrorResponse)=>{
            expect(error.status).toEqual(400);
          }
        )
        let param="?userId=ddfd&nationalType=null&nationalId=null&token=null";
        const req=mockhttpcontroller.expectOne(API_ENTRYPASS+param);
          expect(req.request.method).toEqual("GET");
          expect(req.request.headers.has("UNICA-PID")).toEqual(true);
          expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
          expect(req.request.headers.has("UNICA-User")).toEqual(true);
          expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })
      it('when execute generateAccessPass',()=>{ 
        let img="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"
        let postEntry:IRequestPostEntry={
          affidavid:{
            confirm:true,
            signature:{
              image:img
            }
          },
          contactCoronavirus:false,
          location:{
            campus:"52",
            city:"19",
            floor:"4f",
            transport:{
              code:"260"
            }
          },
          phone:"",
          symptoms:[
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"16",
              description:"Tos"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"17",
              description:"Fiebre"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"18",
              description:"Dolor de garganta"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"19",
              description:"Falta de aire"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"53",
              description:"Pérdida del olfato"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"54",
              description:"Pérdida del gusto"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"55",
              description:"Congestión nasal"
            }
          ],
          userId:"7693"
    
        }
        service.generateAccessPass(postEntry).toPromise().then(
          (resp)=>{
            expect(resp).toBeTruthy();
          }
        )
        const req=mockhttpcontroller.expectOne(API_ENTRYPASS);
        expect(req.request.method).toEqual("POST");
        expect(req.request.headers.has("UNICA-PID")).toEqual(true);
        expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
        expect(req.request.headers.has("UNICA-User")).toEqual(true);
        expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })
      it('when execute generateAccessPass 404 not found',()=>{ 
        let img="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"
        let postEntry:IRequestPostEntry={
          affidavid:{
            confirm:true,
            signature:{
              image:img
            }
          },
          contactCoronavirus:false,
          location:{
            campus:"52",
            city:"19",
            floor:"4f",
            transport:{
              code:"260"
            }
          },
          phone:"",
          symptoms:[
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"16",
              description:"Tos"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"17",
              description:"Fiebre"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"18",
              description:"Dolor de garganta"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"19",
              description:"Falta de aire"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"53",
              description:"Pérdida del olfato"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"54",
              description:"Pérdida del gusto"
            },
            {
              answer:{
                id:"",
                name:"",
                type:"swicht",
                value:"NO"
              },
              code:"55",
              description:"Congestión nasal"
            }
          ],
          userId:"769322222222222222222"
    
        }
        service.generateAccessPass(postEntry).toPromise().then(
          (resp)=>{
           fail("NOT FOUND")
          },
          (error:HttpErrorResponse)=>{
            expect(error.status).toEqual(404);
            service.handleError(error)
          }
        )
        const req=mockhttpcontroller.expectOne(API_ENTRYPASS);
        expect(req.request.method).toEqual("POST");
        expect(req.request.headers.has("UNICA-PID")).toEqual(true);
        expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
        expect(req.request.headers.has("UNICA-User")).toEqual(true);
        expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })

      it('whem execute generateReportSymp',()=>{
        let sympQuestion:Array<IRequestSymp>=[];
        sympQuestion.push({
          answer:{
            id:"",
            name:"",
            type:"swicht",
            value:"NO"
          },
          code:"16",
          description:"Tos"
        },
        {
          answer:{
            id:"",
            name:"",
            type:"swicht",
            value:"NO"
          },
          code:"17",
          description:"Fiebre"
        },
        {
          answer:{
            id:"",
            name:"",
            type:"swicht",
            value:"NO"
          },
          code:"18",
          description:"Dolor de garganta"
        },
        {
          answer:{
            id:"",
            name:"",
            type:"swicht",
            value:"NO"
          },
          code:"19",
          description:"Falta de aire"
        },
        {
          answer:{
            id:"",
            name:"",
            type:"swicht",
            value:"NO"
          },
          code:"53",
          description:"Pérdida del olfato"
        },
        {
          answer:{
            id:"",
            name:"",
            type:"swicht",
            value:"NO"
          },
          code:"54",
          description:"Pérdida del gusto"
        },
        {
          answer:{
            id:"",
            name:"",
            type:"swicht",
            value:"NO"
          },
          code:"55",
          description:"Congestión nasal"
        })
        let requestReport:IRequestReportSymp;
        requestReport={
          campus:"52",
          floor:"19",
          report:"SYMPTOM",
          symptoms:sympQuestion,
          userId:"7693"
        }
        service.generateReportSymp(requestReport).toPromise().then(
          (report)=>{
            expect(report).toBeTruthy();
            expect(report).not.toBeUndefined();
          }
        )
        const req=mockhttpcontroller.expectOne(API_POST_REPORT_SYMP);
        expect(req.request.method).toEqual("POST");
        expect(req.request.headers.has("UNICA-PID")).toEqual(true);
        expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
        expect(req.request.headers.has("UNICA-User")).toEqual(true);
        expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })

      it('when execute  generateCheckInOut',()=>{
        let requestCheck:IRequestCheck;
        requestCheck={
          userId:"10_7309",
          type:"out",
          temperature:36,
          protectionEquipment:true,
          observations:"obs"
        }
        service.generateCheckInOut(requestCheck).toPromise().then(
          (check)=>{
            expect(check).toBeTruthy();
            expect(check).not.toBeUndefined();
          }
        )
        const req=mockhttpcontroller.expectOne(API_POST_CHECKINTOUT);
        expect(req.request.method).toEqual("POST");
        expect(req.request.headers.has("UNICA-PID")).toEqual(true);
        expect(req.request.headers.has("UNICA-ServiceId")).toEqual(true);
        expect(req.request.headers.has("UNICA-User")).toEqual(true);
        expect(req.request.headers.has("UNICA-Application")).toEqual(true);
      })
});
