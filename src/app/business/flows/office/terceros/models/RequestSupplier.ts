export class IRequestSign {
    confirm: boolean;
    signature: {
        image: string;
    };

}
export class IRequestLocation {
    campus: string;
    city: string;
    floor: string;
    transport: {
        code: string;
    };
}
export class IRequestSymp {
    code: string;
    description: string;
    answer: {
        id: string;
        name: string;
        type: string;
        value: string;
    };
}
export class IRequestPostEntry {
    affidavid: IRequestSign;
    contactCoronavirus: boolean;
    location: IRequestLocation;
    phone: string;
    symptoms: Array<IRequestSymp>;
    userId: string;
}

export class IRequestReportSymp {
    campus: string;
    floor: string;
    report: string;
    symptoms: Array<IRequestSymp>;
    userId: string;
}

export class IRequestCheck {

    observations: string = "";
    protectionEquipment: boolean = true;
    temperature: number = 0;
    type: string = "";
    userId: string;

}

export class IResponseCheck {
    code: string;
    message: string;
    registerDate: string;
}

export class IRequestAddSupplier {
    id?:number;
    name: string;
    lastName1: string;
    lastName2: string;
    nationalId: string;
    codeCompany: string;
    idCompany: number;
    mail: string;
    birthdate: string;
    gender: string;
    activity: string;
}

export interface IRequestAddNewSupplier{
    id?:number;
    name:string;
    lastName1:string;
    lastName2:string;
    nationalId:string;
    codeCompany:string;
    idCompany:number;
    mail:string;
    birthdate:string;
    gender:string;
    activity:string;
    coronaStatus:number;
    statusDetail:string;
}

export class IRequestPostAddSupplier {
    supplier: IRequestAddSupplier;
    user_id: string;
    type: string;
    typeAction: string;
}

export class RequestCompany {
    ruc: string;
    alias: string;
    name: string;
    activity: string;
}
export class RequestService {
    id_company: number;
    name: string;
    description: string;
    contactname: string;
    contactnumber: string;
    contactmail: string;
}

export class RequestUserService{
    id_emp: number;
    id_serv: number; 
    created_by:string;
    updated_by:string;
}
export interface IChangeSupp{
    idSupp:any;
    idServ:any;
    created_by:any;
    updated_by:any;
  }
  export interface IRequestManagementSupplier{
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