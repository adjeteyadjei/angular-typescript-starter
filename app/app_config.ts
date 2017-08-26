import { IAuthService } from "./authentication/auth_service";
import { PartialViews, Routes } from "./helpers/config_keys";
import { ReportsConfig } from "./reports/report_config";

let DatePickerConfig = (uibDatepickerPopupConfig: angular.ui.bootstrap.IDatepickerPopupConfig,
    uibDatepickerConfig: angular.ui.bootstrap.IDatepickerConfig) => {
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerPopupConfig.datepickerPopup = "dd-MMMM-yyyy";
    uibDatepickerPopupConfig.clearText = "Clear";
    uibDatepickerPopupConfig.closeText = "Close";
}

let AuthRun = ($rootScope: angular.IRootScopeService, $state: angular.ui.IStateService, AuthService: IAuthService) => {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        // console.log("Abuzege", toState)
        if (toState.authorize) {
            if (!AuthService.isLogin()) {
                //User is not Login
                $state.transitionTo(Routes.Login)
                // $state.go(Routes.Login)
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
}

AuthRun.$inject = ['$rootScope', '$state', 'AuthService'];


let TemplatesConfig = ($templateCache: angular.ITemplateCacheService) => {
    $templateCache.put(PartialViews.UserForm, require("./admin/user_form.html"))
    $templateCache.put(PartialViews.RoleForm, require("./admin/role_form.html"))
    $templateCache.put(PartialViews.MenuBar, require("../_menubar.html"))
    $templateCache.put(PartialViews.Header, require("../_header.html"))
    ReportsConfig.reportsList().forEach((report) => {
        if (report.lookUps) {
            $templateCache.put(`${report.name}_report`, ReportsConfig.makeFilterTemplate(report))
        }
    })
}

let ChartConfig = (ChartJsProvider: any) => {
    ChartJsProvider.setOptions({
        global: {
            colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
        }

    })
}

let XeditableConfig = (editableOptions: any) => {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}

let HotKeysConfig = (hotkeysProvider: any) => {
    hotkeysProvider.includeCheatSheet = true;
}

XeditableConfig.$inject = ['editableOptions']
DatePickerConfig.$inject = ['uibDatepickerPopupConfig', 'uibDatepickerConfig']
TemplatesConfig.$inject = ['$templateCache'];
ChartConfig.$inject = ['ChartJsProvider'];
HotKeysConfig.$inject = ['hotkeysProvider'];

export { DatePickerConfig, AuthRun, TemplatesConfig, XeditableConfig, ChartConfig, HotKeysConfig }