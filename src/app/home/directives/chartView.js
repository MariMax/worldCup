'use strict';

angular.module('homeModule').directive('chartView', function(colorGenerator, $window) {
    return function($scope, element) {
        var content = _.map($scope.item.teams, function(teamData) {
            return {
                'label': teamData.team.country,
                'color': colorGenerator.getColor(),
                'value': teamData.team.points
            };
        });
        var pie;

        function initPie() {
            pie = new d3pie('pie-chart', {
                'size': {
                    'canvasWidth': element[0].clientWidth,
                    'canvasHeight': 350,
                    'pieInnerRadius': '30%',
                    'pieOuterRadius': '90%'
                },
                'data': {
                    'sortOrder': 'value-desc',
                    'content': content
                },
                'labels': {
                    'outer': {
                        'pieDistance': 15
                    },
                    'inner': {
                        'hideWhenLessThanPercentage': 3
                    },
                    'mainLabel': {
                        'color': '#fffeff',
                        'fontSize': 15
                    },
                    'percentage': {
                        'color': '#ffffff',
                        'decimalPlaces': 0
                    },
                    'value': {
                        'color': '#adadad',
                        'fontSize': 11
                    },
                    'lines': {
                        'enabled': true
                    },
                    'truncation': {
                        'enabled': true
                    }
                },
                'effects': {
                    'pullOutSegmentOnClick': {
                        'effect': 'linear',
                        'speed': 400,
                        'size': 8
                    }
                },
                'misc': {
                    'gradient': {
                        'enabled': true,
                        'percentage': 100
                    }
                }
            });
        }

        angular.element($window).bind('resize', function() {
        	pie.updateProp('size.canvasWidth', element[0].clientWidth);
        });

        initPie();

        $scope.$on('$destroy', function() {
            pie = null;
            angular.element($window).unbind('resize');
        });

    };
});
