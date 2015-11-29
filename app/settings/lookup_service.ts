import { Routes } from '../helpers/config_keys';

interface ILookUpModel {
	name: string
	label: string
	route: string
}

class LookUpService {
	static get Models(): Array<ILookUpModel> {
		return [
			{ label: "App Setting", name: "appsetting", route: Routes.GenericSettings }
		]
	};
}

export {ILookUpModel, LookUpService}