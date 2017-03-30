/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular.module('messageModule')
    .controller('messageCtrl', messageCtrl);
  /* @ngInject */
  function messageCtrl($scope, hmsHttp, hmsPopup, baseConfig) {
    var messageVM = this;

    getMessage();
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
      if (toState.url == '/tab') {
        getMessage();
      }
    });

    function getMessage() {
      console.log('getMessage');
      hmsPopup.showLoading('请求中...');
      hmsHttp.get(baseConfig.interfacePath + "userMessage/queryMessageList").then(function (result) {
        hmsPopup.hideLoading();
        messageVM.list = result.rows;
      }, function (result) {
        hmsPopup.showShortCenterToast('请求执行失败!');
      });
    }

    // messageVM.list = [{
    //   'img': 'build/assets/img/message/max.png',
    //   'title': 'Jennifer Roberts',
    //   'desc': 'Being the savage\'s bowsman, that… ',
    //   'time': '3小时前',
    //   'unread': '0'
    // }, {
    //   'img': 'build/assets/img/message/TODO@3x.png',
    //   'title': '待办事项',
    //   'desc': '1条待办事项未处理',
    //   'time': '3月20日',
    //   'unread': '3'
    // }, {
    //   'img': 'build/assets/img/message/dorm@3x.png',
    //   'title': '住宿申请',
    //   'desc': '您的房间即将过期',
    //   'time': '3月20日',
    //   'unread': '0'
    // }, {
    //   'img': 'build/assets/img/message/timesheet@3x.png',
    //   'title': 'timesheet',
    //   'desc': '请及时填写你的timesheet',
    //   'time': '3月20日',
    //   'unread': '1'
    // }];
  }
})();
