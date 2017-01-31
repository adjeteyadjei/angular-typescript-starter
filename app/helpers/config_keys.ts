class StoreKeys {
	static get CurrentUser() { return "currentUser" }
	static get LoginLocked() { return "loginLocked" }
	static get DataChanged() { return "dataChanged" }
}

class SysMessages {
	static get RecordSaved() { return "Record saved successfully." }
	static get RecordDeleted() { return "Record deleted successfully." }
	static get OperationError() { return "Error in performing operation. Check system logs for more details" }
	static get Unauthorized() { return "You are not authorized to perform this action." }
	static get BadGateway() { return "Error connecting to server. Please check your internet connection." }
	static get NotFound() { return "Not Found. The resource you requested can not be found." }
	static get NotAllowed() { return "Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource." }
}

class Routes {
	static get Login() { return "login" }
	static get UnAuthorized() { return "unauthorized" }
	static get Dashboard() { return "dashboard" }
	static get Reports() { return "reports" }
	static get ReportViewer() { return "reportViewer" }
	static get Settings() { return "settings" }
	static get GenericSettings() { return "settings.lookup" }
	static get Admin() { return "admin" }
	static get Users() { return "admin.users" }
	static get Roles() { return "admin.roles" }
	static get ChangePassword() { return "changePassword" }
}


class PartialViews{
	static get UserForm() { return "user_form" }	
	static get RoleForm() { return "role_form" }	
}


class AngularServices {
	static get Q() { return "$q" }
	static get Http() { return "$http" }
	static get State() { return "$state" }
	static get StateParams() { return "$stateParams" }
	static get UibModal() { return "$uibModal" }
	static get Scope() { return "$scope" }
	static get RootScope() { return "$rootScope" }
	static get UibModalInstance() { return "$uibModalInstance" }
	static get Location() { return "$location" }
	static get HotKeys() { return "hotkeys" }
}

class AppServices {
    static get BaseApi() { return "BASEAPI" }
    static get AuthService() { return "AuthService" }
    static get RequestInterceptor() { return "RequestInterceptor" }
    static get CustomerService() { return "CustomerService" }
    static get ProductService() { return "ProductService" }
    static get SupplierService() { return "SupplierService" }
    static get UserService() { return "UserService" }
    static get RoleService() { return "RoleService" }
    static get StockService() { return "StockService" }
    static get ReportsConfig() { return "ReportsConfig" }
    static get LookUpService() { return "LookUpService" }
    static get StatsService() { return "StatsService" }
}

class AppControllers {
    static get LoginCtrl() { return 'LoginCtrl' }
    static get UserProfileCtrl() { return 'UserProfileCtrl' }
    static get MainCtrl() { return 'MainCtrl' }
    static get DashboardCtrl() { return 'DashboardCtrl' }
    static get CustomerCtrl() { return 'CustomerCtrl' }
    static get SupplierCtrl() { return 'SupplierCtrl' }
    static get ProductCtrl() { return 'ProductCtrl' }
    static get SettingsCtrl() { return 'SettingsCtrl' }
    static get SettingCtrl() { return 'SettingCtrl' }
    static get UsersCtrl() { return 'UsersCtrl' }
    static get RolesCtrl() { return 'RolesCtrl' }
    static get ReportsCtrl() { return 'ReportsCtrl' }    
    static get ReportViewerCtrl() { return 'ReportViewerCtrl' }  
}



export {StoreKeys, SysMessages, Routes, PartialViews, AppServices, AngularServices, AppControllers}