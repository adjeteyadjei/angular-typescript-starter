import { IBeneficiary, } from "../schemas/entity_set";
import {IModelService, IModelFilter, IRequestResult} from "../schemas/structure"

interface IBeneficiaryFilter extends IModelFilter {
    
}

interface IBeneficiaryService extends IModelService<IBeneficiary> {
    query(params: IBeneficiaryFilter): angular.IPromise<IRequestResult<Array<IBeneficiary>>>    
}

class BeneficiaryService implements IBeneficiaryService {

    static $inject = ["$q", "$http", "BASEAPI", "$uibModal"];

    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string,
        private $uibModal: angular.ui.bootstrap.IModalService) { }

    get() {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/beneficiary`).then((response: IRequestResult<Array<IBeneficiary>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    find(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/beneficiary?id=${id}`).then((response: IRequestResult<IBeneficiary>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getCertificate(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/beneficiary/getcertificate?id=${id}`).then((response: IRequestResult<string>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getDetail(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/beneficiary/detail?id=${id}`).then((response: IRequestResult<IBeneficiary>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    query(params: IBeneficiaryFilter) {
        let defer = this.$q.defer()
        this.$http.post(`${this.baseUrl}/beneficiary/query`, params).then((response: IRequestResult<Array<IBeneficiary>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    save(beneficiary: IBeneficiary) {
        let defer = this.$q.defer()
        if (beneficiary.id) {
            this.$http.put(`${this.baseUrl}/beneficiary`, beneficiary).then((response: IRequestResult<IBeneficiary>) => {
                defer.resolve(response)
            })
        } else {
            this.$http.post(`${this.baseUrl}/beneficiary`, beneficiary).then((response: IRequestResult<IBeneficiary>) => {
                defer.resolve(response)
            })
        }
        return defer.promise
    }
    
    deleteTank(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/tank?id=${id}`).then((response: IRequestResult<IBeneficiary>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    delete(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/beneficiary?id=${id}`).then((response: IRequestResult<IBeneficiary>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

}

export {BeneficiaryService, IBeneficiaryService, IBeneficiaryFilter}