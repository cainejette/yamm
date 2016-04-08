'use strict';

angular.module('yamm').controller('todoCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            const getTodos = () => {
                api.getTodos().then(data => {
                    this.todos = data;
                });
            }

            this.visible = true;
            $scope.$on('hide', (event, arg) => {
                this.visible = false;
            });

            $scope.$on('show', (event, arg) => {
                this.visible = true;
            })

            getTodos();

            $interval(getTodos, 60000);
        }]
)
