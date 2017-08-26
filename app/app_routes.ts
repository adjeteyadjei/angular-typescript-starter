import { Routes, AppServices, AppControllers } from './helpers/config_keys';

let AppRoutes = ($stateProvider: any,
    $urlRouterProvider: angular.ui.IUrlRouterProvider,
    $httpProvider: angular.IHttpProvider) => {
    $stateProvider
        .state(Routes.Login, {
            url: '/login',
            template: require('./authentication/login.html'),
            controller: AppControllers.LoginCtrl,
            controllerAs: 'loginVm',
            menu: '',
            authorize: false,
            permission: ''
        })
        .state(Routes.UnAuthorized, {
            url: '/unauthorized',
            template: require('./authentication/unauthorized.html'),
            menu: '',
            authorize: false,
            permission: ''
        })
        .state(Routes.ChangePassword, {
            url: '/changePassword',
            template: require('./user_profile/change_password.html'),
            controller: AppControllers.UserProfileCtrl,
            controllerAs: 'profileVm',
            menu: '',
            authorize: true,
            permission: ''
        })
        .state(Routes.Dashboard, {
            url: '/dashboard',
            template: require('./main/dashboard.html'),
            controller: AppControllers.DashboardCtrl,
            controllerAs: 'dashboardVm',
            menu: 'dashboard',
            authorize: true,
            permission: ''
        })
        .state(Routes.Reports, {
            url: '/reports',
            template: require('./reports/reports.html'),
            controller: AppControllers.ReportsCtrl,
            controllerAs: 'reportsVm',
            menu: 'reports',
            authorize: true,
            permission: ''
        })
        .state(Routes.ReportViewer, {
            url: '/report/:reportName',
            template: require('./reports/report_viewer.html'),
            controller: AppControllers.ReportViewerCtrl,
            controllerAs: 'rptViewerVm',
            menu: 'reports',
            authorize: true,
            permission: 'Report'
        })
        .state(Routes.Settings, {
            url: '/settings',
            template: require('./settings/settings.html'),
            controller: AppControllers.SettingsCtrl,
            controllerAs: 'settingsVm',
            menu: 'settings',
            authorize: true,
            permission: ''
        })
        .state(Routes.GenericSettings, {
            url: '/:setting',
            template: require('./settings/generic_grid.html'),
            controller: AppControllers.SettingCtrl,
            controllerAs: 'settingVm',
            menu: 'settings',
            authorize: true,
            permission: ''
        })
        .state(Routes.Admin, {
            url: '/admin',
            template: require('./admin/admin.html'),
            menu: 'admin.users',
            authorize: true,
            permission: ''
        })
        .state(Routes.Users, {
            url: '/users',
            template: require('./admin/users.html'),
            controller: AppControllers.UsersCtrl,
            controllerAs: 'usersVm',
            menu: 'admin.users',
            authorize: true,
            permission: ''
        })
        .state(Routes.Roles, {
            url: '/roles',
            template: require('./admin/roles.html'),
            controller: AppControllers.RolesCtrl,
            controllerAs: 'rolesVm',
            menu: 'admin.users',
            authorize: true,
            permission: ''
        })

    $urlRouterProvider.otherwise(Routes.Dashboard);
    $httpProvider.interceptors.push(AppServices.RequestInterceptor)
}
AppRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider']
export { AppRoutes }