/**
 * Created by gusenlin on 16/5/21.
 */
(function () {
  angular.module('utilModule')
    .service('hmsJpushService', hmsJpushService);
  function hmsJpushService(baseConfig) {
    //如果存在极光推送，则初始化极光推送
    this.initJpush = function () {
      if (window.plugins && window.plugins.jPushPlugin) {
        window.plugins.jPushPlugin.init();
      }
    };

    //设置别名和标签
    this.startJpush = function () {
      if (window.plugins && window.plugins.jPushPlugin) {
        if (ionic.Platform.isAndroid() && baseConfig.debug) {//如果是测试包，则开启Debug模式，显示更多的日志信息
          window.plugins.jPushPlugin.setDebugMode(true);
          window.plugins.jPushPlugin.setStatisticsOpen(true);
        } else if (ionic.Platform.isIOS() && baseConfig.debug) {
          window.plugins.jPushPlugin.setDebugModeFromIos();
          window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
        }
        window.plugins.jPushPlugin.setTagsWithAlias([baseConfig.appEnvironment], window.localStorage.empno);
      }
    };

    //获取推送显示标题
    this.getAlert = function () {
      var alertContent;
      if (ionic.Platform.isAndroid()) {
        alertContent = event.alert;
      } else {
        alertContent = event.aps.alert;
      }
      return alertContent;
    };

    this.getExtras = function () {
      var extras;
      if (ionic.Platform.isAndroid()) {
        extras = event.extras;
      } else {
        extras = event;
      }
      return extras;
    };

    //退出消息推送
    this.logoutJpush = function () {
      if (window.plugins && window.plugins.jPushPlugin) {
        window.plugins.jPushPlugin.setTagsWithAlias([], "");
      }
    };
  }
})();
