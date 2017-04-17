/**
 * Created by hunter.he on 2016/11/16.
 */
(function () {
  'use strict';
  angular.module('myApp').config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('mine-detail', {
        url: '/mine-detail',
        templateUrl: 'build/pages/mine/mine-detail/mine-detail.html',
        controller: 'mineDetailCtrl',
        controllerAs: 'mineDetailVM'
      })
      .state('feedback', {
        url: '/feedback',
        templateUrl: 'build/pages/mine/feedback/feedback.html',
        controller: 'feedbackCtrl',
        controllerAs: 'feedbackVM'
      });
  }
})();
