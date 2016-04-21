import { Routes } from '../helpers/config_keys';
import {IRequestResult} from '../schemas/structure';
import {ILookUp } from '../schemas/entity_set';
let _ = require("underscore")

interface ILookUpModel {
    name: string
    label: string
    route: string
    store: string
}

class LookUps {
	static get Models(): Array<ILookUpModel> {
		return [
			{ label: "App Setting", name: "appsetting", store: "appsetting", route: Routes.GenericSettings }
		]
	};
}

interface ILookUpService {
    fetch(model: string): angular.IPromise<IRequestResult<Array<any>>>;
}

class LookUpService implements ILookUpService {

    static $inject = ["$q", "$http", "BASEAPI"];

    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string) {
    }

    fetch(lookUpStoreName: string) {
        let defer = this.$q.defer()
        let lookUp = this.getModel(lookUpStoreName)
		this.$http.get(`${this.baseUrl}/${lookUp.name}`).then((response: IRequestResult<Array<any>>) => {
			defer.resolve(response)
		})

        return defer.promise
    }

    private getModelName(store: string) {
        let model = _.findWhere(LookUps.Models, { store: store })
        return model.name;
    }

    private getModel(store: string): ILookUpModel {
        let model = _.findWhere(LookUps.Models, { store: store })
        return model;
    }
}

export {ILookUpModel, LookUpService, ILookUpService, LookUps}