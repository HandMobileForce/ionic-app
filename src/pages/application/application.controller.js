(function () {
  'use strict';
  angular
    .module('applicationModule')
    .controller('applicationCtrl', applicationCtrl);
  /* @ngInject */
  function applicationCtrl($scope, $state, baseConfig, hmsHttp, hmsPopup, cacheService) {
    var applicationVM = this;
    applicationVM.goList = goList;

    getData();
    $scope.$on('$stateChangeSuccess', function (event, toState) {
      //页面回退需要重新请求数据
      if (toState.url == '/tab') {
        getData();
      }
    });

    //请求数据（从cacheService或者接口请求数据）
    function getData() {
      if (!cacheService.get('menuList')) {
        hmsPopup.showLoading('请求中...');
        fetchData();
      } else {
        handleData(cacheService.get('menuList'));
        fetchData();
      }
    }

    //获取菜单列表数据
    function fetchData() {
      var url = baseConfig.interfacePath + 'appUpdateSce';
      hmsHttp.post(url, {
        "appEquipment": ionic.Platform.isIOS() ? 'iOS' : 'Android'
      }).then(function (response) {
        hmsPopup.hideLoadingDelay();
        // //填充空对象
        // for (var key in response.menuCateories) {
        //   response.menuCateories[key].map(function (item) {
        //     while (item.menus.length % 4 !== 0) {
        //       item.menus.push({});
        //     }
        //   });
        // }
        handleData(response);
        cacheService.set('menuList', response);
      });
    }

    //处理获取到的数据
    function handleData(data) {
      applicationVM.commonsMenus = data.menuCateories.commonsApplication[0].menus.slice(0, 11);
      applicationVM.commonsMenus.push({
        menuIcon: 'build/assets/img/application/all@3x.png'
      });
      applicationVM.categroyMenus = data.menuCateories.categoryMenus;
      applicationVM.categroyMenus.push({
        categoryIcon: 'build/assets/img/application/entire@3x.png',
        cateoryName: '全部'
      });
    }

    //页面跳转应用列表
    function goList(item) {
      if (item.cateoryName != '全部') {
        $state.go('type-list', {type: item.cateoryName});
      }
    }
  }
})();
