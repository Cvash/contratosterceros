import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusHomeReactiveService {

  coronaFormReactive:FormGroup
  cip:FormControl = new FormControl('') // cip
  employeeName: FormControl = new FormControl('',) // nombre de empleado
  employeeGender : FormControl = new FormControl('') // sexo del empleado
  requestId:FormControl = new FormControl(0) // request id
  statusWork:FormControl = new FormControl(null); // situacion laboral
  reasonDate: FormControl = new FormControl(""); // fecha de situacion laboral
  typeWork: FormControl = new FormControl(null); // tipo de presencia
  typeDate : FormControl = new FormControl(""); // fecha de tipo de presencia
  healthPerson : FormControl = new FormControl(null); // estado de salud
  telef : FormControl = new FormControl("") // telefono
  address : FormControl = new FormControl("") // direccion
  cardiovascularesSick : FormControl = new FormControl("") // enfermedades cardiovasculares
  pulmonaresCronicasSick : FormControl = new FormControl("") // enfermedades pulmonares cronicas
  inmunosupresionSick : FormControl = new FormControl("") // enfermedadees inmunosupresion
  filename : FormControl = new FormControl("") // nombre de archivo
  countryId : FormControl = new FormControl(null) // país
  mail : FormControl = new FormControl("") // correo
  transportId : FormControl = new FormControl(0) // transporte
  weight : FormControl = new FormControl(0) // peso
  height : FormControl = new FormControl(0) // altura
  imc : FormControl = new FormControl(0) // imc
  comment : FormControl = new FormControl("") // comentario
  chk01:FormControl = new FormControl(false)
  enfermedadesCronicas : FormControl = new FormControl(null) // enfermedades cronicas precondition 02
  chk02 : FormControl = new FormControl(false) // precondition 03 Trabajadores nacidos hasta 1960
  chk00 : FormControl = new FormControl(false) // precondition 01 Mujeres en estado de gestacion
  chk03 : FormControl = new FormControl(false) // precondition 04 Personal con licencia Sindical
  chk04 : FormControl = new FormControl(false) // precondition 05 Personal con Licencia por periodo de Lactancia
  chk05 : FormControl = new FormControl(false) // precondition 06 Personal con licencia medica
  chk06 : FormControl = new FormControl(false) // precondition 07 Otras licencias
  chk07 : FormControl = new FormControl(false) // precondition 08 Nuevos requerimientos Personas que necesita CITRIX/VPN para sumarse al trabajar remoto
  chk08 : FormControl = new FormControl(false) // precondition 09 Personal sin retorno al país
  chk09 : FormControl = new FormControl(false) // precondition 10 Contacto con persona con resultado positivo 
  chk10 : FormControl = new FormControl(false) // precondition 11 ¿Vives con alguien de o con exposición de Riesgo? 
  chk11: FormControl = new FormControl(false) // precondition 12 otro tipo de condition de riesgo
  otherFactor: FormControl = new FormControl('') // otro tipo de factor de riesgo
  chk12: FormControl = new FormControl(false) // precondition 13 al cuidado de un familiar
  codeSelect: FormControl = new FormControl(null) 
  searchMotivo : FormControl = new FormControl("") // search motivo
  contactWarning : FormControl = new FormControl("")
  tefContactWarning : FormControl = new FormControl("")
  constructor() {
    this.coronaFormReactive = new FormGroup({ 
      cip:this.cip,
      employeeName:this.employeeName,
      employeeGender:this.employeeGender,
      codeSelect: this.codeSelect,
      requestId:this.requestId,
      statusWork:this.statusWork,
      reasonDate:this.reasonDate,
      typeWork:this.typeWork,
      typeDate:this.typeDate,
      healthPerson:this.healthPerson,
      telef:this.telef,
      address:this.address,
      mail:this.mail,
      cardiovascularesSick:this.cardiovascularesSick,
      pulmonaresCronicasSick:this.pulmonaresCronicasSick,
      inmunosupresionSick:this.inmunosupresionSick,
      filename:this.filename,
      countryId:this.countryId,
      transportId:this.transportId,
      weight:this.weight,
      height:this.height,
      imc:this.imc,
      comment:this.comment,
      chk00:this.chk00,
      chk01:this.chk01,
      chk02:this.chk02,
      enfermedadesCronicas:this.enfermedadesCronicas,
      chk03:this.chk03,
      chk04:this.chk04,
      chk05:this.chk05,
      chk06:this.chk06,
      chk07:this.chk07,
      chk08:this.chk08,
      chk09:this.chk09,
      chk10:this.chk10,
      chk11:this.chk11,
      otherFactor:this.otherFactor,
      chk12:this.chk12,
      searchMotivo:this.searchMotivo,
      contactWarning : this.contactWarning,
      tefContactWarning : this.tefContactWarning
    })
   }
}
