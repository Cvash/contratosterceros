import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMainUser } from 'src/app/business/models/IModel-module';
import { EmbDialogVerDatosEmbajadorComponent } from './emb-dialog-ver-datos-embajador.component';

describe('EmbDialogVerDatosEmbajadorComponent', () => {
  let component: EmbDialogVerDatosEmbajadorComponent;
  let fixture: ComponentFixture<EmbDialogVerDatosEmbajadorComponent>;
  let user:IMainUser;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogVerDatosEmbajadorComponent ],
      providers:[
        {
          provide:MAT_DIALOG_DATA,
          useValue:{}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogVerDatosEmbajadorComponent);
    component = fixture.componentInstance;
  });
  beforeEach(()=>{ 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
  })
  afterEach(()=>{
    localStorage.clear();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when execute script dialog ver datos',fakeAsync(()=>{ 
    component.data={
      "user":user
    };
    tick(2000);
    flush();
    component.ngOnInit();
  }))
});
