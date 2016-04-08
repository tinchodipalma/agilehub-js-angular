(function(window, angular) {

    angular.module('todo')
    .factory('TodoFactory', TodoFactory);

    TodoFactory.$inject = ['$http', 'todoConfig'];
    function TodoFactory($http, todoConfig) {
        return {
            getTasks: getTasks,
            addTask: addTask,
            editTask: editTask,
            //toggleTask: toggleTask,
            //removeTask: removeTask
        };

        function getTasks() {
            return $http.get(todoConfig.url + 'tasks/')
                .then(function(response) {
                    return response.data.objects.map(function(task) {
                        return cleanTask(task);
                    });
                })
        }

        function addTask(todo) {
            return $http.post(todoConfig.url + 'tasks/', JSON.stringify(todo))
                .then(function(response) {
                    todo.id = response.data.id;
                    todo = cleanTask(todo);
                    return todo;
                });

        }

        function editTask(todo) {
            return $http.patch(todoConfig.url + 'tasks/' + todo.id + '/', todo)
        }

        function cleanTask(task) {
            delete task.user;
            task.status = !!task.status && !!task.status.id ? task.status.id : 1;
            task.isDone = function() {
                return task.status === 2;
            };
            return task;
        }


    }

})(window, window.angular);
