/**
 * Created by gusenlin on 16/5/21.
 */

(function () {
  'use strict'; 

  angular
    .module('utilModule')
    .service('hmsPopup', hmsPopup);

  hmsPopup.$inject = [
    '$ionicLoading', '$cordovaToast', '$ionicPopup', 'baseConfig'];

  function hmsPopup($ionicLoading, $cordovaToast, $ionicPopup, baseConfig) {
    this.showLoading = function (content) {
      content = !content ? '加载中' : content;
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
        '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>'
      });
    };
    this.showLoadingWithoutBackdrop = function (content) {
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
        '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>',
        noBackdrop: true
      });
    };
    this.hideLoading = function () {
      $ionicLoading.hide();
    };
    this.showShortCenterToast = function (content) {//长时间底部提示toast
      if (!baseConfig.nativeScreenFlag) {
        $ionicLoading.show({
          template: (angular.isDefined(content) ? content : "操作失败"),
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          duration: 1500
        });
      } else {
        $cordovaToast.showLongBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
        }, function (error) {
        });
      }
    };
    this.showVeryShortCenterToast = function (content) {
      if (!baseConfig.nativeScreenFlag) {
        $ionicLoading.show({
          template: (angular.isDefined(content) ? content : "操作失败"),
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          duration: 1000
        });
      } else {
        $cordovaToast.showShortBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
        }, function (error) {
        });
      }
    };
    this.showLongCenterToast = function (content) {
      if (!baseConfig.nativeScreenFlag) {
        $ionicLoading.show({
          template: (angular.isDefined(content) ? content : "操作失败"),
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          duration: 3000
        });
      } else {
        $cordovaToast.showLongBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
        }, function (error) {
        });
      }
    };
    //弹出确认弹出框
    this.showPopup = function (template, title) {
      if (!baseConfig.nativeScreenFlag) {
        $ionicPopup.show({
          title: "提示",
          template: template,
          buttons: [{
            text: '确定',
            type: 'button button-cux-popup-confirm'
          }]
        });
      } else {
        var alertDismissed = function () {
        };
        navigator.notification.alert(
          template, // message
          alertDismissed, // callback
          "提示", // title
          '确定' // buttonName
        );
      }
    };
    this.confirmNoTitle = function (message, onConfirm) {
      /*      if (!baseConfig.nativeScreenFlag) {*/
      var confirmPopup = $ionicPopup.confirm({
        template: message,
        cancelText: '取消',
        cancelType: 'button-cux-popup-cancel',
        okText: '确定',
        okType: 'button-cux-popup-confirm'
      });
      confirmPopup.then(function (res) {
        if (res) {
          onConfirm(res);
        } else {

        }
      });
      /*        } else {
       navigator.notification.confirm(
       message, // message
       function (index) {
       onConfirm(index-1);
       }, // callback to invoke with index of button pressed
       title, // title
       ['取消' , '确定'] // buttonLabels
       );
       }*/
    };
    //弹出是否确认的窗口
    this.prompt = function (myscope, title, popup, pluginPopup) {
      if (!baseConfig.nativeScreenFlag) {
        var myPopup = $ionicPopup.show({
          template: '<input type="type" ng-model="myScope.data.city">',
          title: title,
          subTitle: title,
          scope: myscope,
          buttons: [
            {text: '取消'},
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!myscope.myScope.data.city) {
                  e.preventDefault();
                } else {
                  return myscope.myScope.data.city;
                }
              }
            },
          ]
        });
        myPopup.then(popup);
      } else {

        navigator.notification.prompt(
          title,  // message
          pluginPopup,          // callback to invoke
          '填写信息',           // title
          ['确定', '退出'],    // buttonLabels
          ''                 // defaultText
        );
      }
    };
    //检测客户是否重名
    this.showPopupCustomer = function (template, customerName, approveStatus, saleArea, saleTeam, saleEmployeeName, saleEmployeeCode, title) {
      /*    if (!baseConfig.nativeScreenFlag) {*/
      $ionicPopup.show({
        title: title,
        template: template + '</br></br><div class="crm-customer-popup" >匹配客户: ' + customerName +
        '</div><div class="crm-customer-popup">客户状态: ' + approveStatus + '</div>' +
        '<div class="crm-customer-popup">所属大区: ' + saleArea + '</div><div class="crm-customer-popup">所属团队: ' + saleTeam +
        '</div><div class="crm-customer-popup">负责人: ' + saleEmployeeName + '(' + saleEmployeeCode + ')</div>',
        buttons: [{
          text: '确定',
          type: 'button button-cux-popup-confirm'
        }]
      });
      /*        } else {
       var alertDismissed = function () {
       };
       navigator.notification.alert(
       template, // message
       alertDismissed, // callback
       title, // title
       '确定' // buttonName
       );
       }*/
    };
    //检测客户税号和统一社会信用代码
    this.showPopupCustomerAdd = function (template, flagMsg, customerName, approveStatus, saleArea, saleTeam, saleEmployeeName, saleEmployeeCode, title) {
      /* if (!baseConfig.nativeScreenFlag) {*/
      $ionicPopup.show({
        title: title,
        template: template + '</br></br><div class="crm-customer-popup">' + flagMsg + '</div><div class="crm-customer-popup" >匹配客户: ' + customerName +
        '</div><div class="crm-customer-popup">客户状态: ' + approveStatus + '</div>' +
        '<div class="crm-customer-popup">所属大区: ' + saleArea + '</div><div class="crm-customer-popup">所属团队: ' + saleTeam +
        '</div><div class="crm-customer-popup">负责人: ' + saleEmployeeName + '(' + saleEmployeeCode + ')</div>',
        buttons: [{
          text: '确定',
          type: 'button button-cux-popup-confirm'
        }]
      });
      /*    } else {
       var alertDismissed = function () {
       };
       navigator.notification.alert(
       template, // message
       alertDismissed, // callback
       title, // title
       '确定' // buttonName
       );
       }*/
    };

    this.confirmCrmCheck = function (message, $scope, onConfirm, data) {
      /*    if (!baseConfig.nativeScreenFlag) {*/
      var confirmPopup = $ionicPopup.confirm({
        scope: $scope,
        template: message,
        cancelText: '取消',
        cancelType: 'button-cux-popup-cancel',
        okText: '确定',
        okType: 'button-cux-popup-confirm'
      });
      confirmPopup.then(function (res) {
        onConfirm(res, data);

      });
      /*        } else {
       navigator.notification.confirm(
       message, // message
       function (index) {
       onConfirm(index-1);
       }, // callback to invoke with index of button pressed
       title, // title
       ['取消' , '确定'] // buttonLabels
       );
       }*/
    };

    this.confirmOnly = function (message, title, onConfirm) {
      if (!baseConfig.nativeScreenFlag) {
        var confirmPopup = $ionicPopup.confirm({
          title: (angular.isDefined(title) ? title : "提示"),
          template: message,
          okText: '确定',
          okType: 'button-cux-popup-confirm'
        });
        confirmPopup.then(function (res) {
          if (baseConfig.debug) {
            console.log('this.confirm.res ' + angular.toJson(res))
          }
          var index = 0;
          if (res) {
            index = 1;
          }
          onConfirm(index);
        });
      } else {
        navigator.notification.confirm(
          message, // message
          function (index) {
            onConfirm(index - 1);
          }, // callback to invoke with index of button pressed
          title, // title
          ['确定'] // buttonLabels
        );
      }
    };

    this.confirm = function (message, title, onConfirm) {
      if (!baseConfig.nativeScreenFlag) {
        var confirmPopup = $ionicPopup.confirm({
          title: (angular.isDefined(title) ? title : "提示"),
          template: message,
          cancelText: '取消',
          cancelType: 'button-cux-popup-cancel',
          okText: '确定',
          okType: 'button-cux-popup-confirm'
        });
        confirmPopup.then(function (res) {
          if (baseConfig.debug) {
            console.log('this.confirm.res ' + angular.toJson(res))
          }
          var index = 0;
          if (res) {
            index = 1;
          }
          onConfirm(index);
        });
      } else {
        navigator.notification.confirm(
          message, // message
          function (index) {
            onConfirm(index - 1);
          }, // callback to invoke with index of button pressed
          title, // title
          ['取消', '确定'] // buttonLabels
        );
      }
    };


    this.confirmDIY = function (message, title, okText, cancelText, onConfirm, onBack) {
      /*    if (!baseConfig.nativeScreenFlag) {*/
      var confirmPopup = $ionicPopup.confirm({
        title: (angular.isDefined(title) ? title : "提示"),
        template: message,
        cancelText: cancelText,
        cancelType: 'button-cux-popup-cancel',
        okText: okText,
        okType: 'button-cux-popup-confirm'
      });
      confirmPopup.then(function (res) {
        if (res) {
          onConfirm(res);
        } else {
          onBack(res)
        }
      });
      /*  } else {
       navigator.notification.confirm(
       message, // message
       function (index) {
       onConfirm(index-1);
       }, // callback to invoke with index of button pressed
       title, // title
       ['取消' , '确定'] // buttonLabels
       );
       }*/
    };

    this.confirmShare = function (title, message, shareConfirm) {
      if (!baseConfig.nativeScreenFlag) {
        var confirmSharePopup = $ionicPopup.confirm({
          title: title,
          template: message,
          cancelText: '直接分享',
          cancelType: 'button-cux-popup-cancel',
          okText: '继续返回',
          okType: 'button-cux-popup-confirm'
        });
        confirmSharePopup.then(function (res) {
          if (baseConfig.debug) {
            console.log('this.confirm.res ' + angular.toJson(res))
          }
          console.log(index);
          var index = 0;
          if (res) {
            index = 1;
          }
          shareConfirm(index);
        });
      } else {
        navigator.notification.confirm(
          message, // message
          function (index) {
            shareConfirm(index - 1);
          }, // callback to invoke with index of button pressed
          title, // title
          ['直接分享', '继续返回'] // buttonLabels
        );
      }
    };
  }

})();

