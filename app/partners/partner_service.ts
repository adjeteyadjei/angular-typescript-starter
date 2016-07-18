import { IPartner, } from "../schemas/entity_set";
import {IModelService, IModelFilter, IRequestResult} from "../schemas/structure"

interface IPartnerFilter extends IModelFilter {
    
}

interface IPartnerService extends IModelService<IPartner> {
    query(params: IPartnerFilter): angular.IPromise<IRequestResult<Array<IPartner>>>    
}

class PartnerService implements IPartnerService {

    static $inject = ["$q", "$http", "BASEAPI", "$uibModal"];

    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string,
        private $uibModal: angular.ui.bootstrap.IModalService) { }

    get() {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/partner`).then((response: IRequestResult<Array<IPartner>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    find(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/partner?id=${id}`).then((response: IRequestResult<IPartner>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getCertificate(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/partner/getcertificate?id=${id}`).then((response: IRequestResult<string>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getDetail(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/partner/detail?id=${id}`).then((response: IRequestResult<IPartner>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    query(params: IPartnerFilter) {
        let defer = this.$q.defer()
        this.$http.post(`${this.baseUrl}/partner/query`, params).then((response: IRequestResult<Array<IPartner>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    save(partner: IPartner) {
        let defer = this.$q.defer()
        if (partner.id) {
            this.$http.put(`${this.baseUrl}/partner`, partner).then((response: IRequestResult<IPartner>) => {
                defer.resolve(response)
            })
        } else {
            this.$http.post(`${this.baseUrl}/partner`, partner).then((response: IRequestResult<IPartner>) => {
                defer.resolve(response)
            })
        }
        return defer.promise
    }
    
    deleteTank(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/tank?id=${id}`).then((response: IRequestResult<IPartner>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    delete(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/partner?id=${id}`).then((response: IRequestResult<IPartner>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

}

export {PartnerService, IPartnerService, IPartnerFilter}