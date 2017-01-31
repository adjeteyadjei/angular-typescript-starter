import {Routes} from '../helpers/config_keys';
import { IReportGroup, ReportsConfig } from './report_config';

class ReportsCtrl {
    reportGroups = ReportsConfig.getReports();

    static $inject = ["$state", "$stateParams"];
    constructor(private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService) {
    }

    openReport(reportName: string) {
        this.$state.go(Routes.ReportViewer, { reportName })
    }
}

export {ReportsCtrl}