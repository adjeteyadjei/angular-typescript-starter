import { IUser, IRole } from '../schemas/entity_set'
import {IModelController, ModelController} from '../schemas/structure'
import { IUserService, IUserQuery } from './user_service';
import { IRoleService } from './role_service';

class UsersCtrl extends ModelController<IUser> implements IModelController<IUser> {
	roles: Array<IRole>;

	static $inject = ["UserService", "RoleService"];

	constructor(private userService: IUserService,
		private roleService: IRoleService) {
		super("User")
		this.start()
	}

	saveRecord(user: IUser) {
		this.userService.save(user).then((res) => {
			this.afterSave(user, res)
		})
	}

	deleteRecord(user: IUser) {
		this.userService.delete(user.id).then((res) => {
			this.afterDelete(user, res)
		})
	}

	private loadUsers() {
		this.userService.get().then((res) => {
			if (res.success) { this.records = res.data }
		})
	}

	private loadRoles() {
		this.roleService.get().then((res) => {
			if (res.success) { this.roles = res.data }
		})
	}

	private start() {
		this.loadUsers()
		this.loadRoles()
	}
}

export {UsersCtrl}