'use strict';

angular.module('homeModule').controller('ErrCtrl', function($scope, error, loader) {
        loader.loader = false;
        $scope.error = error;
    });
