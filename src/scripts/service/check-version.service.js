/**
 * Created by wolf on 2016/6/30. (wen.da)
 */

(function () {
  //'use strict';

  angular
    .module('utilModule')
    .factory('checkVersionService', checkVersionService);

  checkVersionService.$inject = [
    'hmsPopup',
    'baseConfig',
    '$http'];

  function checkVersionService(hmsPopup,
                               baseConfig,
                               $http) {
    var url = baseConfig.businessPath + '/common_info/app_upgrade_info',
      checkVersionParams = {
        'params': {
          'p_platform': ionic.Platform.isAndroid() ? 'Android' : 'iPhone',
          'p_user_name': window.localStorage.empno,
          'p_app_id': baseConfig.appUpId
        }
      };
    var serveVersionParams = {
      minVersion: '',
      bigVersion: '',
      minUpdateUrl: '',
      bigUpdateUrl: '',
      updateContent: ''
    };

    var dealVersionUtil = function (localVersion, serveVersion) {
      if (parseInt(localVersion[0]) < parseInt(serveVersion[0])) {
        return true;
      } else if (parseInt(localVersion[0]) == parseInt(serveVersion[0])) {
        if (parseInt(localVersion[1]) < parseInt(serveVersion[1])) {
          return true;
        } else if (parseInt(localVersion[1]) == parseInt(serveVersion[1])) {
          if (parseInt(localVersion[2]) < parseInt(serveVersion[2])) {
            return true;
          } else {
            return false;
          }
        }
      }
      return false;
    }


    var checkAppStoreVersion = function (newName) {
      var destUrl = 'http://itunes.apple.com/cn/lookup?id=1004914790';
      var promise = $http.get(destUrl).success(function (response) {
        if (baseConfig.debug) {
          console.log("checkAppStoreVersion success");
          console.log(" response " + angular.toJson(response));
          console.log("checkAppStoreVersion End!");
        }
        var result = response.results;
        var appstoreVersion = '';
        if (result[0]) {
          appstoreVersion = result[0].version;
          var serveVersion = appstoreVersion.split('.');
          var localVersion = baseConfig.version.currentVersion.split('.');

          if (dealVersionUtil(localVersion, serveVersion)) {

            function selectAction(buttonIndex) { // update from pgy
              if (buttonIndex == 1) { //确认按钮
                window.open('https://itunes.apple.com/us/app/id1004914790?ls=1&mt=8', '_system', 'location=yes');
              } else { //取消按钮
                return;
              }
            };
            hmsPopup.confirm('', "AppStore有新版本更新", selectAction);
          } else {
            if (appstoreVersion === baseConfig.version.currentVersion) {

              if (baseConfig.debug) {
                console.log("appstoreVersion " + appstoreVersion);
                console.log("baseConfig.version.currentVersion " + baseConfig.version.currentVersion);
              }

              var promise = $http.post(url, checkVersionParams).success(function (response) {
                var minVersion = response.returnData.subVersiorNumber;
                var minUpdateUrl = response.returnData.subDownloadUrl;
                var subDownloadDesc = response.returnData.subDownloadDesc;
                var subForceUpdate = response.returnData.sub_force_update;
                if (parseInt(minVersion) > parseInt(baseConfig.version.currentSubVersion)) {
                  if (subForceUpdate == 'Y') {
                    function selectAction_min_v2(buttonIndex) { // update from pgy
                      if (buttonIndex == 0) { //确认按钮
                        hotpatch.updateNewVersion(minUpdateUrl);
                      }
                    }

                    hmsPopup.confirmOnly(subDownloadDesc, "小版本更新", selectAction_min_v2);
                  } else {
                    function selectAction_min(buttonIndex) { // update from pgy
                      if (buttonIndex == 1) { //确认按钮
                        hotpatch.updateNewVersion(minUpdateUrl);
                      } else { //取消按钮
                        return;
                      }
                    }

                    hmsPopup.confirm(subDownloadDesc, "小版本更新", selectAction_min);
                  }
                } else {
                  if (newName === 'MY_INFO') {
                    hmsPopup.showShortCenterToast("当前为最新版本");
                  }
                }
              });
            } else {
              if (newName === 'MY_INFO') {
                hmsPopup.showShortCenterToast("当前为最新版本");
              }
            }
          }
        }
      }).error(function (response, status) {
        if (baseConfig.debug) {
          console.log("checkAppStoreVersion error");
          console.log("checkAppStoreVersion response " + response);
          console.log("checkAppStoreVersion status " + status);
          console.log("checkAppStoreVersion End!");
        }
      });
    };

    /**
     * 检查app的版本更新
     * -- 分大版本和小版本的update
     */
    return {
      checkAppVersion: function (newName) {

        if (baseConfig.appStoreFlag) {
          checkAppStoreVersion(newName);
        } else {
          var promise = $http.post(url, checkVersionParams).success(function (response) {
            try {
              serveVersionParams.bigVersion = response.returnData.versionNumber;
              serveVersionParams.bigUpdateUrl = response.returnData.downloadUrl;
              serveVersionParams.minVersion = response.returnData.subVersiorNumber;
              serveVersionParams.minUpdateUrl = response.returnData.subDownloadUrl;
              serveVersionParams.subForceUpdate = response.returnData.sub_force_update;
            } catch (e) {
            }
            try {
              serveVersionParams.updateContent = response.returnData.upgradeInfo.replace(/\\n/g, '\r\n');
            } catch (e) {
              serveVersionParams.updateContent = '';
            }

            try {
              serveVersionParams.subDownloadDesc = response.returnData.subDownloadDesc.replace(/\\n/g, '\r\n');
            } catch (e) {
              serveVersionParams.subDownloadDesc = '';
            }

            var serveVersion = serveVersionParams.bigVersion.split('.');
            var localVersion = baseConfig.version.currentVersion.split('.');

            function dealVersion() {
              if (parseInt(localVersion[0]) < parseInt(serveVersion[0])) {
                return true;
              } else if (parseInt(localVersion[0]) == parseInt(serveVersion[0])) {
                if (parseInt(localVersion[1]) < parseInt(serveVersion[1])) {
                  return true;
                } else if (parseInt(localVersion[1]) == parseInt(serveVersion[1])) {
                  if (parseInt(localVersion[2]) < parseInt(serveVersion[2])) {
                    return true;
                  } else {
                    return false;
                  }
                }
              }
              return false;
            }

            if (dealVersion()) {
              if (ionic.Platform.isWebView()) {
                function selectAction(buttonIndex) { // update from pgy
                  if (buttonIndex == 1) { //确认按钮
                    window.open(serveVersionParams.bigUpdateUrl, '_system', 'location=yes');
                  } else { //取消按钮
                    return;
                  }
                };
                if (!baseConfig.appStoreFlag) {
                  hmsPopup.confirm(serveVersionParams.updateContent, "大版本更新", selectAction);
                } else {
                  //go appleStore--
                  hmsPopup.showPopup('AppStore有新版APP！快去更新吧！');
                }
              } else {
                alert(serveVersionParams.updateContent);
              }
            } else {
              if (serveVersionParams.bigVersion === baseConfig.version.currentVersion &&
                parseInt(serveVersionParams.minVersion) > parseInt(baseConfig.version.currentSubVersion)) {

                if (serveVersionParams.subForceUpdate == 'Y') {
                  function selectAction_min_v2(buttonIndex) { // update from pgy
                    //alert('selectAction_min_v2.buttonIndex ' + buttonIndex);
                    if (buttonIndex == 0) { //确认按钮
                      hotpatch.updateNewVersion(serveVersionParams.minUpdateUrl);
                    }
                  }

                  hmsPopup.confirmOnly(serveVersionParams.subDownloadDesc, "小版本更新", selectAction_min_v2);
                } else {
                  function selectAction_min(buttonIndex) { // update from pgy
                    if (buttonIndex == 1) { //确认按钮
                      hotpatch.updateNewVersion(serveVersionParams.minUpdateUrl);
                    } else { //取消按钮
                      return;
                    }
                  }

                  hmsPopup.confirm(serveVersionParams.subDownloadDesc, "小版本更新", selectAction_min);
                }
              } else {
                if (newName === 'MY_INFO')
                  hmsPopup.showShortCenterToast("当前为最新版本");
              }
            }
          });
        }
      }
    }
  }
})();
