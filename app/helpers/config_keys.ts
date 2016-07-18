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
export {StoreKeys, SysMessages, Routes, PartialViews}