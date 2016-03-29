(function(window, angular) {

	angular.module('todo')
		.controller('TodoController', TodoController);

	TodoController.$inject = ['$scope'];
	function TodoController($scope) {
        $scope.todoList = [
            {
                title: 'My first todo',
                description: 'Desc - My first todo',
                state: 'To Do'
            },
            {
                title: 'My second todo',
                description: 'Desc - My second todo',
                state: 'Done'
            }
        ]
	}

})(window, window.angular);
