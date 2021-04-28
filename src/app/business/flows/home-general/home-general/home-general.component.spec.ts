import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HomeGeneralComponent } from './home-general.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IMainUser } from '../../../../business/models/IModel-module';
import { of } from 'rxjs';

describe('HomeGeneralComponent', () => {
	let component: HomeGeneralComponent;
	let fixture: ComponentFixture<HomeGeneralComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule,
				RouterModule.forRoot([
					{
						path: '',
						component: HomeGeneralComponent
					}
				])
			],
			declarations: [HomeGeneralComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeGeneralComponent);
		component = fixture.componentInstance;
	});
	afterEach(()=>{
		localStorage.clear();
	})
	it('when component is created',()=>{
		expect(component).toBeTruthy();
		fixture.detectChanges();
		
	});
	it('when init constructor',()=>{
		fixture.detectChanges();
		expect(component.entitlement).toEqual(null);
		expect(component.user).toEqual(null);
	})

	it('when execute ngOnInit method',fakeAsync(()=>{
		let user:IMainUser;
		user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
		
		const module:any=[
			{
			  id: '7',
			  description: 'CORONAVIRUS',
			  platform: 'App Web',
			  action: 'coronavirus$fa fa-user-md',
			  manageableAsset: [
				{
				  id: '28',
				  href: '/coronavirus/home',
				  reference: null,
				  entityType: 'CORONA_HOME',
				  action: 'R',
				  startDate: '2020-10-21T18:11:35',
				  endDate: null
				}
			  ]
			},
			{
			  id: '8',
			  description: 'TERCEROS',
			  platform: 'App Web',
			  action: 'terceros$fa fa-users',
			  manageableAsset: [
				{
				  id: '42',
				  href: '/terceros/empresas',
				  reference: null,
				  entityType: '3ROS_TDPADM',
				  action: 'R&W',
				  startDate: '2020-10-21T18:11:35',
				  endDate: null
				}
			  ]
			}
		  ];
		  localStorage.setItem("user",JSON.stringify(user));
		  localStorage.setItem("modules",JSON.stringify(module));
		  tick(2000);
		  component.initVariable();
		  tick(2000);
		  component.redirectToFirstPage();
		  tick(4000);
		  expect(component.entitlement).not.toEqual(null);
		  tick(1000);
		  flush();
	}))

	it('when execute validateSession',fakeAsync(()=>{ 
		let user:IMainUser;
		user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
		
		const spyLogout=spyOn(component,'validateSession').withArgs(user).and.callThrough();
		component.validateSession(user);
		expect(spyLogout).toHaveBeenCalled();
		tick(1000)
		flush();
	}))
});
