/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular.module('mineModule')
    .controller('mineCtrl', mineCtrl);
  /* @ngInject */
  function mineCtrl($scope, hmsHttp, hmsPopup, baseConfig, cacheService) {
    var mineVM = this;

    getData();
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
      //页面回退需要重新请求数据
      if (toState.url == '/tab') {
        getData();
      }
    });

    //请求数据（从cacheService或者接口请求数据）
    function getData() {
      if (!cacheService.get('mine')) {
        hmsPopup.showLoading('请求中...');
        getStaffDetail();
      } else {
        mineVM.detail = cacheService.get('mine');
        getStaffDetail();
      }
    }

    //获取消息列表数据
    function getStaffDetail() {
      hmsHttp.post(baseConfig.interfacePath + "staff/detail?access_token", {
        "access_token": window.localStorage.userToken,
        "key": window.localStorage.empno
      }).then(function (result) {
        hmsPopup.hideLoadingDelay();
        cacheService.set('mine', result.rows[0]);
        mineVM.detail = result.rows[0];
      }, function (result) {
        hmsPopup.showLongCenterToast('请求执行失败!');
      });
    }

    //点击帮助
    mineVM.clickHelp = function () {
      window.open("http://g.eqxiu.com/s/sRGxXCQn", '_system', 'location=yes');
    };
  }
})();


