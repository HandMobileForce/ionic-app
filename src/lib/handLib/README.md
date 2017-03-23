# handLib

## handLib Contents
* [Getting Started](#getting-started)
    * [download or update](#download-or-update)
    * [hmsInputNumber](#hmsinputnumber)
    * [hmsMouseEven](#hmsmouseeven)
    * [hmsTable](#hmstable)
    * [hmsToTop](#hmstoTop)
    * [hmsInputProgress](#hmsinputprogress)
    * [hmsSelector](#hmsselector)
    * [hmsSlideList](#hmsslidelist)
    * [hmsLockSetting](#hmsLockSetting)
* [License](#license)

# Getting Started

# download or update
```bash
1、get clone https://github.com/HandMobileForce/handLib.git
2、修改代码
3、Git add –all
4、Git commit –m ‘备注说明’
5、Git push origin master:master
bower update  更新所有的 （bower update handLib）更新当前库
注：当需要保存上一个版本的时候，可以在提交之前给上一个版本取个版本号。用bower install
    每次下载的是master上最新的代码，这样通过设定的版本号，可以下载某个当前版本的代码。
```

# hmsInputNumber 
* 控制输入必须为数字
```bash
  <input type="text" hms-input-number style="width:100%;font-size: 14px;border:1px solid #000000">
```

# hmsMouseEven 
* 操作DOM元素---选中为红色、取消无样式。
```bash
   hand-api-mouse-even="yellow"  (选择需要的颜色传入)
  <input type="text" hms-mouse-even="yellow" style="width:100%;font-size: 14px;border:1px solid #000000">
```

# hmsTable

```bash
  html ：
  <!--首行首列固定的滚动表格 begin-->
  <ion-content scroll="false">
    <hms-table
      columnname="userColumnName"
      headdata="userHeadData"
      bodydata="userBodyData">
    </hms-table>
  </ion-content>
  <!--end-->

  js：中定义数据的来源，格式如下
   //数据来源
   $scope.userColumnName = "姓名";
    
   $scope.userHeadData = [
     {"headItem": "语文"}, {"headItem": "数学"}, {"headItem": "英语"},
     {"headItem": "物理"}, {"headItem": "化学"}, {"headItem": "生物"}, 
     {"headItem": "历史"}, {"headItem": "地理"}, {"headItem": "政治"}
   ];
   
   $scope.userBodyData = [
      {
        "code": "0001",
        "name": "张三",
        "bodyItem": [
          {"headItem": "语文", "bodyValue": "111111111"},
          {"headItem": "数学", "bodyValue": "100"},
          {"headItem": "英语", "bodyValue": "107"},
          {"headItem": "物理", "bodyValue": "22"},
          {"headItem": "化学", "bodyValue": "51"},
          {"headItem": "生物", "bodyValue": "78"},
          {"headItem": "历史", "bodyValue": "61"},
          {"headItem": "地理", "bodyValue": "43"},
          {"headItem": "政治", "bodyValue": "77"}
        ]
      },
      {
        "code": "0001",
        "name": "王五",
        "bodyItem": [
          {"headItem": "语文", "bodyValue": "110"},
          {"headItem": "数学", "bodyValue": "120"},
          {"headItem": "英语", "bodyValue": "109"},
          {"headItem": "物理", "bodyValue": "88"},
          {"headItem": "化学", "bodyValue": "51"},
          {"headItem": "生物", "bodyValue": "87"},
          {"headItem": "历史", "bodyValue": "71"},
          {"headItem": "地理", "bodyValue": "45"},
          {"headItem": "政治", "bodyValue": "55"}
        ]
      }
    ];
```

# hmsToTop
* 点击按钮使列表从页面底部回到页面顶部，并且按钮在屏幕中可以随意拖动。
```bash
 <hms-to-top img-class="img_restore" checkDrag="true" animation-class="rotate1" img-path="http://sandbox.runjs.cn/uploads/rs/197/vprxhxwe/add.png"></hms-to-top>
```
# hmsSvgLoader
* 页面跳转时的svg加载动画指令
```bash
注意：需在页面引用 <script src="http://sandbox.runjs.cn/uploads/rs/41/r7zpvbql/hmsSvgLoader.js"></script>
 html中：
 //button为触发事件
  <button ng-click=class1Btn();>
  			class1
  </button>
  //该buttom绑定的svg动画
  <div hms-svg-loader="class1" hms-show-loader="willShowLoader1"></div>
  js中：
  $scope.class1Btn = function(){
  		$rootScope.willShowLoader1 = true;
  		$timeout(function(){
  			$rootScope.willShowLoader1 = false;
  		},3000);
  }
```
# hmsInputProgress
* 当页面包含输入框等元素时，使用此指令展示输入进度
```bash
  html中：
  <div hms-input-progress progress-class="sections" progress-position="top" progress-color-ary="progressColor"></div>
  		<div class="container">
  				 <form class="form-horizontal" role="form">
  				 	<div class="form-group">
  				        <label for="name1">文本</label>
  				        <input type="text" name="name1" class="form-control">
  				    </div>
  				    <div class="form-group">
  				        <label for="name2">文本</label>
  				        <input type="text" name="name2" class="form-control">
  				    </div>
  				    <div class="form-group">
  				        <label for="name3">文本域</label>
  				        <textarea name="name3"></textarea>
  				    </div>

  					<div class="form-group">
  				        <label for="name4">选择</label>
  				        <select name="name4">
  							<option></option>
  				            <option>1</option>
  				            <option>2</option>
  				            <option>3</option>
  				            <option>4</option>
  				            <option>5</option>
  				        </select>
  				    </div>

  				 </form>
  				 <label for="name">文本</label>
  				<input type="text">
  		</div>
  		<div hms-input-progress progress-class="solid" progress-position="buttom" progress-color-ary="progressColor"></div>
  	 js中：
  	  $scope.progressColor = ["#1ABC9C", "#EC7063","#3498DB","red","blue"];//设置进度条颜色
```
# hmsSelector
* 根据数据的多少打开不同的modal页
```bash
 html中：
    	<div hms-selector hms-title="'少数据'" hms-value="value.first" hms-modal-value="dataSource1" hms-paging="10"></div>
    	<div hms-selector hms-title="'多数据'" hms-value="value.second" hms-modal-value="dataSource2" hms-paging="10"></div>
 模态框

    <script id="hmsSelector.html" type="text/ng-template">
 		<div class="hmsSelector">
         <div class="row line" ng-click="openModal()">
             <div class="myTitle">{{hmsTitle}}
             </div>
             <div ng-class="{true:'myValueBrown',false:'myValue'}[(hmsValue==='' || hmsValue === null || hmsValue === undefined)]">
            {{(hmsValue === "" || hmsValue === null || hmsValue === undefined)?"请选择":hmsValue}}
            </div>
             <div class="myChevron"><i class="icon ion-chevron-right"></i></div>
            <div class="marginRight"></div>
          </div>
      </div>
 	</script>
 	 //数值多，打开带筛选框的
 	<script id="hms-many-data-modal.html" type="text/ng-template">
 		<div class="modal hmsManyDataModal">
         <ion-header-bar class="bar bar-positive">
            <div class="buttons">
               <button class="button" ng-click="closeModal()">返回</button>
             </div>
         <h1 class="title">{{hmsTitle}}</h1>
            <div class="buttons">
                <button class="button" ng-click="clear()">清选</button>
            </div>
         </ion-header-bar>
         <ion-header-bar class="bar-subheader">
            <div>
               <div class="input-left"><i class="ion-ios-search"></i></div>
               <div class="input-style">
                  <input class="input-search" placeholder="请输入查询信息" ng-model="info.filter"/>
                   <div class="delete" ng-show="info.filter !== ''" ng-click="delete()"><i class="ion-close"></i></div>
                </div>
            </div>
         </ion-header-bar>
         <ion-content>
            <div class="list">
               <div class="item" ng-repeat="i in hmsModalValue | filter:info.filter" ng-click="choose(i)">{{i}}</div>
            </div>
         </ion-content>
      </div>
 	</script>
 	//数值不多，打开不带筛选框的
 	<script id="hms-modal.html" type="text/ng-template">
 		<div class="modal hmsModal">
         <ion-header-bar class="bar bar-border-bottom">
             <h1 class="title">{{hmsTitle}}</h1>
            <a class="createNewRecord" ng-click="modal.hide()">
             <i class="ion-android-close closeIcon">
               </i>
            </a>
         </ion-header-bar>
         <ion-content>
            <div class="list">
               <div class="item" ng-repeat="i in hmsModalValue" ng-click="choose(i)">{{i}}</div>
               </div>
         </ion-content>
      </div>
 	</script>
 	js中的数据：
 	   $scope.value = {
         first: "",
         second: "",
      };
    	$scope.dataSource1 = [
         "数学", "语文"
      ];
      $scope.dataSource2 = [
         "路飞", "娜美", "罗宾", "索隆", "香吉士",
         "乔巴", "布鲁克", "乌索普", "弗兰奇", "罗杰",
         "雷利", "龙", "艾斯", "鹰眼", "汉库克",
         "甚平", "特拉法尔加·罗", "香克斯"
      ];
```
# hmsSlideList
* 带有搜索和分页的下拉框。
```bash
    html中：
         <div class = "optiontextValue">
            <hms-slide-list listData="itemlist" selectData="record" >
            </hms-slide-list>
        </div>
    js中：
            //下拉框的数据列表(数据如果来源于服务器 请将此处注释掉  改写分页方法)
            $scope.itemlist =[{'data':"122"},{'data':"353"},{'data':"1678"}];
            //选择的值
            $scope.record;
```
# hmsLockSetting
* 手势解锁设置界面 可以进行解锁界面的初始化 设置 关闭功能
```bash
   需要引入bower包 地址：git://github.com/wangkaihua/gesture-lock
   注意检查是否在index.html中引入了myLock.js
   属性说明：
                   operation:0//0表示初始化操作,1表示修改密码操作,2表示解锁操作,3表示取消密码操作
                   fillstyle:""//连接线的颜色 默认为蓝色
                   strokestyle:"",//圆圈颜色 默认为蓝色
                   minifillstyle:'',//mini连接线的颜色 默认为蓝色
                   ministrokestyle:'',//mini圆圈颜色 默认为蓝色
                   linewidth:"2",//连接线的粗细 默认为2px
                   choosetype:"3",//n*n 默认为9宫格
                   havedelta:false,//是否需要箭头指示 默认为false
                   successinit:'&',//成功初始化调用的回调函数
                   successchange:'&',//成功修改手势密码调用的回调函数
                   successrmlock:'&',//成功移除手势密码调用的回调函数
                   successunlock:'&',//成功解锁调用的回调函数
                   errorcallback:'&'//出错时调用的回调函数
     app.js中：
       if( window.localStorage.getItem('gesturePassword') && window.localStorage.getItem('gesturePassword') != ''){
           $urlRouterProvider.otherwise('/tab/lock');//开启了或者设置了密码 跳转到解锁界面
        } else {
           $urlRouterProvider.otherwise('/tab/dash');//默认界面
       }
      html中：
        //新建一个展示手势解锁界面
          <div align="center" class="hmsLockSetting lock-setting"  operation="data.operation" tab="data.tab"></div>
        js中：
          $scope.data = {
              tab:"tab.account",//默认成功解锁后跳转的页面
              operation:"2"
            };
   html中：
     //新建一个设置手势密码的界面：
     <ion-header-bar align-title="center" class="bar-stable">
         <div class="buttons">
           <button class="button button-icon ion-ios-arrow-back" ng-click="goBack()">
             <span class="back-button-text">返回</span>
           </button>
         </div>
         <h1 class="title">手势密码设置</h1>
       </ion-header-bar>
       <ion-content>
       <div align="center" class="hmsLockSetting lock-setting"  havedelta="data.haveDelta"  operation="data.operation" fillstyle="data.fillstyle"  errorcallback="errorcallback()" successinit="successInit()">

       </div>
       </ion-content>
       js中：
          $scope.goBack=function(){
            $ionicHistory.goBack();
          };
          //operation可以根据不同的情形进行设置可更改
          $scope.data={
                operation:"0",
                fillstyle:"red",
                haveDelta:true
              };
          $scope.errorcallback=function(){
             alert("失败")
          }
          $scope.successInit=function(){
             alert("初始化成功");
          }
          $rootScope.$on('REMOVE_GESTURE_PASSWORD', function () {         //接收完成取消密码操作之后发送的广播
            window.localStorage.gestureLock = "false";
          });
          $rootScope.$on('INIT_GESTURE_PASSWORD', function () {         //接收完成初始化密码操作之后发送的广播
            window.localStorage.gestureLock = "true";
          });
```
