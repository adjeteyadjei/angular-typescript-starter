/// <reference path="../typings/tsd.d.ts" />

import {PartialViews, Routes} from './helpers/config_keys';
import {AppRoutes} from "./app_routes"
import {RequestInterceptor} from './services/request_interceptor';
import {MainCtrl} from "./main/main_ctrl"
import {DashboardCtrl} from "./main/dashboard_ctrl"
import {LoginCtrl} from "./authentication/login_ctrl"
import {UserProfileCtrl} from "./user_profile/user_profile_ctrl"
import {AuthService, IAuthService} from "./authentication/auth_service"
import {Authorize} from './authentication/authorize'
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
	.controller('SettingsCtrl', SettingsCtrl)
	.controller('SettingCtrl', SettingCtrl)
	.controller('UsersCtrl', UsersCtrl)
	.controller('RolesCtrl', RolesCtrl)
	.service("RequestInterceptor", RequestInterceptor)
	.service('AuthService', AuthService)
	.service('UserService', UserService)
	.service('RoleService', RoleService)


app.config(AppRoutes);

app.value("BASEAPI", "api");

app.config((uibDatepickerPopupConfig: angular.ui.bootstrap.IDatepickerPopupConfig, uibDatepickerConfig: angular.ui.bootstrap.IDatepickerConfig) => {
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerPopupConfig.datepickerPopup = "dd-MMMM-yyyy";
    uibDatepickerPopupConfig.clearText = "Clear";
    uibDatepickerPopupConfig.closeText = "Close";
});


app.run(($rootScope: angular.IRootScopeService, $state: angular.ui.IStateService, AuthService: IAuthService) => {
	$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
		if (toState.authorize) {
			if (!AuthService.isLogin()) {
				//User is not Login
				$state.transitionTo(Routes.Login)
				event.preventDefault();
			} else if (toState.permission) {
				if (!AuthService.isAuthorize(toState.permission)) {
					//User doesn't have permission
					$state.transitionTo(Routes.UnAuthorized)
					event.preventDefault();
				}
			}
		}
	})
});

app.run(($templateCache: angular.ITemplateCacheService) => {
	$templateCache.put(PartialViews.UserForm, require("./admin/user_form.html"))
	$templateCache.put(PartialViews.RoleForm, require("./admin/role_form.html"))
})

export {app}