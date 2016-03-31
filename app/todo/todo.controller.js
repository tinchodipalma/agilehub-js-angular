(function(window, angular) {

	angular.module('todo')
		.controller('TodoController', TodoController)
		.controller('TodoListController', TodoListController);

	TodoListController.$inject = ['$state', '$stateParams'];

	function TodoListController($state, $stateParams) {

        var vm = this;

        vm.submit = submit;
        vm.remove = remove;

        vm.todoList = [
            {
                id: 1,
                title: 'My first todo',
                description: 'Desc - My first todo',
                done: true
            },
            {
                id: 2,
                title: 'My second todo',
                description: 'Desc - My second todo',
                done: false
            }
        ];

        vm.todo = {};

        function submit (form) {
            if (form.$valid) {
                vm.todoList.push(vm.todo);
                vm.todo = {};
            }
        }

        function remove (todo) {
            vm.todoList = vm.todoList.filter(function (todoObj) {
               return todoObj.id !== todo.id;
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

	TodoController.$inject = ['$state', '$stateParams'];

	function TodoController($state, $stateParams) {

        var vm = this;

        vm.submit = submit;

        if (!$stateParams.todoObj) {
            $state.go('list');
        }

        vm.todo = $stateParams.todoObj;

        function submit (form) {
            if (form.$valid) {
                $state.go('list', {todoObj: vm.todo});
            }
        }
	}

})(window, window.angular);
