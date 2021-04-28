export interface IChargedTemplate {
    body:string;
    created_at: string;
    id: number;
    status: boolean;
    title: string;
    updated_at: string;
}

export interface IDocumentStatus{
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

export interface IListDocument{
    body: string;
    default: boolean;
    input: string;
}