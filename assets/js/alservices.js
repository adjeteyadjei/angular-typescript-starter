var module = angular.module("alcoder.services", []);

module.service("DataAdapter", ["$http", "$q", function($http, $q) {
    var store = {};

    function loadData(model) {
        var d = $q.defer();
        $http.get("/api/" + model).then(function(res) {
            if (res.data.success) {
                store[model] = res.data.data;
            }
            return d.resolve(res.data.data);
        });
        return d.promise;
    }

    return {
        get: function(model) {
            var d = $q.defer();
            if (!store[model]) {
                loadData(model).then(function(data) {
                    return d.resolve(data);
                });
            } else {
                setTimeout(function() {
                    return d.resolve(store[model]);
                }, 1000);
            }
            return d.promise;
        },
        reload: function(model) {
            loadData(model).then(function(data) {
                return data;
            });
        },
        store: function(name, item) {
            store[name] = item;
        },
        retrieve: function(name) {
            return store[name];
        }
    };
}]);

module.factory("XLSXReaderService", ["$q", "$rootScope", function($q, $rootScope) {
    var service = function(data) {
        angular.extend(this, data);
    };

    service.readFile = function(file, readCells, toJSON) {
        var deferred = $q.defer();

        XLSXReader(file, readCells, toJSON, function(data) {
            $rootScope.$apply(function() {
                deferred.resolve(data);
            });
        });

        return deferred.promise;
    };
    return service;
}]);

module.filter("characters", function() {
    return function(input, chars, breakOnWord) {
        if (isNaN(chars)) return input;
        if (chars <= 0) return "";
        if (input && input.length > chars) {
            input = input.substring(0, chars);

            if (!breakOnWord) {
                var lastspace = input.lastIndexOf(" ");
                //get last space
                if (lastspace !== -1) {
                    input = input.substr(0, lastspace);
                }
            } else {
                while (input.charAt(input.length - 1) === " ") {
                    input = input.substr(0, input.length - 1);
                }
            }
            return input + "…";
        }
        return input;
    };
});

module.filter("splitcharacters", function() {
    return function(input, chars) {
        if (isNaN(chars)) return input;
        if (chars <= 0) return "";
        if (input && input.length > chars) {
            var prefix = input.substring(0, chars / 2);
            var postfix = input.substring(input.length - chars / 2, input.length);
            return prefix + "..." + postfix;
        }
        return input;
    };
});

module.filter("words", function() {
    return function(input, words) {
        if (isNaN(words)) return input;
        if (words <= 0) return "";
        if (input) {
            var inputWords = input.split(/\s+/);
            if (inputWords.length > words) {
                input = inputWords.slice(0, words).join(" ") + "…";
            }
        }
        return input;
    };
});
