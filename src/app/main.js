'use strict';

angular.module('worldCup', ['homeModule', 'configModule'])
    .config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/groupList');

    })
    .factory('loader', function(){return {loader:true};})
    .controller('globalCtrl', function($scope, loader){
    	$scope.loader = loader;
    });

//this file will be executed after all, so all requests that we didn't mock we should pass
angular.module('worldCup').run(function($httpBackend, allowPassThrough) {
    if (allowPassThrough){
        $httpBackend.whenGET(/.*/).passThrough();
        $httpBackend.whenPUT(/.*/).passThrough();
        $httpBackend.whenPOST(/.*/).passThrough();
        $httpBackend.whenDELETE(/.*/).passThrough();
    }
});