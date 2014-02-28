(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', ['myApp.service.login', 'myApp.service.firebase'])
	.factory('webAPI', ['$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {
		var defaultServerPath = 'http://dmgt-followme.azurewebsites.net/api/';
		
		var WebAPI = function () {
			this.serverPath = defaultServerPath;
		};
		
		var defaultErrorHandler = function() {}
		
		WebAPI.prototype.fetchPromise = function (serviceType, serviceURL, serviceData, successCallback, errorCallback, serviceParam) {
			var outer = this;
			outer.successFunc = successCallback;
			outer.failFunc = errorCallback || defaultErrorHandler;
			outer.serviceFullPath = outer.serverPath + serviceURL;
			return $http({ method: serviceType, url: outer.serviceFullPath, data: serviceData, params: serviceParam, headers:{
                'Access-Control-Allow-Origin': '*'}               
             })
				.then(outer.successFunc, outer.failFunc)
		};

		var proxy = new WebAPI();
		return proxy;
	}])
      // put your services here!
      // .service('serviceName', ['dependency', function(dependency) {}]);
	 .factory('d3Service', ['$document', '$q', '$rootScope',
		function($document, $q, $rootScope) {
		  var d = $q.defer();
		  function onScriptLoad() {
			// Load client in the browser
			$rootScope.$apply(function() { d.resolve(window.d3); });
		  }
		  // Create a script tag with d3 as the source
		  // and call our onScriptLoad callback when it
		  // has been loaded
		  var scriptTag = $document[0].createElement('script');
		  scriptTag.type = 'text/javascript'; 
		  scriptTag.async = true;
		  scriptTag.src = 'http://d3js.org/d3.v3.min.js';
		  scriptTag.onreadystatechange = function () {
			if (this.readyState == 'complete') onScriptLoad();
		  }
		  scriptTag.onload = onScriptLoad;

		  var s = $document[0].getElementsByTagName('body')[0];
		  s.appendChild(scriptTag);

		  console.log('d3 serices init')
		  return {
			d3: function() { return d.promise; }
		  };
	}]);
})();

