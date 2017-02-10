/**
 * Created by gusenlin on 2017/1/22.
 */
(function () {
    'use strict';

    angular
        .module('applicationModule')
        .controller('applicationCtrl', applicationCtrl);

    applicationCtrl.$inject = [
        '$scope',
        '$stateParams',
        '$state',
        '$http',
        '$ionicHistory',
        '$timeout',
        'applicationService'];

    function applicationCtrl($scope,
                             $stateParams,
                             $state,
                             $http,
                             $ionicHistory,
                             $timeout,
                             applicationService) {
        var vm = this;

        vm.menuList = applicationService.getAppData().returnData;

        vm.goPage = goPage;

        function goPage(item) {
          console.log('item ' + angular.toJson(item));
          $state.go(item.destUrl);
        }
    }
})();
