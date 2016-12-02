
angular.module("BasicApp").controller("MainController", function($scope, filterService){

    $scope.filterService = filterService;
    $scope.concerts = AllConcerts;
    $scope.direction = {
        datetime:true,
        location:true,
        festival:true,
        active:''
    }

    for (var i=0; i<$scope.concerts.length; i++){
        var show = $scope.concerts[i];

        if (show.artists[0]==null){
            show.specialevent = true;

        } else {
            show.specialevent = false;
        }
    }

    $scope.sortOrder = function(area){
        $scope.concerts.sort(function(a,b){
            if (a[area] < b[area]){ return ($scope.direction[area] ? -1 : 1 );}
            else if (b[area] < a[area]) {return ($scope.direction[area] ? 1 : -1 );}
            else {return 0;}
        });
        $scope.direction[area] = !$scope.direction[area];
         $scope.direction.active = area;
    }


    $scope.newConcert = null;
    $scope.addNew = function() {
        if ($scope.newConcert != null && $scope.newConcert != "") {
            $scope.concerts.push({
                id: $scope.concerts.length,
                location: $scope.newConcert,
                artists: []
            });
        }
     }

     $scope.sortOrder('datetime');
   
});

