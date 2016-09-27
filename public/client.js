console.log( 'client.js sourced' );
var myApp = angular.module( 'myApp', [] );

var lock = new Auth0Lock( '5MFwo7vyyOcUlgrxkqNQWjFcIruRqzm5', 'codyogden.auth0.com' );

var logOutUrl = 'https://codyogden.auth0.com/v2/logout';

var emptyLocalStorage = function(){
  localStorage.removeItem( 'userProfile' );
  localStorage.removeItem( 'userToken' );
  return true;
}; // end emptyLocalStorage

myApp.controller( 'authCont', [ '$scope', '$http', function( $scope, $http ) {

	console.log( 'authCont' );

	  $scope.init = function(){
	    console.log( 'in init' );
	    // check if a user's info is saved in localStorage
	    if( JSON.parse( localStorage.getItem( 'userProfile' ) ) ){
	      // if so, save userProfile as $scope.userProfile
	      $scope.userProfile = JSON.parse( localStorage.getItem( 'userProfile' ) );
	      console.log( 'loggedIn:', $scope.userProfile );
	      $scope.userIsLoggedIn = true;
	    }
	    else{
	      // if not, make sure we are logged out and empty
	      emptyLocalStorage();
	      $scope.userIsLoggedIn = false;
	    }
	  }

	 $scope.init();

	$scope.login = function() {

		console.log( 'login clicked' );

		lock.show( function( err, profile, token ) {

			if( err ) { 
				console.log( "Error:", err );
			} else {

			console.log( 'Profile:', profile );

			localStorage.setItem( 'userToken', token );

			localStorage.setItem( 'userProfile', JSON.stringify( profile ) );

			location.reload();
			}

		});

	};

	  $scope.logout = function(){
	    // call our logOutUrl
	    $http({
	      method:'GET',
	      url: logOutUrl,
	    }).then( function( data ){
	      // if logged out OK
	      if( data.data == 'OK' ){
	        // empty localStorage
	        emptyLocalStorage();
	        $scope.userIsLoggedIn = false;
	      }
	    })
	  }; // end scope.logout

} ] );

