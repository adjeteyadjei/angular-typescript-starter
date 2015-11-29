import {IUser} from "../schemas/entity_set"
import {IAuthService} from "../authentication/auth_service"
import {MessageBox} from "../helpers/message_box"
import { Routes } from '../helpers/config_keys';

interface IMenuItem {
    label: string
    route: string
    icon: string
}

class MainCtrl {
    version: string;
    username: string;
    menuItems: Array<IMenuItem>

    static $inject = ["$q", "$rootScope", "$state", "AuthService"];

    constructor(private $q: angular.IQService,
        private $rootScope: any,
        private $state: angular.ui.IStateService,
        private authenticate: IAuthService) {
        this.setVersion()
        this.setUserName()
        this.setUserMenus()
        this.$rootScope.$state = this.$state;
    }

    isLoggedIn() {
        this.setUserName()
        return this.authenticate.isLogin();
    }

    signOut() {
        this.authenticate.logOut().then((res) => {
            if (res.success) {
                this.$state.go(Routes.Login)
            }
        })
    }

    setVersion() {
        this.version = "0.0.0"
    }

    setUserName() {
        let user = this.authenticate.currentUser
        this.username = user ? user.name : ""
    }

    isAuthorize(privilege: string) {
        return this.authenticate.isAuthorize(privilege)
    }

    setUserMenus() {
        let menus: Array<IMenuItem> = [
            { label: "Dashboard", route: Routes.Dashboard, icon: "fa fa-dashboard" },
            { label: "Reports", route: Routes.Reports, icon: "fa fa-bar-chart-o" },
            { label: "Settings", route: Routes.Settings, icon: "fa fa-cogs" },
            { label: "Manage Users", route: Routes.Users, icon: "fa fa-users" },
        ]

        this.menuItems = menus;
    }
}

export {MainCtrl}