(function () {
  angular.module('commonModule')
    .controller('commonCtrl', commonCtrl);
  /** @ngInject */
  function commonCtrl($scope, $ionicHistory, $state) {
    //页面跳转
    $scope.go = function (state) {
      $state.go(state);
    };

    //页面回退
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
  }
})();
