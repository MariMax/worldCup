'use strict';

describe('DetailsCtrl', function() {
    var createController, scope, $state;
    beforeEach(module('worldCup'));
    //beforeEach(module('homeModule'));

    beforeEach(inject(function($injector) {
        // Get hold of a scope (i.e. the root scope)
        var $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        $state = $injector.get('$state');

        createController = function(groupId, mode) {
            scope = $rootScope.$new();
            $state.params.mode = mode;
            $state.params.groupId = groupId;
            $controller('ListCtrl', {
                '$scope': scope,
                '$state':$state,
                'groups':[]
            });
        };
    }));

    afterEach(function() {
        scope = undefined;
    });


    it('should set injected params', function() {
        expect(scope).toBeUndefined();
        var groupId = 1;
        var mode = 'table';
        createController(groupId, mode);

        expect(scope.activeItem).toBe(groupId);
        expect(scope.activeMode).toBe(mode);

    });

    it('should update injected params on stateChangeSuccess', function() {
        expect(scope).toBeUndefined();
        var groupId = 1;
        var mode = 'table';
        createController(groupId, mode);

        expect(scope.activeItem).toBe(groupId);
        expect(scope.activeMode).toBe(mode);

        scope.$broadcast('$stateChangeSuccess', {something:'something'}, {groupId:5, mode:'chart'});
        scope.$digest();

        expect(scope.activeItem).toBe(5);
        expect(scope.activeMode).toBe('chart');

    });

});
