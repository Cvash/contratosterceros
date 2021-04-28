export class CompanyService{
    id:any;
    id_company:any;
    name:any;
}

export class ReportData{
    dni:any;
    name:any;
    lastName1:any;
    lastName2:any;
    serviceName:any;
    dateGenerate:any;
    userStatus:any;
    docMedic:any;
    qrStatus:any;
    qrHour:any;
    personStatus:any;
    reportHour:any;
    personDoor:any;
    checking:any;
    hourIn:any;
    tempIn:any;
    hourOut:any;
    tempOut:any;
    countOut:any;
    countIn:any;
}

export class EmployeeData{
    cip:any;
    id:any;
    last_name_1:any;
    last_name_2:any;
    legal_entity_id:any;
    mail:any;
    name:any;
    national_id;
  }

export class Company {
    id:any;
    status:any;
    code:any;
    name:any;
}

export class ShowMngTdp{
    id:any;
    fullname:any;
    national_id:any;
    cip:any;
  }
 
  export interface IResponseManagementSupplier{
    id?:number,
    activity:string,
    birthdate:string,
    codeCompany:string,
    gender:string,
    lastName1:string,
    lastName2:string,
    mail:string,
    name:string,
    nationalId:string,
    coronaStatus:number,
    statusDetail:string,
    idCompany?:number,
    updatedAt?:string
}

export interface ISuppServices{
    id:any;
    name:any;
  }
export interface IServicesDisabled{
    idSupplier:any;
    idService: any;
    supplierName:any;
    serviceName: any;
    companyName: any;
    condition: any;
    dateDisabled:any;
  }
  export interface IDelete{
    cond:any;
    idService:any;
    actionType:any;
    flagActive:any;
  }
  export interface ICode{
    id:any;
  }

  export interface ICompanyService{
    ruc:string,
    company_name:string,
    service:string,
    managerMail:string,
    status:string
  }