import { MessageBox } from '../helpers/message_box';
import { AngularServices } from "../helpers/config_keys";

let _ = require("lodash")

class PreviewerCtrl {
    loading: boolean;
    formTitle: string;
    saving: boolean;
    deleting: boolean;

    static $inject = [AngularServices.UibModalInstance, "Data"];
    constructor(private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private data: string) {
        setTimeout(() => {
            this.loadData()
        }, 1000);
    }

    private loadData() {
        let iframe = document.createElement("iframe");
        iframe.id = "pdfFrame";
        iframe.src = _.startsWith(this.data, "data:") ? this.data : `data:application/pdf;base64,${this.data}`;
        $("#rptFrame").append(iframe);
    }

    close() { this.$uibModalInstance.dismiss("cancel") }
}

export { PreviewerCtrl }