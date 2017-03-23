/**
 * Created by 2016年7月30日
 */

angular.module('hmsDirectives', [])
  .directive('hmsInputNumber', function ($ionicLoading) {
    return {
      link: function (scope, iElement, iAttrs, controller) {
        scope.$watch(iAttrs.ngModel, function (newVal, oldVal) {
            scope.value = newVal;
            if (scope.value === "" || scope.value === undefined) {
              return;
            } else {
              if (isNaN(scope.value)) {
                $ionicLoading.show({
                  template: '输入不合法,请输入纯数字！',
                  duration: 1000
                });
              }
            }
          }
        );
      }
    };
  })
  //自定义direcitve(hmsMouseEven)操作DOM元素---选中为自定义颜色、取消无样式。
  .directive('hmsMouseEven', function ($ionicLoading) {
    return {
      link: function (scope, iElement, iAttrs, controller) {
        console.log("选择的颜色：", iAttrs.hmsMouseEven);
        iElement.bind('mouseenter', function () {
          iElement.css('color', iAttrs.hmsMouseEven);
        });
        iElement.bind('mouseleave', function () {
          iElement.css('color', '');
        });
      }
    };
  })
  .directive('hmsTable', ['$timeout', '$ionicScrollDelegate',
    function ($timeout, $ionicScrollDelegate) {
      return {
        restrict: 'ACE',
        //scope重定义
        scope: {
          hmsColumnName: '=columnname',
          hmsHeadData: '=headdata',
          hmsBodyData: '=bodydata'
        },
        templateUrl: 'build/lib/handLib/hmsDirectiveHtml/hmsTable.html',
        link: function (scope, element, attrs) {
          var ta = element[0], $ta = element;
        },
        controller: function ($scope, $attrs, $element) {
          //滑动定位
          $scope.scroll = function () {
            var scrollLeft = $ionicScrollDelegate.$getByHandle('hmsTableBody').getScrollPosition().left;
            $ionicScrollDelegate.$getByHandle('hmsTableHeader').scrollTo(scrollLeft, 0);
          };

          //自适应列宽
          $scope.hmsResetWidth = function (index, str) {
            var newWidth = str.length * 0.875 + 0.5;
            if (newWidth > 3.5) {
              var className = "column-" + index;
              var elements = document.getElementsByClassName(className);
              for (var i = 0; i < elements.length; i++) {
                elements[i].style.width = newWidth + 'rem';
              }
            }
          };
        }
      };
    }
  ])
  .directive('elasticImage', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
    return {
      restrict: 'A',
      link: function ($scope, $scroller, $attr) {
        var image = document.getElementById($attr.elasticImage);
        var imageHeight = image.offsetHeight;
        var currentBrightness = '';
        var brightness5 = "blur(5px) brightness(0.9)";
        var brightness4 = "blur(3px) brightness(0.9)";
        var brightness3 = "blur(2px) brightness(0.9)";
        var brightness2 = "blur(1px) brightness(0.9)";
        var brightness1 = "blur(0px)";
        currentBrightness = brightness5;

        $scroller.bind('scroll', function (e) {
          var scrollTop = e.detail.scrollTop;

          //console.log('scrollTop ' + scrollTop);

          var newImageHeight = imageHeight - scrollTop;
          /////////
          var calculation = 0;
          var blur = 0;
          var brightness = 0;
          if (newImageHeight < 0) {
            newImageHeight = 0;
            calculation = 0;
          }
          if (scrollTop <= 0) {

            if (-scrollTop >= 0 && -scrollTop < 40) {
              if (currentBrightness != brightness5) {
                currentBrightness = brightness5;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }

            if (-scrollTop >= 40 && -scrollTop < 80) {
              if (currentBrightness != brightness4) {
                currentBrightness = brightness4;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }

            if (-scrollTop >= 80 && -scrollTop < 120) {
              if (currentBrightness != brightness3) {
                currentBrightness = brightness3;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }

            if (-scrollTop >= 120) {
              if (currentBrightness != brightness1) {
                currentBrightness = brightness1;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }
          }
          image.style.height = newImageHeight + 'px';
        });
      }
    };
  }])
    .directive('hmsToTop',['$ionicScrollDelegate',function($ionicScrollDelegate){
      return{
        restrict:'EA',
        replace:true,
        scope:{
          imgPath:'@',
          restore:'&',
          img_restore1:'@imgClass'
        },
        template:'<img ng-src="{{imgPath}}" id="img_id" ng-click="restore()" on-drag="onDrag($event)" 								   	on-touch="onTouch($event)" class="{{img_restore1}}">',
        link:function(scope,element,attras){
          scope.restore=function(){
            var top=$ionicScrollDelegate.getScrollPosition().top;
            //console.log(element[0].style.display);
            //element[0].style.display="none";
            if(top>0){
              //element.style.display="inline";
              $ionicScrollDelegate.scrollTop(true);
            }
          };
          var ox,oy,maxWidth,maxHeight;
          if(attras.checkdrag==='true') {
            scope.onTouch = function ($event) {
              ox = $event.target.offsetLeft;
              oy = $event.target.offsetTop;
              maxWidth = screen.width-element[0].offsetWidth;
              maxHeight = screen.height-element[0].offsetWidth;
              //console.log(maxHeight+","+maxWidth);
            };
            scope.onDrag = function ($event) {
              var el = $event.target,
                  dx = $event.gesture.deltaX,
                  dy = $event.gesture.deltaY;
              distanceX = ox + dx;
              distanceY = oy + dy;
              //console.log(distanceX+","+distanceY);
              if (distanceX < 0) {
                el.style.left = 0;
              } else if (distanceX > maxWidth) {
                el.style.right = 0;
              } else {
                el.style.left = ox + dx + "px";
              }
              if (distanceY < 0) {
                el.style.top = 0;
              } else if (distanceY > maxHeight) {
                el.style.bottom = 0;
              } else {
                el.style.top = oy + dy + "px";
              }

            };
          }
        }
      }
    }])
   .directive('hmsSvgLoader', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.addClass('pageload-overlay');
          var template = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" preserveAspectRatio="none"><path/></svg>';
          var ele = angular.element(template);
          element.append(ele);
        }
      };
    })
    /*
     * Created by WillJiang on 9/1/16.
     */
    .directive('hmsInputProgress', function () {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
          var template = '<div class="colors"></div>';
          var colorDiv = angular.element(template);

          var classStyle = attrs['progressClass'];
          var position = attrs['progressPosition'];
          var colors = scope[attrs['progressColorAry']];
          var eles = document.querySelectorAll('input,textarea,select');
          var inputs = [];
          angular.forEach(eles, function (item, index) {
            if (item.type !== 'button' && item.type !== 'submit') {
              inputs.push(item);
              item.addEventListener('input', cb, false);
            }
          });

          element.append(colorDiv);
          switch (classStyle) {
            case 'flash':
              //蹇呴』璁剧疆 progressColorAry 鍙傛暟
              break;
            case 'gradient':
              var temp;
              if (colors) {
                temp = [
                  [colors[0], '0'], [colors[1], '100%']
                ];
              } else {
                temp = [
                  ['#009dff', '0'], ['#00c8ff', '100%']
                ];
              }
              colors = generateCSSGradient(temp);
              break;
            case 'sections':
              //蹇呴』璁剧疆 progressColorAry 鍙傛暟
              var step = 100 / (colors.length);
              var p = 0;
              var color = [];
              angular.forEach(colors, function (item, index) {
                color.push([item, p + '%']);
                p += step;
                color.push([item, p + '%']);
              });
              colors = generateCSSGradient(color);
              break;
            default:
              if (!colors) {
                colors = ['#009dff'];
              }
              break;
          }

          position === 'top' ? element.addClass('top-' + classStyle) : element.addClass('bottom-' + classStyle);

          function cb() {
            var t = [];
            for (var n = inputs.length; n--;) {
              if (!inputs[n].value.length) t.push(inputs[n]);
            }
            var r = t.length;
            var i = inputs.length;
            var s = element;
            for (var o = s.length; o--;) {
              s[o].style.width = 100 - r / i * 100 + "%";
              switch (classStyle) {
                case 'flash':
                  s[o].style.background = colors[i - r - 1];
                  break;
                case 'gradient':
                  s[o].style.background = colors;
                  break;
                case 'sections':
                  var child = element.children('.colors');
                  child[0].style.background = colors;
                  child[0].style.width = window.innerWidth + "px";
                  break;
                default:
                  s[o].style.background = colors[0];
                  break;
              }
            }
          }

          //gradient 鍜� sections 闇€瀵归鑹叉暟鎹繘琛屽鐞�
          function generateCSSGradient(colours) {
            var l = colours.length, i;
            for (i = 0; i < l; i++) colours[i] = colours[i].join(" ");
            return "linear-gradient( to right, " + colours.join(", ") + ")";
          }
        }
      };
    })
    .directive('hmsSelector',function ($ionicModal) {
      return {
        restrict:"EA",
        templateUrl:"hmsSelector.html",
        scope:{
          hmsTitle:"=",
          hmsValue:"=",
          hmsModalValue:"=",
          hmsPaging:"="
        },
        link: function (scope,element,attrs) {
          scope.screenHeig = window.innerHeight;
          console.log("高度",scope.screenHeig);
          //根据值的多少判断打开哪个modal
          if (scope.hmsModalValue.length>=scope.hmsPaging) {        //数值多，打开带筛选框的
            $ionicModal.fromTemplateUrl('hms-many-data-modal.html', {
              scope: scope,
              animation: 'slide-in-up'
            }).then(function(modal) {
              scope.manyModal = modal;
            });
            scope.info = {    //过滤器
              filter:""
            };
            scope.openModal = function() {    //打开modal
              scope.manyModal.show();
            };
            //清选
            scope.clear = function () {
              scope.hmsValue = "";
              scope.info.filter = "";
              scope.manyModal.hide();
            }
            //返回,关闭modal
            scope.closeModal = function() {
              scope.manyModal.hide();
              scope.info.filter = "";
            };
            //选值
            scope.choose = function (item) {
              scope.hmsValue = item;
              scope.info.filter = "";
              scope.manyModal.hide();
            };
            //删除输入的值
            scope.delete = function () {
              scope.info.filter = "";
            }
          } else {    //数值不多，打开不带筛选框的
            $ionicModal.fromTemplateUrl('hms-modal.html', {
              scope: scope,
              animation: 'slide-in-up'
            }).then(function(modal) {
              scope.modal = modal;
            });
            scope.openModal = function() {
              scope.modal.show();
              setTimeout(function () {
                if (scope.hmsModalValue.length == 3) {
                  $(".hmsModal").css("top", scope.screenHeig - 202 + 'px')
                } else if (scope.hmsModalValue.length >= 4 && scope.hmsModalValue.length<scope.hmsPaging) {
                  $(".hmsModal").css("top", 47 + '%');
                  $(".hmsModal").css("min-height", 53 + '%')
                } else if(scope.hmsModalValue.length<3){
                  $(".hmsModal").css("top", scope.screenHeig - 149 + 'px')
                }
              },0)
            };
            scope.choose = function (item) {
              scope.hmsValue = item;
              scope.modal.hide();
            }
          }
        }
      }
    })
    .directive('hmsSlideList', function () {
      return {
        restrict: 'EA',
        scope:true,
        template:'<div ng-click="selectList()" class="select" style="border-radius:8px"> <div><input class="selectInput" type="text" ng-model="handAPIrecord"  readonly required></div> <div><img class="imgIcon"  src="http://sandbox.runjs.cn/uploads/rs/274/c3z5q3my/list.png"></div> </div> <div  class="selectLists" style="display:none">  <div class="search"> <div><input class="serchInput" ng-change="valueChange(selectParam)" ng-model="selectParam"></div>   <div> <i class="icon ion-ios-search searchIcon"></i></div></div> <ion-scroll delegate-handle="contentHandle"  class="serchScroll"> <div class="itemList" ng-repeat="item in handAPIItemlist" ng-init="index = $index" ng-click="select(index)"><div ng-bind-html="item.data | highlight:selectParam"></div></div><ion-infinite-scroll on-infinite="loadData()" ng-if="pagination.SearchIsshow"></ion-infinite-scroll></ion-scroll></div>',

        link:function(scope,element,attrs){
          if(attrs.listdata){
            scope.handAPIItemlist = scope[attrs.listdata];
            scope.handAPIcopyList = scope.handAPIItemlist;
          }
          scope.handAPIrecord = scope[attrs.selectdata];

        },

        controller: function ($scope, $element,$attrs,$timeout,$ionicScrollDelegate) {
          var elem = angular.element($element);

          var child = elem.children('div');

          //输入框的输入的值
          $scope.selectParam = "";
          //分页参数
          $scope.pagination = {
            SearchIsshow:true,
            pageNum:0,
            Timer:''
          };
          //下拉列表
          $scope.selectList = function () {

            var node= child[0];
            var node2 =child[1];
            if(node2.style.display =='none'){
              $(node2).slideDown(100);
              node.style.borderBottomLeftRadius ="";
              node.style.borderBottomRightRadius ="";

            }else{
              $(node2).slideUp(100);
              node.style.borderBottomLeftRadius ="8px";
              node.style.borderBottomRightRadius ="8px";

            }
          };
          //下拉选择
          $scope.select = function(index){
            var selectList = $('.selectLists');
            $(selectList[0]).slideUp(100);
            var node= document.getElementsByClassName('select');
            node[0].style.borderBottomLeftRadius ="8px";
            node[0].style.borderBottomRightRadius ="8px";
            $scope[$attrs.selectdata]=$scope.handAPIItemlist[index].data;
            $scope.handAPIrecord = $scope.handAPIItemlist[index].data;
          };

          //分页加载数据(这儿写分页方法)
          $scope.loadData = function(){

            var array = [];
            if($scope.selectParam.length>0){
              angular.forEach($scope.handAPIItemlist,function(data,key){
                var flag =  new RegExp($scope.selectParam).test(data.data);
                if(flag){
                  array.push(data);
                }
              });
              $scope.handAPIItemlist = array;
              $scope.pagination.SearchIsshow = false;
            }else{
              $scope.handAPIItemlist = $scope.handAPIcopyList;
              $scope.pagination.SearchIsshow = false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');

          };
          //查询调用分页
          $scope.initLoadData = function(){
            if ($scope.pagination.Timer) {
              clearTimeout($scope.pagination.Timer);
              $scope.pagination.Timer='';
            }
            $timeout(function(){
              $scope.pagination.SearchIsshow = true;
              $scope.pagination.pageNum = 0;
              // $scope.handAPIItemlist=[];
              $timeout(function(){
                $scope.loadData();
              },500);
              //  $ionicScrollDelegate.$getByHandle('contentHandle').resize();
              // $scope.$broadcast('scroll.infiniteScrollComplete');
            },50)
          };
          //监听查询值变化
          $scope.valueChange = function(){
            $scope.pagination.pageNum = 0;
            //$scope.handAPIItemlist=[];
            if ($scope.pagination.Timer) {
              clearTimeout($scope.pagination.Timer);
            }
            $scope.pagination.Timer = setTimeout(function () {
              $scope.initLoadData();
            }, 50);
          };


        }

      }

    })
  //过滤器查询匹配的值
    .filter("highlight", function ($sce) {

      var fn = function (text, search) {
        if (!search) {
          return $sce.trustAsHtml(text);
        }
        text = text.toString();
        if (text.indexOf(search) == -1) {
          return text;
        }
        var regex = new RegExp(search, 'gi');
        var result = text.replace(regex, '<span style="color:red;">$&</span>');
        return $sce.trustAsHtml(result);
      };
      return fn;
    })
    .directive('hmsLockSetting', function () {
      //手势解锁设置
      return {
        restrict: 'ACE',
        scope: {
          operation: '=operation',
          strokestyle:'=strokestyle',
          fillstyle:'=fillstyle',
          minifillstyle:'=minifillstyle',
          ministrokestyle:'=ministrokestyle',
          linewidth:'=linewidth',
          choosetype:'=choosetype',
          havedelta:'=havedelta',
          successinit:'&',
          successchange:'&',
          successrmlock:'&',
          successunlock:'&',
          errorcallback:'&'
        },
        replace:true,
        template: '<div class="lock-panel">' +
        '<h4 id="setting-description"></h4>' +
        '<canvas id="mini-container"></canvas> ' +
        '<canvas id="setting-container"></canvas> ' +
        '<button id="setting-reset" ng-show="({{operation}} == 0)">重设</button>' +
        '</div>',
        controller: function ($scope, $element, $attrs, $timeout, $state, storageSettingLock, $rootScope, $ionicHistory) {
          $timeout(function () {
            if (!storageSettingLock.getLock()) {
              var w = window.innerWidth
                  || document.documentElement.clientWidth
                  || document.body.clientWidth;
              console.log(w);
              var config = {
                height: w * 8 / 10,
                width: w * 8 / 10,
                miniHeight: w / 10 * 3,
                miniWidth: w / 10 * 3,
                operation: $scope.operation,
                canvasID: "setting-container",
                descID: "setting-description",
                resetID: 'setting-reset',
                miniCanvasID: "mini-container",
                haveDelta:$scope.havedelta,//连接小圆圈的箭头 默认为fasle
                fillStyle:$scope.fillstyle,//连接线的颜色 默认为蓝色
                strokeStyle:$scope.strokestyle,//圆圈颜色 默认为蓝色
                lineWidth:$scope.linewidth,//连接线的粗细 默认为2px
                chooseType:$scope.choosetype,//n*n 默认为9宫格
                miniFillStyle:$scope.minifillstyle,
                miniStrokeStyle:$scope.ministrokestyle,
                successInitCallback: function () {
                  var desc = document.getElementById('setting-description');
                  desc.className = '';
                  $scope.successinit();
                  $rootScope.$broadcast('INIT_GESTURE_PASSWORD');
                },
                successChangeCallback: function () {
                  var desc = document.getElementById('setting-description');
                  desc.className = '';
                  $scope.successchange();
                },
                successRmLockCallback: function () {
                  var desc = document.getElementById('setting-description');
                  desc.className = '';
                  $rootScope.$broadcast('REMOVE_GESTURE_PASSWORD');
                  $scope.successrmlock();
                },
                successUnlockCallback: function () {
                  var desc = document.getElementById('setting-description');
                  desc.className = '';
                  $scope.successunlock();
                },
                errorCallback: function () {
                  var desc = document.getElementById('setting-description');
                  desc.className = '';
                  $timeout(function () {
                    desc.className = 'error-description';//为desc添加一个抖动动画效果
                    $scope.errorcallback();
                  }, 20);

                }
              };
              storageSettingLock.initLock(config);
            } else {
              $scope.lock = storageSettingLock.getLock();
              $scope.lock.operation = $scope.operation;                   //更新当前操作
              $scope.lock.init();                                             //重新绘制
            }
          }, 100);
        }
      };
    })
    .factory('storageSettingLock', function () {
      var lock;
      return {
        initLock: function (config) {
          lock = new H5lock(config);
          lock.init();
        },
        getLock: function () {
          return lock;
        }
      }
    });
