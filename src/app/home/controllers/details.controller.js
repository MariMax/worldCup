'use strict';

angular.module('homeModule').controller('DetailsCtrl', function($scope, item, $state, enums) {
        var scope = $scope;
        scope.item = item;

        scope.mode = enums[$state.params.mode]?enums[$state.params.mode]:enums.unsupported;
        scope.currentView = $state.params.mode;

        if ($state.params.mode === 'notFound'){
        	scope.mode = enums.unsupported;
        }

        if (!scope.item){
        	scope.mode = enums.notFound;
        }

    });
