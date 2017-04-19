/**
 * Created by hunter.he on 2016/11/16.
 */
(function () {
  'use strict';
  angular.module('myApp').config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('type-list', {
        url: '/type-list',
        params: {type: null},
        templateUrl: 'build/pages/application/type-list/type-list.html',
        controller: 'typeListCtrl',
        controllerAs: 'typeListVM'
      });
  }
})();
