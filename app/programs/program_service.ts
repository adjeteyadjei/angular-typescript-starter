import { IProgram, } from "../schemas/entity_set";
import {IModelService, IModelFilter, IRequestResult} from "../schemas/structure"

interface IProgramFilter extends IModelFilter {
    
}

interface IProgramService extends IModelService<IProgram> {
    query(params: IProgramFilter): angular.IPromise<IRequestResult<Array<IProgram>>>    
}

class ProgramService implements IProgramService {

    static $inject = ["$q", "$http", "BASEAPI", "$uibModal"];

    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string,
        private $uibModal: angular.ui.bootstrap.IModalService) { }

    get() {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/program`).then((response: IRequestResult<Array<IProgram>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    find(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/program?id=${id}`).then((response: IRequestResult<IProgram>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getCertificate(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/program/getcertificate?id=${id}`).then((response: IRequestResult<string>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
    
    getDetail(id: number) {
        let defer = this.$q.defer()
        this.$http.get(`${this.baseUrl}/program/detail?id=${id}`).then((response: IRequestResult<IProgram>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    query(params: IProgramFilter) {
        let defer = this.$q.defer()
        this.$http.post(`${this.baseUrl}/program/query`, params).then((response: IRequestResult<Array<IProgram>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    save(program: IProgram) {
        let defer = this.$q.defer()
        if (program.id) {
            this.$http.put(`${this.baseUrl}/program`, program).then((response: IRequestResult<IProgram>) => {
                defer.resolve(response)
            })
        } else {
            this.$http.post(`${this.baseUrl}/program`, program).then((response: IRequestResult<IProgram>) => {
                defer.resolve(response)
            })
        }
        return defer.promise
    }
    
    deleteTank(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/tank?id=${id}`).then((response: IRequestResult<IProgram>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    delete(id: number) {
        let defer = this.$q.defer()
        this.$http.delete(`${this.baseUrl}/program?id=${id}`).then((response: IRequestResult<IProgram>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

}

export {ProgramService, IProgramService, IProgramFilter}