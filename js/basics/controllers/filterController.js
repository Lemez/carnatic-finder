app.controller("FilterController", function($scope, filterService) { 
    $scope.filterService = filterService;

    $scope.remove = function() { 
    	$scope.filterService.activeFilters={};
    }

    $scope.concerts = AllConcerts;
    $scope.all_artists = [];  
    $scope.all_vocalists = []; 
    $scope.all_insts = [];   

    for (var i=0; i<$scope.concerts.length; i++){
        var show = $scope.concerts[i];

        if (show.artists[0]!=null){

        	show.all_show_artists=[];
        	show.all_show_instruments=[];
        	show.lead_instrument=show.artists[0]['instrument'].trim();

            for (var k=0; k<show.artists.length; k++){
                var newName = show.artists[k]['name'].trim();
                show.all_show_artists.push(newName);

                var newInst = show.artists[k]['instrument'].trim();
                show.all_show_instruments.push(newInst);

                 if (newInst==='Vocal' && $scope.all_vocalists.indexOf(newName)==-1){
                  $scope.all_vocalists.push(newName);  
                }

                if ( $scope.all_artists.indexOf(newName)==-1){
                    $scope.all_artists.push(newName);
                 }
                if ( $scope.all_insts.indexOf(newInst)==-1){
                    $scope.all_insts.push(newInst);
                 }
            }

        }
         
    }

     $scope.all_artists.sort();
     $scope.all_insts.sort();
     $scope.all_vocalists.sort();
    

});