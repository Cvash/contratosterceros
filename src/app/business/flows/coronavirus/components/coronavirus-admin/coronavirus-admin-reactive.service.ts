import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusAdminReactiveService {
  coronavirusformAdmin:FormGroup;

  byemployeeinp : FormControl = new FormControl('') // cip,nombre,apellido,correo del empleado
  statusWork:FormControl = new FormControl(null); // situacion laboral
  typeWork: FormControl = new FormControl(null); // tipo de presencia
  healthPerson : FormControl = new FormControl(null); // estado de salud
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
  constructor() { 
    this.coronavirusformAdmin= new FormGroup({
      byemployeeinp:this.byemployeeinp,
      statusWork:this.statusWork,
      typeWork:this.typeWork,
      healthPerson:this.healthPerson,
      chk00:this.chk00,
      chk01:this.chk01,
      chk02:this.chk02,
      chk03:this.chk03,
      chk04:this.chk04,
      chk05:this.chk05,
      chk06:this.chk06,
      chk07:this.chk07,
      chk08:this.chk08,
      chk09:this.chk09,
      chk10:this.chk10,
      chk11:this.chk11,
      chk12:this.chk12,
      enfermedadesCronicas:this.enfermedadesCronicas,
      otherFactor:this.otherFactor
    })
  }
}
