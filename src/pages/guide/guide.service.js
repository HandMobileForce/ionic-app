/**
 * Created by gusenlin on 16/9/21.
 */
(function () {
  'use strict';
  angular
    .module('applicationModule')
    .service('guideService', guideService);

  guideService.$inject = [
    'baseConfig'];

  function guideService(baseConfig) {
    var screenSize = {}
    this.setScreenSize = function (result) {
      screenSize = result;
    };

    this.getScreenSize = function () {
      return screenSize;
    }
  }
})();
