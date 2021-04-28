import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IMainUser, IViewModule } from '../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { MockSwal } from '../../../office/terceros/components/supplier-report-symp/supplier-report-symp.component.spec';
import { DocumentHomeComponent } from './document-home.component';
export class dialogMockDocumentHome{
  open(){
    return {
      afterClosed:()=>of({
        "template":{
          body:"<p style='text-align: right; '><img src='data:image/png;base64,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'><br></p><p class='MsoNormal' align='center' style='text-align: center;'><span style='font-weight: 700;'><span style='font-size: 18pt; line-height: 25.68px; font-family: Arial, sans-serif;'>Checklist de Documentos<o:p></o:p></span></span></p><p class='MsoNormal' style='text-align: justify;'><span style='font-size: 18pt; line-height: 25.68px; font-family: Arial, sans-serif;'><o:p>&nbsp;</o:p></span></p><p class='MsoNormal' style='text-align:justify;line-height:150%'><span style='font-size:12.0pt;line-height:150%;font-family:&quot;Arial&quot;,sans-serif'>Yo @NombreApellido"+
"con @CIP confirmo que en el día registrado en el sistema “Keynua” en Enero del"+
"2021, he firmado y aceptado electrónicamente los siguientes documentos:<o:p></o:p></span></p><br><br><br><br>@case*[[@Decision],<br>[<ol><li><font face='Arial' size='5'>FULL</font></li></ol><p><font face='Arial' size='3'><br></font></p><p><font face='Arial' size='3'><br></font></p><p><font face='Arial' size='3'><br></font></p><p><font face='Arial' size='3'><br></font></p>],<br>[1:     <ol><li><font face='Arial' size='5'>@MutuoDisenso</font></li><li><font face='Arial' size='5'>@Anexos</font></li></ol>],<br>[2:   <ol><li><font face='Arial' size='5'>@MutuoDisenso</font></li><li><font face='Arial' size='5'>@GE</font></li><li><font face='Arial' size='5'>@Anexos</font></li></ol>]<br>]]*<br><br><br><br><br><p><br></p><p><br></p><p><br></p><p><br></p><p class='MsoNormal'><span style='font-size:12.0pt;line-height:107%;font-family:"+
"&quot;Arial&quot;,&quot;sans-serif&quot;'>_________________________<o:p></o:p></span></p><p class='MsoNormal' style='line-height:115%'><span lang='ES' style='font-size:"+
"12.0pt;line-height:115%;font-family:&quot;Arial&quot;,&quot;sans-serif&quot;;mso-ansi-language:"+
"ES'>@NombreApellido<o:p></o:p></span></p>",
          cc:'',
          cco:'',
          id:0,
          subject:'',
          title:''
        },
        condition:true
      })
    }
  }
}
describe('DocumentHomeComponent', () => {
  let component: DocumentHomeComponent;
  let fixture: ComponentFixture<DocumentHomeComponent>;
  let user:IMainUser;
  let moduleList: Array<IViewModule>=[];
  let dialog:MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentHomeComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[{
        provide:MatDialog,
        useClass:dialogMockDocumentHome
      },
      {
        provide:Swal,
        useClass:MockSwal
      }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocumentHomeComponent);
    component = fixture.componentInstance;
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
    moduleList=[
      {
      action: "coronavirus$fa fa-user-md",
      description: "CORONAVIRUS",
      id: "7",
      platform:"Web Admin",
      manageableAsset:[
        {
          action: "R",
          endDate: null,
          entityType: "CORONA_HOME",
          href: "/coronavirus/home",
          id: "28",
          reference: null,
          startDate: "2020-10-21T18:11:35"
        },
        {
          action: "R",
          endDate: null,
          entityType: "CORONA_QR",
          href: "/coronavirus/admin",
          id: "33",
          reference: null,
          startDate: "2020-10-21T18:11:35"
        }
      ]
    }]
    localStorage.setItem("modules",JSON.stringify(moduleList));
    dialog=TestBed.inject(MatDialog);
  }));
  afterEach(async(()=>{
    localStorage.clear();
  }))
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.moduleList.length).toEqual(0);
    expect(component.sheetName).toContain("Hoja");
    expect(component.user).toEqual(null);
    expect(component.blockUI).toBeDefined();
    expect(component.editorConfig).not.toBeUndefined();
    expect(component.withCase).toEqual(false);
    expect(component.caseVariableCondition).toMatch("");
    expect(component.documentArray.length).toBeGreaterThanOrEqual(0);
    expect(component.inputfileExcel).toBeUndefined();
    expect(component.inputFileText).toContain("Ningún archivo");
    expect(component.hojaDatos.length).toEqual(0);
    expect(component.hojaHeaders.length).toEqual(0);
    expect(component.flagFileCharged).toEqual(false);
    expect(component.templateId).toEqual(0);
  });
  it('when execute script methods document home',fakeAsync(()=>{
    component.ngOnInit();
    expect(component.user.id).toMatch("2955");
    expect(component.homeForm.caseVariable.value).toMatch("");
    expect(component.homeForm.documentBody.value).toMatch("");
    expect(component.homeForm.documentFooter.value).toMatch("");
    expect(component.homeForm.title.value).toMatch("");

    spyOn(dialog,'open').and.callThrough();
    component.modalUserGuide();
    expect(dialog.open).toHaveBeenCalled();
    // test success
    component.clearInputXLSX(0);
    expect(component.inputFileText).toContain("archivo seleccionado.");
    expect(component.hojaHeaders.length).toEqual(0);
    expect(component.hojaDatos.length).toEqual(0);
    expect(component.flagFileCharged).toEqual(false);

    // test chargeExcelInputDataHome
    const headers=["Nombre", "Apellidos", "Dni", "Correo", "Filename", "Condition"];
    const jsonData=[{
      Apellidos: "mitta",
      Condition: 1,
      Correo: "ever.mitta@telefonica.com",
      Dni: 73078273,
      Filename: "tabler.JPG",
      Nombre: "ever"
    },
    {
      Apellidos: "rios",
      Condition: 2,
      Correo: "ericka.rios@telefonica.com",
      Dni: 22565898,
      Filename: "sonar.png",
      Nombre: "ericka"
    }]
  const filename="ejemplo.xlsx";
  component.chargeExcelInputDataHome(filename,jsonData,headers);
  expect(component.flagFileCharged).toEqual(true);
  expect(component.hojaHeaders.length).toEqual(6);

  const file= {
    target: {
        files: [new Blob(['UEsDBBQABgAIAAAAIQBi7p1oXgEAAJAEAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAIooAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACslMtOwzAQRfdI/EPkLUrcskAINe2CxxIqUT7AxJPGqmNbnmlp/56J+xBCoRVqN7ESz9x7MvHNaLJubbaCiMa7UgyLgcjAVV4bNy/Fx+wlvxcZknJaWe+gFBtAMRlfX41mmwCYcbfDUjRE4UFKrBpoFRY+gOOd2sdWEd/GuQyqWqg5yNvB4E5W3hE4yqnTEOPRE9RqaSl7XvPjLUkEiyJ73BZ2XqVQIVhTKWJSuXL6l0u+cyi4M9VgYwLeMIaQvQ7dzt8Gu743Hk00GrKpivSqWsaQayu/fFx8er8ojov0UPq6NhVoXy1bnkCBIYLS2ABQa4u0Fq0ybs99xD8Vo0zL8MIg3fsl4RMcxN8bZLqej5BkThgibSzgpceeRE85NyqCfqfIybg4wE/tYxx8bqbRB+QERfj/FPYR6brzwEIQycAhJH2H7eDI6Tt77NDlW4Pu8ZbpfzL+BgAA//8DAFBLAwQUAAYACAAAACEAtVUwI/QAAABMAgAACwAIAl9yZWxzLy5yZWxzIKIEAiigAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKySTU/DMAyG70j8h8j31d2QEEJLd0FIuyFUfoBJ3A+1jaMkG92/JxwQVBqDA0d/vX78ytvdPI3qyCH24jSsixIUOyO2d62Gl/pxdQcqJnKWRnGs4cQRdtX11faZR0p5KHa9jyqruKihS8nfI0bT8USxEM8uVxoJE6UchhY9mYFaxk1Z3mL4rgHVQlPtrYawtzeg6pPPm3/XlqbpDT+IOUzs0pkVyHNiZ9mufMhsIfX5GlVTaDlpsGKecjoieV9kbMDzRJu/E/18LU6cyFIiNBL4Ms9HxyWg9X9atDTxy515xDcJw6vI8MmCix+o3gEAAP//AwBQSwMEFAAGAAgAAAAhAOgidwFdAwAAMAgAAA8AAAB4bC93b3JrYm9vay54bWysVW1vmzwU/T5p/wHxnYJ5B5VOSQCt0jpVXdd9qTS5YIoXwMw2Tapq//25hpC+PZqybhGx8QuHc+491xx/2LaNdke4oKxLdHRk6RrpClbS7jbRv17mRqhrQuKuxA3rSKLfE6F/OHn/7njD+PqGsbUGAJ1I9FrKPjZNUdSkxeKI9aSDlYrxFksY8ltT9JzgUtSEyLYxbcvyzRbTTp8QYn4IBqsqWpCUFUNLOjmBcNJgCfRFTXsxo7XFIXAt5uuhNwrW9gBxQxsq70dQXWuL+PS2YxzfNCB7izxty+Hy4Y8saOz5TbD06lUtLTgTrJJHAG1OpF/pR5aJ0LMQbF/H4DAk1+Tkjqoc7llx/42s/D2W/wiGrL9GQ2Ct0SsxBO+NaN6em62fHFe0IVeTdTXc959xqzLV6FqDhcxKKkmZ6AEM2YY8m+BDvxxoA6u24zmWbp7s7XzOtZJUeGjkJRh5hofK8P3I9tROMMaikYR3WJIV6yT4cKfrbz03Yq9qBg7XLsjPgXIChQX+Aq3Q4iLGN+Icy1obeJPoq/j6qwD51z8YZtcpEWvJ+usntsSva+APjIkLpdYEuROl6f6ldGDG49l855JrcH+afoIEfMF3kA5Iermr1lOIN3K+dwWP0feHIAqtPLcDYxHZoeFmQWqEkecZyM7zwHLczHHDXyCG+3HB8CDrXaYVdKK7ypsvl87wdl5BVjzQ8pHGg7X7Gap/0cxrv5RgdaZdUbIRj55QQ237jXYl2yQ6MARR98+Hm3HxGy1lDaayAjCVNs19JPS2BsYIIV9VALcVs0R/yOx8tUCBawReuDDcNHWNyAsDY2l7vpdFfpjb9sjIfEJpPD2B2thr3ej4j+wHRnBKq4N1jLGu8Vi9gp+WaMzh/FSBmwIMrrpxY4QsO1I7yFZ+EnLswVsU2CHXWgRW5BpW5niGG0a2EbqObazc1M68IEuzpafSow7/+F8cgaPF4/mroljWmMtLjos1fIsuSLXEAvw0CQK+T8kuvXBpOUDRzVFuuCiyjOXSdw0vzR0vQOkq8/JHskp+9cYDKDTHpwmWAxSnqstxHKs2383uJ6tpYpemZ6UXX6Qq7runf7fxC6hvyIGb86sDN64+n12ejd74XwHmGGDVjrYw57Sc/AcAAP//AwBQSwMEFAAGAAgAAAAhAIE+lJfzAAAAugIAABoACAF4bC9fcmVscy93b3JrYm9vay54bWwucmVscyCiBAEooAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKxSTUvEMBC9C/6HMHebdhUR2XQvIuxV6w8IybQp2yYhM3703xsqul1Y1ksvA2+Gee/Nx3b3NQ7iAxP1wSuoihIEehNs7zsFb83zzQMIYu2tHoJHBRMS7Orrq+0LDppzE7k+ksgsnhQ45vgoJRmHo6YiRPS50oY0as4wdTJqc9Adyk1Z3su05ID6hFPsrYK0t7cgmilm5f+5Q9v2Bp+CeR/R8xkJSTwNeQDR6NQhK/jBRfYI8rz8Zk15zmvBo/oM5RyrSx6qNT18hnQgh8hHH38pknPlopm7Ve/hdEL7yim/2/Isy/TvZuTJx9XfAAAA//8DAFBLAwQUAAYACAAAACEAr0WKZ2IDAAA6CQAAGAAAAHhsL3dvcmtzaGVldHMvc2hlZXQxLnhtbJyW246jOBCG70fad0DccwzHKEkLQtD0xUijPcxcO+AkVgNmbSfp1qjffcomIUBrJbalJBiq+Kp+u1zO6um1rrQLZpzQZq07pq1ruCloSZrjWv/n79yIdI0L1JSoog1e62+Y60+bP76srpS98BPGQgNCw9f6SYh2aVm8OOEacZO2uAHLgbIaCbhlR4u3DKNSvVRXlmvbgVUj0ugdYcnmMOjhQAqc0eJc40Z0EIYrJCB/fiItv9PqYg6uRuzl3BoFrVtA7ElFxJuC6lpdLJ+PDWVoX4HuV8dDhfbK4OPCd3EPo55/iFSTglFOD8IEstXl/FF+bMUWKnrSR/2zMI5nMXwhcgEfKPdzKTl+z3IfsMUnYUEPk9PFlmdSrvVf9i5P83jrGHmU7AzPcTIjTXeRkdhxmsRBmmZR8q5vViWBFZaqNIYPaz1xlrmnW5uVqp8fBF/5YKwJtP8LV7gQGGI4uibLc0/pi3R8hkc2ELlykERUCHLBW1xVa30HSvm/KgYMIYDVRxiO79FyVdDfmbZHHG9p9ZOU4gQhYeOU+IDOlfiTXr9icjwJeOqDcFk5y/Itw7yAkoVUTNeXcQpaARR+tZrIvQclh1675O9M03P9MHLAX9tjLnIimbpWnLmg9T3yjdVRQIyiwPV6o0SmG/mOH/wPCqyXosD1RolnZ+Dd3oXr7d2Fa4aOHS/C+TLAUyUA1xvEDeZCrG5i1SpmSKDNitGrBrsLZo63SPYqZxn818LAikjfBJxhsjmUzWVjr6wL1EJxs6VDmzO2bYc2d2zLhrbF2LYbMcOxMR8aHzYLdPXiZBXPFgfOvThnoiAdGScStq6akHBhh5EbTjRkMgc1zT08mqgcsr2JyA79yGYkDypxvjxwfsibJJmOjJMctgslz3X9wI/iSfKZzGEsL57IG7L9ibwbun86kgebZb48cH7Im4RJR8ZgUpyekuf7QQDqJslnMoexPGdS+LshfMKG5iy3ymO2O31dM+224emtxawizQu0vX7cdXcZnC3l+cCeS6j2/rRIvEUWuUFohEkOp0Ue20a6S10jSpIscOH0SNLtu+raQ3qLjvgbYkfScK3CB9V0Q4jQdWXbhLGgrWzFqidRAe30fneC/ygYOoBtwmoeKBX3G3k09P96Nr8BAAD//wMAUEsDBBQABgAIAAAAIQCDTWzIVgcAAMggAAATAAAAeGwvdGhlbWUvdGhlbWUxLnhtbOxZW48bNRR+R+I/WPOe5jaTy6opyrVLu9tW3bSIR2/iZNz1jCPb2W2EKqHyxAsSEiBekHjjASGQQALxwo+p1IrLj+DYM8nYG4de2CJAu5FWGec7x8fnHH8+c3z1rYcJQ6dESMrTTlC9UgkQSSd8StN5J7g3HpVaAZIKp1PMeEo6wYrI4K1rb75xFe+pmCQEgXwq93AniJVa7JXLcgLDWF7hC5LCbzMuEqzgUczLU4HPQG/CyrVKpVFOME0DlOIE1I5BBk0Juj2b0QkJrq3VDxnMkSqpByZMHGnlJJexsNOTqkbIlewzgU4x6wQw05SfjclDFSCGpYIfOkHF/AXla1fLeC8XYmqHrCU3Mn+5XC4wPamZOcX8eDNpGEZho7vRbwBMbeOGzWFj2NjoMwA8mcBKM1tcnc1aP8yxFij76tE9aA7qVQdv6a9v2dyN9MfBG1CmP9zCj0Z98KKDN6AMH23ho167N3D1G1CGb2zhm5XuIGw6+g0oZjQ92UJXoka9v17tBjLjbN8Lb0fhqFnLlRcoyIZNdukpZjxVu3ItwQ+4GAFAAxlWNEVqtSAzPIE87mNGjwVFB3QeQ+ItcMolDFdqlVGlDv/1JzTfTETxHsGWtLYLLJFbQ9oeJCeCLlQnuAFaAwvy9Kefnjz+4cnjH5988MGTx9/mcxtVjtw+Tue23O9fffzHF++j377/8vdPPs2mPo+XNv7ZNx8++/mXv1IPKy5c8fSz75798N3Tzz/69etPPNq7Ah/b8DFNiES3yBm6yxNYoMd+cixeTmIcY+pI4Bh0e1QPVewAb60w8+F6xHXhfQEs4wNeXz5wbD2KxVJRz8w348QBHnLOelx4HXBTz2V5eLxM5/7JxdLG3cX41Dd3H6dOgIfLBdAr9ansx8Qx8w7DqcJzkhKF9G/8hBDP6t6l1PHrIZ0ILvlMoXcp6mHqdcmYHjuJVAjt0wTisvIZCKF2fHN4H/U48616QE5dJGwLzDzGjwlz3HgdLxVOfCrHOGG2ww+win1GHq3ExMYNpYJIzwnjaDglUvpkbgtYrxX0m8Aw/rAfslXiIoWiJz6dB5hzGzngJ/0YJwuvzTSNbezb8gRSFKM7XPngh9zdIfoZ4oDTneG+T4kT7ucTwT0gV9ukIkH0L0vhieV1wt39uGIzTHws0xWJw65dQb3Z0VvOndQ+IIThMzwlBN1722NBjy8cnxdG34iBVfaJL7FuYDdX9XNKJEGmrtmmyAMqnZQ9InO+w57D1TniWeE0wWKX5lsQdSd14ZTzUultNjmxgbcoFICQL16n3Jagw0ru4S6td2LsnF36WfrzdSWc+L3IHoN9+eBl9yXIkJeWAWJ/Yd+MMXMmKBJmjKHA8NEtiDjhL0T0uWrEll65mbtpizBAYeTUOwlNn1v8nCt7on+m7PEXMBdQ8PgV/51SZxel7J8rcHbh/oNlzQAv0zsETpJtzrqsai6rmuB/X9Xs2suXtcxlLXNZy/jevl5LLVOUL1DZFF0e0/NJdrZ8ZpSxI7Vi5ECaro+EN5rpCAZNO8r0JDctwEUMX/MGk4ObC2xkkODqHarioxgvoDVUNc3OucxVzyVacAkdIzNsmqnknG7Td1omh3yadTqrVd3VzFwosSrGK9FmHLpUKkM3mkX3bqPe9EPnpsu6NkDLvowR1mSuEXWPEc31IEThr4wwK7sQK9oeK1pa/TpU6yhuXAGmbaICr9wIXtQ7QRRmHWRoxkF5PtVxyprJ6+jq4FxopHc5k9kZACX2OgOKSLe1rTuXp1eXpdoLRNoxwko31wgrDWN4Ec6z0265X2Ss20VIHfO0K9a7oTCj2XodsdYkco4bWGozBUvRWSdo1CO4V5ngRSeYQccYviYLyB2p37owm8PFy0SJbMO/CrMshFQDLOPM4YZ0MjZIqCICMZp0Ar38TTaw1HCIsa1aA0L41xrXBlr5txkHQXeDTGYzMlF22K0R7ensERg+4wrvr0b81cFaki8h3Efx9Awds6W4iyHFomZVO3BKJVwcVDNvTinchG2IrMi/cwdTTrv2VZTJoWwcs0WM8xPFJvMMbkh0Y4552vjAesrXDA7dduHxXB+wf/vUff5RrT1nkWZxZjqsok9NP5m+vkPesqo4RB2rMuo279Sy4Lr2musgUb2nxHNO3Rc4ECzTiskc07TF2zSsOTsfdU27wILA8kRjh982Z4TXE6968oPc+azVB8S6rjSJby7N7VttfvwAyGMA94dLpqQJJdxZCwxFX3YDmdEGbJGHKq8R4RtaCtoJ3qtE3bBfi/qlSisalsJ6WCm1om691I2ienUYVSuDXu0RHCwqTqpRdmE/gisMtsqv7c341tV9sr6luTLhSZmbK/myMdxc3VdrztV9dg2PxvpmPkAUSOe9Rm3Urrd7jVK73h2VwkGvVWr3G73SoNFvDkaDftRqjx4F6NSAw269HzaGrVKj2u+XwkZFm99ql5phrdYNm93WMOw+yssYWHlGH7kvwL3Grmt/AgAA//8DAFBLAwQUAAYACAAAACEAmSZhZQwDAADFBwAADQAAAHhsL3N0eWxlcy54bWykVd1umzAUvp+0d0C+pwYasiQCqqYp2qStqtRO2q0DJrXmH2RMRjbtkfYUe7EdG2jo/tXcJPbxOd/5zi/JRSe4t6e6YUqmKDwLkEdloUomdyl6f5/7C+Q1hsiScCVpig60QRfZyxdJYw6c3j1QajyAkE2KHoypVxg3xQMVpDlTNZXwUiktiIGr3uGm1pSUjTUSHEdBMMeCMIl6hJUo/gdEEP2xrf1CiZoYtmWcmYPDQp4oVm92Ummy5UC1C2ek8LpwriOv06MTJ/3Fj2CFVo2qzBngYlVVrKC/0l3iJSbFEQmQn4cUxjiInsTe6WcizbCme2bLh7KkUtI0XqFaaVIUAVGbgtVHqT7J3D5BhQetLGk+e3vCQRIinCWF4kp7BkoHmXMSSQTtNa4IZ1vNrFpFBOOHXhxZgav2oCcY5N4KseXRs8mS1mr9xVdgLU535nw24JRxPklBL8gS6BVDtczh1RvO94caYpXQ1j1nePqn9k6TQxjFEwPsHGbJVukSxmhMvs1zL8oSTisDMWq2e7D/RtXwu1XGQKtlScnITknCbd5Gi+EA4RSU8zs7ah+qJ1F1lSdbkQvzpkwRDK3N+HiEQIZjj9dfAP9PRiHY/97II3XNDzet2FKdu0l23pzU5vJ4W7v4j/dLznZSUNuIQM8Z3GplaGHcpnFVx9Po+lhPDtPrqlPi7a3dADh2wGdShCcleCTv2e5N0WtWU73//k0WLVcwe44HpHbbMm6YtKwWbtTGkg52NzavfDSAZE0MfkoTcCm7YyO4V2O3nWuRR3aAUdKKtNzcPz6m6Hh+R0vWCtgPg9Yt2yvjIFJ0PL+1/RrOLWXambcNTDT8e61mKfpyvX613Fznkb8I1gt/dk5jfxmvN348u1pvNvkyiIKrr5Ode8LGdZ8IaN5wtmo47GU9BDuQvzvKUjS59PTdpALtKfdlNA8u4zDw8/Mg9GdzsvAX8/PYz+Mw2sxn6+s4jyfc42du5gCHYb/jLfl4ZZignMmxVmOFplIoElz/EgQeK4GP39/sBwAAAP//AwBQSwMEFAAGAAgAAAAhAA5BOWYrAQAAjQIAABQAAAB4bC9zaGFyZWRTdHJpbmdzLnhtbISSwUoDMRCG74LvsORusq0oIrtbpVLBg3jQB5juTrvBZBIz09K+vamiSCr0mO+fzP/PJM1s5121xcQ2UKsmulYVUh8GS+tWvb0uLm5UxQI0gAuErdojq1l3ftYwS5XvErdqFIm3xnA/ogfWISJlZRWSB8nHtDYcE8LAI6J4Z6Z1fW08WFJVHzYk2Te7bMh+bHD+C7qGbddI9xz8MmFjpGvMgXzT+4jO2SFwKTyQLdE8pIShpAJLh0k/vTyWCgeCpCOtSyEPNlgkQa4gxmpyWV9N62mtZSfHnrlU8lJLAfOytbcicCfocBXI9qD74I8Kk+3fQScb+ETlCPsBUftAAm4LdKpxTlCafQX6P0FJD4FK9p3gqOlPoFJYWIcE/s+jmvyduk8AAAD//wMAUEsDBBQABgAIAAAAIQCAX7q+3AAAAFEBAAAjAAAAeGwvd29ya3NoZWV0cy9fcmVscy9zaGVldDEueG1sLnJlbHOE0LFqAzEMBuC90Hcw2nu+dCglxJcMbSFDl5I+gLB1dya2dNhqyL19vRQaKHQUkr5faLe/5mQuVGoUdrDpejDEXkLkycHn6e3hGUxV5IBJmBysVGE/3N/tPiihtqU6x6WapnB1MKsuW2urnylj7WQhbp1RSkZtZZnsgv6ME9nHvn+y5bcBw41pjsFBOYYNmNO6tOT/bRnH6OlF/Fcm1j8i7NykkiKfG4plInWQMSaV7YxrIOqysGK6IB+UEo3C0WPnJf/Mv0top7xelQpjAjvs7M0jhm8AAAD//wMAUEsDBBQABgAIAAAAIQBMonFiRAEAAFkCAAARAAgBZG9jUHJvcHMvY29yZS54bWwgogQBKKAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMkl9LwzAUxd8Fv0PJe5umm26GtgOVPTkQrCi+heRuq7ZJSKLdvr3pn9XKfBDykntOfvfcS9LVoa6CLzC2VDJDJIpRAJIrUcpdhp6LdbhEgXVMClYpCRk6gkWr/PIi5ZpyZeDRKA3GlWADT5KWcp2hvXOaYmz5HmpmI++QXtwqUzPnr2aHNeMfbAc4ieNrXINjgjmGW2CoRyIakIKPSP1pqg4gOIYKapDOYhIR/ON1YGr754NOmTjr0h21n2mIO2UL3ouj+2DL0dg0TdTMuhg+P8Gvm4enbtSwlO2uOKA8FZxyA8wpk78rplI8KbTLq5h1G7/nbQni9jh4zuue08XuYSACH4T2sU/Ky+zuvlijPIkTEsb+LAqyoPMlJcu3tu2v922wvlAPzf9BJPMiiSm5ovHNhHgC5Ck++wz5NwAAAP//AwBQSwMEFAAGAAgAAAAhACcB7KWRAQAAFwMAABAACAFkb2NQcm9wcy9hcHAueG1sIKIEASigAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnJLBbtswDIbvA/YOhu6NnG4ohkBWUaQbctiwAEl752Q60SZLgsQYyd5mz7IXG22jibPt1BvJn/r1iaK6P7au6DBlG3wl5rNSFOhNqK3fVeJp++nmgygyga/BBY+VOGEW9/rtG7VOIWIii7lgC58rsSeKCymz2WMLecayZ6UJqQXiNO1kaBpr8DGYQ4ue5G1Z3kk8Evoa65t4NhSj46Kj15rWwfR8+Xl7igys1UOMzhogfqX+Yk0KOTRUfDwadEpORcV0GzSHZOmkSyWnqdoYcLhkY92Ay6jkpaBWCP3Q1mBT1qqjRYeGQiqy/cljuxXFN8jY41Sig2TBE2P1bWMyxC5mSnoVvkMuaizM71/OHFxQkvtGbQinR6axfa/nQwMH1429wcjDwjXp1pLD/LVZQ6L/gM+n4APDiH1BHa+c4g0P54v+sl6GNoI/sXCOPlv/Iz/FbXgEwpehXhfVZg8Ja/6H89DPBbXieSbXmyz34HdYv/T8K/Qr8DzuuZ7fzcp3Jf/upKbkZaP1HwAAAP//AwBQSwECLQAUAAYACAAAACEAYu6daF4BAACQBAAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQC1VTAj9AAAAEwCAAALAAAAAAAAAAAAAAAAAJcDAABfcmVscy8ucmVsc1BLAQItABQABgAIAAAAIQDoIncBXQMAADAIAAAPAAAAAAAAAAAAAAAAALwGAAB4bC93b3JrYm9vay54bWxQSwECLQAUAAYACAAAACEAgT6Ul/MAAAC6AgAAGgAAAAAAAAAAAAAAAABGCgAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHNQSwECLQAUAAYACAAAACEAr0WKZ2IDAAA6CQAAGAAAAAAAAAAAAAAAAAB5DAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sUEsBAi0AFAAGAAgAAAAhAINNbMhWBwAAyCAAABMAAAAAAAAAAAAAAAAAERAAAHhsL3RoZW1lL3RoZW1lMS54bWxQSwECLQAUAAYACAAAACEAmSZhZQwDAADFBwAADQAAAAAAAAAAAAAAAACYFwAAeGwvc3R5bGVzLnhtbFBLAQItABQABgAIAAAAIQAOQTlmKwEAAI0CAAAUAAAAAAAAAAAAAAAAAM8aAAB4bC9zaGFyZWRTdHJpbmdzLnhtbFBLAQItABQABgAIAAAAIQCAX7q+3AAAAFEBAAAjAAAAAAAAAAAAAAAAACwcAAB4bC93b3Jrc2hlZXRzL19yZWxzL3NoZWV0MS54bWwucmVsc1BLAQItABQABgAIAAAAIQBMonFiRAEAAFkCAAARAAAAAAAAAAAAAAAAAEkdAABkb2NQcm9wcy9jb3JlLnhtbFBLAQItABQABgAIAAAAIQAnAeylkQEAABcDAAAQAAAAAAAAAAAAAAAAAMQfAABkb2NQcm9wcy9hcHAueG1sUEsFBgAAAAALAAsA0QIAAIsiAAAAAA=='], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })]
    }
  }
  spyOn(Swal,'fire').and.callThrough();
  component.onFileChange(file);
  component.validateWorkBook(0,true,filename,jsonData,headers);
  component.onFileChange(file);
  component.validateWorkBook(0,false,null,null,null);
  expect(Swal.fire).toHaveBeenCalled();

  // getFormula
  const cadena ="<p style='text-align: right; '><img src='data:image/png;base64,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'><br></p><p class='MsoNormal' align='center' style='text-align: center;'><span style='font-weight: 700;'><span style='font-size: 18pt; line-height: 25.68px; font-family: Arial, sans-serif;'>Checklist de Documentos<o:p></o:p></span></span></p><p class='MsoNormal' style='text-align: justify;'><span style='font-size: 18pt; line-height: 25.68px; font-family: Arial, sans-serif;'><o:p>&nbsp;</o:p></span></p><p class='MsoNormal' style='text-align:justify;line-height:150%'><span style='font-size:12.0pt;line-height:150%;font-family:&quot;Arial&quot;,sans-serif'>Yo @NombreApellido"+
"con @CIP confirmo que en el día registrado en el sistema “Keynua” en Enero del"+
"2021, he firmado y aceptado electrónicamente los siguientes documentos:<o:p></o:p></span></p><br><br><br><br>@case*[[@Decision],<br>[<ol><li><font face='Arial' size='5'>FULL</font></li></ol><p><font face='Arial' size='3'><br></font></p><p><font face='Arial' size='3'><br></font></p><p><font face='Arial' size='3'><br></font></p><p><font face='Arial' size='3'><br></font></p>],<br>[1:     <ol><li><font face='Arial' size='5'>@MutuoDisenso</font></li><li><font face='Arial' size='5'>@Anexos</font></li></ol>],<br>[2:   <ol><li><font face='Arial' size='5'>@MutuoDisenso</font></li><li><font face='Arial' size='5'>@GE</font></li><li><font face='Arial' size='5'>@Anexos</font></li></ol>]<br>]]*<br><br><br><br><br><p><br></p><p><br></p><p><br></p><p><br></p><p class='MsoNormal'><span style='font-size:12.0pt;line-height:107%;font-family:"+
"&quot;Arial&quot;,&quot;sans-serif&quot;'>_________________________<o:p></o:p></span></p><p class='MsoNormal' style='line-height:115%'><span lang='ES' style='font-size:"+
"12.0pt;line-height:115%;font-family:&quot;Arial&quot;,&quot;sans-serif&quot;;mso-ansi-language:"+
"ES'>@NombreApellido<o:p></o:p></span></p>";
  component.getFormula(cadena);

  // activeCase
  component.activeCase();
  expect(component.withCase).toEqual(true);
  expect(component.editorConfig.minHeight).toMatch("200px");
  expect(component.editorConfig.height).toMatch("200px");
  // disableCase
  component.disableCase();
  expect(component.withCase).toEqual(false);
  expect(component.editorConfig.minHeight).toMatch("800px");
  expect(component.editorConfig.height).toMatch("800px");

  // getFomrulaFunction
  component.getFormulaFunction(cadena);
  expect(component.homeForm.caseVariable.value).toMatch("@Decision");

  component.selectTemplate();
  component.responseSelectTemplate(null);
  expect(dialog.open).toHaveBeenCalled();
  expect(Swal.fire).toHaveBeenCalled();

  // addCase
  component.addCase();
  expect(component.documentArray.length).toBeGreaterThanOrEqual(0);

  // dropCase
  component.dropCase(0);
  expect(component.documentArray.length).toEqual(5);

  // combineTemplatesStatus
  expect(component.combineTemplatesStatus()).toBeTruthy();
  
  // saveTemplate
  component.homeForm.title.setValue("");
  tick(1000);
  component.saveTemplate();
  flush();
  expect(Swal.fire).toHaveBeenCalled();

  component.homeForm.title.setValue("HOLA MUNDO");
  component.withCase=true;
  component.homeForm.templateId.setValue(0);
  tick(1000);
  component.saveTemplate();
  flush();
  component.responseMergeTemplate({status:1,message:"success"},"HOLA");
  expect(Swal.fire).toHaveBeenCalled();
  component.responseMergeTemplate({status:0,message:"error"},"error");
  expect(Swal.fire).toHaveBeenCalled();

  component.homeForm.title.setValue("HOLA MUNDO");
  component.withCase=true;
  component.homeForm.templateId.setValue(1);
  tick(1000);
  component.saveTemplate();
  flush();

  component.homeForm.title.setValue("HOLA MUNDO");
  component.withCase=false;
  component.homeForm.documentBody.setValue("");
  tick(1000);
  component.saveTemplate();
  flush();
  expect(Swal.fire).toHaveBeenCalled();

  component.changeTitle();
  expect(component.templateId).toEqual(0);

  component.showAvailables();
  expect(Swal.fire).toHaveBeenCalled();

  component.validateShowAvailables(0,null);
  expect(Swal.fire).toHaveBeenCalled();
  flush();
  // generate method
  component.flagFileCharged=true;
  component.homeForm.title.setValue("Probando template");
  flush();
  component.generate();
  expect(Swal.fire).toHaveBeenCalled();
  flush();

  component.homeForm.title.setValue("");
  flush();
  expect(Swal.fire).toHaveBeenCalled();
  flush();

  component.flagFileCharged=false;
  flush();
  expect(Swal.fire).toHaveBeenCalled();
  flush();
}));

    
});
