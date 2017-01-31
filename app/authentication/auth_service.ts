import { IUser } from "../schemas/entity_set";
import { IRequestResult } from "../schemas/structure";
import { StoreKeys, Routes } from "../helpers/config_keys"
let _ = require("underscore")

interface ILoginParams {
	username: string
	password: string
	rememberMe: boolean
}

interface IChangePasswordParams {
	currentPassword: string
	newPssword: string
	confirmPassword: string
}

interface IAuthService {
	isLogin(): boolean
	login(params: ILoginParams): angular.IPromise<IRequestResult<IUser>>
	changePassword(params: IChangePasswordParams): angular.IPromise<IRequestResult<any>>
	checkLogin(): void
	logOut(): angular.IPromise<IRequestResult<any>>
	setUser(user: IUser): void
	isAuthorize(privilege: string): boolean
	currentUser: IUser
}

class AuthService implements IAuthService {
	currentUser: IUser;

	static $inject = ["$q", "$http", "$state", "BASEAPI"];

	constructor(private $q: angular.IQService,
		private $http: angular.IHttpService,
		private $state: angular.ui.IStateService,
		private baseUrl: string) {
		if (localStorage.getItem(StoreKeys.CurrentUser)) {
			this.currentUser = JSON.parse(localStorage.getItem(StoreKeys.CurrentUser))
		}
	}

	login(loginDetails: ILoginParams) {
		let defer = this.$q.defer()

		console.warn("Auth not implemented!!!")

		setTimeout(() => {
			let res = <IRequestResult<IUser>>{
				total: 0,
				message: "Login successfull",
				success: true,
				data: <IUser>{
					id: 1, name: loginDetails.username,
					username: loginDetails.username,
					role: null, token: window.btoa(loginDetails.password)
				}
			}
			defer.resolve(res)
		}, 200);

		// this.$http.post(`${this.baseUrl}/account/login`,
		// 	loginDetails).then((response: IRequestResult<IUser>) => {
		// 		defer.resolve(response)
		// 	})
		return defer.promise
	}

	changePassword(passwordDetails: IChangePasswordParams) {
		let defer = this.$q.defer()
		this.$http.post(`${this.baseUrl}/account/changepassword`,
			passwordDetails).then((response) => {
				defer.resolve(response)
			})
		return defer.promise
	}

	logOut() {
		let defer = this.$q.defer()
		console.warn("Logout not implemented.")
		setTimeout(() => {
			localStorage.removeItem(StoreKeys.CurrentUser)
			this.currentUser = null
			defer.resolve(<IRequestResult<boolean>>{ success: true })
		}, 100);

		// this.$http.get(`${this.baseUrl}/account/logout`).then((response: IRequestResult<any>) => {
		// 	if (response.success) {
		// 		localStorage.removeItem(StoreKeys.CurrentUser)
		// 		this.currentUser = null
		// 	}
		// 	defer.resolve(response)
		// });

		return defer.promise
	}

	checkLogin() {
		if (!this.isLogin()) { this.$state.go(Routes.Login) }
	}

	isLogin() { return !!this.currentUser }

	setUser(user: IUser) {
		this.currentUser = user
		localStorage.setItem(StoreKeys.CurrentUser, JSON.stringify(user))
	}

	isAuthorize(privilege: string) {
		let privs = privilege.split("|")
		let res = _.intersection(this.currentUser.role.privileges, privs)
		return (res.length > 0)
	}


}

export { AuthService, IAuthService, ILoginParams, IChangePasswordParams }