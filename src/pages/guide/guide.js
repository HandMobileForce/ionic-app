/**
 * Created by gusenlin on 16/5/16.
 */

(function () {
  'use strict';

  angular
    .module('applicationModule')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('guide', {
        url: '/guide',
        params: {},
        prefetchTemplate: true,
        templateUrl: 'build/pages/guide/guide.html',
        controller: 'guideCtrl'
      })
  }

  angular
    .module('applicationModule')
    .controller('guideCtrl', guideCtrl);

  guideCtrl.$inject = [
    '$scope',
    '$state',
    'baseConfig',
    'checkVersionService',
    'guideService'];

  function guideCtrl($scope,
                     $state,
                     baseConfig,
                     checkVersionService,
                     guideService) {

    console.log('loginCtrl.enter');
    console.log("guide");
    window.localStorage.needGuid = "false";
    if (ionic.Platform.isAndroid()) {
      $scope.actualHeight = {
        "height": screen.height - 18 + "px"
      };
    } else {
      $scope.actualHeight = {
        "height": screen.height + "px"
      };
    }
    $scope.clientHeight = 'height: ' + document.body.clientHeight + 'px';
    $scope.skipGuide = function () {
      if (baseConfig.debug) {
        console.log("跳过导航页到登陆页");
      }
      goToMain();
    };

    $scope.toLogin = function () {
      if (baseConfig.debug) {
        console.log("跳过导航页到登陆页");
      }
      goToMain();
    };

    var goToMain = function () {

      console.log('window.localStorage.userToken ' + window.localStorage.userToken)
      if (window.localStorage.userToken && window.localStorage.userToken != "") {
        $state.go("tab.message");
      } else {
        $state.go("login");
      }
    };

    $scope.$on('$ionicView.enter', function () {
      if (baseConfig.debug) {
        console.log('guideCtrl.$ionicView.enter');
      }
    });

    $scope.$on('$destroy', function () {
      if (baseConfig.debug) {
        console.log('guideCtrl.$destroy');
      }
    });
  }
})();
