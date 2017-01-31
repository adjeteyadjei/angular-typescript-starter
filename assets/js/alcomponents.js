var alcomponents = angular.module("alcoder.components", []);

alcomponents.directive("pageHeader", [function () {
    return {
        'restrict': "E",
        'transclude': true,
        'replace': true,
        'scope': {
            title: "@",
            icon: "@"
        },
        'template': function (element, attribs) {
            var view = "<div class='pageheader_container'>" +
                "<div class='pageheader'>" +
                "<div class='pageicon'><span class='{{icon}}'></span></div>" +
                "<div class='pagetitle'>" +
                "<h3>{{title}}</h3><div class='extra' ng-transclude></div>" +
                "</div></div></div>";
            return view;
        }
    };
}]);

alcomponents.directive("pageContent", [function () {
    return {
        'restrict': "E",
        'replace': true,
        'transclude': true,
        'template': function () {
            var view = "<div class='content_show' ng-transclude></div>";
            return view;
        }
    };
}]);

alcomponents.directive("confirmDialog", [function () {
    return {
        'scope': {
            onConfirm: "&",
            text: "@",
            title: "@",
            message: "@"
        },
        'replace': true,
        'restrict': "E",
        'controller': ["$scope", "$timeout", "$uibModal", function ($scope, $timeout, $uibModal) {
            var title = $scope.title || "Confirm";
            var msg = $scope.message || "Are you sure?";
            var template = "<div class='modal-header'>" +
                "<h4 class='modal-title' id='myModalLabel'>" + title + "</h4></div>" +
                "<div class='modal-body'><p class='confirm'>" +
                "<img style='margin-right: 10px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA3CAYAAABQOymxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADu0AAA7tAfHOxQ4AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAQe0lEQVRoQ+2aCXRV9bXGZSyjIWS+uVMCYQgJISFkDhkgM0nIDRlIAJHB2harLluH1of2PXkVfdaitrZqRStUVKYwQ0gIgZBA5nmeyMQM4thn9XvfPsm5DS7fEgcUXO61vnVy7z05//3be/+nc85tP9qPdkMsiFpFGZRPP3B7lsKArlAp1A/WXqYU2HFjh6rQomTqB2e/oxTAVZkWyNmmwyy3n6jA/6S8qR+MJVEKXPrC8ag+akR5jhFHtuvgpB+hQndQltQtbzpK+ioCvEehMtcJpw44oWC3EVV5ztj2Nw3GjhmiQr9D3fKWR8HWehjydhhQeWQSivY74yRVtM8ZzYWT8cTD1iqwaDl1y9pvKAXkL085oKVoKkoOTkbpoX6VyDHbhd+7IG7+GBX4PcpI3XLmTn1C4c70CegsdUX54amKKnL+Lflcmz8NJ5ltjd0wFfoAdUvZEOoUBRfnkQpQ3TFXVOVOR9OJ6eguc0V3OcVj8wlXVOZMx+lSN7y43kEFFi2jbhl7iMKQIbdhy1+NzO5M1OQRrnAG8rZPw2O/MuCXq3T47X0GZL81lUGYgZqjMxgEdyREjVOBL1K21E1vztRHFOdbK5yt8URdvjuh3NFY4A5vT3vCWGLYiInKcZa7PeqP8Xf+1nbSA6f2T4GVpXlR8nfqprd9FAzaEag/PpMQnoTxQGeJJ/upO/Q6e1hZ2cLOzg4TeXQy2nMAm4mOYk80HPfAudrZWP+oBMVc2nOpm9ZkXaw4+sofnHGuxoeZ9UJLoRd6yr1wYvdMAmtga6eBRqOBja0DJk9yJLAHukpnK+e1FM1maXvBx3OUClxFDaVuOhtHdVOcYixxvs6Pzs9B60lvtJ/yxtlqb+TvmAWtVktYrXK0d9ASWIfSg57orfRGG89rKfJGX5Uf9m6agmHDzFm+j7rpbD2lbAqK9gmAP8vZh6Xqg9MlPrhY54ujO7yg0xkUGQwGOGoNmOLCZWb2bAbEl2Xvw+D4MEi+uNwYgBWLpZ8rwLJSs6FuGptC/S+FR36px5XmEML6E8CP040fpx8/XG7wx/EsbxiNzoqcnZ2h1zvDdfokVB/xwfkaf3TxvE6e31HM/ykPQnWeF6wnmgewv1I3je2lMNlpNDpKgnC6LJjHQAIEsu8Goq8yEFebAlG4x4egLpg0yQUuLi5wcnLBTPcpqM/3w6X6IPRUBDI4gQxSINqKAxm4MKx7RK8Cf0Z5UN+7RVOKUxufc8elxnloLwlWoHsqggkbzHINxvstwZxy/Ag6VdHUqVPhPGkqvDyncfERgCuNwThTFYxe/k93eTAzLdcIRRc/z5hq3kbmUN+ryehZTWHeXGtcaIxgZsMUR7vLQwkbStgQlmsIPmwL5TIyCK6urpg2zVU5urhMh5+PGzqL5+LdphCO6iGEDmWgCMprdJSE4mJjJDb9aboKLIqhvjf7KYXhw4cie6s/ztZFoqM0HF3l4eipDMeZ6nCcrw3DxfowfNQejtqjc+Ex052w7nB3d2eW3TA3yINZDcVVlu+FujAuVMI5SoejuyKcgQvn9ebjfEMEwoNuV4FlmpKl63dut1NnKNyRZsCVlgUs5Qg6GYHuygg6HcGMzSfEfA5Y8/FxRwRLNwze3rPg5uYBDw8PTJ8+ExHzPHGhdh5Lfj4DQ7ja+QxUBEf5CJYzK6aU16mPxf43vTF0qDnLd1LfuT1BYYLFSJTlzkdPdSw6yqLpZBR6qqJwpiaKc3EkLjZEsn9G4p+dkSzdeQjwn42ZHl7w8vLCDDdPLIiZw3KOwPutkQxMJC7URzLLUeirjmLgotBZHoW20mhcbolHaqKtCtxFjaa+M3OgZN+Kh++dgcutSWgtiaVzsXQyBr3VMThbG8PsxnA+jSFQDIGj2T8jERbig1me3pgzZw7c3L2RkuSHD9uj8UFrDK7wvIv1MVxexjDLMQxcDE6Xx6C9NBY9NQko2DcXo0eZ7448QH1n9mcKjppxaChKIGgCnYrnMR7dVQuYnQV0egGzFUfgOFxtiSNwLC41xCA2yp/Z9YGfnx/cPXyxPDMQn3TF4YO2OALH8Zw4VkYcK2QBenmtrooFrJx4BnQBLrUkY/VS8zR1jpJudcNtMqUsMn6/dg4uNKeipTgR7WWJOF2RyKwkoI/ZOFeXwHKOJ0Q8gePxcWc8+2k8TInBmO3tj4CAAHjM8sfPV4Xgs94EvN8Wj3eb4zmtxeN8fTwrJIGVkoCuSgloIsua169KRvHhKFiMN98oeIy64baZgrNhDJpLTGgtW4TWUhM6yk04XWliX07CmdokDjRJBF6Iy00LCbwQH3UkEjoRmWmhmOMThODgYHh6BeFX94QDZxcSOJHACwm8kKPyQo74SeitSWLFJKGzwoS2MhOai5NwoSUD9/7URQWWJac1dcNsOvUphScf1eNs42I0FacQeBGBFxF4EYGTCZxM4GTOoSZcbjYR2IQP2k34pNuEu1bMg49vCEJDQ+HlHYK1D0YC55LxXquJKysTLjWZCJxM4GQCJxM4mcCLCLwILSWL0F6xGKVHogfvmddRN8y2UFxCDkdZth6Np0xoKc1kllPRUZFK4FQCp6KvNpXAqVyIpDDDKXi3JYUZTMFnfSl44J4o+PqFITw8HN4+YXjy8RgCp+BqawqBU3CR559vSMWZulQCpxI4lcCpaC9n1ylNQ2NxBvrqTFizwuKGZ9mNUrK77hFrLiI0KDvsgZayZWgrX0LgxexjizmaphM4HWfr0wmczoylcY5OI1AaSzcdjz0cB/+A+YiIiICv/3w8tz6ewOl4l79fbk5jVaThXEM6gdMJnI6u6sXorFxM4MUEXozmsjtRVxCK3K32mGhp7ssyRX7rpmTXxXkETu7XcwuoRdFeO1TmEpqR76xagdPVy9Bdk4ne2gwCZzJTmcxYBkEycKU1g8CZeGZdIgKCohAdHa0cX96QROBMBiWDwclgkDIInMksZjJ4GQTOJHAmgZeitWIl6goTULhXh9p8PX62fIIKfJmyor41k+3fvyj850PWqDxiQMFuAhO6eL8d18gGNBZyh1SRhp7alXR2Jc42LKfjy3ChaSkuNS/hwmEJPju7FK++kIzgubGIi4tDcEgstvwtBZ+e6T/nYtMSnG9cymAt5TWWEvgOdNWsQGf1KqWKao+HcAOixYndDmxbj4NvaWFpYe7Lj1LfmilP/Yy6EcjfpcexXToc361jpAVYi9KDGlQcskHNER2Xj7O405GV1yI6vgznm1biYvNqXGpdjX+dXY0dm5YiIjIJJpMJkVELse/tJfikbxXn2FWc4lbz/NUM1mr01q9gdpdwfk9AQ4EfKg47sS1bVpUjTuzRIj9LhwoGfnm6uS/LMncs9Y1Nng0pdyEfXGOFkmwDjuzQKdDS8ElmueSgFhXZWlTlaFCTa4v6PFs0H3NAW6EzThe7c0/sy5VTGEfqGP5vNKZMC4CbRzCmzwjGkax4fNBh4rwbzwVLtLLLkrskLYUz0JBvRHWOnRJMCaoEt4hBLmCwj+6UoOuxfaMjxow2Z3kN9Y3tKQr2tsNx4G09HdYjd7tOibA0LA6II2WHtKg87IjqXEfU5TmiMV9DaHu0HrdBe4E1Ok5Yo/uUDY+2ePz+cchcOBq/WTOOv9vze3vl+7YCG/6PNRqP2jBodqjNdWAQHVHOYJYc6A+uBFmCnUfgw9t0OHXICFPceBW4lRpOfW0bT52nuKSzROEBJxx6R68825UGr8kyHRLHqghdQ+h6BdqRABq0FmjQdkKDdur0SQ3ea9DiwyYt3m9wVD63nXBQzmk5rkETz2846ojaIwweYSuy5a5mf1DV7Eqw5VHr4a30I8uAjc9ruEU1r7FN1Ne2uymMHTMUW17WInubAQeZZWlIynpwlmUwKVVK21HJSg0dFugGQguEwIjOVTqir8xR+bunxBHnq7TK3xIYCVC9CsugScVI5XxRdnMILMHf/5Ye+XuMCPYzP4zLF8e/jskmu4ZCXOR45O12wp43+xtQsswGP5/lYjomDpqhB8pbMibgvaVavLHBCoFzfgK943B4zxyJP62biB5+L+dIgAbDlgssgyjBlAHSnF0GW4Iuwd+3hV1spxFPrr3m5v1s6itbMKU8H9rwpAYHthqx+x/9DZizTGhl8CB04RdBD/Rpgeg4qUXWq+b97DXa/IINOk9plQBJGauwUjEC21/KzC5h8wgrXUrNriRB8ettI1wmme99vUR9ZdtIYca0Udj7lhN2vGFA1ub+BsxZZsODS1uyoPZncVb6tDgv2e4t0+Hnd5hv01yjZSnj0MPf5VwJlFLGg2DVUpbgyoCZPSi7ArvzDT2ydzjjZyut1GvKg7ivtHWUdy2U1xTWrLbGgW1O2Pq6ATs3GZQG9rIhGbGlYXFAoi7RHwwtmRZocV7AO0/psPZ+88roGj1wt4Xyu5pVCdhgWKkggVUGqs9lV5Kw/e/0bbMRr/1Zp4w3A9e9g7puS6eUpwivv6jjYsGId14zKBfO2sSGBpW2GVr6swpNJ2UVJk6r4JU5AuIIH09z2SnycB2Jwt1SBToFVEZjCZgE7hrYQaV8gLB7CbuLsDtZeZIM8e/gNmeEzzU/bj1EXbe9SSHAdyz7rpNyMZFcWEpbGlJL+yAdkP6sQkt5yypMnFWzLeCiqlydkvH/WWuF+++ywNM8CqR8f4rnybmSVQmYBE4tYxU2e2t/ZamlLMGXJKj+7XvHCf/xazsVWBZLcivqS20k1UnhnrtYzoOARdukfFjau6S0vwh6oE+Ls+K0Cq5sNijpmw3H9FyC6pWjfBbIf4P2Z1WucQ2sZHYAVipMYCX4Wwf5tv0NIza/pMcEC/MuKpX6UpONwqdyS/T59RrserO/nAdL6TNsUOnPg6ClvNWBTJxVwSXjAiLwSgAGSf1OgiOg0i3kfyVwEkC1z5phB0pZgR0o5cHazyz7zjbPyX8UoC8zefETo0YN5c6GjWY5K1new5E6iwODRFGyrIzan4ce6NPipDg7GNwM/znJdyI1owKqZlWq5hpYtqX2W/FhG4HFn13/MHJaclL68NG9kxAbYV5qZgnQl5m8sgCuOqDVjEBs5O34xSorPPGoPf7yrFYpGWlEpqpDHL1zs5xwdLcRx/YaUUCd2Nevwv0GFJmlx8kD/49kbz1I8n+F+wy8BregvN5x6hhXUvlsI2+XE3J2ChgTsMVJgRZ/XnjaEWsftMOdGZaY4zWGyTIvM18RoOuxtZRyZ3KwRo4YotxlMOpHwsNtFAI5qEXPG4+0JAusyJyANasm4sF7rPDYr23w37+1xdOP22LDOju8+JQdXnrGHq88a4+NG+zx+vMOil57np+fs8er/E5+e/FpOzz3ezv84b/ssH6tLX73kA0evtca991thdXLLJFuslCyFxwwFjPZvkE3EpYThmHYUDPgYBVTkrzrtqnU/ZS8DijPc5R5+SaW7IcLqReoBdQ3fk1CnsDL89koSp7tPEI9Q8mKbCcljzKLKHmaKNu005Q4cYm6Sr1PfUh9TEn1iOQtWvkskt/kaYYE9gLVR7VT9VQpdYzaRcmbPRsoectPFhcRlCslO7vvzYZRoyhxQlZt8r6VzImOlJ6SVwudBo7yVrx8p6XsKbk3NYGSd0ZkivzRfrTrtttu+z/Auulgd1nWHQAAAABJRU5ErkJggg==' alt='' />" + msg +
                "</p></div><div class='modal-footer'>" +
                "<button class='btn btn-primary' ng-click='yes()'><i class='fa fa-check-square-o'></i> Yes </button>" +
                "<button class='btn btn-default' ng-click='no()'><i class='fa fa-ban'></i> No</button></div>";

            var confirmModal = {
                ngClass: "delModal",
                template: template,
                controller: ["$scope", "$uibModalInstance", function (confirm, $uibModalInstance) {
                    confirm.yes = function () {
                        $uibModalInstance.close(true);
                    };

                    confirm.no = function () {
                        $uibModalInstance.close(false);
                    };
                }],
            };

            $scope.confirmAction = function () {
                $uibModal.open(confirmModal).result.then(function (success) {
                    if (success) {
                        $timeout(function () {
                            $scope.$apply("onConfirm()");
                        });
                    }
                });
            };
        }],
        'transclude': true,
        'template': function (element, attribs) {
            var view = "<a href='' ng-click='confirmAction()' ng-transclude></a>";
            return view;
        }
    };
}]);

alcomponents.directive("filterBox", [function () {
    return {
        'restrict': "E",
        'transclude': true,
        'scope': {
            advance: "=",
            onSearch: "&"
        },
        'link': function (scope, element, attrs) {
            //Prevent filter box from closing on input/form click
            $(".filterBox .elements").click(function (e) {
                e.stopPropagation();
            });

            if (!scope.advance) {
                element.addClass("col-sm-3");
            };

            $("#filterForm").bind("submit", function (e) {
                scope.$apply("onSearch()");
            });
        },
        'controller': ["$scope", function ($scope) {
            $scope.$parent.filter = {};
        }],
        'template': function (tElement, tAttrs) {
            var placeholder = tAttrs["placeholder"] ? tAttrs["placeholder"] : "Search ...";
            var name = tAttrs["name"];
            var advance = tAttrs["advance"];
            var view = "<div class=''>" +
                "<form role='form' id='filterForm'>" +
                "<div class='input-group form-group clear-margin-right'>";

            view += (name) ? "<input type='text' class='form-control' ng-model='$parent.filter."
                + name + "' placeholder='" + placeholder + "' />" :
                "<button type='button' class='btn btn-default no-margin'>Filter</button>";

            var advanceView = "<div class='input-group-btn advance_search'>";
            advanceView += (name) ? "<button type='submit' class='btn btn-default'><i class='fa fa-search icon_only'></i></button>" : ""
            advanceView += "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>" +
            "<span class='caret'></span></button>" +
            "<ul class='dropdown-menu dropdown-menu-right filterBox' role='menu'>" +
            "<div class='elements'>" +
            "<li><p class='text-center'>---- Advance Search ----</p></li>" +
            "<div ng-transclude></div></div><li>" +
            "<button type='submit' class='btn btn-primary btn-block'>" +
            "<i class='fa fa-search'></i>Search</button></li></ul></div></div>";

            var simpleView = "<span class='input-group-btn'>" +
                "<button class='btn btn-default' type='submit'><i class='fa fa-search icon_only'></i></button>" +
                "</span></div>";

            view += advance ? advanceView : simpleView;
            view += "</form></div>";

            return view;
        },
        'replace': true
    };
}]);


alcomponents.directive("fileread", [function () {
    return {
        'scope': {
            fileread: "="
        },
        'link': function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);

alcomponents.directive("gridControls", [function () {
    return {
        'restrict': "E",
        'transclude': true,
        'replace': true,
        'template': "<div class='grid_controls' ng-transclude></div>"
    };
}]);

alcomponents.directive("panel", [function () {
    return {
        'scope': {},
        'restrict': "E",
        'transclude': true,
        'replace': true,
        'template': function (tElement, tAttrs) {
            var type = tAttrs["type"] ? tAttrs["type"] : "panel";
            var skin = tAttrs["skin"] ? tAttrs["skin"] : "default";
            return "<div class='" + type + " " + type + "-" + skin + "' ng-transclude></div>";
        }
    };
}]);

alcomponents.directive("panelHeader", [function () {
    return {
        'scope': {
            title: "@",
        },
        'restrict': "E",
        'require': "^panel",
        'transclude': true,
        'replace': true,
        'template': function (element, attribs) {
            var type = element.parent().attr("type") ? element.parent().attr("type") : "panel";
            var view = type == "box" ? "<div class='box-header'><h3 class='box-title'>{{title}}</h3><div class='box-tools pull-right' ng-transclude></div></div>"
                : "<div class='panel-heading'>{{title}}<p ng-transclude></p></div>";
            return view;
        }
    };
}]);

alcomponents.directive("panelBody", [function () {
    return {
        'scope': {},
        'restrict': "E",
        'require': "^panel",
        'transclude': true,
        'replace': true,
        'template': function (element, attribs) {
            var type = element.parent().attr("type") ? element.parent().attr("type") : "panel";
            return "<div class='" + type + "-body' ng-transclude></div>";
        }
    };
}]);

alcomponents.directive("panelFooter", [function () {
    return {
        'scope': {},
        'restrict': "E",
        'require': "^panel",
        'transclude': true,
        'replace': true,
        'template': function (element, attribs) {
            var type = element.parent().attr("type") ? element.parent().attr("type") : "panel";
            return "<div class='" + type + "-footer' ng-transclude></div>";
        }
    };
}]);

alcomponents.directive("draggable", ["$document", function ($document) {
    "use strict";
    return function (scope, element) {
        var startX = 0,
            startY = 0,
            x = 0,
            y = 0;
        element.on("mousedown", function (event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on("mousemove", mousemove);
            $document.on("mouseup", mouseup);

            element.css({
                position: "fixed",
                cursor: "move"
            });
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
                top: y + "px",
                left: x + "px"
            });
        }

        function mouseup() {
            element.css({
                cursor: "default"
            });
            $document.unbind("mousemove", mousemove);
            $document.unbind("mouseup", mouseup);
        }
    };
}]);

alcomponents.directive("loading", [function () {
    return {
        'scope': {},
        'restrict': "E",
        'replace': true,
        'template': function (tElement, tAttrs) {
            var text = tAttrs["text"] ? tAttrs["text"] : "Loading...";
            return "<span class='loading'><i class='fa fa-spinner fa-spin fa-2x'></i> <b>" + text + "</b> </span>";
        }
    };
}]);

alcomponents.directive("action", [function () {
    return {
        'restrict': "E",
        'transclude': true,
        'replace': true,
        'scope': {},
        'template': function (tElement, tAttrs) {
            var icon = tAttrs["icon"] ? tAttrs["icon"] : "";
            var view = "<a href=''><i class='" + icon + "'></i> <span ng-transclude></span></a>";
            return view;
        }
    };
}]);

alcomponents.directive("keyEnter", function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.keyEnter);
                });

                event.preventDefault();
            }
        });
    };
});

alcomponents.directive('btnLoading', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(
                function () {
                    return scope.$eval(attrs.btnLoading);
                },
                function (loading) {
                    if (loading) {
                        if (!attrs.hasOwnProperty('ngDisabled')) {
                            element.addClass('disabled').attr('disabled', 'disabled');
                        }

                        element.data('resetText', element.html());
                        element.html(element.data('loading-text'));
                    } else {
                        if (!attrs.hasOwnProperty('ngDisabled')) {
                            element.removeClass('disabled').removeAttr('disabled');
                        }
                        element.html(element.data('resetText'));
                    }
                }
            );
        }
    };
});