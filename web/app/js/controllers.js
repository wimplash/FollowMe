'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.service.login', 'firebase', 'leaflet-directive'])
   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
	  
   }])

  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.newMessage = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.messages = syncData('messages', 10);
console.log($scope.messages);
      // add new messages to the list
      $scope.addMessage = function() {
         if( $scope.newMessage ) {
            $scope.messages.$add({text: $scope.newMessage});
            $scope.newMessage = null;
         }
      };
   }])

   .controller('LoginCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
      $rootScope.currentUser;

      $scope.login = function(cb) {
         $rootScope.currentUser = {
								id: 168,
								name: 'Chsieh'
							  }
		 $location.path('/myTrip');
      };

      $scope.createAccount = function() {
         $scope.err = null;
         if( assertValidLoginAttempt() ) {
            loginService.createAccount($scope.email, $scope.pass, function(err, user) {
               if( err ) {
                  $scope.err = err? err + '' : null;
               }
               else {
                  // must be logged in before I can write to my profile
                  $scope.login(function() {
                     loginService.createProfile(user.uid, user.email);
                     $location.path('/account');
                  });
               }
            });
         }
      };

      function assertValidLoginAttempt() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.pass !== $scope.confirm ) {
            $scope.err = 'Passwords do not match';
         }
         return !$scope.err;
      }
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function($scope, loginService, syncData, $location) {
      syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

      $scope.logout = function() {
         loginService.logout();
      };

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.oldpass = null;
                  $scope.newpass = null;
                  $scope.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         }
      }

   }])
   .controller('tripMapController', ['$scope', '$firebase', 'firebaseRef', function($scope, $firebase, firebaseRef) { 
		var ll = new google.maps.LatLng(13.0810, 80.2740);
		$scope.mapOptions = {
			center: ll,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		//Markers should be added after map is loaded
		$scope.onMapIdle = function() {
			if ($scope.myMarkers === undefined){    
				var marker = new google.maps.Marker({
					map: $scope.myMap,
					position: ll
				});
				$scope.myMarkers = [marker, ];
			}
		};

		$scope.markerClicked = function(m) {
			window.alert("clicked");
		};
		// var weathersRef = new Firebase("https://publicdata-weather.firebaseio.com");
    
		// $scope.mapTitle = 'USA Map'
		// $scope.weathers = $firebase(weathersRef);

		 // var usersRef = new Firebase("https://glowing-fire-7909.firebaseio.com/users");
		 // $scope.users = $firebase(usersRef);
		 // console.log($scope.users);
		//debugger;
   }])
   .controller('MyTripController', ['$scope', 'webAPI', '$modal', '$log', '$rootScope', 
		function($scope, webAPI, $modal, $log, $rootScope) {
		if ($rootScope.currentUser )
				$rootScope.currentUser = { id: 168, name: 'Chsieh' }
		$scope.isCollapsed = false;
		$scope.activeTrips = 
						 [
							 {							
							 tripName: 'Joes Biker Trip',
							 status: 0  // Not accept
							},
							 {
							 tripName: 'John West Side Trip',
							 status: 1 // accepted
							 }
						   ]
						  
		$scope.planTrips = [
							{							
							name: 'Next Biker Trip',
							startDate: '3/15/2014',
							tripCount: '4/15',
							description: 'Ride from 6-12pm'
							},
							{
							name: 'Future Trip',
							startDate: '12/15/2014',
							tripCount: '11/15',
							description: 'Lunch will be serve'
							}
						  ]
		$scope.invitees = [
							{			
								id: 1,
								name: 'Lebron James'
							},
							{
								id: 2,
								name: 'Carmelo'
							},
							{
								id: 3,
								name: 'Bosh'
							},
							{
								id: 4,
								name: 'D. Wade'
							}
						]
			// $scope.items = ['item1', 'item2', 'item3'];
			$scope.tripTemplates = [{"id":1,"name":"Pacific Coast Highway, California","description":"The winding roads along California's Highway 1 provide unbeatable views of the Pacific Ocean.","pois":[{"id":1,"placeName":"Garrapata State Park","longt":"36.4636556","lat":"-121.8875394","placeDesc":"One of the few easy-to-reach beaches is at Garrapata State Park about 2 miles south of Carmel Highlands. From Soberanes Point watch for sea otters, which are protected under California state law.","seq":1},{"id":2,"placeName":"Bixby Bridge","longt":"36.3718128","lat":"-121.9021945","placeDesc":"Much photographed Bixby Bridge is a single-span concrete arch more than 260 feet high and 700 feet long. Park at turnouts near either end to gawk or take pictures.","seq":2},{"id":3,"placeName":"Nepenthe","longt":"36.2224589","lat":"-121.7592241","placeDesc":"An indoor-outdoor restaurant perched 800 feet above the sea and famous for its views. Enjoy the fresh fish caught right off the coast!","seq":3},{"id":4,"placeName":"Hearst Castle","longt":"35.6753113","lat":"-121.1504611","placeDesc":"Get a private tour of Hearst Castle right from your phone using the interactive map in the Hearst Castle mobile app. Listen to in-depth narration from Castle historians, view never before seen photos, and play popular music from the time.","seq":4},{"id":5,"placeName":"Estero Bay","longt":"35.4499583","lat":"-120.9511054","placeDesc":"The purpose of the Estero Bluffs SP, in San Luis Obispo County, is to preserve and protect a rich, diverse and particularly scenic area of the Pacific Ocean coast, with sea stacks and intertidal areas, a substantial area of wetlands, low bluffs and coastal terraces punctuated by a number of perennial and intermittent streams, and containing a pocket cove and beach at Villa Creek.","seq":5}]},{"id":2,"name":"Cape Cod, Massachusetts","description":"Lighthouses, cultural landscapes, and wild cranberry bogs offer a glimpse of Cape Cod's past and continuing ways of life. Swimming beaches and walking and biking trails beckon today's visitors.","pois":[{"id":6,"placeName":"Highland Museum & Lighthouse","longt":"42.0384516","lat":"-70.0646549","placeDesc":"The Truro Historical Society takes you back to the past through its collection of artifacts, images, and historical documents on display and in repository at the Highland House Museum and Cobb Archive.","seq":1},{"id":7,"placeName":"Wellfleet Harbor Actors Theater","longt":"41.9283488","lat":"-70.016722","placeDesc":"The Mission of Wellfleet Harbor Actors Theater is to present professional quality theater to its audiences; to provide an alternative theater experience not found elsewhere in the region; to advance and preserve the art of the theater for the education and appreciation of the public.","seq":2},{"id":8,"placeName":"Cape Cod Museum of Art","longt":"41.7403855","lat":"-70.1949628","placeDesc":"The Cape Cod Museum of Arts' mission is to collect, conserve, study, interpret and exhibit works by outstanding artists associated with Cape Cod and the Islands. Through its programs, the museum seeks to preserve the artistic heritage of the area and to foster artistic and cultural growth.","seq":3},{"id":9,"placeName":"Sandwich Glass Museum","longt":"41.7587753","lat":"-70.5004365","placeDesc":"The Sandwich Historical Society and Glass Museum interpret the history of the town and its glass industry. Exhibits of glass and historical items tell the story of the town’s greatest contribution to the American Industrial Revolution. Displays offer more than 6,000 pieces, in fifteen galleries.","seq":4},{"id":10,"placeName":"Cape Cod Museum Of Natural History","longt":"41.7537452","lat":"-70.1160006","placeDesc":"Encourages and advances understanding of our natural environment through discovery and learning. The museum is set on 80-acres, abutted by 300 acres of town-owned conservation land.","seq":5}]},{"id":3,"name":"Atlantic Coast, Florida","description":"Following this our Atlantic Coast route will open your eyes to a whole other world. Alternating between wildly differing beach resort areas and lengthy stretches of pristine coastal wilderness.","pois":[{"id":11,"placeName":"Fort Matanzas National Monument","longt":"29.7114155","lat":"-81.2330487","placeDesc":"Located along Florida’s Atlantic Coast between Daytona Beach and St. Augustine, cozy Flagler Beach offers miles of sparkling beaches, bountiful fishing, beachside shops, waterfront restaurants, and natural parks and other wonders.","seq":1},{"id":12,"placeName":"Merritt Island National Wildlife Refuge","longt":"28.8096685","lat":"-80.8558456","placeDesc":"The Refuge, managed by the U. S. Fish and Wildlife Service, provides a buffer zone for the National Aeronautics and Space Administration (NASA) in their quest for space exploration.","seq":2},{"id":13,"placeName":"Sebastian Inlet State Park","longt":"27.8522675","lat":"-80.4479561","placeDesc":"The premier saltwater fishing spot on Florida's east coast, this park is a favorite for anglers nationwide for catching snook, redfish, bluefish, and Spanish mackerel from its jetties. Surfing is also a popular recreation and several major competitions are held here every year.","seq":3},{"id":14,"placeName":"Jupiter Island","longt":"27.031887","lat":"-80.1011537","placeDesc":"The story of Jupiter Island is one about land, a story that began with a land grant in 1815. In 1968, over 150 years later, the granting of land came full circle. A portion of land at the southern end of the Island was given to The Nature Conservancy as a wildlife preserve. ","seq":4},{"id":15,"placeName":"Adrienne Arsht Center for the Performing Arts","longt":"25.787236","lat":"-80.1899888","placeDesc":"Florida's largest performing arts center and is located on Biscayne Boulevard in the Omni neighborhood of Downtown, Miami, Florida, United States. It is the second largest performing arts center in the United States.","seq":5}]}]
			
			$scope.open = function () {

				var modalInstance = $modal.open({
				  templateUrl: 'myModalContent.html',
				  controller: ModalInstanceCtrl,
				  resolve: {
					items: function () {
					  return $scope.tripTemplates;
					},
					invitees: function () {
					  return $scope.invitees;
					}
				  }
			});

			modalInstance.result.then(function (selectedItem) {		
				  $scope.planTrips.push(
								{							
								name: $scope.currentTemplate.name,
								startDate: '6/15/2014',
								tripCount: '0/8' // Optional
								}
							)
				}, function () {
				  $log.info('Modal dismissed at: ' + new Date());
				});
			};	

			var ModalInstanceCtrl = function ($scope, $modalInstance, items, invitees) {

			  $scope.items = items;
			  $scope.invitees = invitees;
			  $scope.currentInvitees;
			  $scope.currentTemplate;// = $scope.items[0];
			  $scope.getCurrent = function(tt) {
				$scope.$parent.currentTemplate = tt;
			  }
			  $scope.getInvitee = function(tt) {
				$scope.$parent.currentInvitees = tt;
			  }
			  
			  $scope.addFriend = function(user) {
				$scope.selected = {};
				$scope.addedFriend = user + ' has been invited.';
			  }
			  
			  $scope.ok = function () {
				//console.log($scope.currentTemplate);
				$modalInstance.close($scope.currentTemplate);
			  };

			  $scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			  };
			};
		  
		 // var usersRef = new Firebase("https://glowing-fire-7909.firebaseio.com/users");
		 // $scope.users = $firebase(usersRef);
		 // console.log($scope.users);
		//debugger;
   }])
    .controller('MapController', ['$scope', '$firebase', 'firebaseRef', function($scope, $firebase, firebaseRef) {
        var weathersRef = new Firebase("https://publicdata-weather.firebaseio.com");

        $scope.mapTitle = 'USA Map'
        $scope.weathers = $firebase(weathersRef);

        // var usersRef = new Firebase("https://glowing-fire-7909.firebaseio.com/users");
        // $scope.users = $firebase(usersRef);
        // console.log($scope.users);
        //debugger;
    }])
    .controller('tripMapLeafController', [ '$scope', function($scope) {
        angular.extend($scope, {
            center: {
                autoDiscover: true,
//                lat: 40.719298,
//                lng: -73.999743,
                zoom: 12
            },
//            markers: {
//                start: {
//                    lat: 40.719298,
//                    lng: -73.999743,
//                    title: 'start'
//                }
//            },
            markers: new Array(),
            events: {
                map: {
                    enable: ['zoomstart', 'dragend', 'click', 'mousemove'],
                    logic: 'emit'
                }
            }
        });

        $scope.markers.push({
            lat: 40.73271,
            lng: -73.99818,
            message: "Start"
        })
        $scope.markers.push({
            lat: 40.71904,
            lng: -73.95856,
            message: "End"
        })
        $scope.markers.push({
            lat: 40.73192,
            lng: -73.99849,
            message: "Gas",
            icon: {
                iconUrl: 'img/gas.png',
                iconSize: [20,20]
            }
        })

        var user1 = {
//            user1: {
            lat: 40.73992,
            lng: -73.99149,
            message: "User 1",
            draggable: true,
            icon: {
                iconUrl: 'img/favicon.png',
                iconSize: [20,20]
            }
//            }
        }
//        var user2 = new L.marker({
        var user2 = {
//            user2: {
            lat: 40.73892,
            lng: -73.98349,
            message: "User 2",
            draggable: true,
            icon: {
                iconUrl: 'img/favicon.png',
                iconSize: [20,20]
            }
//            }
        }

//        user2.on("dragend", function(event) {
//            console.dir(event)
//        })

        $scope.markers.push(user1);
        $scope.markers.push(user2);

        $scope.routeLines = [
            L.polyline([[40.68510, -73.94136],[40.68576, -73.94149],[40.68649, -73.94165],[40.68722, -73.94178],[40.68795, -73.94193],[40.68869, -73.94207],[40.68942, -73.94223],[40.69016, -73.94236],[40.69089, -73.94251],[40.69162, -73.94266],[40.69234, -73.94281],[40.69309, -73.94295],[40.69337, -73.94301],[40.69382, -73.94310],[40.69455, -73.94324],[40.69527, -73.94339],[40.69603, -73.94353],[40.69822, -73.94394],[40.69897, -73.94409],[40.69968, -73.94424],[40.70042, -73.94438],[40.70053, -73.94440],[40.70109, -73.94501],[40.70165, -73.94564],[40.70221, -73.94627],[40.70277, -73.94690],[40.70335, -73.94753],[40.70388, -73.94814],[40.70407, -73.94779],[40.70436, -73.94781],[40.70544, -73.94798],[40.70685, -73.94819],[40.70759, -73.94830],[40.70830, -73.94842],[40.70901, -73.94854],[40.70879, -73.95076],[40.70914, -73.95083],[40.70971, -73.95236],[40.71026, -73.95385],[40.71059, -73.95473],[40.71055, -73.95509],[40.71058, -73.95551],[40.71065, -73.95625],[40.71065, -73.95647],[40.71051, -73.95709],[40.71044, -73.95736],[40.71035, -73.95833],[40.71032, -73.95875],[40.71078, -73.95994],[40.71103, -73.96058],[40.71047, -73.96094],[40.71041, -73.96113],[40.71061, -73.96176],[40.71115, -73.96354],[40.71162, -73.96508],[40.71217, -73.96703],[40.71215, -73.96730],[40.71549, -73.97831],[40.71544, -73.97834],[40.71757, -73.98535],[40.71770, -73.98579],[40.71783, -73.98572],[40.71908, -73.98507],[40.71933, -73.98591],[40.71958, -73.98675],[40.71983, -73.98754],[40.72007, -73.98835],[40.72030, -73.98911],[40.72046, -73.98962],[40.72052, -73.98985],[40.72076, -73.99063],[40.72102, -73.99150],[40.72115, -73.99195],[40.72124, -73.99224],[40.72139, -73.99273],[40.72161, -73.99346],[40.72234, -73.99320],[40.72238, -73.99332],[40.72272, -73.99416],[40.72303, -73.99490],[40.72336, -73.99570],[40.72368, -73.99647],[40.72388, -73.99695],[40.72423, -73.99779],[40.72462, -73.99858],[40.72500, -73.99934],[40.72538, -74.00010],[40.72576, -74.00089],[40.72611, -74.00159],[40.72649, -74.00236],[40.72687, -74.00312],[40.72690, -74.00321],[40.72694, -74.00327],[40.72695, -74.00337],[40.72695, -74.00344],[40.72766, -74.00316],[40.72831, -74.00308],[40.72838, -74.00309],[40.72871, -74.00330],[40.72934, -74.00365],[40.72987, -74.00397],[40.73044, -74.00430],[40.73071, -74.00446],[40.73100, -74.00462],[40.73154, -74.00493],[40.73135, -74.00553],[40.73162, -74.00570],[40.73158, -74.00578],[40.73163, -74.00632]]),
            L.polyline([[40.73271, -73.99818],[40.73261, -73.99828],[40.73221, -73.99861],[40.73192, -73.99849],[40.73118, -73.99819],[40.73096, -73.99773],[40.73093, -73.99775],[40.73088, -73.99776],[40.73078, -73.99774],[40.73071, -73.99766],[40.73049, -73.99788],[40.73028, -73.99749],[40.72987, -73.99667],[40.72955, -73.99655],[40.72918, -73.99582],[40.72881, -73.99506],[40.72840, -73.99425],[40.72815, -73.99372],[40.72786, -73.99314],[40.72711, -73.99161],[40.72705, -73.99148],[40.72618, -73.98942],[40.72558, -73.98987],[40.72518, -73.99016],[40.72491, -73.99034],[40.72426, -73.99082],[40.72402, -73.99103],[40.72365, -73.99101],[40.72240, -73.99164],[40.72218, -73.99091],[40.72191, -73.99004],[40.72167, -73.98924],[40.72161, -73.98903],[40.72146, -73.98852],[40.72123, -73.98776],[40.72097, -73.98695],[40.72074, -73.98615],[40.72048, -73.98531],[40.71933, -73.98591],[40.71808, -73.98655],[40.71797, -73.98660],[40.71770, -73.98579],[40.71757, -73.98535],[40.71544, -73.97834],[40.71538, -73.97837],[40.71203, -73.96735],[40.71186, -73.96721],[40.71125, -73.96529],[40.71092, -73.96426],[40.71074, -73.96366],[40.71121, -73.96337],[40.71190, -73.96294],[40.71244, -73.96446],[40.71307, -73.96408],[40.71382, -73.96360],[40.71445, -73.96320],[40.71510, -73.96278],[40.71558, -73.96229],[40.71593, -73.96191],[40.71638, -73.96142],[40.71697, -73.96079],[40.71752, -73.96019],[40.71808, -73.95960],[40.71862, -73.95900],[40.71904, -73.95856]]),
            L.polyline([[40.72022, -74.00005],[40.72043, -73.99986],[40.72142, -73.99904],[40.72265, -73.99798],[40.72388, -73.99695],[40.72466, -73.99631],[40.72520, -73.99584],[40.72508, -73.99533],[40.72585, -73.99471],[40.72593, -73.99464],[40.72601, -73.99458],[40.72626, -73.99440],[40.72664, -73.99412],[40.72728, -73.99364],[40.72786, -73.99314],[40.72988, -73.99141],[40.72979, -73.99074],[40.72974, -73.99036],[40.72955, -73.98991],[40.72988, -73.98966],[40.72990, -73.98891],[40.72999, -73.98736],[40.72977, -73.98682],[40.72878, -73.98443],[40.72937, -73.98400],[40.73001, -73.98353],[40.73064, -73.98306],[40.73135, -73.98255],[40.73202, -73.98206],[40.73221, -73.98192],[40.73265, -73.98160],[40.73325, -73.98115],[40.73382, -73.98073],[40.73406, -73.98056],[40.73442, -73.98030],[40.73498, -73.97990],[40.73558, -73.97943],[40.73619, -73.97899],[40.73687, -73.97851],[40.73755, -73.97805],[40.73816, -73.97760],[40.73879, -73.97715],[40.73941, -73.97670],[40.74002, -73.97625],[40.74013, -73.97616],[40.74064, -73.97581],[40.74127, -73.97534],[40.74145, -73.97521],[40.74217, -73.97467],[40.74309, -73.97402],[40.74378, -73.97351],[40.74445, -73.97303],[40.74506, -73.97257],[40.74568, -73.97212],[40.74629, -73.97167],[40.74692, -73.97122],[40.74751, -73.97073],[40.74783, -73.97049],[40.74865, -73.96990],[40.75200, -73.96746],[40.75283, -73.96690],[40.75312, -73.96669],[40.75324, -73.96661],[40.75334, -73.96654],[40.75387, -73.96615],[40.75450, -73.96569],[40.75513, -73.96524],[40.75575, -73.96478],[40.75638, -73.96432],[40.75700, -73.96387],[40.75763, -73.96341],[40.75831, -73.96292],[40.75898, -73.96243],[40.75961, -73.96197],[40.76023, -73.96152],[40.76023, -73.96163],[40.76071, -73.96278],[40.76068, -73.96280],[40.76061, -73.96276],[40.76017, -73.96168],[40.75956, -73.96033],[40.75797, -73.95673],[40.75521, -73.95040],[40.75353, -73.94654],[40.75148, -73.94183],[40.75105, -73.94082],[40.75106, -73.94068],[40.75108, -73.94075]])
        ]

//        $scope.$on("leafletDirectiveMap.click", function(event, args){
//            var leafEvent = args.leafletEvent;
//            $scope.markers.push({
//                lat: leafEvent.latlng.lat,
//                lng: leafEvent.latlng.lng,
//                message: "Marker Added " + leafEvent.latlng.lat + ", " +leafEvent.latlng.lng ,
//                title: "marker added"
//            });
//        });

        $scope.$on('leafletDirectiveMap.dragend', function(event){
            $scope.eventDetected = "Drag";
            console.dir(event)
        });

//        console.dir($scope.markers)

    }]);