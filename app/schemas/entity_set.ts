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

interface ITitle extends ILookUp { }

interface IPledgeType extends ILookUp { }

interface IProgram extends IAuditFields {
	name: string
	date: Date
	notes: string
	beneficiaries: IBeneficiary[]
}
class PledgePeriod {
	static get Monthly() { return "Monthly" }
	static get Quarterly() { return "Quarterly" }
	static get Yearly() { return "Yearly" }
}

interface IPledge extends IAuditFields {
	date: Date
	partner: IPartner
	partnerId: number
	period: string
	typeId: number
	item: string | number
	program: IProgram
	programId: number
}

interface IPartner extends IAuditFields {
	title: ITitle
	titleId: number
	surname: string
	otherNames: string
	email: string
	address: string
	phoneNumber: string
	secondaryPhoneNumber: string
	dateOfBirth: Date
	occupation: string
	placeOfWork: string
	pledges: IPledge[]
}
interface IVolunter extends IAuditFields {
	title: ITitle
	titleId: number
	surname: string
	otherNames: string
	email: string
	address: string
	phoneNumber: string
	secondaryPhoneNumber: string
	dateOfBirth: Date
	occupation: string
	placeOfWork: string
	skills: string
	interest: string
	notes: string
}
interface IBeneficiary extends IAuditFields {
	title: ITitle
	titleId: number
	surname: string
	otherNames: string
	email: string
	address: string
	phoneNumber: string
	secondaryPhoneNumber: string
	dateOfBirth: Date
	occupation: string
	placeOfWork: string
}


export {ILookUp, IUser, IRole, IProgram, IPledgeType, IPledge, IBeneficiary, IVolunter, IPartner}