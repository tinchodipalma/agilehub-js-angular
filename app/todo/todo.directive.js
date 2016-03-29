(function(window, angular) {

    angular.module('todo')
        .directive('myTodo', MyTodo);

    MyTodo.$inject = [];
    function MyTodo() {
        return {
            restric: 'EA',
            scope: {
                todo: '='
            },
            templateUrl: '/app/todo/todo.template.html'
        };
    }

})(window, window.angular);
