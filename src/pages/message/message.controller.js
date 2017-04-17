/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular.module('messageModule')
    .controller('messageCtrl', messageCtrl);
  /* @ngInject */
  function messageCtrl($scope, hmsHttp, hmsPopup, baseConfig, $state, cacheService) {
    var messageVM = this;
    messageVM.goToList = goToList;

    getData();
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
      //页面回退需要重新请求数据
      if (toState.url == '/tab') {
        getData();
      }
    });

    //请求数据（从cacheService或者接口请求数据）
    function getData() {
      if (!cacheService.get('messageList')) {
        hmsPopup.showLoading('请求中...');
        getMessage();
      } else {
        messageVM.messageList = cacheService.get('messageList');
        getMessage();
      }
    }

    //获取消息列表数据
    function getMessage() {
      hmsHttp.get(baseConfig.interfacePath + "userMessage/queryMessageList").then(function (result) {
        hmsPopup.hideLoadingDelay();
        cacheService.set('messageList', result.rows);
        messageVM.messageList = result.rows;
      }, function (result) {
        hmsPopup.showLongCenterToast('请求执行失败!');
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
          $state.go('message-list', {messageType: item.messageGroupCode, messageGroupName: item.messageGroupName});
        }, function (result) {
          hmsPopup.showLongCenterToast('请求执行失败!');
        });
      } else {
        $state.go('message-list', {messageType: item.messageGroupCode, messageGroupName: item.messageGroupName});
      }
    }
  }
})();
