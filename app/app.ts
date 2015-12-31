/// <reference path="../typings/tsd.d.ts" />

import {PartialViews} from './helpers/config_keys';
import {AppRoutes} from "./app_routes"
import {RequestInterceptor} from './services/request_interceptor';
import {MainCtrl} from "./main/main_ctrl"
import {DashboardCtrl} from "./main/dashboard_ctrl"
import {LoginCtrl} from "./authentication/login_ctrl"
import {UserProfileCtrl} from "./user_profile/user_profile_ctrl"
import {AuthService, IAuthService} from "./authentication/auth_service"
import {Authorize} from './authentication/authorize'
import {CustomerService} from './customers/customer_service';
import {CustomerCtrl} from './customers/customers_ctrl';
import {SettingsCtrl} from './settings/settings_ctrl';
import {SettingCtrl} from './settings/settings_ctrl';
import {UsersCtrl} from './admin/users_ctrl';
import {RolesCtrl} from './admin/roles_ctrl';
import {UserService} from './admin/user_service';
import {RoleService} from './admin/role_service';

let app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ui.select2', 'ngAnimate', 'ngSanitize', 'alcoder.components'])
	.directive('authorize', Authorize.Factory())
    .controller('LoginCtrl', LoginCtrl)
	.controller('UserProfileCtrl', UserProfileCtrl)
	.controller('MainCtrl', MainCtrl)
	.controller('DashboardCtrl', DashboardCtrl)
	.controller('CustomerCtrl', CustomerCtrl)
	.controller('SettingsCtrl', SettingsCtrl)
	.controller('SettingCtrl', SettingCtrl)
	.controller('UsersCtrl', UsersCtrl)
	.controller('RolesCtrl', RolesCtrl)
	.service("RequestInterceptor", RequestInterceptor)
	.service('AuthService', AuthService)
	.service('CustomerService', CustomerService)
	.service('UserService', UserService)
	.service('RoleService', RoleService)


app.config(AppRoutes);

app.value("BASEAPI", "api");

app.run((AuthService: IAuthService) => { AuthService.checkLogin() });

app.run(($templateCache: angular.ITemplateCacheService) => {
	$templateCache.put(PartialViews.CustomerForm, require("./customers/customer_form.html"))
	$templateCache.put(PartialViews.UserForm, require("./admin/user_form.html"))
	$templateCache.put(PartialViews.RoleForm, require("./admin/role_form.html"))
})

export {app}