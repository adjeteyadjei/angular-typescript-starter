import {ICustomerService, ICustomerQuery} from  "./customer_service"
import { ICustomer } from '../schemas/entity_set'
import { IModelController, ModelController } from '../schemas/structure'
import { MessageBox } from '../helpers/message_box';
let _ = require("underscore")

class CustomerCtrl extends ModelController<ICustomer> implements IModelController<ICustomer>  {
	isLoading: boolean;
	lastFilter: ICustomerQuery;

	static $inject = ["CustomerService"];

	constructor(private customerService: ICustomerService) {
		super("Customer")
		//console.log(this.lastFilter.Pager)
		this.fetch(<ICustomerQuery>{ Pager: { Page: 1, Size: 15 } });
	}

	fetch(params: ICustomerQuery) {
		this.isLoading = true
		this.customerService.query(params).then((res) => {
			this.isLoading = false
			if (res.success) { this.records = res.data }
		})
	}

	saveRecord(customer: ICustomer) {
		this.customerService.save(customer).then((res) => {
			this.afterSave(customer, res)
		})
	}

	deleteRecord(customer: ICustomer) {
		this.customerService.delete(customer.id).then((res) => {
			this.afterDelete(customer, res)
		})
	}

}

export {CustomerCtrl}