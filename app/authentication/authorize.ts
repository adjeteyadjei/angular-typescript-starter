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
}

export {Authorize}