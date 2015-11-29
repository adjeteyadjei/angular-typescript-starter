import { Routes } from './helpers/config_keys';

let AppRoutes = ($stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider,
    $httpProvider: angular.IHttpProvider) => {
    $stateProvider
        .state(Routes.Login, {
            url: '/login',
            template: require('./authentication/login.html'),
            controller: 'LoginCtrl',
            controllerAs: 'loginVm'
        })
        .state(Routes.ChangePassword, {
            url: '/changePassword',
            template: require('./user_profile/change_password.html'),
            controller: 'UserProfileCtrl',
            controllerAs: 'profileVm'
        })
        .state(Routes.Dashboard, {
            url: '/dashboard',
            template: require('./main/dashboard.html'),
            controller: 'DashboardCtrl',
            controllerAs: 'dashboardVm'
        })
        .state(Routes.Customers, {
            url: '/customers',
            template: require('./customers/customers.html'),
            controller: 'CustomerCtrl',
            controllerAs: 'customerVm'
        })
        .state(Routes.Reports, {
            url: '/reports',
            template: require('./reports/reports.html'),
            //controller: 'ReportsCtrl',
            //controllerAs: 'reportsVm'
        })
        .state(Routes.Settings, {
            url: '/settings',
            template: require('./settings/settings.html'),
            controller: 'SettingsCtrl',
            controllerAs: 'settingsVm'
        })
        .state(Routes.GenericSettings, {
            url: '/:setting',
            template: require('./settings/generic_grid.html'),
            controller: 'SettingCtrl',
            controllerAs: 'settingVm'
        })
        .state(Routes.Admin, {
            url: '/admin',
            template: require('./admin/admin.html'),
            controller: 'UsersCtrl',
            controllerAs: 'usersVm'
        })
        .state(Routes.Users, {
            url: '/users',
            template: require('./admin/users.html'),
            controller: 'UsersCtrl',
            controllerAs: 'usersVm'
        })
        .state(Routes.Roles, {
            url: '/roles',
            template: require('./admin/roles.html'),
            controller: 'RolesCtrl',
            controllerAs: 'rolesVm'
        })

    $urlRouterProvider.otherwise("dashboard");
    $httpProvider.interceptors.push("RequestInterceptor")
}

export {AppRoutes}