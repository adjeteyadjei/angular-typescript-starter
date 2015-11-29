import {IAuthService, IChangePasswordParams} from "../authentication/auth_service"
import {MessageBox} from "../helpers/message_box"


class UserProfileCtrl {
	isLoading: boolean;
	
	static $inject = ["$state", "AuthService"];
	
	constructor(private $state: angular.ui.IStateService,
		private authService: IAuthService) { }
	
	changePassword(params: IChangePasswordParams){
		this.isLoading = true
		this.authService.changePassword(params).then((res) => {
			this.isLoading = false
			MessageBox.display(res.message, res.success)
		})
	}
}

export {UserProfileCtrl}