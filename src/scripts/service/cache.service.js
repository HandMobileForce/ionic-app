(function () {
  angular.module('utilModule')
    .service('cacheService', cacheService);
  /* @ngInject */
  function cacheService() {
    //缓存service
    var _variables = {};

    return {
      get: function (varname) {
        return (typeof _variables[varname] !== 'undefined') ? _variables[varname] : false;
      },
      set: function (varname, value) {
        _variables[varname] = value;
      }
    }
  }
})();
