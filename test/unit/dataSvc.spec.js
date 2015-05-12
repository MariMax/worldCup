'use strict';

describe('DataService', function() {

    var _dataService, $rootScope, backEndMock;
    beforeEach(module('worldCup'));

    beforeEach(function(){
      backEndMock = {
        getGroups:function(){
        }
      };

      module(function ($provide) {
          $provide.value('backEnd', backEndMock);
      });
    });

    beforeEach(function(){
          var matchers = {
            toBeOfType: function(typeString) {
              return typeof this.actual == typeString;
            },
            isPromise: function(){
                return typeof this.actual.then === 'function'
            }
          };

          this.addMatchers(matchers);
    });

    beforeEach(inject(function($injector) {
        var $q = $injector.get('$q');
        backEndMock.getGroups = function(){
            var defer = $q.defer();
            defer.resolve([{group:{id:1}},{group:{id:2}},{group:{id:3}}]);
            return defer.promise;
        }

        $rootScope = $injector.get('$rootScope');

        _dataService = $injector.get('dataSvc');

    }));

    afterEach(function() {
        _dataService = undefined;
    });


    it('should has getGroups property and getItem', function() {
        expect(_dataService.getGroups).toBeDefined();
        expect(_dataService.getGroups).toBeOfType('function');

        expect(_dataService.getItem).toBeDefined();
        expect(_dataService.getItem).toBeOfType('function');
    });

    it('getGroups should return promise', function() {
        expect(_dataService.getGroups()).isPromise();
    });

    it('getGroups should resolve groups', function() {
        var promise = _dataService.getGroups();
        $rootScope.$digest();
        promise.then(function(groups){
            expect(groups.length).toBe(3);
        });

    });

    it('getItem should load groups and resolve item', function() {
        var promise = _dataService.getItem(2);
        $rootScope.$digest();
        promise.then(function(item){
            expect(item.id).toBe(2);
        });

    });

    it('getItem should resolve item on existing groups', function() {
        var promise = _dataService.getGroups();
        $rootScope.$digest();
        promise.then(function(groups){
            console.log(groups);
            expect(groups.length).toBe(3);
            return _dataService.getItem(2);
        }).then(function(item){
            expect(item.id).toBe(2);
        });

    });
});
