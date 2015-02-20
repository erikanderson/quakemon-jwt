var app = angular.module('quakemon', ['ngRoute', 'authService', 'mainCtrl', 'userService', 'userCtrl' ]);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/home.html'
    })

    // login page
    .when('/login', {
      templateUrl : 'app/views/login.html',
        controller  : 'mainController',
          controllerAs: 'login'
    })

    .when('/signup', {
      templateUrl: 'app/views/signup.html',
      controller: 'userCreateController',
      controllerAs: 'signup'
    })

    .when('/profile', {
      templateUrl: 'app/views/profile.html'
    })
})

// application configuration to integrate token into requests
app.config(function($httpProvider) {

  // attach our auth interceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');

});