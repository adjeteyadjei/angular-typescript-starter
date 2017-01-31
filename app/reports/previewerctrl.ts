import { AppServices, AngularServices } from '../helpers/config_keys';

class PreviewerCtrl {
    certificate: string
    loading: boolean

    static $inject = [AngularServices.Q, AngularServices.Http, AppServices.BaseApi, AngularServices.UibModalInstance, "DocumentLink"]

    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string,
        private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
        private DocumentLink: string) {
        this.fetchDocument()
    }

    private fetchDocument() {
        this.loading = true
        this.$http.get(this.DocumentLink).then((res) => {
            this.loading = false;
            console.log(res.data);

        })

    }

    private clearDocument() { $("#pdfFrame").remove(); }

    private showDocument(data: string) {
        let iframe = document.createElement("iframe");
        iframe.id = "pdfFrame";
        iframe.src = `data:application/pdf;base64,${data}`;
        $("#rptFrame").append(iframe);
    }



    close() { this.$uibModalInstance.dismiss("cancel") }
}

export { PreviewerCtrl }