(function () {
  'use strict';
  angular
    .module('applicationModule')
    .controller('applicationCtrl', applicationCtrl);
  /* @ngInject */
  function applicationCtrl($state, baseConfig, hmsHttp, hmsPopup, cacheService) {
    var applicationVM = this;
    applicationVM.goPage = goPage;

    getData();

    //请求数据（从cacheService或者接口请求数据）
    function getData() {
      if (!cacheService.get('menuList')) {
        hmsPopup.showLoading('请求中...');
        fetchData();
      } else {
        applicationVM.menuList = cacheService.get('menuList');
        fetchData();
      }
    }

    //获取菜单列表数据
    function fetchData() {
      var url = baseConfig.interfacePath + 'appUpdate';
      hmsHttp.post(url, {
        "appEquipment": ionic.Platform.isIOS() ? 'iOS' : 'Android'
      }).then(function (response) {
        hmsPopup.hideLoadingDelay();
        //填充空对象
        response.menuCateories.map(function (item) {
          while (item.menus.length % 4 !== 0) {
            item.menus.push({});
          }
        });
        applicationVM.menuList = response;
        cacheService.set('menuList', response);
      });
    }

    //页面跳转
    function goPage(item) {
      console.log('item ' + angular.toJson(item));
      $state.go(item.destUrl);
    }
  }
})();
