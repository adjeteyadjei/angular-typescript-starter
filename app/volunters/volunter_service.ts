import { IVolunter, } from "../schemas/entity_set";
import {IModelService, IModelFilter, IRequestResult} from "../schemas/structure"

interface IVolunterFilter extends IModelFilter {
    
}

interface IVolunterService extends IModelService<IVolunter> {
    query(params: IVolunterFilter): angular.IPromise<IRequestResult<Array<IVolunter>>>    
}

class VolunterService implements IVolunterService {

    static $inject = ["$q", "$http", "BASEAPI", "$uibModal"];

    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string,
        private $uibModal: angular.ui.bootstrap.IModalService) { }

    get() {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/volunter`).then((response: IRequestResult<Array<IVolunter>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    find(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/volunter?id=${id}`).then((response: IRequestResult<IVolunter>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getCertificate(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/volunter/getcertificate?id=${id}`).then((response: IRequestResult<string>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getDetail(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/volunter/detail?id=${id}`).then((response: IRequestResult<IVolunter>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    query(params: IVolunterFilter) {
        let defer = this.$q.defer()
        this.$http.post(`${this.baseUrl}/volunter/query`, params).then((response: IRequestResult<Array<IVolunter>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    save(volunter: IVolunter) {
        let defer = this.$q.defer()
        if (volunter.id) {
            this.$http.put(`${this.baseUrl}/volunter`, volunter).then((response: IRequestResult<IVolunter>) => {
                defer.resolve(response)
            })
        } else {
            this.$http.post(`${this.baseUrl}/volunter`, volunter).then((response: IRequestResult<IVolunter>) => {
                defer.resolve(response)
            })
        }
        return defer.promise
    }
    
    deleteTank(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/tank?id=${id}`).then((response: IRequestResult<IVolunter>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    delete(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/volunter?id=${id}`).then((response: IRequestResult<IVolunter>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

}

export {VolunterService, IVolunterService, IVolunterFilter}