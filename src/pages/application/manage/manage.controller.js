(function () {
  angular.module('applicationModule')
    .controller('manageCtrl', manageCtrl);
  /** @ngInject */
  function manageCtrl(cacheService, baseConfig, hmsHttp) {
    var manageVM = this;
    manageVM.isModify = false;
    manageVM.manageMenu = manageMenu;
    manageVM.addTo = addTo;
    manageVM.deleteMenu = deleteMenu;
    manageVM.dropComplete = dropComplete;

    handleData(cacheService.get('menuList'));

    //处理进入时加载的数据
    function handleData(data) {
      //常用应用菜单列表
      manageVM.commonsApplication = angular.copy(data.menuCateories.commonsApplication[0]);
      //其他各种类型菜单列表
      manageVM.categroyMenus = angular.copy(data.menuCateories.categoryMenus);
    }

    //管理菜单数据
    function manageMenu() {
      manageVM.isModify = !manageVM.isModify;
    }

    //添加到常用应用
    function addTo(menuItem) {
      //如果已经添加到常用应用，则不做任何处理
      if (menuItem.isShow == 'Y') {
        return;
      }
      var menus = angular.copy(manageVM.commonsApplication.menus);
      menus = menus.map(function (item) {
        return item.menuId;
      });
      menus.push(menuItem.menuId);
      hmsHttp.post(baseConfig.interfacePath + 'insertOrDelOrSort', {
        menus: menus
      }).then(function () {
        hmsHttp.post(baseConfig.interfacePath + 'appUpdateSce', {
          "appEquipment": ionic.Platform.isIOS() ? 'iOS' : 'Android'
        }).then(function (response) {
          handleData(response);
          cacheService.set('menuList', response);
        });
      });
    }

    //删除常用应用
    function deleteMenu(menuItem) {
      var menus = angular.copy(manageVM.commonsApplication.menus);
      menus = menus.filter(function (item) {
        return item.menuId != menuItem.menuId;
      }).map(function (item) {
        return item.menuId;
      });
      hmsHttp.post(baseConfig.interfacePath + 'insertOrDelOrSort', {
        menus: menus
      }).then(function () {
        hmsHttp.post(baseConfig.interfacePath + 'appUpdateSce', {
          "appEquipment": ionic.Platform.isIOS() ? 'iOS' : 'Android'
        }).then(function (response) {
          handleData(response);
          cacheService.set('menuList', response);
        });
      });
    }

    //常用应用拖拽更新顺序
    function dropComplete(index, obj) {
      //找到拖动元素的索引，删除他，并在释放地方的索引上添加上这个元素
      var menus = angular.copy(manageVM.commonsApplication.menus);
      var idx = -1;
      for (var i = 0, len = menus.length; i < len; i++) {
        if (menus[i].menuId == obj.menuId) {
          idx = i;
          break;
        }

      }
      if (idx == -1) {
        return;
      }
      menus.splice(idx, 1);
      menus.splice(index, 0, obj);
      hmsHttp.post(baseConfig.interfacePath + 'insertOrDelOrSort', {
        menus: menus.map(function (item) {
          return item.menuId
        })
      }).then(function () {
        hmsHttp.post(baseConfig.interfacePath + 'appUpdateSce', {
          "appEquipment": ionic.Platform.isIOS() ? 'iOS' : 'Android'
        }).then(function (response) {
          handleData(response);
          cacheService.set('menuList', response);
        });
      });
    }
  }
})();
