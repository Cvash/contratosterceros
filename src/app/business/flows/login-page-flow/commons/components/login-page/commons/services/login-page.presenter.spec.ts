import { LoginPageFormPresenter } from './login-page-presenter';
import { equal } from 'assert';
describe(LoginPageFormPresenter.name, () => {
	let presenter: LoginPageFormPresenter;

	beforeEach(() => {
		presenter = new LoginPageFormPresenter();
	});

	describe('Set User & Password', () => {
		it('when a user enters it', () => {
			const user = 'TDP';
			const pass = '12345';

			presenter.username.setValue(user);
			presenter.password.setValue(pass);
			expect(equal(presenter.username.value, user));
			expect(equal(presenter.password.value, pass));
		});

		it('when form is valid', () => {
			const user = 'TDP';
			const pass = '12345';
			presenter.username.setValue(user);
			presenter.password.setValue(pass);

			expect(presenter.loginForm.valid).toBeTruthy;
		});

		it('when form is invalid', () => {
			const user = 'TDP';
			const pass = '';
			presenter.username.setValue(user);
			presenter.password.setValue(pass);

			expect(presenter.loginForm.valid).toBeTruthy;
		});
	});
});
