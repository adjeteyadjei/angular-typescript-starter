import { AngularServices, AppServices, PartialViews, AppControllers } from "../helpers/config_keys";

interface IReportService {
    openViewer(data: string): angular.ui.bootstrap.IModalServiceInstance
}

class ReportService implements IReportService {

    static $inject = [AngularServices.Q, AngularServices.Http, AppServices.BaseApi, AngularServices.UibModal];
    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService, private baseUrl: string,
        private $uibModal: angular.ui.bootstrap.IModalService) { }

    openViewer(data: string) {
        let modalInstance = this.$uibModal.open({
            animation: true,
            backdrop: false,
            templateUrl: PartialViews.DocumentViewer,
            controller: AppControllers.PreviewerCtrl,
            size: 'lg',
            controllerAs: 'viewerVm',
            resolve: { Data: () => { return data } }
        });
        return modalInstance;
    }
}

export { ReportService, IReportService }