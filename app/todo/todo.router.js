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
				templateUrl: "/app/todo/todo.view.list.html"
			});
	}

})(window, window.angular);
