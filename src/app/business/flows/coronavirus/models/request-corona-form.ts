export class RequestFamilyDto{
    id:any;
    status:any;
    name:any;
    last_name_1:any;
    last_name_2:any;
    id_request:any;
    id_relationship:any;
    name_relationship:any;
    other_relationship:any;
    id_family_condition_1:any;
    id_family_condition_2:any;
    id_family_condition_3:any;
    id_family_condition_4:any;
    comment:any;
    action:any;
    constructor(id:any,status:any,name:any,last_name_1:any,last_name_2:any,id_relationship:any,name_relationship:any,id_family_condition_1,id_family_condition_2,
        id_family_condition_3,id_family_condition_4,other_relationship:any,comment:any,action:any){
        this.id=id;
        this.status=status;
        this.name=name;
        this.last_name_1=last_name_1;
        this.last_name_2=last_name_2;
        this.id_relationship=id_relationship;
        this.name_relationship=name_relationship;
        this.other_relationship=other_relationship;
        this.id_family_condition_1=id_family_condition_1;
        this.id_family_condition_2=id_family_condition_2;
        this.id_family_condition_3=id_family_condition_3;
        this.id_family_condition_4=id_family_condition_4;
        this.comment=comment;
        this.action=action;
      } 
}

export class RequestCronicasDto {
    id_employee: any;
    id_cor_con_det: any;
    other_cor_det: any;
    created_by: any;
    updated_by: any;
}

export class HtmlActive{
    id:any;
    accessLevel:any;
    flag:any;
}

export class RequestCoronaHomeDto{
    array_family:any;
    array:any;
    id_employee:any;
    phone:any;
    mail:any;
    address:any;
    contact_warning:any;
    tef_contact_warning:any;
    id_corona_reason:any;
    comment:any;
    status_det:any;
    id_corona_type:any;
    id_country:any;
    id_precondition_1:any;
    id_precondition_2:any;
    id_precondition_3:any;
    id_precondition_4:any;
    id_precondition_5:any;
    id_precondition_6:any;
    id_precondition_7:any;
    id_precondition_8:any;
    id_precondition_9:any;
    id_precondition_10:any;
    id_precondition_11:any;
    id_precondition_12:any;
    other_factor:any;
    date_reason:any;
    date_type:any;
    weight:any;
    height:any;
    imc:any;
    transport:any;
    created_by:any;
    updated_by:any;
}

export class RequestCoronaDocument{
    id_doc:any;
    id_cor_doc:any;
    id_emp:any;
    name:any;
}

export class CoronaEmployee{
    id:number;
    name:string;
    cip:string;
    dni:string;
    status:number;
    comment:string;
    phone:string;
    mail:string;
    id_request?:number;
    details?:Array<any>
}