'use strict';

angular.module('yamm').controller('todoCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            var getTodos = () => {
                api.getTodos().then(data => {
                    $scope.todos = data;
                });
            }

            $scope.visible = true;            
            $scope.$on('hide', (event, arg) => {
                $scope.visible = false;
            });
            
            $scope.$on('show', (event, arg) => {
                $scope.visible = true;
            })


            getTodos();

            $interval(getTodos, 60000);
        }]
)
