(function(window, angular) {

	angular.module('todo')
		.controller('TodoController', TodoController)
		.controller('TodoListController', TodoListController);

	TodoListController.$inject = ['$http', '$state', '$stateParams', 'todoConfig', 'TodoFactory'];
	function TodoListController($http, $state, $stateParams, todoConfig, TodoFactory) {
        var vm = this;

        vm.todoList = [];
        vm.todo = {};
        vm.inProgress = false;

        vm.submit = submit;
        vm.remove = remove;
        vm.toggleStatus = toggleStatus;

        getTasks().then(function(tasks) {
            vm.inProgress = false;
            vm.todoList = tasks;
            if (!!$stateParams.todoObj) {
                for (var i = 0; i < vm.todoList.length; i++) {
                    if (vm.todoList[i].id === $stateParams.todoObj.id) {
                        vm.todoList[i] = $stateParams.todoObj;
                        break;
                    }
                }
            }
        });

        function getTasks() {
            vm.inProgress = true;
            return TodoFactory.getTasks()
        }

        function submit (form) {
            if (form.$valid) {
                TodoFactory.addTask(vm.todo)
                    .then(function(responseTodo) {
                        vm.todo = {};
                        vm.todoList.push(responseTodo);
                    })
            }
        }

        function remove (todo) {
            $http.delete(todoConfig.url + 'tasks/' + todo.id + '/')
                .then(function(response) {
                    console.log(response);
                    vm.todoList = vm.todoList.filter(function (todoObj) {
                       return todoObj.id !== todo.id;
                    });
                });

        }

        function toggleStatus(todo) {
            todo.status = todo.status === 1 ? 2 : 1;
            $http.patch(todoConfig.url + 'tasks/' + todo.id + '/', todo)
                .then(function(response) {
                    console.log(response);
                });
        }
	}

	TodoController.$inject = ['$http', '$state', '$stateParams', 'todoConfig', 'TodoFactory'];

	function TodoController($http, $state, $stateParams, todoConfig, TodoFactory) {

        var vm = this;

        vm.submit = submit;

        if (!$stateParams.todoObj) {
            $state.go('list');
        }

        vm.todo = $stateParams.todoObj;

        function submit (form) {
            if (form.$valid) {
                TodoFactory.editTask(vm.todo)
                    .then(function() {
                        $state.go('list', {todoObj: vm.todo});
                    });
            }
        }
	}

})(window, window.angular);
