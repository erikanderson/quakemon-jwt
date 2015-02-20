angular.module('userCtrl', ['userService'])

  .controller('userController', function(User){
    var vm = this;

    vm.deleteUser = function(id){
      User.delete(id)
        .sucess(function(data){
          console.log(data);
        })
    }
  })

  .controller('userCreateController', function(User, $location){
    var vm = this;
    vm.type = 'create';

    vm.doSignup = function(){
      User.create(vm.registerData.email, vm.registerData.password)
        .success(function(data){
          console.log(data);
          vm.userData = {};
          if (!data.success){
            vm.message = data.message;
          } else if (data.success) {
            $location.path('/login');
          }
        })
        .error(function(data){
          console.log('err');
        })
    }
  })