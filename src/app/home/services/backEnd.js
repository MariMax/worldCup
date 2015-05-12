'use strict';

angular.module('homeModule').factory('backEnd', function(baseUrl, $http, loader) {
    return {
        getGroups: function() {
            loader.loader = true;
            return $http.get(baseUrl + '/teams/group_results').then(function(resp) {
            	loader.loader = false;
                return resp.data;
            });
        }
    };
});
