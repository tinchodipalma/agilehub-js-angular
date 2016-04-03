(function(window, angular) {

    angular.module('navbar')
        .controller('NavBarController', NavBarController);

    NavBarController.$inject = ['$scope'];
    function NavBarController($scope) {
        $scope.brand = '#ToDo AngularJS';
        $scope.links = [
            {
                title: 'Mi listado',
                state: 'list'
            }
        ];
    }

})(window, window.angular);
