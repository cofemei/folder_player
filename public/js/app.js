var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider) {

  $routeProvider.when('/photo', {
    templateUrl: 'photo.html',
    controller: 'HelloCtrl'
  });

  $routeProvider.otherwise({ redirectTo: '/photo' });
});


app.controller('HelloCtrl', ['$scope', '$http', function($scope, $http) {
	// $scope.greeting = 'Hola!';
	// $scope.array = ['1', '2'];
	$http.get("/vol").success(function (data) {
    	$scope.array = data;
  	});

  	$scope.open = function(item) {
    	$http.get("/list/?query="+item).success(function (data) {
    		$scope.imgArray = data;
  		});
  	};
}]);

