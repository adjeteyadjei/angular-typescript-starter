import { IPledge, } from "../schemas/entity_set";
import {IModelService, IModelFilter, IRequestResult} from "../schemas/structure"

interface IPledgeFilter extends IModelFilter {
    
}

interface IPledgeService extends IModelService<IPledge> {
    query(params: IPledgeFilter): angular.IPromise<IRequestResult<Array<IPledge>>>    
}

class PledgeService implements IPledgeService {

    static $inject = ["$q", "$http", "BASEAPI", "$uibModal"];

    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string,
        private $uibModal: angular.ui.bootstrap.IModalService) { }

    get() {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/pledge`).then((response: IRequestResult<Array<IPledge>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    find(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/pledge?id=${id}`).then((response: IRequestResult<IPledge>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getCertificate(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/pledge/getcertificate?id=${id}`).then((response: IRequestResult<string>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getDetail(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/pledge/detail?id=${id}`).then((response: IRequestResult<IPledge>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    query(params: IPledgeFilter) {
        let defer = this.$q.defer()
        this.$http.post(`${this.baseUrl}/pledge/query`, params).then((response: IRequestResult<Array<IPledge>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    save(pledge: IPledge) {
        let defer = this.$q.defer()
        if (pledge.id) {
            this.$http.put(`${this.baseUrl}/pledge`, pledge).then((response: IRequestResult<IPledge>) => {
                defer.resolve(response)
            })
        } else {
            this.$http.post(`${this.baseUrl}/pledge`, pledge).then((response: IRequestResult<IPledge>) => {
                defer.resolve(response)
            })
        }
        return defer.promise
    }
    
    deleteTank(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/tank?id=${id}`).then((response: IRequestResult<IPledge>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    delete(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/pledge?id=${id}`).then((response: IRequestResult<IPledge>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

}

export {PledgeService, IPledgeService, IPledgeFilter}