(function () {
  angular.module('applicationModule')
    .controller('typeListCtrl', typeListCtrl);
  /** @ngInject */
  function typeListCtrl(cacheService, $stateParams) {
    var typeListVM = this;
    var menuList;

    //从url参数中获取应用类型
    typeListVM.type = $stateParams.type;
    //从cacheService获取数据，并筛选出只符合url上应用类型的列表数据
    menuList = cacheService.get('menuList').menuCateories.categoryMenus;
    for (var i = 0, len = menuList.length; i < len; i++) {
      if (typeListVM.type == menuList[i].cateoryName) {
        typeListVM.menus = menuList[i].menus.filter(function (item) {
          return item.hasOwnProperty('menuName');
        });
        break;
      }
    }

  }
})();
