(function(window, angular) {

	angular.module('todo')
		.controller('TodoController', TodoController)
		.controller('TodoListController', TodoListController);

    // Agregamos la dependencia 'tasks' proveniente del objeto resolve definido en el router para este estado
	TodoListController.$inject = ['$http', '$state', '$stateParams', 'todoConfig', 'tasks'];
	function TodoListController($http, $state, $stateParams, todoConfig, tasks) {
        var vm = this;

        vm.submit = submit;
        vm.remove = remove;
        vm.toggleStatus = toggleStatus;

        // Referenciamos el todoList con los objetos de la respuesta de tasks
        vm.todoList = getTasks();

        vm.todo = {};

        function getTasks() {
            return tasks.data.objects.map(function(task) {
                delete task.user;
                task.status = task.status.id;
                task.isDone = function() {
                    return task.status === 2;
                };
                return task;
            });
        }

        function submit (form) {
            if (form.$valid) {
                $http.post(todoConfig.url + 'tasks/', JSON.stringify(vm.todo))
                    .then(function(response) {
                        vm.todo.id = response.data.id
                        vm.todoList.push(vm.todo);
                        vm.todo = {};
                    });
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

        if (!!$stateParams.todoObj) {
            for (var i = 0; i < vm.todoList.length; i++) {
                if (vm.todoList[i].id === $stateParams.todoObj.id) {
                    vm.todoList[i] = $stateParams.todoObj;
                    break;
                }
            }
        }
	}

	TodoController.$inject = ['$http', '$state', '$stateParams', 'todoConfig'];

	function TodoController($http, $state, $stateParams, todoConfig) {

        var vm = this;

        vm.submit = submit;

        if (!$stateParams.todoObj) {
            $state.go('list');
        }

        vm.todo = $stateParams.todoObj;

        function submit (form) {
            if (form.$valid) {
                $http.patch(todoConfig.url + 'tasks/' + vm.todo.id + '/', vm.todo)
                    .then(function(response) {
                        console.log(response);
                        $state.go('list', {todoObj: vm.todo});
                    });
            }
        }
	}

})(window, window.angular);
