'use strict';

angular.module('homeModule').factory('enums', function() {
    return {
        table: 'app/home/views/table.html',
        chart: 'app/home/views/chart.html',
        unsupported:'app/home/views/unsupported.html',
        notFound:'app/home/views/notFound.html'
    };
});
