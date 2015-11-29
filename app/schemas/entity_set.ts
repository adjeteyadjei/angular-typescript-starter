interface IhasId {
	id: number
}

interface IAuditFields extends IhasId {
	createdAt: Date
	createdBy: string
	modifiedAt: Date
	modifiedBy: string
}

interface ILookUp extends IAuditFields {
	name: string
	notes: string
}

interface IUser {
	id: string
	username: string
	name: string
	token: string
	role: IRole
	store: IStore
}

interface IRole extends IAuditFields {
	name: string
	privileges: Array<string>
}

interface IStore extends IAuditFields {
	name: string
	phoneNumber: string
	email: string
	manager: string
	notes: string
}

interface IExpenseType extends ILookUp { }

interface ICustomer extends IAuditFields {
	name: string
	cardNumber: string
	phoneNumber: string
	email: string
	residentialAddress: string
	postalAddress: string
	totalDebt: number
}

export {ILookUp, IUser, IRole, ICustomer, IExpenseType}