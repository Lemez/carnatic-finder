app.filter('dancify', function() {

	var isDance = function(input) {
		
		if (input===true){
			return 'Dance & Events';
		} else {
			return input;
		}
	 }
	return isDance; 
});
