'use strict';

angular.module('yamm').controller('voiceCtrl',
    ['$scope', '$rootScope', '$timeout',
        function($scope, $rootScope, $timeout) {
            
            // this.commands = [];
            
            // const fadeout = () => {
            //     $timeout(() => {
            //         this.commands.pop();
            //     }, 2500);
            // }
            // annyang.addCommands({
            //     'go away': () => {
            //         this.commands.push('go away');
            //         $rootScope.$broadcast('hide');
            //         fadeout();
            //     },
            //     'come back': () => {
            //         this.commands.push('come back');
            //         $rootScope.$broadcast('show');
            //         fadeout();
            //     },
            //     'start timer': () => {
            //         this.commands.push('start timer');
            //         $rootScope.$broadcast('start timer');
            //         fadeout();
            //     },
            //     'stop': () => {
            //         this.commands.push('stop');
            //         $rootScope.$broadcast('stop');
            //         fadeout();
            //     }
            // });
            
            // annyang.start();
        }]
)