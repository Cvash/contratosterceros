import { Component, OnInit,AfterViewInit } from '@angular/core';
import { IMainUser, IViewModule } from '../../../../business/models/IModel-module';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../../commons/services/auth-service.service';
@Component({
	selector:'app-home-general',
	templateUrl: './home-general.component.html',
	styleUrls:['./home-general.component.scss']
})
export class HomeGeneralComponent implements OnInit,AfterViewInit {
	user: IMainUser;
	entitlement: Array<IViewModule>;
	constructor(private router: Router,private auth:AuthServiceService) {
		this.initVariable();
	}
	initVariable(){ 
		this.entitlement=JSON.parse(localStorage.getItem('modules'));
		this.user=JSON.parse(localStorage.getItem("user"));
	}
	ngOnInit(): void {
		this.validateSession(this.user);
	}
	ngAfterViewInit(): void {
		this.redirectToFirstPage();
	}
	validateSession(user:any){
		this.auth.executeValidateSession(user);
	}
	redirectToFirstPage(){
		setTimeout(() => {
			if (this.entitlement !== null) {
				if (this.entitlement.length === 1) {
					this.router.navigateByUrl(this.entitlement[0].manageableAsset[0].href);
				}
			}
		}, 10);
	}
}
