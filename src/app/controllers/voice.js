'use strict';

angular.module('yamm').controller('voiceCtrl',
    ['$scope', '$rootScope', '$timeout',
        function($scope, $rootScope, $timeout) {
            
            // this.command = [];
            
            // const fadeout = () => {
            //     $timeout(() => {
            //         this.command.pop();
            //     }, 2000);
            // }
            // annyang.addCommands({
            //     'go away': () => {
            //         this.command[0] = 'go away';
            //         $rootScope.$broadcast('hide');
            //         fadeout();
            //     },
            //     'come back': () => {
            //         this.command[0] = 'come back';
            //         $rootScope.$broadcast('show');
            //         fadeout();
            //     },
            //     'start timer': () => {
            //         this.command[0] = 'start timer';
            //         $rootScope.$broadcast('start timer');
            //         fadeout();
            //     },
            //     'stop': () => {
            //         this.command[0] = 'stop';
            //         $rootScope.$broadcast('stop');
            //         fadeout();
            //     }
            // });
            
            // annyang.start();
        }]
)