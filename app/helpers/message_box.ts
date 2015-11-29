let notify = require("sweetalert")

class MessageTypes {
	static SUCCESS = "success"
	static ERROR = "error"
	static INFO = "info"
	static NOTICE = "notice"
	static WARNING = "warning"
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

	static confirm(title: string, message: string):JQueryPromise<boolean> {
		let defer = $.Deferred<boolean>()
		let result = false
		let config = {
			title: title,
			text: message,
			type: MessageTypes.WARNING,
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
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
}


export {MessageBox}