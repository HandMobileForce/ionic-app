(function () {
  'use strict';
  angular.module('hmsModule')
    .directive('elasticImage', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
      return {
        restrict: 'A',
        link: function ($scope, $scroller, $attr) {
          var image = document.getElementById($attr.elasticImage);
          var imageHeight = $attr.elasticHeight;

          $scroller.bind('scroll', function (e) {
            if (e.detail.scrollTop <= 0) {
              var scrollTop = e.detail.scrollTop;
              image.style.height = (imageHeight - scrollTop) + 'px';
            } else {
              image.style.height = imageHeight + 'px';
            }
            $scope.$apply();
          });
        }
      }
    }]);
})();
