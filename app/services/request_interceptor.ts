import { MessageBox, Toast } from "../helpers/message_box"
import { SysMessages, StoreKeys, PartialViews } from '../helpers/config_keys';
import {IUser} from "../schemas/entity_set"

class RequestInterceptor {
    private get GetMethod() { return "GET" }
    private get DeleteMethod() { return "DELETE" }
    private get QuerySuffix() { return "/query" }

    currentUser: IUser;
    isLoggedIn: boolean;


    static $inject = ["$q", "$location"];

    constructor(private $q: angular.IQService,
        private $location: angular.ILocationService) { }

    private getCurrentUser = () => {
        this.currentUser = JSON.parse(localStorage.getItem(StoreKeys.CurrentUser))
        this.isLoggedIn = !!this.currentUser
    }

    private getMessage(response: any) {
        if (response.data.success) {
            if (response.data.message) return response.data.message;
            return (response.config.method === this.DeleteMethod) ? SysMessages.RecordDeleted : SysMessages.RecordSaved
        } else {
            return response.data.message || SysMessages.OperationError;
        }
    }

    private isQueryPost(url: string) {
        return url.indexOf(this.QuerySuffix, url.length - this.QuerySuffix.length) !== -1;
    }

    request = (config: angular.IRequestConfig) => {
        this.getCurrentUser();
        if (this.currentUser) {
            config.headers['Authorization'] = `Bearer ${this.currentUser.token}`
        }
        return config
    }

    requestError = (rejection: any) => {
        return rejection;
    }

    response = (response: angular.IHttpPromiseCallbackArg<any>) => {
        if (response.status === 200 && response.config.method !== this.GetMethod
            && !this.isQueryPost(response.config.url)) {
            var message = this.getMessage(response);
            Toast.display(message, response.data.success);
        }
        return (response.config.cache) ? response : this.$q.when(response.data)
    }

    responseError = (rejection: angular.IHttpPromiseCallbackArg<any>) => {
        switch (+rejection.status) {
            case 401:
                Toast.error(SysMessages.Unauthorized);
                break;
            case 404:
                Toast.error(SysMessages.NotFound);
                break;
            case -1:
                Toast.error(SysMessages.NotAllowed);
                break;
            case 502:
                Toast.error(SysMessages.BadGateway);
                break;
            default:
                Toast.error(rejection.statusText);
                break;
        }

        return rejection;
    }
}

export {RequestInterceptor}