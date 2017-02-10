/**
 * Created by gusenlin on 2017/1/22.
 */
(function () {
  'use strict';
  angular
    .module('applicationModule')
    .service('applicationService', applicationService);

  applicationService.$inject = ['$http', '$timeout'];

  function applicationService($http, $timeout) {

    var appData = {
      "returnStatus": "S",
      "returnDesc": "获取菜单信息成功",
      "returnData": {
        "officeApp": [{
          "list": [{
            "menuCode": "FLIGHT_BOOKING",
            "menuType": "OFFICE",
            "menuName": "机票预订",
            "imageUrl": "build/img/application/flight-ticke@3x.png",
            "destUrl": "plan",
            "hasWorkflowNum": "N",
            "menuSequence": 1,
            "userPrivileges": "N"
          }, {
            "menuCode": "SCHEDULE",
            "menuType": "OFFICE",
            "menuName": "工作流",
            "imageUrl": "build/img/application/schedule@3x.png",
            "destUrl": "plan",
            "hasWorkflowNum": "Y",
            "menuSequence": 2,
            "userPrivileges": "N"
          }, {
            "menuCode": "CONTRACT_MANAGE",
            "menuType": "OFFICE",
            "menuName": "合同管理",
            "imageUrl": "build/img/application/schedule@3x.png",
            "destUrl": "plan",
            "hasWorkflowNum": "Y",
            "menuSequence": 3,
            "userPrivileges": "Y"
          }, {
            "menuCode": "BLANK",
            "menuType": "",
            "menuName": "",
            "imageUrl": "",
            "destUrl": "",
            "hasWorkflowNum": "",
            "menuSequence": ""
          }]
        }],
        "projectApp": [{
          "list": [
            {
              "menuCode": "TIMESHEET",
              "menuType": "PROJECT",
              "menuName": "TS填写",
              "imageUrl": "build/img/application/timesheet@3x.png",
              "destUrl": "plan",
              "hasWorkflowNum": "N",
              "menuSequence": 1,
              "userPrivileges": "N"
            }, {
              "menuCode": "TIMESHEET_APPROVE",
              "menuType": "PROJECT",
              "menuName": "TS审批",
              "imageUrl": "build/img/application/timesheet-approval@3x.png",
              "destUrl": "plan",
              "hasWorkflowNum": "N",
              "menuSequence": 2,
              "userPrivileges": "N"
            }, {
              "menuCode": "HOUSINGRENTAL",
              "menuType": "PROJECT",
              "menuName": "房屋转租",
              "imageUrl": "plan",
              "destUrl": "tab.houses-tab",
              "hasWorkflowNum": "N",
              "menuSequence": 3,
              "userPrivileges": "N"
            }, {
              "menuCode": "SEARCH",
              "menuType": "PROJECT",
              "menuName": "资源查询",
              "imageUrl": "build/img/application/resource@3x.png",
              "destUrl": "tab.resources-query",
              "hasWorkflowNum": "N",
              "menuSequence": 4,
              "userPrivileges": "N"
            }]
        }],
        "employeeApp": [{
          "list": [{
            "menuCode": "HOLIDAY_MANAGE",
            "menuType": "EMPLOYEE",
            "menuName": "假期管理",
            "imageUrl": "build/img/application/vacation@3x.png",
            "destUrl": "tab.time-off-manage",
            "hasWorkflowNum": "N",
            "menuSequence": 1,
            "userPrivileges": "N"
          }, {
            "menuCode": "DORMAPPLY",
            "menuType": "EMPLOYEE",
            "menuName": "住宿申请",
            "imageUrl": "build/img/application/dorm@3x.png",
            "destUrl": "tab.dorm-apply",
            "hasWorkflowNum": "N",
            "menuSequence": 2,
            "userPrivileges": "N"
          }, {
            "menuCode": "CARPOOLING",
            "menuType": "EMPLOYEE",
            "menuName": "拼车",
            "imageUrl": "build/img/application/carpooling@3x.png",
            "destUrl": "tab.carpooling",
            "hasWorkflowNum": "N",
            "menuSequence": 3,
            "userPrivileges": "N"
          }, {
            "menuCode": "BUS",
            "menuType": "EMPLOYEE",
            "menuName": "班车信息",
            "imageUrl": "build/img/application/bus@3x.png",
            "destUrl": "tab.bus-information",
            "hasWorkflowNum": "N",
            "menuSequence": 4,
            "userPrivileges": "N"
          }]
        }, {
          "list": [{
            "menuCode": "PERSONNEL_POLICY",
            "menuType": "EMPLOYEE",
            "menuName": "人事政策",
            "imageUrl": "build/img/application/HR@3x.png",
            "destUrl": "tab.personnel-policy",
            "hasWorkflowNum": "N",
            "menuSequence": 5,
            "userPrivileges": "N"
          }, {
            "menuCode": "CONTACTQUICK",
            "menuType": "EMPLOYEE",
            "menuName": "意见收集",
            "imageUrl": "build/img/application/feedback@3x.png",
            "destUrl": "tab.test",
            "hasWorkflowNum": "N",
            "menuSequence": 6,
            "userPrivileges": "N"
          }, {
            "menuCode": "JIYIBI",
            "menuType": "EMPLOYEE",
            "menuName": "记一笔",
            "imageUrl": "build/img/application/feedback@3x.png",
            "destUrl": "tab.acc_main",
            "hasWorkflowNum": "N",
            "menuSequence": 7
          }, {
            "menuCode": "EXPENSELIST",
            "menuType": "EMPLOYEE",
            "menuName": "报销单",
            "imageUrl": "build/img/application/feedback@3x.png",
            "destUrl": "tab.expense",
            "hasWorkflowNum": "N",
            "menuSequence": 8
          }]
        }]
      },
      "con_status": "S"
    };

    var service = {
      getAppData: getAppData
    };
    return service;

    function getAppData() {
      return appData;
    }
  }
})();
