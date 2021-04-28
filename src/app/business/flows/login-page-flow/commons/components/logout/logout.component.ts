import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthServiceService } from '../../../../../../commons/services/auth-service.service';
import { IMainUser, IRealtedParty } from '../../../../../../business/models/IModel-module';
import { MatDialog } from '@angular/material/dialog';
import { MyProfileComponent } from '../../../../../../commons/components/header/my-profile/my-profile.component';
import { ChangePasswordComponent } from '../../../../../../commons/components/header/change-password/change-password.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
	emp: IRealtedParty=null;
	user: IMainUser=null;
  constructor(private auth:AuthServiceService,
    public dialog:MatDialog) {
      
     }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user!=null){
      this.emp = this.user.relatedParty;
    } 

  }

  // destruye el local storage
	logout() {
		this.blockUI.start('Saliendo del sistema..');
		setTimeout(() => {
			this.auth.executeLogOut(this.user);
		}, 2000);
	}
	showMyProfile() {
		this.dialog.open(MyProfileComponent, {
			maxWidth: '90vw',
			maxHeight: '95vh',
			height: '95%',
			width: '95%',
			disableClose: true
		});
	}
	showChangePassword() {
		this.dialog.open(ChangePasswordComponent, {
			maxWidth: '85vw',
			width: '85%',
			disableClose: true,
			autoFocus: true,
			hasBackdrop: true
		});
	}

}
