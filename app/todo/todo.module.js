(function(window, angular) {

    angular.module('todo', [
        'ui.router',
        'navbar'
    ])
    .constant('todoConfig', {
        'url': 'http://angularjs.agilehub.com.ar:8000/api/v1/',
        'authorization': 'Basic bWRpcGFsbWE6cGFzc3dvcmQxMjM='
    })
    .run(TodoRunFn);

    TodoRunFn.$inject = ['$http', 'todoConfig'];
    function TodoRunFn($http, todoConfig) {
        // Basic Authentication Configuration
        // Se usa headers.common porque es COMUN a todo tipo de Request (Get, Post, Put, etc...)
        // De otra forma se usaria headers.post, headers.get, etc...
        $http.defaults.headers.common.Authorization = todoConfig.authorization;
    }

})(window, window.angular);
