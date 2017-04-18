$(function() {
	$('#toggle-trigger').on('change', function() {
		if($(this).is(':checked')) {
			$('input.amenities-input').prop('checked', true).change();
		} else {
			$('input.amenities-input').prop('checked', false).change();
		}
	});

	$('a#clear-directions').on('click', function(event) {
		event.preventDefault();
		$('#directionsPanel').html("Select an icon from the map.");
	});

	for(var i = 0; i < locations.length; i++) {
		//console.log(locations[i]);
		var optionValue = "<option value='"+locations[i][0]+"'>"+locations[i][1]+"</option>";
		$('select[name="select-list"]').append(optionValue);
	}

	$('select[name="select-list"]').on('change', function() {
		//console.log($(this).val());
		//movie_theater_markers[i].setMap(null);
		for(var i = 0; i < static_markers.length; i++) {
			static_markers[i].setMap(null);
		}
		static_markers = [];
		createMarker2($(this).val());
	});

	
	$('#satellite-map').on('change', function() {
		var mapValue = $(this).val();
		map.setMapTypeId($(this).val());
		$('#terrain-map').prop( "checked", false);
      	$('#hybrid-map').prop( "checked", false);
	});

	$('#terrain-map').on('change', function() {
		var mapValue = $(this).val();
		map.setMapTypeId($(this).val());
		$('#satellite-map').prop( "checked", false);
      	$('#hybrid-map').prop( "checked", false);
	});

	$('#hybrid-map').on('change', function() {
		var mapValue = $(this).val();
		map.setMapTypeId($(this).val());
		$('#satellite-map').prop( "checked", false);
      	$('#terrain-map').prop( "checked", false);
	});

	$('.amenities-input').on('change', function() {
		var type_search = $(this).val();
		if($(this).is(':checked')) {

			if (type_search == "school") {
	    		if(school_markers.length == 0) {
	    			$.get("data-files/Schools_HB.txt", function(data) {
			        	var search_values = data.split("\n");
			        	$.each(search_values, function(index, value) {
			        		request = {location: pyrmont, radius: search_radius, query: value};
			        		service.textSearch(request, function(results, status) {
			        			if (status === google.maps.places.PlacesServiceStatus.OK) {
						        	for (var i = 0; i < results.length; i++) {
						        		var place = results[i];
						        		//console.log(place);
						        		createMarker(results[i], "school");
						        	}
						        }
			        		});
			        	});
			        });
	    		} else {
	    			for (var i = 0; i < school_markers.length; i++) {
		          		school_markers[i].setMap(map);
		        	}
	    		}

	    	} else if(type_search == "restaurant") {
	    		if(restaurant_markers.length == 0) {
	    			$.get("data-files/Restaurants_HB.txt", function(data) {
			        	var search_values = data.split("\n");
			        	$.each(search_values, function(index, value) {
			        		request = {location: pyrmont, radius: search_radius, query: value};
			        		service.textSearch(request, function(results, status) {
			        			if (status === google.maps.places.PlacesServiceStatus.OK) {
						        	for (var i = 0; i < results.length; i++) {
						        		var place = results[i];
						        		console.log(place);
						        		createMarker(results[i], "restaurant");
						        	}
						        }
			        		});
			        	});
			        });
	    		} else {
	    			for (var i = 0; i < restaurant_markers.length; i++) {
		          		restaurant_markers[i].setMap(map);
		        	}
	    		}

	    	} else if(type_search == "movie_theater") {
	    		if(movie_theater_markers.length == 0) {
	    			$.get("data-files/Entertainment_HB.txt", function(data) {
			        	var search_values = data.split("\n");
			        	$.each(search_values, function(index, value) {
			        		request = {location: pyrmont, radius: search_radius, query: value};
			        		service.textSearch(request, function(results, status) {
			        			if (status === google.maps.places.PlacesServiceStatus.OK) {
						        	for (var i = 0; i < results.length; i++) {
						        		var place = results[i];
						        		//console.log(place);
						        		createMarker(results[i], "movie_theater");
						        	}
						        }
			        		});
			        	});
			        });
	    		} else {
	    			for (var i = 0; i < movie_theater_markers.length; i++) {
		          		movie_theater_markers[i].setMap(map);
		        	}
	    		}

	    	} else if(type_search == "shopping_mall") {
	    		if(shopping_mall_markers.length == 0) {
	    			$.get("data-files/Shopping_HB.txt", function(data) {
			        	var search_values = data.split("\n");
			        	$.each(search_values, function(index, value) {
			        		request = {location: pyrmont, radius: search_radius, query: value};
			        		service.textSearch(request, function(results, status) {
			        			if (status === google.maps.places.PlacesServiceStatus.OK) {
						        	for (var i = 0; i < results.length; i++) {
						        		var place = results[i];
						        		//console.log(place);
						        		createMarker(results[i], "shopping_mall");
						        	}
						        }
			        		});
			        	});
			        });
	    		} else {
	    			for (var i = 0; i < shopping_mall_markers.length; i++) {
		          		shopping_mall_markers[i].setMap(map);
		        	}
	    		}

	    	} else if(type_search == "hospital") {
	    		if(hospital_markers.length == 0) {
	    			$.get("data-files/MedicalCenters_HB.txt", function(data) {
			        	var search_values = data.split("\n");
			        	$.each(search_values, function(index, value) {
			        		request = {location: pyrmont, radius: search_radius, query: value};
			        		service.textSearch(request, function(results, status) {
			        			if (status === google.maps.places.PlacesServiceStatus.OK) {
						        	for (var i = 0; i < results.length; i++) {
						        		var place = results[i];
						        		//console.log(place);
						        		createMarker(results[i], "hospital");
						        	}
						        }
			        		});
			        	});
			        });
	    		} else {
	    			for (var i = 0; i < hospital_markers.length; i++) {
		          		hospital_markers[i].setMap(map);
		        	}
	    		}

	    	} else if(type_search == "gym") {
	    		if(gym_markers.length == 0) {
	    			$.get("data-files/HealthandFitness_HB.txt", function(data) {
			        	var search_values = data.split("\n");
			        	$.each(search_values, function(index, value) {
			        		request = {location: pyrmont, radius: search_radius, query: value};
			        		service.textSearch(request, function(results, status) {
			        			if (status === google.maps.places.PlacesServiceStatus.OK) {
						        	for (var i = 0; i < results.length; i++) {
						        		var place = results[i];
						        		//console.log(place);
						        		createMarker(results[i], "gym");
						        	}
						        }
			        		});
			        	});
			        });
	    		} else {
	    			for (var i = 0; i < gym_markers.length; i++) {
		          		gym_markers[i].setMap(map);
		        	}
	    		}
	    	}
			
		} else {

        	if (type_search == "school") {
	    		for (var i = 0; i < school_markers.length; i++) {
	          		school_markers[i].setMap(null);
	        	}

	    	} else if(type_search == "restaurant") {
	    		for (var i = 0; i < restaurant_markers.length; i++) {
	          		restaurant_markers[i].setMap(null);
	        	}
	        	//restaurant_markers = [];
	    	} else if(type_search == "movie_theater") {
	    		for (var i = 0; i < movie_theater_markers.length; i++) {
	          		movie_theater_markers[i].setMap(null);
	        	}

	    	} else if(type_search == "shopping_mall") {
	    		for (var i = 0; i < shopping_mall_markers.length; i++) {
	          		shopping_mall_markers[i].setMap(null);
	        	}

	    	} else if(type_search == "hospital") {
	    		for (var i = 0; i < hospital_markers.length; i++) {
	          		hospital_markers[i].setMap(null);
	        	}

	    	} else if(type_search == "gym") {
	    		for (var i = 0; i < gym_markers.length; i++) {
	          		gym_markers[i].setMap(null);
	        	}
	    	}
		}
		
	});
});