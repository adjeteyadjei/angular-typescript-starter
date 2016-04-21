import { IRole } from '../schemas/entity_set'
import {IModelController, ModelController} from '../schemas/structure'
import { IRoleService } from './role_service'
import { MessageBox } from '../helpers/message_box';

class RolesCtrl extends ModelController<IRole> implements IModelController<IRole> {
    privileges: Array<string>;

    static $inject = ["RoleService"];

    constructor(private roleService: IRoleService) {
        super("Role")
        this.start()
    }

    saveRecord(role: IRole) {
        let theRole = angular.copy(role);
        if (!theRole.privileges || theRole.privileges.length < 1) {
            MessageBox.error("Select privileges for this role.")
            return
        }

        this.roleService.save(theRole).then((res) => {
            this.afterSave(theRole, res)
        })
    }

    deleteRecord(role: IRole) {
        MessageBox.confirm(`Delete Role`, `Are you sure you want to delete ${role.name}?`).then((yes) => {
            if (yes) {
                this.roleService.delete(role.id).then((res) => {
                    this.afterDelete(role, res)
                })
            }
        })
    }

    private loadRoles() {
        this.roleService.get().then((res) => {
            if (res.success) { this.records = res.data }
        })
    }

    private loadPrivileges() {
        this.roleService.privileges().then((res) => {
            if (res.success) { this.privileges = res.data }
        })
    }

    private start() {
        this.loadRoles()
        this.loadPrivileges()
    }
}

export {RolesCtrl}