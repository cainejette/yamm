'use strict';

angular.module('yamm').controller('voiceCtrl',
    ['$scope', '$rootScope', '$timeout',
        function($scope, $rootScope, $timeout) {
            
            $scope.command = [];
            
            var commands = {
                'go away': () => {
                    $scope.command = ['go away'];
                    $rootScope.$broadcast('hide');
                    $timeout(() => {
                        $scope.command = [];
                    }, 2000);
                },
                'come back': () => {
                    $scope.command = ['come back'];
                    $rootScope.$broadcast('show');
                    $timeout(() => {
                        $scope.command = [];
                    }, 2000);
                }
            };
            
            annyang.addCommands(commands);
            annyang.start();
        }]
)