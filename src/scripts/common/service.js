/**
 * Created by admin on 2016/7/30.
 */

(function () {
  'use strict';
  angular.module('utilModule', [])
    .service('commonService', commonService);
  /* @ngInject */
  function commonService($filter) {
    return {
      //时间的转换 时分
      getTimeString: function (date) {
        return $filter('date')(date, 'HH:mm');
      },

      //时间的转换 年月日
      getDateString: function (date) {
        return $filter('date')(date, 'yyyy-MM-dd');
      },

      //时间的转换 年月日时分
      getDateTimeString: function (date) {
        return $filter('date')(date, 'yyyy-MM-dd HH:mm');
      },

      //时间的转换 年月日时分秒
      getDateTimeDString: function (date) {
        if (date) {
          return $filter('date')(date, 'yyyy-MM-dd HH:mm:ss');
        } else {
          return $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
        }
      },

      //当前字符串是否为空 add by zss
      isEmpty: function (str) {
        return (!str || str.trim().length == 0);
      },

      //判断是否是有效的手机号码
      isVaildPhone: function (phone) {
        return phone.match(/^1\d{10}$/);
      },

      //判断是否是纯数字串
      isNumStr: function (num) {
        return num.match(/^[0-9]*$/);
      },

      //经纬度偏差
      bd2gcj: function (lat, lon) {
        var pi = 3.14159265358979324;
        var a = 6378245.0;
        var ee = 0.00669342162296594323;
        var x_pi = 3.14159265358979324 * 3000.0 / 180.0;

        var x = lon, y = lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        var bd_lon = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lat, bd_lon];
      }
    };
  }
})();
