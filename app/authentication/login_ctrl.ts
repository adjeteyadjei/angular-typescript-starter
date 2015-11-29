import {IAuthService, ILoginParams} from "../authentication/auth_service"
import {MessageBox} from "../helpers/message_box"
import {Routes} from "../helpers/config_keys"

class LoginCtrl {
	isLoading: boolean;

	static $inject = ["$state", "AuthService"];

	constructor(private $state: angular.ui.IStateService,
		private authService: IAuthService) { }

	login(params: ILoginParams) {
		this.isLoading = true
		this.authService.login(params).then((res) => {
			this.isLoading = false
			if (res.success) {
				this.authService.setUser(res.data)
				this.$state.go(Routes.Dashboard)
			}
		})
	}


}

export {LoginCtrl}