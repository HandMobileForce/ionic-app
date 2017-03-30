
(function () {
  angular.module('messageModule')
    .controller('messageListCtrl', messageListCtrl);
  /** @ngInject */
  function messageListCtrl($scope, $state, hmsPopup, hmsHttp, baseConfig, $stateParams, $timeout) {
    var messageListVM = this;
    var page = 1;
    var pageSize = baseConfig.pageSize;
    var messageGroupCode = $stateParams.messageType;

    messageListVM.messageGroupName = $stateParams.messageGroupName;
    messageListVM.messageList = [];
    messageListVM.doRefresh = doRefresh;
    messageListVM.loadMore = loadMore;
    messageListVM.goRedirect = goRedirect;
    hmsPopup.showLoading('请求中...');
    getMessageList();

    function getMessageList(param) {
      hmsHttp.get(baseConfig.basePath + "/userMessage/queryMessageDetail?" +
        "page=" + page + "&pagesize=" + pageSize + "&messageGroupCode=" + messageGroupCode).then(function (result) {
        hmsPopup.hideLoading();
        messageListVM.infiniteLoad = result.rows.length >= pageSize;
        messageListVM.messageList = messageListVM.messageList.concat(result.rows);
      }, function (result) {
        messageListVM.infiniteLoad = false;
        hmsPopup.showShortCenterToast('请求执行失败!');
      }).finally(function () {
        if (param == 'refresh') {
          $scope.$broadcast('scroll.refreshComplete');  // 停止广播ion-refresher
        } else if (param == 'loadMore') {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      });
    }

    //系统消息页面重定向
    function goRedirect(item) {
      //如果存在重定向，则进行页面跳转
      if (item.redirectUrl) {
        if (item.redirectUrl == 'medAlterList') {
          //如果是跳转到服药计划详情页，则传参数过去，只看相应的服药计划推荐
          $state.go(item.redirectUrl, {processGroupId: item.extrasParams.processGroupId});
        } else {
          //其他的直接跳转，不传参数
          $state.go(item.redirectUrl);
        }
      }
    }

    //下拉刷新列表数据
    function doRefresh() {
      page = 1;
      messageListVM.messageList = [];  //清空数据
      getMessageList('refresh');
    }

    //加载更多数据
    function loadMore() {
      page++;
      getMessageList('loadMore');
    }
  }
})();
