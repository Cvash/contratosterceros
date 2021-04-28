export interface IMailTemplate{
    id:number;
    title:string;
    cc?:string;
    cco?:string;
    subject?:string;
    body:string; //text
    created_by?:number;
    created_at?:string;
    updated_by?:number;
    updated_at?:string;
}

export interface ISents{
    id:number;
    id_template?:number;
    id_status:number;
    total:number;
    success:number;
    fails:number;
    created_by?:number;
    created_at?:string;
    updated_by?:number;
    updated_at?:string;
}

export interface ISentDetail{
    id: number;
    id_sent: number; 
    correo:string;
    cc?:string;
    cco?: string;
    subject?: string;
    body: string;
    id_status: string;
    created_by?:number;
    created_at?:string;
    updated_by?:number;
    updated_at?:string;
}