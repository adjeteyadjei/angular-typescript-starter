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
	id: number
	username: string
	name: string
	token: string
	role: IRole
}

interface IRole extends IAuditFields {
	name: string
	privileges: Array<string>
}


export {ILookUp, IUser, IRole}