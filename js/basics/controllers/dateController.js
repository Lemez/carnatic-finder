
angular.module('mightyDatepicker', []).controller("DateController", function($scope){
  _callthis = function(day) {
    console.log("call this: ", day);
  }

  _filter = function (day) {
    w = day.weekday();
    return w < 6 && w > 0;
  }

$scope.date = null;
$scope.options = {
  months: 1,
  after: moment(),
  template: template
};
});