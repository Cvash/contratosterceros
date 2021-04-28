export interface IStartedData{
    status:boolean;
    array:Array<{
        id:number;
        name:string;
        detail:string;
    }>;
    array_r:Array<{
        id:number;
        name:string;
        detail:string;
    }>;
    array_t:Array<{
        id:number;
        name:string;
        detail:string;
    }>;
    array_c:Array<{
        id:number;
        name:string;
        detail:string;
    }>;
    array_relationship:Array<{
        id:number;
        name:string;
     
    }>;
    array_tp:Array<{
        id:any;
        name:any;
        icons:any;
    }>
}


export interface ICoronaSick{
    
    updated_at:any;
    other_chronic_diseases: any;
    status: any;
    created_at: any;
    id: any;
    coronagroupdetail:any;
    description: any;

}


export interface ICoronavirusFormEdit {
    id_request: number;
    id_reason: number;
    id_employee: number;
    status_det: number;
    id_type: number;
    phone: string;
    mail: string;
    comment: string;
    date: any;
    precondition_1: any;
    precondition_2: any;
    precondition_3: any;
    precondition_4: any;
    precondition_5: any;
    precondition_6: any;
    precondition_7: any;
    precondition_8: any;
    precondition_9: any;
    precondition_10: any;
    precondition_11: any;
}

export interface IGroupData{
    group:any;
    group_detail:any;
}

export interface IOnlyDate{
    status: any;
    id: any;
    description: any;
    name: any;
    coronagroup: any;
    updated_at: any;
    created_at: any;
}

export interface IOfficeAccess{
    id:any;
    name:any;
  }

export interface IAdminData{
        id: number;
        name: string;
        cip: string;
        dni: string;
        status: string;
        comment: string;
        country:string;
        phone: string;
        mail: string;
        id_request: number;
        type:string;
        date_reason:string;
        date_type:string;
        precondition_1:any;
        precondition_2:any;
        precondition_3:any;
        precondition_4:any;
        precondition_5:any;
        precondition_6:any;
        precondition_7:any;
        precondition_8:any;
        precondition_9:any;
        precondition_10:any;
        degree_infection:string;
        office_access:any;
        }

export interface ICoronaEmployee{
    id:number,
    name:String,
    cip:String,
    dni:String,
    status:number,
    comment:String,
    phone:String,
    mail:String,
    id_request?:number,
    details?:[]
}


export interface IStandard{
    id:any;
    name:string;
}

export interface ICheckingData {
    id: string;
    cip:string;
    id_employee: string;
    datemark: string;
    hourmark: string;
    typemark:string;
    comment:string;
    user_name:string;
  }