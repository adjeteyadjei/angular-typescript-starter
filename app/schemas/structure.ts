interface IRequestResult<T> {
	data: T
	success: boolean
	message: string
	total: number
}
interface IQueryPager {
	page: number
	size: number
}

interface IModelQuery {
	pager: IQueryPager
}

interface IModelService<T> {
	get(): angular.IPromise<IRequestResult<Array<T>>>
	find(id: number): angular.IPromise<IRequestResult<T>>
	query(params: any): angular.IPromise<IRequestResult<Array<T>>>
	save(record: T): angular.IPromise<IRequestResult<T>>
	delete(id: number | string): angular.IPromise<IRequestResult<T>>
}

interface IModelController<T> {
	loading: boolean
	saving: boolean
	deleting: boolean
	showForm: boolean
	formTitle: string
	gridSize: string
	newRecord: T
	addNew(): void
	edit(record: T): void
	closeForm(): void
	clear(): void
	fetch(params?: any): void
	saveRecord(record: T): void
	deleteRecord(record: T): void
}

let _ = require("underscore");
class ModelController<T> implements IModelController<T>{
	private modelName: string = "Record";
	private get FullGrid() { return "col-sm-12" };
	private get PartGrid() { return "col-sm-8" };

	loading: boolean
	saving: boolean
	deleting: boolean
	
	//View Config
	showForm: boolean;
	formTitle: string;
	gridSize: string = this.FullGrid;
	
	//Data
	newRecord: T;
	records: Array<T>;
	
	//Pager Config
	totalRecords = 0;
	currentPage = 1;
	recordSize = 15;
	totalPages = 1;

	constructor(modelName: string) {
		this.modelName = modelName;
	}

	addNew() {
		this.formTitle = `Add New ${this.modelName}`
		this.newRecord = null
		this.setUpFormView()
	}

	edit(record: T) {
		this.formTitle = `Edit ${this.modelName}`
		this.newRecord = angular.copy(record)
		this.setUpFormView()
	}

	closeForm() {
		this.showForm = false
		this.gridSize = this.FullGrid
		this.clear()
	}

	clear() { this.newRecord = null }

	fetch(params?: any) { console.warn("Fetch method not implemented") }

	saveRecord(record: T) { console.warn("Save method not implemented") }

	deleteRecord(record: T) { console.warn("Delete method not implemented") }

	afterSave(record: T, response: IRequestResult<T>) {
		if (response.success) {
			let theRecord = <any>record
			if (theRecord.id) {
				//Update Entry
				var recordIndex = _.findIndex(this.records, { id: theRecord.id })
				this.records[recordIndex] = response.data
				this.closeForm()
			} else {
				//New Entry
				this.records.push(response.data)
				this.closeForm()
			}
		}
	}

	afterDelete(record: T, response: IRequestResult<T>) {
		if (response.success) {
			let theRecord = <any>record
			var recordIndex = _.findIndex(this.records, { id: theRecord.id })
			this.records.splice(recordIndex, 1)
			this.closeForm()
		}
	}

	protected setUpFormView() {
		this.showForm = true
		this.gridSize = this.PartGrid
	}
}


export {IRequestResult, IQueryPager, IModelQuery, IModelService, IModelController, ModelController}