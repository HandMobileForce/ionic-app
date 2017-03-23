/**
 * Created by gusenlin on 2017/1/22.
 */
(function () {
  'use strict';
  angular
    .module('applicationModule')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('plan', {
        url: '/src/plan',
        params: {},
        prefetchTemplate: false,
        templateUrl: 'build/pages/application/plan/plan.html',
        controller: 'planCtrl',
        controllerAs: 'vm'
      })
  }

  angular
    .module('applicationModule')
    .controller('planCtrl', planCtrl);

  planCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$state',
    '$http',
    '$ionicHistory',
    '$timeout',
    '$ionicScrollDelegate',
    '$ionicGesture'];

  function planCtrl($scope,
                    $stateParams,
                    $state,
                    $http,
                    $ionicHistory,
                    $timeout,
                    $ionicScrollDelegate,
                    $ionicGesture) {
    var vm = this;

    var topHeight = 0;
    var screenHeight = 736;

    var _startX;
    var _startY;
    var _clientWidth = document.body.clientWidth;
    vm.currentPage = 2;

    vm.showIOSHeader = true;
    topHeight = 20;

    vm.options = {
      loop: false,
      effect: 'fade',
      speed: 500,
    };

    if (ionic.Platform.isIOS() && ionic.Platform.isWebView()) {
      topHeight = 20;
      vm.showIOSHeader = true;
    }

    var isWeekMode = false;
    var barHeight = topHeight + 44 + 45 + 50;

    vm.calendarDayStyle1 = {
      "top": barHeight + 'px',
      "transform": "translate3d(-100%, 0px, 0px)"
    };
    vm.calendarDayStyle2 = {
      "top": barHeight + 'px',
      "transform": "translate3d(0%, 0px, 0px)"
    };
    vm.calendarDayStyle3 = {
      "top": barHeight + 'px',
      "transform": "translate3d(100%, 0px, 0px)"
    };


    vm.list = [];

    for (var i = 0; i < 150; i++) {
      vm.list.push(i);
    }

    var scrollPosition = {
      top: barHeight + 50 * 5,
      height: screenHeight - barHeight - 50 * 5
    };

    vm.style = {
      "top": scrollPosition.top + "px",
      "height": scrollPosition.height + "px"
    };

    vm.weekList = [
      {"item": "日"},
      {"item": "一"},
      {"item": "二"},
      {"item": "三"},
      {"item": "四"},
      {"item": "五"},
      {"item": "六"}
    ];

    vm.currentMonth1 = [];
    vm.currentMonth2 = [];
    vm.currentMonth3 = [];

    var topValue = scrollPosition.top;
    var heightValue = scrollPosition.height;

    vm.isAnimate = false;
    vm.animateTrue = 'has-content-animate';
    vm.animateFalse = '';

    vm.onRelease = onRelease;
    vm.calendarDragUp = calendarDragUp;
    vm.calendarDragDown = calendarDragDown;


    //style="opacity: 0.9; transform: translate3d(100%, 0px, 0px);"
    var element = angular.element(document.querySelector('#slideCalendarDays'));

    var _runPageY;

    //拖拽标记TimeSheet具体天
    var dragGesture = $ionicGesture.on("drag", function (e) {
      //console.log('drag.startTouchX ' + e.gesture.touches[0].pageX);
      //console.log('drag.startTouchY ' + e.gesture.touches[0].pageY);

      if(Math.abs(_runPageY - e.gesture.touches[0].pageY) > 5){
        return;
      }

      _runPageY = e.gesture.touches[0].pageY;
      var offsetX = e.gesture.touches[0].pageX - _startX;
      var percent = Math.round((offsetX / _clientWidth) * 100);

      console.log('drag.startTouchX ' + e.gesture.touches[0].pageX);
      console.log('drag.offsetX ' + offsetX);
      console.log('drag._clientWidth ' + _clientWidth);
      console.log('drag.percent ' + percent);

      changeCalendarTransform(vm.currentPage, percent);

      $scope.$apply();
    }, element);

    var touchGesture = $ionicGesture.on("touch", function (e) {
      console.log('touch.startTouchX ' + e.gesture.touches[0].pageX);
      console.log('touch.startTouchY ' + e.gesture.touches[0].pageY);
      _runPageY = e.gesture.touches[0].pageY;
      _startX = e.gesture.touches[0].pageX;
      _startY = e.gesture.touches[0].pageY;
    }, element);

    var releaseGesture = $ionicGesture.on("release", function (e) {
      console.log('release.startTouchX ' + e.gesture.touches[0].pageX);
      console.log('release.startTouchY ' + e.gesture.touches[0].pageY);

      if(Math.abs(_startY - e.gesture.touches[0].pageY) > 10){
        return;
      }

      var offsetX = e.gesture.touches[0].pageX - _startX;

      if(Math.abs(offsetX/_clientWidth*100) > 30)

      if (offsetX > 0) {
        if (vm.currentPage == 1) {
          vm.currentPage = vm.currentPage;
        }else{
          vm.currentPage = vm.currentPage - 1;
        }
      } else {
        if (vm.currentPage == 3) {
          vm.currentPage = vm.currentPage;
        }else{
          vm.currentPage = vm.currentPage + 1;
        }
      }


      changeCalendarTransform(vm.currentPage, 0);
      $scope.$apply();
    }, element);

    function changeCalendarStyle(top) {
      vm.calendarDayStyle1.top = top + 'px';
      vm.calendarDayStyle2.top = top + 'px';
      vm.calendarDayStyle3.top = top + 'px';
    }

    function changeCalendarTransform(page, percent) {
      vm.calendarDayStyle1.transform = 'translate3d(' + ((1 - page) * 100 + percent) + '%, 0px, 0px)';
      vm.calendarDayStyle2.transform = 'translate3d(' + ((2 - page) * 100 + percent) + '%, 0px, 0px)';
      vm.calendarDayStyle3.transform = 'translate3d(' + ((3 - page) * 100 + percent) + '%, 0px, 0px)';
    }

    function changeCalendarArray() {
      if (!isWeekMode) {
        changeCalendarStyle(barHeight - 200);
      } else {
        changeCalendarStyle(barHeight);
      }
    }

    function generateDays(destMonth, days) {
      var array = {style: {}, list: []};
      for (var i = 1; i < days; i++) {
        if (i == 1 || (i - 1) % 7 == 0) {
          if (array.list.length > 0) {
            destMonth.push(array);
          }
          if (i == 1) {
            array = {
              style: {"top": (Math.ceil(i / 7) - 1) * 50 + 'px', "z-index": "10", "background": "#f8f8f8"},
              list: []
            };
          } else {
            array = {style: {"top": (Math.ceil(i / 7) - 1) * 50 + 'px'}, list: []};
          }

        }
        array.list.push(i);
      }

      if (array.list.length > 0 && array.list.length != 7) {
        destMonth.push(array);
      }

      console.log('vm.currentMonth ' + angular.toJson(destMonth))
    }

    generateDays(vm.currentMonth1, 31);
    generateDays(vm.currentMonth2, 32);
    generateDays(vm.currentMonth3, 34);

    function calendarDragUp() {

      if (isWeekMode) {
        return;
      }

      console.log('calendarDragUp...');

      topValue = topValue - 200;
      heightValue = heightValue + 200;

      vm.isAnimate = true;

      $timeout(
        function () {
          vm.style = {
            "top": topValue + "px",
            "height": heightValue + "px"
          };

          changeCalendarArray();
          isWeekMode = true;

          $timeout(function () {
            vm.isAnimate = false;
            $ionicScrollDelegate.$getByHandle('plan-scroll').resize();
          }, 700);
        }, 100
      )
    }

    function calendarDragDown() {
      if (!isWeekMode) {
        return;
      }
      console.log('calendarDragDown...');

      topValue = topValue + 200;
      heightValue = heightValue - 200;

      vm.isAnimate = true;

      $timeout(
        function () {
          vm.style = {
            "top": topValue + "px"
          }

          changeCalendarArray();
          isWeekMode = false;

          $timeout(function () {
            vm.isAnimate = false;

            vm.style = {
              "top": topValue + "px",
              "height": heightValue + "px"
            }

            $ionicScrollDelegate.$getByHandle('plan-scroll').resize();
          }, 700);
        }, 100
      )
    }

    function onRelease(e) {

      if (!isWeekMode) {
        return;
      }

      //console.log('onRelease top ' + $ionicScrollDelegate.$getByHandle('plan-scroll').getScrollPosition().top);
      var top = $ionicScrollDelegate.$getByHandle('plan-scroll').getScrollPosition().top;

      console.log('onRelease e ' + angular.toJson(e));
      console.log('onRelease top ' + angular.toJson(top));
      console.log('onRelease topValue ' + angular.toJson(topValue));
      console.log('onRelease heightValue ' + angular.toJson(heightValue));

      if (top >= 0 || top > -80) {
        return;
      }


      topValue = topValue - top;
      heightValue = heightValue + top;

      vm.style = {
        "top": topValue + "px",
        "height": heightValue + "px"
      }
      vm.isAnimate = true;

      $timeout(
        function () {
          topValue = topValue + (200 + top);
          heightValue = heightValue - (200 + top);
          vm.style = {
            "top": topValue + "px",
          };

          changeCalendarArray();
          isWeekMode = false;
          $timeout(function () {
            vm.style = {
              "top": topValue + "px",
              "height": heightValue + "px"
            };
            vm.isAnimate = false;
            $ionicScrollDelegate.$getByHandle('plan-scroll').resize();
          }, 700);
        }, 150
      )
    }

  }
})();
