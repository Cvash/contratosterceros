import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalRelationshipComponent } from '../../../coronavirus/components/modal-relationship/modal-relationship.component';
import { IMailTemplate } from '../../models/responseMailing';
import { MailingService } from '../../services/mailing.service';

@Component({
  selector: 'app-modal-preview',
  templateUrl: './modal-preview.component.html',
  styleUrls: ['./modal-preview.component.scss']
})
export class ModalPreviewComponent implements OnInit {
  template:IMailTemplate;
  correo:string="";
  loading:boolean = false;
  attach:Array<any>=[];
  total:number = 0;
  index:number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any, private ref:ChangeDetectorRef,
    public previewServ:MailingService, public dialogRef:MatDialogRef<ModalRelationshipComponent>
  ) { }
  // test success
  initConstructorData(data){
/*     console.log("INIT CONSTRUCTOR"); */
    if (data.type==="prev"){
      /* console.log("PREV"); */
      this.total = data.rows.length;
      this.preview(0);
    }else if (data.type==="final"){
      /* console.log("FINAL") */
      this.template = data.template;
      this.correo = data.to;
      this.attach = data.attach;
      this.ref.detectChanges();
    }    
  }
  // test success
  closeModalPreview(): void {
    this.dialogRef.close();
  }
  // test success
  nextPreview (){
    if ( this.total - this.index > 1){
      this.index++;
    }else{
      this.index = 0;
    }
    this.preview(this.index);

 }
 // test success
  ngOnInit(): void {
    this.initNgOnInit(this.data);
  }
  // test success
  validateDetailsAndType(idDetail:number,type:string,):boolean{
    /* console.log("VALIDATE") */
    if (idDetail !== 0 && type === "final"){
      /* console.log("ENTRO FINAL"); */
      this.loading = true;
      this.ref.detectChanges();
      return true;
     }
    return false
  }
  // tst success
  initNgOnInit(data:any):void{
    this.initConstructorData(data);
    /* console.log("INITNGONINIT") */
    const idDetail = data.template.id;
    if(this.validateDetailsAndType(idDetail,data.type)){
      this.previewServ.sendDetailsAttachment(idDetail)
      .toPromise().then(resp => {
        this.responseInitOnInit(resp);    
      })
    }
  }
  // test success
  responseInitOnInit(resp){
    this.loading = false;
    this.attach = resp['attachment'];
  }
  // test success
  getFileAttach(azure:string,name:string){
    const a = document.createElement("a");
    a.href = ("https://storageqallarix.blob.core.windows.net/rhdigital/messaging/files/" + azure);
    a.download = name;
    a.click();
  }
  // FUNCIONES DE REEMPLAZO
  // test success
  preview(x:number){
    // VARIABLES MENSAJE    
    let mensajeHTML = this.data.template.body;
    let cc = this.data.template.cc;
    let cco = this.data.template.cco;
    let sub = this.data.template.subject;
    let templatePreview: IMailTemplate = {...this.data.template};         
    // REEMPLAZAR COLUMNAS
    this.data.headers.map(p =>{
        const header = "@"+p;
        var replace = new RegExp(header,"g")
        mensajeHTML = mensajeHTML.replace(replace,this.data.rows[x][p]);
        cc = cc.replace(replace,this.data.rows[x][p]);
        cco = cco.replace(replace,this.data.rows[x][p]);
        sub = sub.replace(replace,this.data.rows[x][p]);
    });
    // EJECUTAR FÓRMULAS
    mensajeHTML = this.functionsReview(mensajeHTML);
    // ARMAR TEMPLATE
    templatePreview.body =  mensajeHTML;
    templatePreview.cc =  cc;
    templatePreview.cco =  cco;
    templatePreview.subject = sub;
    let correo:string="No seleccionó excel";
    if (this.data.rows.length > 0){
      correo = this.data.rows[x]['Correo']
    }
    // ASIGNAR VALORES AL MODAL
    this.correo = correo;
    this.template = templatePreview;
  }

  // ¡FORMULAS!
  functionsReview(cadena:string){
    //const expresion = /@[a-z]+\(.+?\)+/g   
    const expresion = /@case\*\[.+?\]\*+/g
    // VARIABLES
    let arrayFunciones = []; //  Areglo de funciones
    let coincidencia:RegExpExecArray;
    let tempArray:Array<any> = [];
    // BUSCAR COINCIDENCIAS DE @FUN()
    do {
      coincidencia = expresion.exec(cadena);
      if (coincidencia) {
        tempArray.push(coincidencia)
      }
    } while (coincidencia);    
    // CONSTRUIR ARREGLO DE FUNCIONES
    tempArray.forEach(p => {
        /* console.log("TEMP ARRAY"); */
        const separador = p[0].split("*[");
        const argsStr:string = separador[1].slice(0,separador[1].length-2);
        const regexArgs = /\[.+?\]+/g;
        let args:string[] = [];
        do {
          coincidencia = regexArgs.exec(argsStr);
          if (coincidencia) {
            args.push(coincidencia[0].replace("[","").replace("]",""))
          }
        } while (coincidencia);         
        if (args.length > 2){
            arrayFunciones.push({
                original: p[0],
                type:separador[0],
                args:args,
                resultado:""
            })
        }
    });    
    // EJECUTAR FUNCIONES
    arrayFunciones.forEach(funcionJS => {
      switch (funcionJS.type) {
        case "@case":
          const finalFJS = this.funcionCase(funcionJS);  
          cadena = cadena.replace(finalFJS.original,finalFJS.resultado);
          break;      
        default:
          break;
      }
    }) 
    // APLICAR CAMBIOS    
    return cadena;
  }
  funcionCase = (objIf) => {
    const variable:string = objIf.args[0].trim(); 
    const defcase:string = objIf.args[1]; 
    let cases:{case:number,result:string}[]=[];
    for (let i = 2; i < objIf.args.length; i++) {
      const cas = objIf.args[i].split(":")[0]
      const res = objIf.args[i].substr(cas.length+1)
      cases.push({
        case:cas,
        result:res.trim()
      })      
    }
    let response = {...objIf,resultado: defcase}  
    cases.forEach(acase => {
      if (variable.toString() === acase.case.toString()){
        response = {...objIf,resultado: acase.result}
      }
      
    });   
    return response;      
  }
}
