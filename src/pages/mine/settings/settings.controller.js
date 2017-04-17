/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular.module('mineModule')
    .controller('settingsCtrl', settingsCtrl);
  /* @ngInject */
  function settingsCtrl(hmsJpushService, hmsPopup) {
    var settingsVM = this;
    settingsVM.push = false;
    settingsVM.togglePush = togglePush;

    //进入设置页面时获取是否开启消息推送
    // hmsPopup.showLoading('请求中...');
    hmsJpushService.isPushStopped().then(function () {
      // hmsPopup.hideLoadingDelay();
      settingsVM.push = true;
    });

    //切换是否推送消息
    function togglePush() {
      settingsVM.push == true ? hmsJpushService.stopPush() : hmsJpushService.resumePush();
    }
  }
})();
