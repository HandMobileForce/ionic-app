/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular.module('mineModule')
    .controller('feedbackCtrl', feedbackCtrl);
  /* @ngInject */
  function feedbackCtrl($scope, hmsPopup, hmsHttp, baseConfig) {
    var feedbackVM = this;

    feedbackVM.types = ['质量问题', '服务问题', '其他问题', '优化问题'];
    feedbackVM.submit = submit;
    feedbackVM.selectType = selectType;

    //提交反馈问题
    function submit() {
      if (!feedbackVM.selectedType) {
        hmsPopup.showPopup('请选择反馈类型');
        return;
      }
      if (!feedbackVM.content) {
        hmsPopup.showPopup('请选择反馈内容');
        return;
      }
      hmsPopup.showLoading('提交中...');
      hmsHttp.post(baseConfig.interfacePath + "appCreateFeedback", {
        "feedbackType": feedbackVM.selectedType,
        "feedbackData": feedbackVM.content
      }).then(function (result) {
        if (result.success == true) {
          hmsPopup.showLongCenterToast('意见反馈成功!');
          $scope.goBack();
        } else {
          hmsPopup.showLongCenterToast('请求执行失败!');
        }
      }, function (result) {
        hmsPopup.showLongCenterToast('请求执行失败!');
      });
    }

    //选择反馈类型
    function selectType(type) {
      feedbackVM.selectedType = type;
    }
  }
})();
