const IDTERMS = 1;
export interface IModuleMain {
	id: any;
	name: any;
	path: any;
}

export interface IMenuMain {
	id: any;
	action: any;
}

export interface IMainUser {
	href: any;
	id: any;
	relatedParty: IRealtedParty;
	role: Array<any>;
	token: any;
	pass: any;
}
export interface IRealtedParty {
	description: any;
	email: any;
	href: any;
	id: any;
	legalId: Array<ILegalId>;
	name: any;
}
export interface ILegalId {
	country: any;
	legalEntity: any;
	nationalID: any;
	nationalIDType: any;
}
export interface IViewMain {
	entitlement: IViewModule[];
	href: any;
	id: any;
	involvementRole: any;
	relatedEntity: [];
}

export interface IViewModule {
	action: any;
	description: any;
	id: any;
	manageableAsset: IViewMenu[];
	platform: any;
}

export interface IViewMenu {
	action: any;
	endDate: any;
	entityType: any;
	href: any;
	id: any;
	reference: any;
	startDate: any;
}

export interface ISection {
	id: any;
	numSection: any;
	typeSection: any;
	titleSection: any;
}
export interface ISurveyList {
	idSurvey: any;
	codeSurvey: any;
	codeClass: any;
	endPoint: any;
	createdAt: any;
	createdBy: any;
}

export interface IQuestion {
	questionType: any;
	question: any;
	icon: any;
	priority: any;
}

export interface IAction {
	typeAction: any;
	name: any;
	redirectTo: any;
	priority: any;
}
export interface IDevice {
	browser: any;
	browser_version: any;
	device: any;
	os: any;
	os_version: any;
	userAgent: any;
}

export interface IRequestUser {
	id: any;
	status: any;
	name: any;
	last_name_1: any;
	last_name_2: any;
	mail: any;
	new_pwd: any;
	pwd: any;
	type: any;
	created_by: any;
	updated_by: any;
}
export interface IRequestReset {
	password_x: any;
	newPassword_x: any;
	confirmPassword_x: any;
}
export interface ILoginSession {
	userObject: any;
	isLoginTerms: any;
	flagReset: any;
	status: any;
}

export interface IParameter {
	code: any;
	father: any;
	son: any;
	description: any;
	value1: any;
	value2: any;
	value3: any;
	status: any;
	startDate: any;
}

export interface ITercero {
	id?: number;
	activity: string;
	birthdate: string;
	codeCompany: string;
	gender: string;
	lastName1: string;
	lastName2: string;
	mail: string;
	name: string;
	nationalId: string;
	coronaStatus: number;
	statusDetail: string;
	idCompany?: number;
	updatedAt?: string
}

export interface ISintomas {
	id: number;
	description: string;
	icon: string;
	option?: boolean;
	touched?: boolean;
}

export interface ITransport {
	id: number;
	description: string;
	icon: string;
	type: boolean;
}

export interface ICompany {
	id: any;
	status: any;
	code: any;
	name: any;
}

export interface IOptionList {
	id: string;
	code: string;
	value: string;
	selected: boolean;
}

export interface IAnswerSurveyHealth {
	id: string;
	type: string;
	optionList: Array<IOptionList>;
}

export interface IQuestionSurveyHealth {
	id: string;
	code: string;
	description: string;
	answer: Array<IAnswerSurveyHealth>;
}

export interface ISurveyHealth {
	id: string;
	title: string;
	description: string;
	questions: Array<IQuestionSurveyHealth>
}

export interface IGetEntryPass {
	userId: string;
	pass: boolean;
	token: string;
	status: string;
	startDate: string;
	endDate: string;
	entryPass: {
		contactCoronavirus: boolean;
		employee: {
			employeeId: string;
			name: string;
			nationalType: string;
			nationalId: string;
			company: string;
		};
		location: {
			city: string;
			campus: string;
			floor: string;
			transport: {
				code: string;
			};
			
		};
		symptoms: Array<any>;
			affidavit: {
				confirm: boolean;
				signature: {
					image: string;
				}
			}
	};
	description: string;
	additionalData: Array<any>;

}