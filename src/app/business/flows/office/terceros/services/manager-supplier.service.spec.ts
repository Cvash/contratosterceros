import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { executionAsyncId } from 'async_hooks';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { API_TER_GET_COMPANYSERVICE_SUPP_GESTOR, API_TER_POST_ADDNEW_GESTOR_SERVICE, API_TER_POST_SUPPLIERS_ADMIN, API_TER_SUPPLIERS, API_TER_SUPPLIER_DELETE } from '../../../config/url.constants';
import { ManagerSupplierService } from './manager-supplier.service';

export class mockSwalAlert{
  fire(){
    return {
      then:()=>of(Observable || "any")
    }
  }
}

describe('ManagerSupplierService', () => {
  let service: ManagerSupplierService;
  let mockHttp:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        {
          provide:Swal,
          useClass:mockSwalAlert
        }
      ]
    });
    service = TestBed.inject(ManagerSupplierService);
  });
  beforeEach(()=>{
    mockHttp=TestBed.inject(HttpTestingController);
  })
  afterEach(()=>{
    mockHttp.verify();
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when execute services',()=>{
    const suppId=7;
    const userId="7696";
    const typeAction="D";
    const param="?id_supp="+suppId+"&id_user="+userId+"&type_action="+typeAction;
    service.getCompanyServiceByUser(suppId,userId,typeAction).toPromise().then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const req=mockHttp.expectOne(API_TER_GET_COMPANYSERVICE_SUPP_GESTOR+param);
    expect(req.request.method).toEqual("GET");
  
    // removeSupplierFormService
    service.removeSupplierFromService(suppId,6,userId,typeAction).toPromise().then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const req2=mockHttp.expectOne(API_TER_SUPPLIER_DELETE);
    expect(req2.request.method).toEqual("POST");
    // addNewServiceManagement
    service.addNewServiceManagement(suppId,6,userId).toPromise().then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const req3=mockHttp.expectOne(API_TER_POST_ADDNEW_GESTOR_SERVICE);
    expect(req3.request.method).toEqual("POST");
    // loadManagementSubSupplierData
    let lstIdServices=[];
    lstIdServices.push("6");
    service.loadManagementSubSupplierData(lstIdServices,userId).toPromise()
    .then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const req4=mockHttp.expectOne(API_TER_POST_SUPPLIERS_ADMIN);
    expect(req4.request.method).toEqual("POST");
    // showAlertCondition
    spyOn(Swal,'fire').and.callThrough();
    service.showAlertCondition('error','Eres un perejil.');
    expect(Swal.fire).toHaveBeenCalled();

    // loadManagementSupplierData
    service.loadManagementSupplierData(suppId,6).toPromise()
    .then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const param2="?id_supp="+suppId+"&id_serv=6";
    const req5=mockHttp.expectOne(API_TER_SUPPLIERS+param2);
    expect(req5.request.method).toEqual("GET");
  })
});
