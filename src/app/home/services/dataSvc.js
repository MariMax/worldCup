'use strict';

angular.module('homeModule').factory('dataSvc', function(backEnd, $q) {
    var groups = [];

    function getGroups() {
        var defer = $q.defer();
        if (groups.length) {
            defer.resolve(groups);
        } else {
            backEnd.getGroups().then(function(groupsData) {
                var _groups = _.map(groupsData, function(item) {
                    return item.group;
                });
                if (!groups.length) {
                    _.each(_groups, function(group) {
                        groups.push(group);
                    });
                }

                defer.resolve(groups);
            }, function(err) {
                defer.reject(err);
            });
        }

        return defer.promise;
    }

    function findById(id) {
        return _.find(groups, {
            id: id
        });
    }

    return {
        getGroups: getGroups,
        getItem: function(id) {
            var defer = $q.defer();
            var result;
            if (groups.length) {
                result = findById(id);
                defer.resolve(result);
            } else {
                getGroups().then(function() {
                    result = findById(id);
                    defer.resolve(result);
                }, function(err) {
                    defer.reject(err);
                });
            }

            return defer.promise;
        }
    };
});
