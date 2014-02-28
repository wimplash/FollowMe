'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.service.login', 'firebase'])
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
		
			 webAPI.fetchPromise('get', 'activetrip?userid=5', null, function(response) {
													 if (response && respone.data)
														 $scope.activeTrips = response.data;
												});
						  // $scope.activeTrips =[
							  // {							
							  // tripName: 'Joes Biker Trip',
							  // status: 0  // Not accept
							// },
							  // {
							  // tripName: 'John West Side Trip',
							  // status: 1 // accepted
							  // }
						    // ]
						  
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
   }]);