(function(window, angular) {

	angular.module('todo')
		.controller('TodoController', TodoController);

	TodoController.$inject = ['$scope'];
	function TodoController($scope) {
        $scope.todoList = [
            {
                title: 'My first todo',
                description: 'Desc - My first todo',
                done: true
            },
            {
                title: 'My second todo',
                description: 'Desc - My second todo',
                done: false
            }
        ]
	}

})(window, window.angular);
