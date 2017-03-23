/**
 * Created by gusenlin on 2017/1/22.
 */
(function () {
  'use strict';

  /*angular
   .module('myInfoModule')
   .config(config);

   function config($stateProvider) {
   $stateProvider
   .state('tab.face-ecognition', {
   url: '/myInfo/face-ecognition',
   params: {},
   views: {
   'tab-myInfo': {
   prefetchTemplate: false,
   templateUrl: 'build/pages/myInfo/face-ecognition/face-ecognition.html',
   controller: 'faceEcognitionCtrl',
   controllerAs: 'vm'
   }
   }
   })
   }*/

  angular
    .module('messageModule')
    .controller('tabCtrl', tabCtrl);

  tabCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$state',
    '$http',
    '$ionicHistory',
    '$timeout'];

  function tabCtrl($scope,
                   $stateParams,
                   $state,
                   $http,
                   $ionicHistory,
                   $timeout) {
    var vm = this;

    $timeout(function () {
      window.localStorage.needGuid = "true"
      window.localStorage.userToken = ""
    },2000)

    vm.tabArray = [
      {
        "isActive": true,
        "name": "消息",
        "onIcon": "hms-tab-message-on",
        "offIcon": "hms-tab-message-off"
      },
      {
        "isActive": false,
        "name": "应用",
        "onIcon": "hms-tab-application-on",
        "offIcon": "hms-tab-application-off"
      },
      {
        "isActive": false,
        "name": "通讯录",
        "onIcon": "hms-tab-contact-on",
        "offIcon": "hms-tab-contact-off"
      },
      {
        "isActive": false,
        "name": "我的",
        "onIcon": "hms-tab-mine-on",
        "offIcon": "hms-tab-mine-off"
      }
    ];

    vm.clickTab = clickTab;

    function clickTab(tab) {
      angular.forEach(vm.tabArray,function (data) {
        data.isActive = false;
      });

      tab.isActive = true;
    }
  }
})();
