/**
 * Created by gusenlin on 2017/1/22.
 */
(function () {
  'use strict';
  angular
    .module('messageModule')
    .controller('tabCtrl', tabCtrl);
  /* @ngInject */
  function tabCtrl($scope, $state, $timeout, hmsPopup, hmsJpushService) {
    var vm = this;

    $timeout(function () {
      window.localStorage.needGuid = "true"
      //为什么去掉userToken，这样后面的所有的接口表头都没有了 add by songsong.zhang
      // window.localStorage.userToken = ""
    }, 2000);

    vm.tabArray = [
      {
        "isActive": true,
        "name": "消息",
        "onIcon": "hms-tab-message-on",
        "offIcon": "hms-tab-message-off"
      }, {
        "isActive": false,
        "name": "应用",
        "onIcon": "hms-tab-application-on",
        "offIcon": "hms-tab-application-off"
      }, {
        "isActive": false,
        "name": "通讯录",
        "onIcon": "hms-tab-contact-on",
        "offIcon": "hms-tab-contact-off"
      }, {
        "isActive": false,
        "name": "我的",
        "onIcon": "hms-tab-mine-on",
        "offIcon": "hms-tab-mine-off"
      }
    ];

    vm.clickTab = clickTab;

    function clickTab(tab) {
      angular.forEach(vm.tabArray, function (data) {
        data.isActive = false;
      });

      tab.isActive = true;
    }

    /*
     * Jpush模块 add by zss
     * */
    // 监听接收消息 收到通知时会触发该事件
    document.addEventListener("jpush.receiveNotification", function (event) {
      hmsPopup.showPromptToast(hmsJpushService.getAlert(event), 'inform');
    }, false);
    //监听打开消息 点击通知进入应用程序时会出发改事件
    document.addEventListener("jpush.openNotification", function (event) {
      //如果还是登陆状态下点击消息推送
      if (window.localStorage.status == 'user') {
        var extras = hmsJpushService.getExtras(event);
        // if (extras.redirectUrl == 'memberInfo') {
        //   $state.go('memberInfo', {'userID': extras.userId});
        // }
      }
    }, false);
  }
})();
