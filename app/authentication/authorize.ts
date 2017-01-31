import {IAuthService} from './auth_service';

class Authorize {
    public link: (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => void;
    public scope = {};

    constructor(private authService: IAuthService) {
        Authorize.prototype.link = (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
           if (!authService.isAuthorize(attrs['authorize'])){
               element.remove()
           }
        };
    }

    public static Factory() {
        var directive = (authService: IAuthService) => {
            return new Authorize(authService);
        };

        directive['$inject'] = ['AuthService'];

        return directive;
    }

    static get Name() { return "authorize" }
}

class UnAuthorize {
    public link: (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => void;
    public scope = {};

    constructor(private authService: IAuthService) {
        UnAuthorize.prototype.link = (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
           if (authService.isAuthorize(attrs['unauthorize'])){
               element.remove()
           }
        };
    }

    public static Factory() {
        var directive = (authService: IAuthService) => {
            return new UnAuthorize(authService);
        };

        directive['$inject'] = ['AuthService'];

        return directive;
    }

    static get Name() { return "unauthorize" }
}

export {Authorize, UnAuthorize}