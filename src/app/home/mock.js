'use strict';

angular.module('homeModule').run(function($httpBackend, useGroupMock) {

    function returnGroupsLikeServer() {
        var groupResults;

        var request = new XMLHttpRequest();
        request.open('GET', '../mocks/serverData.json', false);
        request.send(null);
        groupResults = angular.fromJson(request.response);
        return groupResults;
    }
    if (useGroupMock === true){
        $httpBackend.whenGET(/.*\/group_results$/).respond(function() {
            return [200, returnGroupsLikeServer(), {}];
        });
    }

});
