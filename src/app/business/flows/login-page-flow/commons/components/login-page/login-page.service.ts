import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
	providedIn: 'root'
})
export class LoginPageService {
	loginForm: FormGroup;
	// document: FormControl = new FormControl('', [
	//   Validators.nullValidator,
	//   Validators.required,
	//   Validators.pattern(/^\d+$/),
	//   Validators.minLength(8),
	//   Validators.maxLength(8)
	// ]);

	password: FormControl = new FormControl('', [
		Validators.nullValidator,
		Validators.required,
		Validators.minLength(6)
	]);

	email: FormControl = new FormControl('', [
		Validators.required,
		Validators.nullValidator,
		Validators.minLength(10),
		Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
	]);

	captcha : FormControl = new FormControl(false);
	constructor(
	) {
		this.loginForm = new FormGroup({
			//document: this.document,
			password: this.password,
			email: this.email,
			captcha: this.captcha
		});
	}

	
	
}
