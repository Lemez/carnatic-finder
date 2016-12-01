app.controller("FilterController", function($scope, filterService) { 
    $scope.filterService = filterService;
    $scope.remove = function() { 
    	$scope.filterService.activeFilters={};
    }
    

});