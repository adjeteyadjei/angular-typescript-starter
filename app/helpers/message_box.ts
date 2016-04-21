//ToastR Notification
let toast = require("toastr")
toast.options.positionClass = "toast-top-center";
toast.options.preventDuplicates = true;

class Toast {
    private static beforeShow() {
        toast.clear()
    }

    static display(message: string, success: boolean) {
        (success) ? this.success(message) : this.error(message)
    }

    static success(message: string, title?: string) {
        this.beforeShow()
        toast.success(message);
    }

    static error(message: string, title?: string) {
        toast.error(message, title, { timeOut: 0, extendedTimeOut: 0 });
    }

    static info(message: string, title?: string) {
        this.beforeShow()
        toast.info(message);
    }

    static warning(message: string, title?: string) {
        this.beforeShow()
        toast.warning(message);
    }
}


//Sweet Alert Notification
let notify = require("sweetalert")
class MessageTypes {
    static SUCCESS = "success";
    static ERROR = "error";
    static INFO = "info";
    static NOTICE = "notice";
    static WARNING = "warning";
}

class MessageBox {
    private static show(message: string, type: string, title?: string) {
        if (!title) title = type
        notify(title.toUpperCase(), message, type)
    }

    static success(message: string) {
        this.show(message, MessageTypes.SUCCESS);
    }

    static error(message: string) {
        this.show(message, MessageTypes.ERROR);
    }

    static info(message: string) {
        this.show(message, MessageTypes.INFO);
    }

    static warning(message: string) {
        this.show(message, MessageTypes.WARNING);
    }

    static alert(message: string) {
        notify(message)
    }

    static display(message: string, success: boolean) {
        this.show(message, success ? MessageTypes.SUCCESS : MessageTypes.ERROR)
    }

    static wait(title: string, message: string) {
        let config = {
            title: title,
            text: message,
            type: MessageTypes.INFO,
            showCancelButton: false,
            showConfirmButton: false,
            allowEscapeKey: false,
            html: true
        }
        notify(config)
    }

    static close() { notify.close() }

    static confirm(title: string, message: string, type: string = MessageTypes.WARNING): JQueryPromise<boolean> {
        let defer = $.Deferred<boolean>()
        let result = false
        let config = {
            title: title,
            text: message,
            type: MessageTypes.WARNING,
            showCancelButton: true,
            confirmButtonColor: this.setColor(type),
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }
        notify(config, (isConfirm: boolean) => {
            return defer.resolve(isConfirm)
        })
        return defer.promise()
    }

    private static setColor(type: string) {
        switch (type) {
            case 'info':
                return "#22bb22"
            case 'warning':
                return "#DD6B55"
            case 'error':
                return "#ee0000"
            default:
                return "#4aafff"
        }
    }
}

export {MessageBox, MessageTypes, Toast}