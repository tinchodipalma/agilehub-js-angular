(function(window, angular) {

	angular.module('todo')
		.config(TodoConfiguration);

	TodoConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

	function TodoConfiguration($stateProvider, $urlRouterProvider) {
		// Para cualquier URL incorrecta
		$urlRouterProvider.otherwise("/");

		// Definimos los estados (y la ruta que tendra cada uno)
		$stateProvider
            .state('list', {
                url: "/",
                params: {
                    todoObj: null
                },
                resolve: {
                    tasks: function($http) {
                        return $http.get('http://localhost:8000/api/v1/tasks/')
                            .then(function(response) {
                                return response;
                            })
                    }
                },
                templateUrl: "/app/todo/todo.view.list.html",
                controller: 'TodoListController',
                controllerAs: 'todoCtrl'
            })
            .state('edit', {
                url: "/edit/:id",
                params: {
                    todoObj: null
                },
                templateUrl: "/app/todo/todo.view.edit.html",
                controller: 'TodoController',
                controllerAs: 'todoEditCtrl'
            });
	}

})(window, window.angular);
