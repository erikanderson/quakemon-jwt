angular.module('mainCtrl', [])
  .controller('mainController', function($rootScope, $location, Auth, User){
    var vm = this;

    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function(){
      vm.loggedIn = Auth.isLoggedIn();
      
      Auth.getUser()
        .then(function(data){
          console.log('in get user', data);
          vm.user = data;
        });
    });

    vm.doLogin = function() {
      Auth.login(vm.loginData.email, vm.loginData.password)
        .success(function(data){
          $location.path('/profile');
          console.log('main controller', data.userId);
        });
    };

    vm.doLogout = function() {
      Auth.logout();
      vm.user = {};
      $location.path('/');
    };
    
  })