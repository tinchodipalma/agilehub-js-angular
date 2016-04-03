(function(window, angular) {

    angular.module('todo', [
        'ui.router',
        'navbar'
    ])
    .run(function ($http) {
        // Basic Authentication Configuration
        // Se usa headers.common porque es COMUN a todo tipo de Request (Get, Post, Put, etc...)
        // De otra forma se usaria headers.post, headers.get, etc...
        $http.defaults.headers.common.Authorization = 'Basic dGluY2hvOmdsb3Jpb3Mw';
    });

})(window, window.angular);
