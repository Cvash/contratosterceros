import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormHelper } from '../../../../../../../../commons/classes/reactive-form-helper';
@Injectable()
export class LoginPageFormPresenter {
	formItems = {
		username: {
			control: 'username',
			label: 'Usuario',
			errors: {
				required: 'Éste campo es requerido'
			}
		},
		password: {
			control: 'password',
			label: 'Password',
			minLength: 6,
			errors: {
				required: 'Éste campo es requerido',
				minlength: 'Debe contener como mínimo 6 Dígitos'
			}
		}
	};

	username: FormControl = new FormControl('admin', [
		Validators.nullValidator,
		Validators.required
	]);

	password: FormControl = new FormControl('123456789', [
		Validators.nullValidator,
		Validators.required,
		Validators.minLength(this.formItems.password.minLength)
	]);

	loginForm: FormGroup = new FormGroup({
		username: this.username,
		password: this.password
	});

	reactiveFormHelper = new ReactiveFormHelper(this.loginForm, this.formItems);

	isFormValid() {
		return this.loginForm.valid;
	}
	getErrors(controlName: string) {
		return this.reactiveFormHelper.getErrors(controlName);
	}
}
