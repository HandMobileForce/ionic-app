/**
 * Created by gusenlin on 2017/1/22.
 */
(function () {
  'use strict';

  angular
    .module('applicationModule')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'build/pages/application/search.html',
        controller: 'searchCtrl',
        controllerAs: 'vm'
      })
  }

  angular
    .module('applicationModule')
    .controller('searchCtrl', searchCtrl);

  searchCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$state',
    '$http',
    '$ionicHistory',
    '$timeout',
    '$ionicGesture'];

  function searchCtrl($scope,
                      $stateParams,
                      $state,
                      $http,
                      $ionicHistory,
                      $timeout,
                      $ionicGesture) {
    var vm = this;

    /*$timeout(function () {
     var object = document.getElementById("inputDemo");

     console.log('object document.getElementById');

     object.addEventListener('touch', function (e) {
     console.log('object.touchstart');
     })
     }, 500);*/

    $scope.buttonStyle = {
      "display": "block"
    };

    var object;

    $timeout(function () {
      object = document.getElementById("index-kw");
    }, 100);

    /*$scope.clickOut = function () {
      console.log('vm.click');

      if ($scope.buttonStyle.display == 'none') {
        $scope.buttonStyle = {
          "display": "block"
        };
      } else {
        $timeout(function () {
          //object.focus();
        }, 0);
        $scope.buttonStyle = {
          "display": "none"
        };

      }
    };*/

    var preventEvent = function (e) {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      return false
    };

    $scope.inputText = '121212121';

    $timeout(function () {
      //var indexKw = document.getElementById("");
      //var indexCrossId = document.getElementById("index-cross-id");
      console.log('object document.getElementById');
      $('#index-kw').focus();
      $('#index-cross-id').bind("touchstart mousedown click", function (e) {
        console.log('touchstart mousedown click');
        $('#index-kw').val('').focus();
        //$('#index-cross-id').style.display = 'none';
        preventEvent(e)

        $timeout(function () {
          console.log($scope.inputText)
          console.log($('#index-kw').val())
        },0)
      });
    }, 500);


    /*var element = angular.element(document.querySelector('#inputDemo'));
     $ionicGesture.on("touch", function (e) {
     console.log('$ionicGesture.touch');
     }, element)*/
  }
})();
