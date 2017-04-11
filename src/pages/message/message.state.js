/**
 * Created by hunter.he on 2016/11/16.
 */
(function () {
  'use strict';
  angular.module('myApp').config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('messageList', {
        url: '/messageList',
        params: {messageType: null, messageGroupName: null},
        templateUrl: 'build/pages/message/message-list/message-list.html',
        controller: 'messageListCtrl',
        controllerAs: 'messageListVM'
      });
  }
})();
