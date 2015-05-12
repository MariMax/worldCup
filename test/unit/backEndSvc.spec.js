'use strict';

describe('DataService', function() {

    var backEndSvc, $rootScope, backEnd;
    beforeEach(module('worldCup'));


    beforeEach(angular.mock.inject(function($injector, $httpBackend) {
        backEnd = $httpBackend;
        backEnd.whenGET(/^.*$/).respond(function() {
            return [200, [{},{},{}], {}];
        });

        backEndSvc = $injector.get('backEnd');

        $rootScope = $injector.get('$rootScope');
    }));

    afterEach(function() {
        backEndSvc = undefined;
        backEnd.verifyNoOutstandingExpectation();
        backEnd.verifyNoOutstandingRequest();
    });


    it('should has getGroups property', function() {
        expect(backEndSvc.getGroups).toBeDefined();
    });

    it('should ask data from remote server', function(){
        var promise = backEndSvc.getGroups();

        $rootScope.$digest();
        promise.then(function(groups){
            expect(groups.length). toBeTruthy();
        })
    });

});
