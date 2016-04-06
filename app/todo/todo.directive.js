(function(window, angular) {

    angular.module('todo')
        .directive('todoItem', TodoItem)
        .directive('todoSpinner', TodoSpinner)
        .directive('todoEmptyMessage', TodoEmptyMessage)
        .directive('todoForm', TodoForm);

    TodoItem.$inject = ['$state'];
    function TodoItem($state) {
        return {
            restric: 'EA',
            scope: false,
            link: TodoItemLink,
            templateUrl: '/app/todo/templates/todo.item.template.html'
        };

        function TodoItemLink(scope, element, attrs) {
            scope.close = function close(todoObj) {
                $state.go('list', { todoObj: todoObj });
            };
        }
    }

    function TodoForm() {
        return {
            restrict: 'E',
            templateUrl: '/app/todo/templates/todo.form.template.html',
            scope: {
                todoForm: '=controller'
            }
        }
    }

    function TodoSpinner() {
        return {
            restrict: 'E',
            templateUrl: '/app/todo/templates/todo.spinner.template.html'
        }
    }

    function TodoEmptyMessage() {
        return {
            restrict: 'E',
            templateUrl: '/app/todo/templates/todo.emptyMessage.template.html'
        }
    }

})(window, window.angular);
