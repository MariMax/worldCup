'use strict';

angular.module('homeModule').config(function($stateProvider) {
    $stateProvider
        .state('groupList', {
            url: '/groupList',
            templateUrl: 'app/home/views/groupSelector.html',
            controller: 'ListCtrl',
            resolve: {
                groups: function(dataSvc) {
                    return dataSvc.getGroups();
                }
            }
        })
        .state('groupList.item', {
            url: '/{groupId:int}/{mode:string}',
            templateUrl: 'app/home/views/groupDetails.html',
            controller: 'DetailsCtrl',
            resolve: {
                item: function(dataSvc, $stateParams) {
                    return dataSvc.getItem($stateParams.groupId);
                }
            }
        })
        .state('error', {
            url: '/backEndError',
            templateUrl: 'app/home/views/Error.html',
            controller: 'ErrCtrl',
            resolve: {
                error: function() {
                    return this.self.error;
                }
            }
        });
});
