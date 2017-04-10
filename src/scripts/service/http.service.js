/**
 * Created by songsong.zhang on 2017/3/30.
 */
(function () {
  angular.module('utilModule')
    .factory('hmsHttp', hmsHttp);
  /* @ngInject */
  function hmsHttp($http, hmsPopup, $state, $q, hmsJpushService) {
    //返回promise对象
    return {
      doLoginOut: function () {
        hmsJpushService.logoutJpush();
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("refresh_token");
        window.localStorage.removeItem("token_type");
        window.localStorage.removeItem("status");
        $state.go('login');
      },
      post: function (url, param, config) {
        var defered = $q.defer();
        var self = this;
        $http.post(url, param, config).then(function (response) {
          response = response.data;
          if (response.hasOwnProperty("success") && !response.success) {
            defered.reject(response);
          } else {
            if (response.rows && response.rows.length > 0) {
              if (response.rows[0].hasOwnProperty("head")) {
                if (response.rows[0].head.retcode != 's') {
                  hmsPopup.showShortCenterToast('请求执行失败!');
                } else {
                  defered.resolve(response);
                }
              } else {
                defered.resolve(response);
              }
            } else {
              defered.resolve(response);
            }
          }
        }, function (response, status) {
          response = response.data;
          if (response && response.error == 'unauthorized') {  //这种情况拿出来做处理，注册最后一步设置密码会把游客token给清除掉，所以页面回退再调用接口会报错
            defered.reject(response);
          } else if (response && response.error_description == 'badCredentials') {
            hmsPopup.showShortCenterToast('用户名不存在或密码错误!');
          } else if (response && response.error_description == 'blocked') {
            hmsPopup.showShortCenterToast('您连续输错密码,账号已被锁,请稍后重试!');
          } else if (response && response.error_description == 'accessDenied') {
            hmsPopup.showShortCenterToast('您的权限不足,请注册为正式用户!');
          } else if (response && response.error == 'invalid_token') {
            hmsPopup.showShortCenterToast('另一个设备在登陆你的账号,请重新登陆!');
            self.doLoginOut();
          } else if (status == '500') {
            hmsPopup.showShortCenterToast('后端服务器请求失败,请联系管理员!');
          } else {
            hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
          }
        });
        return defered.promise;
      },
      get: function (url, headers) {
        var defered = $q.defer();
        var self = this;
        $http.get(url, headers).then(function (response) {
          response = response.data;
          if (response.success == true) {  //存在第三方接口，没有success字段
            defered.resolve(response);
          } else if (response.success == false) {
            defered.reject(response);
          } else {
            defered.resolve(response);
          }
        }, function (response, status) {
          response = response.data;
          if (response && response.error_description == 'accessDenied') {
            hmsPopup.showShortCenterToast('您的权限不足,请注册为正式用户!');
          } else if (response && response.error == 'invalid_token') {
            hmsPopup.showShortCenterToast('另一个设备在登陆你的账号,请重新登陆!');
            self.doLoginOut();
          } else if (status == '500') {
            hmsPopup.showShortCenterToast('后端服务器请求失败,请联系管理员!');
          } else {
            hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
          }
        });
        return defered.promise;
      }
    };
  }
})();
