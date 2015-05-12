'use strict';

describe('controllers', function() {
    var createController, scope, enums, $state;
    beforeEach(module('worldCup'));
    //beforeEach(module('homeModule'));

    beforeEach(inject(function($injector) {
        // Get hold of a scope (i.e. the root scope)
        var $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');
        
        enums = $injector.get('enums');

        $state = $injector.get('$state');

        

        createController = function(mode, item) {
            scope = $rootScope.$new();
            $state.params.mode = mode;
            $controller('DetailsCtrl', {
                '$scope': scope,
                'item':item,
                '$state':$state,
                'enums':enums
            });
        };
    }));

    afterEach(function() {
        scope = undefined;
    });


    it('should set table view', function() {
        expect(scope).toBeUndefined();
        var view = 'table';
        createController(view, {});

        expect(scope.currentView).toBe(view);
        expect(scope.mode).toBe(enums.table);

    });

    it('should set chart view', function() {
        expect(scope).toBeUndefined();
        var view = 'chart';
        createController(view,{});

        expect(scope.currentView).toBe(view);
        expect(scope.mode).toBe(enums.chart);

    });

    it('should set unsupported view', function() {
        expect(scope).toBeUndefined();
        var view = 'wrongWay';
        createController(view, {});

        expect(scope.currentView).toBe(view);
        expect(scope.mode).toBe(enums.unsupported);

    });

    it('should set notFound view', function() {
        expect(scope).toBeUndefined();
        var view = 'notFound';
        createController(view);

        expect(scope.currentView).toBe(view);
        expect(scope.mode).toBe(enums.notFound);

    });

    it('should return unsupported view if user trying to reach notFound', function() {
        expect(scope).toBeUndefined();
        var view = 'notFound';
        createController(view, {});

        expect(scope.currentView).toBe(view);
        expect(scope.mode).toBe(enums.unsupported);

    });


});
