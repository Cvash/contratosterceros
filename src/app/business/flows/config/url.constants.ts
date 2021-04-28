import * as Envi from '../../../../environments/environment';
// NO CAMBIAR.AMBIENTE PROD
const MAIN_URL_PROD = 'https://rhdigitalbackprod.azurewebsites.net';
// NO CAMBIAR AMBIENTE QAS
const MAIN_URL_QAS = 'https://rhdigitalback-dev.azurewebsites.net';
// CONEXIÓN MODULO DE SEGURIDAD
const MAIN_URL_LOCAL_SEGURIDAD = 'http://localhost:8087';
const MAIN_URL_LOCAL_ROLES = 'http://localhost:8088';
const MAIN_URL_LOCAL_PARAMETER = "http://localhost:8082";
const MAIN_URL_LOCAL_OFFICE = "http://localhost:8089";
//  AMBIENTE LOCAL
const MAIN_URL_LOCAL = 'http://localhost:8084';
/* const MAIN_URL_LOCAL_PYTHON = MAIN_URL_QAS; */
const MAIN_URL_LOCAL_PYTHON = 'http://localhost:5000'
/* const MAIN_URL_SURVEY="http://localhost:8080";*/
 const MAIN_URL_SURVEY="http://localhost:8080";
//  GENERAL URL AQUI CAMBIAR
/* const MAIN_URL =Envi.environment.OAUTH_UR;
const MAIN_URL_ROLE= Envi.environment.OAUTH_UR;
const MAIN_URL_PARAMETER=Envi.environment.OAUTH_UR;
const MAIN_URL_OFFICE=Envi.environment.OAUTH_UR; */
const MAIN_URL_OFFICE=MAIN_URL_LOCAL_OFFICE;
const MAIN_URL = MAIN_URL_LOCAL_SEGURIDAD;
const MAIN_URL_ROLE = MAIN_URL_LOCAL_ROLES;
const MAIN_URL_PARAMETER = MAIN_URL_LOCAL_PARAMETER;
// const MAIN_URL_SURVEY = 'https://surveymoduleprod.azurewebsites.net';
// const MAIN_URL_SURVEY = 'https://surveymoduleprod.azurewebsites.net';
// LOGIN
export const URL_POST_LOGIN = MAIN_URL + '/hrmanagement/v1/login';
export const URL_GET_ROL = MAIN_URL_ROLE + '/HRManagement/usersandroles/v1/role';
export const URL_POST_TOKEN = MAIN_URL + '/hrmanagement/v1/token';
export const URL_GET_VALIDATE_TOKEN = MAIN_URL + '/hrmanagement/v1/session/validate/';
export const URL_POST_LOGOUT = MAIN_URL + '/hrmanagement/v1/logout';
export const API_GET_DATA_TOKEN = MAIN_URL + '/hrmanagement/v1/token/validate/';
// CHANGE PASSWORD
export const API_PUT_USER_DATA = MAIN_URL_LOCAL_PYTHON + '/user/updateData';
export const API_PUT_RESET_PASSWORD = MAIN_URL_LOCAL_PYTHON + '/resetPwd';
export const API_TER_GET_TERMS_CONDITION = MAIN_URL_LOCAL_PYTHON + '/terms/showTermsCondition';
export const API_TER_GET_TERMS_USER = MAIN_URL_LOCAL_PYTHON + '/terms/userTermsCondition';
// SESSION
export const URL_POST_SESSION = MAIN_URL_LOCAL + '/login';
//  INVOICE
export const URL_PROCESS_EXCEL = MAIN_URL_LOCAL + '/invoiceservice/v1/invoice/';
// BENEFITS
export const URL_GET_BENEFITS = MAIN_URL_QAS + '/getBenefits';
export const URL_PUT_BENEFITS = MAIN_URL_QAS + '/updateBenefit';
export const URL_POST_BENEFITS = MAIN_URL_QAS + '/createBenefit';
export const URL_GET_PARTNER = MAIN_URL_QAS + '/getPartners';
export const URL_PUT_PARTNER = MAIN_URL_QAS + '/updatePartner';
export const URL_POST_PARTNER = MAIN_URL_QAS + '/createPartner';
// SURVEY
export const API_GET_ALL_SURVEY = MAIN_URL_SURVEY + '/survey/retrieveAllSurveyWeb';
export const API_POST_CONFIG_SURVEY = MAIN_URL_SURVEY + '/survey/configSurvey';
export const API_GET_ALL_SURVEY_ROLE = MAIN_URL_SURVEY + '/survey/retrieveAllSurveyRole';
export const API_DELETE_SURVEY = MAIN_URL_SURVEY + '/survey/disabledSurvey';
export const API_DELETE_SURVEY_ROLE = MAIN_URL_SURVEY + '/survey/disabledSurveyRole';
export const API_GET_COMBO_BOX = MAIN_URL_SURVEY + '/survey/getComboData';
export const API_PUT_SURVEY_ROLE = MAIN_URL_SURVEY + '/survey/update';
export const API_GET_BY_SURVEY_ROLE = MAIN_URL_SURVEY + '/survey/getSurveyRole';
// OFFICE RETURN
export const API_POST_CHECKINTOUT = MAIN_URL_OFFICE + "/returnOfficeManagement/v1/officeCheckIn-Out";
export const API_ENTRYPASS = MAIN_URL_OFFICE + "/returnOfficeManagement/v1/entryPass";
export const API_GET_HEALTH_SURVEY = MAIN_URL_OFFICE + "/returnOfficeManagement/v1/survey";
export const API_POST_REPORT_SYMP = MAIN_URL_OFFICE + "/returnOfficeManagement/v1/symptoms";
// PARAMETER
export const API_GET_PARAMETER = MAIN_URL_PARAMETER + "/hrmanagement/v1/util/parameters";
// BACKEND PYTHON URL SIN AD
export const API_TER_REPORT_MODULE = MAIN_URL_LOCAL_PYTHON + "/terceros/reportGeneralTer";
export const API_POST_FAKE_LOGIN = MAIN_URL_LOCAL_PYTHON + "/fakeSession";
export const API_TER_MNG_TDP_POST = MAIN_URL_LOCAL_PYTHON + "/findEmployeeData";
export const API_TER_COMPANY_SERVICES = MAIN_URL_LOCAL_PYTHON + "/companyservices/";
export const API_TER_GET_COMPANYSERVICE_DESCRIPTION = MAIN_URL + "/findCompanyServiceDescription"; // deprecado
export const API_TER_GET_COMPANYSERVICE = MAIN_URL_LOCAL_PYTHON + "/findCompanyService";// deprecado
export const API_TER_POST_ADD_USERSERVICE = MAIN_URL_LOCAL_PYTHON + "/addUserService";
export const API_TER_COMPANY_SERVICE = MAIN_URL_LOCAL_PYTHON + "/companyservice";
export const API_TER_GET_COMPANY=MAIN_URL_LOCAL_PYTHON + "/company";
export const API_TER_GET_VERIFY_EXIST = MAIN_URL_LOCAL_PYTHON + "/supplier";
export const API_TER_SUPPLIER = MAIN_URL_LOCAL_PYTHON + "/supplier";
export const API_TER_SUPPLIERS = MAIN_URL_LOCAL_PYTHON + "/suppliers";
export const API_TER_POST_SUPPLIERS_ADMIN = MAIN_URL_LOCAL_PYTHON + "/suppliersAdmin";
export const API_TER_POST_ADDNEW_GESTOR_SERVICE=MAIN_URL_LOCAL_PYTHON+"/supService";
export const API_TER_SUPPLIER_DELETE = MAIN_URL_LOCAL_PYTHON + "/disabledsupplier";
export const API_TER_GET_COMPANYSERVICE_SUPP_GESTOR = MAIN_URL_LOCAL_PYTHON + "/findCompanyServiceSuppGestor";
export const API_TER_SUPPLIER_UPDATESTATUS = MAIN_URL_LOCAL_PYTHON + "/supplierstatus";
export const API_TER_POST_FINDMASSIVE_SUPPLIER=MAIN_URL_LOCAL_PYTHON + "/supServiceMassive";
// corona form
export const API_SAVE_CORONA_DOCUMENT = MAIN_URL_LOCAL_PYTHON + "/saveCoronaDocument";
export const API_GET_CORONAVIRUS_EDIT_FORM = MAIN_URL_LOCAL_PYTHON + "/searchByEmployeeEditForm";
export const API_POST_CORONAVIRUS_REQUEST = MAIN_URL_LOCAL_PYTHON + "/register_corona_request";
export const API_GET_DISABLED_ACCESS = MAIN_URL_LOCAL_PYTHON + "/qallarix/removeAccessEmployee";
export const API_POST_CORONAVIRUS_CBO = MAIN_URL_LOCAL_PYTHON + "/loadDataCboCoronaVirus";
export const API_GET_CORONAVIRUS_PRECONDITION_EDIT =
MAIN_URL_LOCAL_PYTHON + "/searchByIdEmployeeCoronaRequest"; // deprecado
export const API_CORONA_SEARCHEMPLOYEES =
MAIN_URL_LOCAL_PYTHON  + "/coronavirus/searchemployees";
export const API_CORONA_REQUESTDETAIL = MAIN_URL_LOCAL_PYTHON + "/coronavirus/requestdetail";
export const API_SAVE_MASSIVE_DATA_REQUEST =
MAIN_URL_LOCAL_PYTHON + "/saveMassiveCoronaRequestFromExcel";
export const API_GENERAL_REPORT = MAIN_URL_LOCAL_PYTHON + "/report/generalReportCoronavirus";
export const API_ASSIST_REPORT = MAIN_URL_LOCAL_PYTHON + "/report/assistReportCoronavirus";
export const API_CRONICA_REPORT = MAIN_URL_LOCAL_PYTHON + "/report/cronicaReportCoronavirus";
export const API_REQUEST_DETAILS_REPORT = MAIN_URL_LOCAL_PYTHON + "/report/cronicaDetailsReportCoronavirus";
export const API_DOWNLOAD_FILEAZURE_ZIP = MAIN_URL_LOCAL_PYTHON + "/downloadZipDocumentService";
export const API_GET_ALL_SURVEY_P= MAIN_URL_LOCAL_PYTHON +"/survey/getAllSurvey";
export const API_GET_RESERVATION = MAIN_URL_LOCAL_PYTHON +"/reservation/starterdata";
export const API_SAVE_MASSIVE_DATA = MAIN_URL_LOCAL_PYTHON + "/saveMassiveFromExcel";
export const API_POST_CORONAVIRUS_ASSIT_DATE = MAIN_URL_LOCAL_PYTHON + "/showDataAssistManagementTDPByDate";
export const API_DELETE_REMOVE_ASSIST = MAIN_URL_LOCAL_PYTHON + "/removeCoronaChecking";
export const API_GET_CORONAVIRUS_ASSIST = MAIN_URL_LOCAL_PYTHON + "/showDataAssistManagementTDP";
// End Point JAVA
/* export const REPORT_BP_JAVA="https://qallarix-bt-qa.azurewebsites.net/report/download";
 export const REPORT_SURVEY_JAVA="https://qallarix-bt-qa.azurewebsites.net/report/download/survey";
export const REPORT_RESERVATION_JAVA="https://qallarix-bt-qa.azurewebsites.net/report/download/reservation";*/
export const REPORT_BP_JAVA="https://btqallarix.azurewebsites.net/report/download";
export const REPORT_SURVEY_JAVA="https://btqallarix.azurewebsites.net/report/download/survey"; 
export const REPORT_RESERVATION_JAVA="https://btqallarix.azurewebsites.net/report/download/reservation";
// MAILING
export const API_SEND_MAIL = MAIN_URL_LOCAL_PYTHON + "/sendmail";
export const API_MAIL_CHECK_STATUS = MAIN_URL_LOCAL_PYTHON + "/current_status/";
export const API_GET_TEMPLATE = MAIN_URL_LOCAL_PYTHON + "/template/";
export const API_TEMPLATES = MAIN_URL_LOCAL_PYTHON + "/templates";
export const API_MAIL_SENTS = MAIN_URL_LOCAL_PYTHON + "/sents"; 
export const API_GET_SECTION = MAIN_URL_LOCAL_PYTHON + "/section/"; // DEPRECADO
export const API_SECTIONS = MAIN_URL_LOCAL_PYTHON + "/sections"; // DEPRECADO
export const API_MAIL_SENTDETAILS = MAIN_URL_LOCAL_PYTHON + "/sent/";
export const API_SENTDETAILS_ATTACHMENT = MAIN_URL_LOCAL_PYTHON + "/attachments/";
export const API_UPLOAD_FILE_BACKEND = MAIN_URL_LOCAL_PYTHON + "/mailing_atach_file";
export const API_SESSION_ATTACHS = MAIN_URL_LOCAL_PYTHON + "/session_attachments";
export const API_DELETE_ATTACHS = MAIN_URL_LOCAL_PYTHON + "/remove_attachments";
// AZURE
export const API_UPLOAD_FILE_AZURE = MAIN_URL_LOCAL_PYTHON + "/upload_file";
// DOCUMENTS
export const API_DOC_DOCUMENT = MAIN_URL_LOCAL_PYTHON + "/gendocument/"; // deprecado
export const API_DOC_DOCUMENTS = MAIN_URL_LOCAL_PYTHON + "/gendocuments";
export const API_DOC_DOCUMENT_DETAIL = MAIN_URL_LOCAL_PYTHON + "/gendocumentdetail/"; // deprecado
export const API_DOC_DOCUMENT_DETAILS = MAIN_URL_LOCAL_PYTHON + "/gendocumentdetails"; // deprecado
export const API_DOC_DOCUMENT_TEMPLATE = MAIN_URL_LOCAL_PYTHON + "/gendocumenttemplate/";
export const API_DOC_DOCUMENT_TEMPLATES = MAIN_URL_LOCAL_PYTHON + "/gendocumenttemplates";
export const API_DOCUMENT_GENERATION = MAIN_URL_LOCAL_PYTHON + "/gendoc";
export const API_DOCUMENT_PREVIEW = MAIN_URL_LOCAL_PYTHON + "/genprev";
export const API_GET_FIND_BY_STATUS = MAIN_URL_LOCAL_PYTHON + "/searchByStatusEmployee";
