import {Toast} from '../helpers/message_box';
import {IReport, ReportsConfig, InputType, IReportLookUp} from './report_config';
import {ILookUpService} from '../settings/lookup_service';
import {IRequestResult} from '../schemas/structure';
let _ = require('underscore');

class ReportViewerCtrl {
    loading: boolean;
    report: IReport;

    static $inject = ["$q", "$http", "BASEAPI", "$state", "$stateParams", "LookUpService"];
    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string,
        private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService,
        private lookUpService: ILookUpService) {
        this.start()
        this.fetchLookUps()
    }

    run(filter: any) {
        this.loading = true
        this.$http.post(`${this.baseUrl}/${this.report.query}`, filter || {}).then((res: IRequestResult<string>) => {
            this.loading = false
            this.clearPreview()
            if (res.success) { this.showReport(res.data) }
        })
    }

    private fetchLookUps() {
        if (!(this.report && this.report.lookUps)) return;
        let self: any = this;
        let selects: IReportLookUp[] = _.where(this.report.lookUps, { type: InputType.Select })
        selects.forEach((lookUp) => {
            if (lookUp.source) {
                //Set lookup data from source
                self[lookUp.store] = lookUp.source
            } else {
                //Fetch lookUp Data
                this.lookUpService.fetch(lookUp.store).then((res) => {
                    self[lookUp.store] = (lookUp.filter) ? _.where(res.data, lookUp.filter) : res.data
                })
            }
        })
    }

    private clearPreview() { $("#pdfFrame").remove(); }

    private showReport(data: string) {
        let iframe = document.createElement("iframe");
        iframe.id = "pdfFrame";
        iframe.src = `data:application/pdf;base64,${data}`;
        $("#rptFrame").append(iframe);
    }

    private start() {
        let reportName = this.$stateParams['reportName'];
        this.report = angular.copy(ReportsConfig.getReport(reportName))
        if (!this.report) { Toast.error("Report not found.") }
    }
}

export {ReportViewerCtrl}