(function(window, angular) {

    angular.module('todo')
        .directive('myTodo', MyTodo)
        .directive('todoForm', TodoForm);

    MyTodo.$inject = ['$state'];
    function MyTodo($state) {
        return {
            restric: 'EA',
            scope: false,
            link: MyTodoCompile,
            templateUrl: function(element, attributes) {
                var type = !attributes.edit ? 'view' : 'edit';
                return '/app/todo/todo.template.' + type + '.html';
            }
        };

        function MyTodoCompile(scope, element, attrs) {
            scope.close = function close(todoObj) {
                $state.go('list', { todoObj: todoObj });
            };
        }
    }

    function TodoForm () {
        return {
            restrict: 'E',
            templateUrl: '/app/todo/todo.template.form.html',
            scope: {
                todoForm: '=controller'
            }
        }
    }

})(window, window.angular);
