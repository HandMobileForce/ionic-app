/**
 * Created by gusenlin on 2017/1/22.
 */
(function () {
  'use strict';
  angular
    .module('applicationModule')
    .service('applicationService', applicationService);

  applicationService.$inject = ['$http', '$timeout', 'baseConfig'];

  function applicationService($http, $timeout, baseConfig) {

    var appData = {
      "appVersion": "1.1.3",
      "minVersion": "1.0.0",
      "appVersionInfo": "1:修复联系人快速进入可能出现闪退情况&&2:修改查看大图的样式。",
      "appResource": "https://www.pgyer.com/yDka",
      "appUpdateType": "ApplicationStore",
      "menuCateories": [{
        "cateoryName": "C类",
        "menus": [{
          "menuVersion": "0.0.2",
          "menuResource": "http://www.baidu.com/",
          "menuIcon": "http://handbk.img-cn-shanghai.aliyuncs.com/1489929319896.png",
          "menuId": "8cbf7045-a705-4722-81f7-27159e065a91",
          "isAttached": "Y",
          "menuName": "菜单Demo",
          "menuDesc": "菜单Demo",
          "isMandatory": "Y",
          "menuSeq": 1,
          "isShow": "Y",
          "menuType": "ONLINE",
          "menuLocalPath": "",
          "menuDestPath": "",
          "isSilenceUpdate": "N",
          "isForceUpdate": "N",
          "creationDate": "2017-03-20 16:46:33"
        }]
      }, {
        "cateoryName": "B类",
        "menus": [{
          "menuVersion": "0.0.1",
          "menuResource": "http://apiuat.yunmart.com/huilianyi-wechat/?code=b971d2d9bc250e0b61eb7c4af40e1bf7&state=STATE#/",
          "menuIcon": "http://handbk.img-cn-shanghai.aliyuncs.com/1489917452283.png",
          "menuId": "9d075b11-8b76-4e94-b802-a71de598ec02",
          "isAttached": "Y",
          "menuName": "汇联易在线",
          "menuDesc": "汇联易在线页面",
          "isMandatory": "Y",
          "menuSeq": 2,
          "isShow": "Y",
          "menuType": "ONLINE",
          "menuLocalPath": "",
          "menuDestPath": "",
          "isSilenceUpdate": "N",
          "isForceUpdate": "N",
          "creationDate": "2017-03-19 18:08:26"
        }]
      }, {
        "cateoryName": "A类",
        "menus": [{
          "menuVersion": "0.0.2",
          "menuResource": "http://wechat.hand-china.com/showcase-ol/menu/plugin-demo",
          "menuIcon": "http://handbk.img-cn-shanghai.aliyuncs.com/1489928791848.png",
          "menuId": "32ed16f1-c25f-4da3-8323-6144a6ee5914",
          "isAttached": "Y",
          "menuName": "菜单demo",
          "menuDesc": "菜单demo",
          "isMandatory": "Y",
          "menuSeq": 0,
          "isShow": "Y",
          "menuType": "ONLINE",
          "menuLocalPath": "",
          "menuDestPath": "",
          "isSilenceUpdate": "N",
          "isForceUpdate": "N",
          "creationDate": "2017-03-19 21:13:47"
        }, {
          "menuVersion": "0.0.4",
          "menuResource": "http://wechat.hand-china.com/showcase-ol/huilianyi.zip",
          "menuIcon": "http://handbk.img-cn-shanghai.aliyuncs.com/1489628245914.png",
          "menuId": "24f1a49a-541d-4fef-8404-6d13cf9f9c0f",
          "isAttached": "Y",
          "menuName": "汇联易本地",
          "menuDesc": "汇联易",
          "isMandatory": "Y",
          "menuSeq": 2,
          "isShow": "Y",
          "menuType": "LOCAL",
          "menuLocalPath": "huilianyi/index.html",
          "menuDestPath": "www",
          "isSilenceUpdate": "N",
          "isForceUpdate": "N",
          "creationDate": "2017-03-20 16:37:12"
        }, {
          "menuVersion": "0.0.1",
          "menuResource": "http://wechat.hand-china.com/showcase-ol/menu/plugin-demo",
          "menuIcon": "http://handbk.img-cn-shanghai.aliyuncs.com/1490184237108.png",
          "menuId": "0e7843d3-3cc3-4618-a2e1-1615151b82df",
          "isAttached": "Y",
          "menuName": "在线插件示例",
          "menuDesc": "在线插件示例",
          "isMandatory": "Y",
          "menuSeq": 3,
          "isShow": "Y",
          "menuType": "ONLINE",
          "menuLocalPath": "",
          "menuDestPath": "",
          "isSilenceUpdate": "",
          "isForceUpdate": "",
          "creationDate": "2017-03-12 14:59:57"
        }]
      }]
    };

    var service = {
      getAppData: getAppData,
      fetchData: fetchData,
      analysisMenuList: analysisMenuList
    };
    return service;

    function getAppData() {
      return appData;
    }

    function analysisMenuList(menuSource) {
      var menuList = [];
      var menu4Line = [];
      angular.forEach(menuSource, function (data, index) {
        menu4Line.push(data);
        if ((index + 1) % 4 == 0) {
          menuList.push({"list": menu4Line});
          menu4Line = [];
        }
      });

      if(menuList.length == 0 && menu4Line.length>0){
        menuList.push({"list": menu4Line});
      }
      return menuList;
    }

    function fetchData(success) {
      var url = baseConfig.interfacePath + 'i/api/appUpdate';
      var params = {
        "appEquipment": "Android"
      }
      $http.post(url, params).success(function (response) {
        success(response)
      }).error(function (error) {

      })
    }
  }
})();
