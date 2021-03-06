(function(window, angular) {

	angular.module('todo')
		.config(TodoConfiguration);

	TodoConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', 'todoConfig'];

	function TodoConfiguration($stateProvider, $urlRouterProvider, todoConfig) {
        // $httpProvider.defaults.headers.common.Authorization = 'Basic dGluY2hvOmNvMzluYXJ0b2U=';
		// Para cualquier URL incorrecta
		$urlRouterProvider.otherwise("/");

		// Definimos los estados (y la ruta que tendra cada uno)
		$stateProvider
            .state('list', {
                url: "/",
                params: {
                    todoObj: null
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
