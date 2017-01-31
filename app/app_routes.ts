import { Routes, AppServices } from './helpers/config_keys';

let AppRoutes = ($stateProvider: any,
    $urlRouterProvider: angular.ui.IUrlRouterProvider,
    $httpProvider: angular.IHttpProvider) => {
    $stateProvider
        .state(Routes.Login, {
            url: '/login',
            template: require('./authentication/login.html'),
            controller: 'LoginCtrl',
            controllerAs: 'loginVm',
            menu:'',
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
            controller: 'UserProfileCtrl',
            controllerAs: 'profileVm',
            menu:'',
            authorize: true,
            permission: ''
        })
        .state(Routes.Dashboard, {
            url: '/dashboard',
            template: require('./main/dashboard.html'),
            controller: 'DashboardCtrl',
            controllerAs: 'dashboardVm',
            menu:'dashboard',
            authorize: true,
            permission: ''
        })
        .state(Routes.Reports, {
            url: '/reports',
            template: require('./reports/reports.html'),
            controller: 'ReportsCtrl',
            controllerAs: 'reportsVm',
            menu:'reports',
            authorize: true,
            permission: ''
        })
        .state(Routes.ReportViewer, {
            url: '/report/:reportName',
            template: require('./reports/report_viewer.html'),
            controller: 'ReportViewerCtrl',
            controllerAs: 'rptViewerVm',
            menu: 'reports',
            authorize: true,
            permission: 'Report'
        })
        .state(Routes.Settings, {
            url: '/settings',
            template: require('./settings/settings.html'),
            controller: 'SettingsCtrl',
            controllerAs: 'settingsVm',
            menu:'settings',
            authorize: true,
            permission: ''
        })
        .state(Routes.GenericSettings, {
            url: '/:setting',
            template: require('./settings/generic_grid.html'),
            controller: 'SettingCtrl',
            controllerAs: 'settingVm',
            menu:'settings',
            authorize: true,
            permission: ''
        })
        .state(Routes.Admin, {
            url: '/admin',
            template: require('./admin/admin.html'),
            controller: 'UsersCtrl',
            controllerAs: 'usersVm',
            menu:'admin.users',
            authorize: true,
            permission: ''
        })
        .state(Routes.Users, {
            url: '/users',
            template: require('./admin/users.html'),
            controller: 'UsersCtrl',
            controllerAs: 'usersVm',
            menu:'admin.users',
            authorize: true,
            permission: ''
        })
        .state(Routes.Roles, {
            url: '/roles',
            template: require('./admin/roles.html'),
            controller: 'RolesCtrl',
            controllerAs: 'rolesVm',
            menu:'admin.users',
            authorize: true,
            permission: ''
        })

    $urlRouterProvider.otherwise(Routes.Dashboard);
    $httpProvider.interceptors.push(AppServices.RequestInterceptor)
}

export {AppRoutes}