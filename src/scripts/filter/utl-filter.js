/**
 * Created by wolf on 2016/6/13. (_wen.dai_)
 */

//消息类型提示图标
(function () {
  angular.module('utilModule')
    .filter('messageIconFilter', messageIconFilter)
    .filter('messageTimeFilter', messageTimeFilter);

  //消息类型提示图标
  function messageIconFilter() {
    return function (data) {
      var baseUrl = 'build/assets/img/message/';
      switch (data) {
        case 'health_remind':
          return baseUrl + 'health@3x.png';
        case 'system_information':
          return baseUrl + 'system@3x.png';
        case 'activity_remind':
          return baseUrl + 'activity@3x.png';
        default:
          return baseUrl + 'health@3x.png';
      }
    }
  }

  //消息时间提示文本
  /* @ngInject */
  function messageTimeFilter(commonService) {
    return function (data) {
      var now = new Date();
      var nowDateTime = commonService.getDateTimeDString(now);  //当前的日期时间格式化字符串
      var yesterday = commonService.getDateTimeDString(new Date().setDate(now.getDate() - 1));  //昨天的日期时间格式化字符串
      //解析日期字符串格式成日期对象
      var strArray = data.split(" ");
      var strDate = strArray[0].split("-");
      var strTime = strArray[1].split(":");
      var time = new Date(strDate[0], (strDate[1] - parseInt(1)), strDate[2], strTime[0], strTime[1], strTime[2]).getTime();  //获取到数据时间的毫秒数
      if (nowDateTime.substr(0, 10) == data.substr(0, 10)) {  //如果是当前日期，则显示多少小时前
        if (now.getTime() < time) {
          return '请调整系统时间';
        } else {
          var hours = Math.floor((now.getTime() - time) / (1000 * 60 * 60));
          var minutes = Math.ceil(((now.getTime() - time) % (1000 * 60 * 60)) / (1000 * 60));
          if (minutes == 60) {
            return (hours + 1) + "小时前";
          } else if (hours == 0) {
            return minutes + "分钟前";
          } else {
            return hours + "小时" + minutes + "分钟前";
          }
        }
      } else if (yesterday.substr(0, 10) == data.substr(0, 10)) {  //显示昨天
        return '昨天';
      } else {    //昨天之前的显示日期
        if (now.getTime() < time) {
          return '请调整系统时间';
        } else {
          return data.substr(0, 10);
        }
      }
    }
  }
})();
