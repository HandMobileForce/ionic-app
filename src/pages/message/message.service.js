/**
 * Created by gusenlin on 16/9/21.
 */

angular.module('messageModule')
  .service('messageService', function messageService($q) {
      var num = 3;

      this.getNum = function () {
        return num;
      }
    }
  );
