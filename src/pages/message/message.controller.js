/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular.module('messageModule')
    .controller('messageCtrl', messageCtrl);
  /* @ngInject */
  function messageCtrl($scope, hmsHttp, hmsPopup, baseConfig, $state, $timeout) {
    var messageVM = this;
    messageVM.goToList = goToList;

    getMessage();
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
      if (toState.url == '/tab') {
        getMessage();
      }
    });

    //获取消息列表数据
    function getMessage() {
      hmsPopup.showLoading('请求中...');
      hmsHttp.get(baseConfig.interfacePath + "userMessage/queryMessageList").then(function (result) {
        $timeout(function () {
          hmsPopup.hideLoading();
        }, 500);
        messageVM.messageList = result.rows;
      }, function (result) {
        hmsPopup.showShortCenterToast('请求执行失败!');
      });
    }

    //跳转到消息列表页面
    function goToList(item, unreadCount) {
      if (unreadCount > 0) {
        hmsPopup.showLoading('请求中...');
        hmsHttp.post(baseConfig.interfacePath + "/userMessage/setMessageRead", {
          messageGroupCode: item.messageGroupCode
        }).then(function (result) {
          hmsPopup.hideLoading();
          $state.go('messageList', {messageType: item.messageGroupCode, messageGroupName: item.messageGroupName});
        }, function (result) {
          hmsPopup.showShortCenterToast('请求执行失败!');
        });
      } else {
        $state.go('messageList', {messageType: item.messageGroupCode, messageGroupName: item.messageGroupName});
      }
    }
  }
})();
