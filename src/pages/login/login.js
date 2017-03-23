/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular
    .module('loginModule')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = [
    '$scope',
    '$state',
    'baseConfig',
    '$ionicLoading',
    '$http',
    '$timeout',
    '$ionicHistory',
    '$ionicPlatform',
    '$ionicScrollDelegate',
    'checkVersionService',
    'hmsPopup',
    '$rootScope'];

  function loginCtrl($scope,
                     $state,
                     baseConfig,
                     $ionicLoading,
                     $http,
                     $timeout,
                     $ionicHistory,
                     $ionicPlatform,
                     $ionicScrollDelegate,
                     checkVersionService,
                     hmsPopup,
                     $rootScope) {
    //将页面的导航bar设置成白色
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
    
    /////////////////////////////////////
    $timeout(function () {
      $scope.loginScroll = $ionicScrollDelegate.$getByHandle('loginScroll');
      $scope.lockScroll(true);
    }, 300);
    $scope.loginInfo = {
      username: "",
      password: ""
    };//登录信息
    $scope.showBigPortrait = true;//显示打头像图片
    $scope.showLittlePortrait = false;//显示小头像图标
    $scope.rememberPassword = false;//是否记住密码
    $scope.littlePortrait = "build/img/login/login-username.png";//大头像图片
    $scope.bigPortrait = "build/img/login/login-hand.png";//小头像图片
    $scope.passwordChecked = "build/img/login/login-unchecked.png";//是否记住密码图片
    $scope.fillUsername = false;//填写了用户名内容
    $scope.fillPassword = false;//填写了密码内容
    $scope.focusUsername = false;//控制用户名span上浮与下沉
    $scope.focusPassword = false;//控制密码span上浮与下沉
    $scope.buttonStyle = [true, false];//登录按钮的两种样式
    $scope.disableButton = true;//禁用登录按钮
    $scope.showButtonIcon = false;//显示按钮中的对号
    $scope.showLoginButton = false;//显示最终的icon按钮
    $scope.showUserClearButton = false;//显示用户名删除按钮
    $scope.showPasswordClearButton = false;//显示密码删除按钮
    if (window.localStorage.empno) {
      $scope.focusUsername = true;
      $scope.fillUsername = true;
      $scope.showUserClearButton = true;
      $scope.loginInfo.username = window.localStorage.empno;
    }
    if (window.localStorage.checkboxSavePwd == "") {
      $scope.rememberPassword = false;
      $scope.passwordChecked = "build/img/login/login-unchecked.png";
    }

    if (window.localStorage.checkboxSavePwd == "true") {
      $scope.rememberPassword = true;
      $scope.passwordChecked = "build/img/login/login-checked.png";
      $scope.loginInfo.password = window.localStorage.password;
      if ((typeof($scope.loginInfo.password) !== "undefined") && ($scope.loginInfo.password != "")) {//如果拿到的密码是undefined的话，则默认为没有存密码
        $scope.focusPassword = true;
        $scope.fillPassword = true;
        $scope.buttonStyle[0] = false;
        $scope.buttonStyle[1] = true;
        $scope.disableButton = false;
        $scope.showPasswordClearButton = true;
      } else if (typeof($scope.loginInfo.password) === "undefined") {
        $scope.loginInfo.password = "";
        $scope.focusPassword = false;
        $scope.fillPassword = false;
        $scope.buttonStyle[0] = true;
        $scope.buttonStyle[1] = false;
      }
    } else {
      $scope.rememberPassword = false;
      $scope.passwordChecked = "build/img/login/login-unchecked.png";
    }
    $scope.lockScroll = function (bool) {
      $scope.loginScroll.freezeScroll(bool);//锁死Android平台上的滚动条
    };
    $scope.backTop = function () {
      $scope.loginScroll.scrollTop(false);
    };

    $scope.usernameFocus = function () {//聚焦用户名
      $scope.lockScroll(false);
      $scope.showBigPortrait = false;
      $scope.showLittlePortrait = true;
      $scope.littlePortrait = "build/img/login/login-username.png";
      if ($scope.loginInfo.username == "") {
        $scope.focusUsername = true;
      }
    };
    $scope.usernameBlur = function () {//用户名失去焦点
      $scope.lockScroll(true);
      $scope.backTop();
      if ($scope.loginInfo.username == "") {
        $scope.focusUsername = false;
        $scope.showUserClearButton = false;
      } else if ($scope.loginInfo.username != "") {
        $scope.showUserClearButton = true;
      }
    };

    $scope.usernameChange = function () {//用户名改变
      if ($scope.loginInfo.username != "") {
        $scope.fillUsername = true;
        $scope.showUserClearButton = true;
        if ($scope.fillPassword == true) {
          $scope.disableButton = false;
          $scope.buttonStyle[0] = false;
          $scope.buttonStyle[1] = true;
        }
      } else if ($scope.loginInfo.username == "") {
        $scope.showUserClearButton = false;
        $scope.fillUsername = false;
        $scope.disableButton = true;
        $scope.buttonStyle[0] = true;
        $scope.buttonStyle[1] = false;
      }
    };
    $scope.passwordChange = function () {//密码改变
      if ($scope.loginInfo.password != "") {
        $scope.fillPassword = true;
        $scope.showPasswordClearButton = true;
        if ($scope.fillUsername == true) {
          $scope.disableButton = false;
          $scope.buttonStyle[0] = false;
          $scope.buttonStyle[1] = true;
        }
      } else if ($scope.loginInfo.password == "") {
        $scope.fillPassword = false;
        $scope.showPasswordClearButton = false;
        $scope.disableButton = true;
        $scope.buttonStyle[0] = true;
        $scope.buttonStyle[1] = false;
      }
    };
    $scope.passwordFocus = function () {//聚焦密码
      $scope.lockScroll(false);
      $scope.showBigPortrait = false;
      $scope.showLittlePortrait = true;
      $scope.littlePortrait = "build/img/login/login-password.png";
      if ($scope.loginInfo.password == "") {
        $scope.focusPassword = true;
      }
    };
    $scope.passwordBlur = function () {//密码失去焦点
      $scope.lockScroll(true);
      $scope.backTop();
      if ($scope.loginInfo.password == "") {//密码span下移
        $scope.focusPassword = false;
        $scope.showPasswordClearButton = false;
      } else if ($scope.loginInfo.password != "") {
        $scope.showPasswordClearButton = true;
      }
    };

    $scope.clearUsername = function () {//清空用户名
      $scope.loginInfo.username = "";
      $scope.showUserClearButton = false;
      $scope.disableButton = true;
      $scope.buttonStyle[0] = true;
      $scope.buttonStyle[1] = false;
      if ($scope.focusUsername == true) {
        $scope.focusUsername = false;
        $scope.fillUsername = false;
      }
      if ($scope.fillPassword == false) {
        $scope.showBigPortrait = true;
        $scope.showLittlePortrait = false;
        $scope.bigPortrait = "build/img/login/login-hand.png";
      }
    };

    $scope.clearPassword = function () {//清空密码
      $scope.loginInfo.password = "";
      $scope.showPasswordClearButton = false;
      $scope.disableButton = true;
      $scope.buttonStyle[0] = true;
      $scope.buttonStyle[1] = false;
      if ($scope.focusPassword == true) {
        $scope.focusPassword = false;
        $scope.fillPassword = false;
      }
      if ($scope.fillUsername == false) {
        $scope.showBigPortrait = true;
        $scope.showLittlePortrait = false;
        $scope.bigPortrait = "build/img/login/login-hand.png";
      }
    };

    $scope.savePassword = function () {//记住密码
      $scope.rememberPassword = !$scope.rememberPassword;
      if (baseConfig.debug) {
        console.log("此时密码框的状态为 :", angular.toJson($scope.rememberPassword));
      }
      if ($scope.rememberPassword == true) {
        $scope.passwordChecked = "build/img/login/login-checked.png";
        window.localStorage.checkboxSavePwd = "true";
      } else if ($scope.rememberPassword == false) {
        $scope.passwordChecked = "build/img/login/login-unchecked.png";
        window.localStorage.checkboxSavePwd = "";
      }
      if ($scope.loginInfo.password !== "") {
        if ($scope.rememberPassword == true) {
          window.localStorage.password = $scope.loginInfo.password;
        } else {
          window.localStorage.password = "";
        }
      }
    };
    // function getMobileType() { // 获取机型
    //   var ua = navigator.userAgent;
    //   if (ua.indexOf("Windows NT 5.1") != -1) return "Windows XP";
    //   if (ua.indexOf("Windows NT 6.0") != -1) return "Windows Vista";
    //   if (ua.indexOf("Windows NT 6.1") != -1) return "Windows 7";
    //   if (ua.indexOf("iPhone") != -1) return "iPhone";
    //   if (ua.indexOf("iPad") != -1) return "iPad";
    //   if (ua.indexOf("Linux") != -1) {
    //     var index = ua.indexOf("Android");
    //     if (index != -1) {
    //       var reg = new RegExp('(Android.*?);(.*)Build');
    //       var os = ua.match(reg)[2].trim() + ' ' + ua.match(reg)[1].trim();
    //       return os;
    //     } else {
    //       return "Linux";
    //     }
    //   }
    //   return "未知操作系统";
    // }
    function toIPhoneModel(model) {
      var dictionary = {
        "i386": "Simulator",
        "x86_64": "Simulator",
        "iPod1,1": "iPod Touch",         // (Original)
        "iPod2,1": "iPod Touch 2",       // (Second Generation)
        "iPod3,1": "iPod Touch 3",       // (Third Generation)
        "iPod4,1": "iPod Touch 4",       // (Third Generation)
        "iPod7,1": "iPod Touch 6",       // (6th Generation)
        "iPhone1,1": "iPhone",           // (Original)
        "iPhone1,2": "iPhone 3G",        // (3G)
        "iPhone2,1": "iPhone 3GS",       // (3GS)
        "iPad1,1": "iPad",               // (Original)
        "iPad2,1": "iPad 2",             // (2nd Generation)
        "iPad3,1": "new iPad",           // (3rd Generation)
        "iPhone3,1": "iPhone 4",         // (GSM)
        "iPhone3,3": "iPhone 4",         // (CDMA/Verizon/Sprint)
        "iPhone4,1": "iPhone 4S",
        "iPhone5,1": "iPhone 5",         // (model A1428, AT&T/Canada)
        "iPhone5,2": "iPhone 5",         // (model A1429, everything else)
        "iPad3,4": "iPad 4th Generation",// (4th Generation)
        "iPad2,5": "iPad Mini",          // (Original)
        "iPhone5,3": "iPhone 5c",        // (model A1456, A1532 | GSM)
        "iPhone5,4": "iPhone 5c",        // (model A1507, A1516, A1526 (China), A1529 | Global)
        "iPhone6,1": "iPhone 5s",        // (model A1433, A1533 | GSM)
        "iPhone6,2": "iPhone 5s",        // (model A1457, A1518, A1528 (China), A1530 | Global)
        "iPhone7,1": "iPhone 6 Plus",
        "iPhone7,2": "iPhone 6",
        "iPhone8,1": "iPhone 6S",
        "iPhone8,2": "iPhone 6S Plus",
        "iPhone8,4": "iPhone SE",
        "iPhone9,1": "iPhone 7",
        "iPhone9,3": "iPhone 7",
        "iPhone9,2": "iPhone 7 Plus",
        "iPhone9,4": "iPhone 7 Plus",
        "iPad4,1": "iPad Air",           // 5th Generation iPad (iPad Air) - Wifi
        "iPad4,2": "iPad Air",           // 5th Generation iPad (iPad Air) - Cellular
        "iPad4,4": "iPad Mini",          // (2nd Generation iPad Mini - Wifi)
        "iPad4,5": "iPad Mini",          // (2nd Generation iPad Mini - Cellular)
        "iPad4,7": "iPad Mini",          // (3rd Generation iPad Mini - Wifi (model A1599))
        "iPad6,7": "iPad Pro (12.9\")",  // iPad Pro 12.9 inches - (model A1584)
        "iPad6,8": "iPad Pro (12.9\")",  // iPad Pro 12.9 inches - (model A1652)
        "iPad6,3": "iPad Pro (9.7\")",   // iPad Pro 9.7 inches - (model A1673)
        "iPad6,4": "iPad Pro (9.7\")"    // iPad Pro 9.7 inches - (models A1674 and A1675)
      };
      if (dictionary[model]) {
        return dictionary[model];
      } else {
        return "Unknown IOS model";
      }
    }

    function loginPost() {//后台采用HAP后更改成包含Content-type的方式，账号密码采用encodeURIComponent()转换，这样可以传特殊符号
      var deviceInfo = "";
      if (ionic.Platform.isAndroid()) {
        deviceInfo = "Android"
      } else if (ionic.Platform.isIOS()) {
        deviceInfo = "iOS";
      } else {
        deviceInfo = "PC";
      }

      try {
        if (deviceInfo == 'iOS') {
          var model = toIPhoneModel(device.model);
        } else {
          model = device.model;
        }
        var url = baseConfig.loginPath + "username=" + encodeURIComponent($scope.loginInfo.username) + "&password=" +
          encodeURIComponent($scope.loginInfo.password) + '&client_id=' + baseConfig.appID + '&client_secret=' + baseConfig.appSecret;
      } catch (e) {
        url = baseConfig.loginPath + "username=" + encodeURIComponent($scope.loginInfo.username) + "&password=" +
          encodeURIComponent($scope.loginInfo.password) + '&client_id=' + baseConfig.appID + '&client_secret=' + baseConfig.appSecret;
      }
      if (baseConfig.debug) {
        console.log('loginPost.url ' + url);
      }

      return $http({
        method: 'POST',
        headers: {
          'Content-type': "application/x-www-form-urlencoded"
        },
        url: url
      })
    }

    $scope.login = function () {//登录功能
      if (window.localStorage.empno != $scope.loginInfo.username) {
        localStorage.removeItem('key_history1');
        localStorage.removeItem('common_linkman2');
      }
      $scope.showLittlePortrait = false;
      $scope.showLoginButton = true;
      $scope.showButtonIcon = true;
      $scope.showBigPortrait = true;
      hmsPopup.showLoading('登录中...');
      //$scope.bigPortrait = "build/img/login/login-portrait.png";
      $scope.bigPortrait = "build/img/login/login-hand.png";
      $timeout(function () {
        window.localStorage.empno = $scope.loginInfo.username;
        window.localStorage.password = $scope.loginInfo.password;
        if ($scope.rememberPassword == true) {
          window.localStorage.password = $scope.loginInfo.password;
        } else if ($scope.rememberPassword == false) {
          window.localStorage.password = "";
        }

        if (!$scope.loginInfo.username || $scope.loginInfo.username == '') {
          hmsPopup.hideLoading();
          hmsPopup.showPopup('用户名不能为空');
          return;
        }
        if (!$scope.loginInfo.password || $scope.loginInfo.password == '') {
          hmsPopup.hideLoading();
          hmsPopup.showPopup('密码不能为空');
          return;
        }

        //var url = baseConfig.loginPath;
        //var phoneNumber = "PC";
        //var params = "username=" + encodeURIComponent($scope.loginInfo.username) + "&password=" + encodeURIComponent($scope.loginInfo.password) + "&p_phone_no=" + phoneNumber;


        loginPost().success(function (result) {
          hmsPopup.hideLoading();
          if (baseConfig.debug) {
            console.log("result success " + angular.toJson(result));
          }
          //绑定推送服务
          //hmsJpushService.bind($scope.loginInfo.username);

          if (result.access_token && result.access_token != '') {
            window.localStorage.userToken = result.access_token;
            window.localStorage.empno = $scope.loginInfo.username;
            window.localStorage.checkboxSavePwd = $scope.rememberPassword;
            $scope.bigPortrait = "build/img/login/login-hand.png";
            //imService.initImData();
            if (ionic.Platform.isWebView()) {
              //imService.initImData();
            }
            //检查crm权限
            var url = baseConfig.basePath + "user_role";
            $http.post(url, {}).success(function (response) {
              $scope.showLoginButton = false;
              $scope.showButtonIcon = false;
              if (response.returnCode == 'S')
                window.localStorage.crm = response.message == 'Y';
              $state.go("tab.message");
            }).error(function (response, status) {
              $scope.showLoginButton = false;
              $scope.showButtonIcon = false;
              window.localStorage.crm = false;
              $state.go("tab.message");
            });

          } else {
            $scope.bigPortrait = "build/img/login/login-hand.png";
            $scope.showLoginButton = false;
            $scope.showButtonIcon = false;
            hmsPopup.showPopup('登录失败,请确认密码是否正确!');
          }
        }).error(function (response, status) {
          hmsPopup.hideLoading();
          if (status && status == '401') {
            $scope.bigPortrait = "build/img/login/login-hand.png";
            $scope.showLoginButton = false;
            $scope.showButtonIcon = false;
            hmsPopup.showPopup('登录失败,请确认密码是否正确!');
          } else {
            $scope.bigPortrait = "build/img/login/login-hand.png";
            $scope.showLoginButton = false;
            $scope.showButtonIcon = false;
            hmsPopup.showPopup('登录失败,请确认网络连接是否正常,或者联系管理员');
            if (baseConfig.debug) {
              console.log("response error " + angular.toJson(response));
            }
          }
        });
      }, 700);
    };

    $scope.$on('$ionicView.enter', function (e) {
      if (baseConfig.debug) {
        console.log('loginCtrl.$ionicView.enter');
      }
      $scope.loginInfo = {
        username: "",
        password: ""
      };//登录信息
      $scope.showBigPortrait = true;//显示打头像图片
      $scope.showLittlePortrait = false;//显示小头像图标
      $scope.rememberPassword = false;//是否记住密码
      $scope.littlePortrait = "build/img/login/login-username.png";//大头像图片
      $scope.bigPortrait = "build/img/login/login-hand.png"//小头像图片
      $scope.passwordChecked = "build/img/login/login-unchecked.png";//是否记住密码图片
      $scope.fillUsername = false;//填写了用户名内容
      $scope.fillPassword = false;//填写了密码内容
      $scope.focusUsername = false;//控制用户名span上浮与下沉
      $scope.focusPassword = false;//控制密码span上浮与下沉
      $scope.buttonStyle = [true, false];//登录按钮的两种样式
      $scope.disableButton = true;//禁用登录按钮
      $scope.showButtonIcon = false;//显示按钮中的对号
      $scope.showLoginButton = false;//显示最终的icon按钮
      $scope.showUserClearButton = false;//显示用户名删除按钮
      $scope.showPasswordClearButton = false;//显示密码删除按钮
      if (window.localStorage.empno) {
        $scope.focusUsername = true;
        $scope.fillUsername = true;
        $scope.showUserClearButton = true;
        $scope.loginInfo.username = window.localStorage.empno;
      }
      if (window.localStorage.checkboxSavePwd == "") {
        $scope.rememberPassword = false;
        $scope.passwordChecked = "build/img/login/login-unchecked.png";
      }

      if (window.localStorage.checkboxSavePwd == "true") {
        $scope.rememberPassword = true;
        $scope.passwordChecked = "build/img/login/login-checked.png";
        $scope.loginInfo.password = window.localStorage.password;
        if ((typeof($scope.loginInfo.password) !== "undefined") && ($scope.loginInfo.password != "")) {//如果拿到的密码是undefined的话，则默认为没有存密码
          $scope.focusPassword = true;
          $scope.fillPassword = true;
          $scope.buttonStyle[0] = false;
          $scope.buttonStyle[1] = true;
          $scope.disableButton = false;
          $scope.showPasswordClearButton = true;
        } else if (typeof($scope.loginInfo.password) === "undefined") {
          $scope.loginInfo.password = "";
          $scope.focusPassword = false;
          $scope.fillPassword = false;
          $scope.buttonStyle[0] = true;
          $scope.buttonStyle[1] = false;
        }
      } else {
        $scope.rememberPassword = false;
        $scope.passwordChecked = "build/img/login/login-unchecked.png";
      }
    });

    $scope.$on('$ionicView.afterEnter', function () {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    });

    $scope.$on('$destroy', function (e) {
      if (baseConfig.debug) {
        console.log('loginCtrl.$destroy');
      }
    });
  }
})();
