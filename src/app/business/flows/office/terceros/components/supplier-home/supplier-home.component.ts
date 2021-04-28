import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMainUser, IViewModule } from '../../../../../../../app/business/models/IModel-module';
import { AuthServiceService } from '../../../../../../../app/commons/services/auth-service.service';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss']
})
export class SupplierHomeComponent implements OnInit {
  user:IMainUser=null;
  moduleList: Array<IViewModule>=[];
  constructor(private router:Router,
    public auth:AuthServiceService) { }

  activePass(){
    this.router.navigate(['/terceros/mypass']);
  }
  generatePass(){
    this.router.navigate(['/terceros/form']);
  }
  symptoms(){
    this.router.navigate(['/terceros/sintomas']);
  }
  validateAccess:any;
  ngOnInit() {
     this.user=JSON.parse(localStorage.getItem("user"));
     this.moduleList=JSON.parse(localStorage.getItem("modules"));
     this.auth.validateMenu("TERCEROS","/terceros/home",this.user,this.moduleList);
  }
  ngAfterViewInit(): void {
		this.auth.executeValidateSession(this.user);
  }
}
