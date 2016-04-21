import { IUser, IRole } from '../schemas/entity_set'
import {IModelController, ModelController} from '../schemas/structure'
import { IUserService, IUserQuery } from './user_service';
import { IRoleService } from './role_service';
import {MessageBox} from '../helpers/message_box';

class UsersCtrl extends ModelController<IUser> implements IModelController<IUser> {
	roles: IRole[];
	saving: boolean;
    deleting: boolean;

	static $inject = ["UserService", "RoleService"];

	constructor(private userService: IUserService,
		private roleService: IRoleService) {
		super("User")
		this.start()
	}

	saveRecord(user: IUser) {
		let theUser = angular.copy(user)
		this.saving = true
		this.userService.save(theUser).then((res) => {
			this.saving = false
			this.afterSave(theUser, res)
			this.loadUsers()
		})
	}

	deleteRecord(user: IUser) {
		MessageBox.confirm('Delete User', `Are you sure you want to delete ${user.name}?`).then((yes) => {
            if (yes) {
                this.deleting = true
                this.userService.delete(user.id).then((res) => {
                    this.deleting = false
                    this.afterDelete(user, res)
                })
            }
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