/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular.module('mineModule')
    .controller('mineDetailCtrl', mineDetailCtrl);
  /* @ngInject */
  function mineDetailCtrl(cacheService) {
    var mineDetailVM = this;

    mineDetailVM.info = cacheService.get('mine');
  }
})();
