'use strict';

angular.module('homeModule').controller('MainCtrl', function($scope, $state, groups) {
        var scope = $scope;
        scope.groups = groups;
        scope.activeItem = $state.params.groupId;
        scope.activeMode = $state.params.mode;

        scope.$on('$stateChangeSuccess', 
            function(event, toState, toParams){ 
                scope.activeItem = toParams.groupId;
                scope.activeMode = toParams.mode;
            });
    });
