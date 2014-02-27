'use strict';

/* Directives */


angular.module('myApp.directives', ['firebase']).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('d3Map', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {
		data: '='
	  },
      link: function(scope, element, attrs) {
		console.log('D3 Directive Init');
		
		scope.$on("$destroy", function () {
			console.log("d3 Map desctroy");			
		});
		
        d3Service.d3().then(function(d3) {
			var width = 960,
			    height = 500;
			var path = d3.geo.path();
			  
			var svg = d3.select("body").append("svg")
				.attr("width", width)
				.attr("height", height);			
			
			svg.selectAll('*').remove();
				d3.json("us.json", function(error, topology) {
				  svg.append("path")
					  .datum(topojson.feature(topology, topology.objects.land))
					  .attr("d", path)
					  .attr("class", "land-boundary");

				  svg.append("path")
					  .datum(topojson.mesh(topology, topology.objects.counties, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
					  .attr("d", path)
					  .attr("class", "county-boundary");

				  svg.append("path")
					  .datum(topojson.mesh(topology, topology.objects.states, function(a, b) { return a !== b; }))
					  .attr("d", path)
					  .attr("class", "state-boundary");
				});
				
			scope.render = function(data) {
				
				var places = []
				   ,place = {}
				   ,tmp ={};	
				//if (data) return;				
				//data.forEach(function(record) {
				
				if (!data.$getIndex) {
				    svg.selectAll('*').remove();
					svg.selectAll('circle').remove();
					svg.selectAll('text').remove();
					places = {};
				} else {
					 var keys = data.$getIndex();
					 keys.forEach(function(key, i) {
						//console.log(i, data[key]); // prints items in order they appear in Firebase
						tmp = data[key];
						if (tmp) {
							place = new Object();
							place.name = tmp.currently.temperature;
							place.location = {};
							place.location.latitude = tmp.latitude;
							place.location.longitude = tmp.longitude;
							place.tooltip = key;
							places.push(place);
						}
					 });
				}
				var width = 960,
				height = 480

				var projection = d3.geo.conicConformal()
					.rotate([98, 0])
					.center([0, 38])
					.parallels([29.5, 45.5])
					.scale(1000)
					.translate([width / 2, height / 2])
					.precision(.1);

				var path = d3.geo.path()
					.projection(projection)
					
				svg.selectAll(".pin")
				  .data(places)
				  .enter().append("circle", ".pin")
				  .attr("r", 5)  
				  .attr("transform", function(d) {
					return "translate(" + projection([
					  d.location.longitude,
					  d.location.latitude
					]) + ")"
				  });
				  
				  
				svg.selectAll(".pin-label")
					.data(places)
					.enter().append("text")    
					.attr("class", "pin-label")
					.attr("transform", function(d) {
					  return "translate(" + projection([
						d.location.longitude,
						d.location.latitude
					  ]) + ")"
					})
					.attr("dy", ".35em")
					.text(function(d){
						  return d.name;
					});
				
			}
			
			scope.$watch('data', function(newVals, oldVals) {
			  //if(newVals) return;
			  console.log('data watch init' + newVals.valueOf());
			  return scope.render(newVals);
			}, true);
			
			scope.$on("$destroy", function () {
				console.log("svg destroyed");
				svg.remove();
			});
		});
      }};
  }]);
