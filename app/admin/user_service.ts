import {IModelService, IRequestResult} from '../schemas/structure';
import {IUser} from '../schemas/entity_set'

interface IUserQuery {
	storeId: number
	role: string
	name: string
	phoneNumber: string
	email: string
}

interface IUserService extends IModelService<IUser> {
	query(params: IUserQuery): angular.IPromise<IRequestResult<Array<IUser>>>
}

class UserService implements IUserService {
	static $inject = ["$q", "$http", "BASEAPI"];

	constructor(private $q: angular.IQService,
		private $http: angular.IHttpService,
		private baseUrl: string) { }

	get() {
		let defer = this.$q.defer()
		this.$http.get(`${this.baseUrl}/account/getusers`).then((response: IRequestResult<Array<IUser>>) => {
			defer.resolve(response)
		})
		return defer.promise
	}

	find(id: number) {
		let defer = this.$q.defer()
		this.$http.get(`${this.baseUrl}/account/getuser?id=${id}`).then((response: IRequestResult<IUser>) => {
			defer.resolve(response)
		})
		return defer.promise
	}

	query(params: IUserQuery) {
		let defer = this.$q.defer()
		this.$http.post(`${this.baseUrl}/account/queryusers`, params).then((response: IRequestResult<Array<IUser>>) => {
			defer.resolve(response)
		})
		return defer.promise
	}

	save(user: IUser) {
		let defer = this.$q.defer()
		if (user.id) {
			this.$http.put(`${this.baseUrl}/account/updateuser`, user).then((response: IRequestResult<IUser>) => {
				defer.resolve(response)
			})
		} else {
			this.$http.post(`${this.baseUrl}/account/createuser`, user).then((response: IRequestResult<IUser>) => {
				defer.resolve(response)
			})
		}
		return defer.promise
	}

	delete(id: string) {
		let defer = this.$q.defer()
		this.$http.delete(`${this.baseUrl}/account/deleteuser?id=${id}`).then((response: IRequestResult<IUser>) => {
			defer.resolve(response)
		})
		return defer.promise
	}

}

export {UserService, IUserService, IUserQuery}