(function () {
    'use strict';

    function postService($http, $q) {

        this.fetch = fetch;
        this.fetchAll = fetchAll;
        this.create = create;
        this.update = update;
        this.remove = remove;

        var ENTITY_URL = "https://jsonplaceholder.typicode.com/posts/";

        function fetch(id) {
             return rest('GET', [ENTITY_URL, id].join(''));
        }

        function fetchAll() {
            return rest('GET', ENTITY_URL);
        }

        function create(model) {
            return rest('POST', ENTITY_URL, model);
        }

        function update(model, id) {
            return rest('PUT', [ENTITY_URL, id].join(''), model);
        }

        function remove(id) {
            return rest('DELETE', [ENTITY_URL, id].join(''));
        }

        function rest(method, urlApi, model){
            return $q(function (resolve, reject) {
                $http({
                    method: method,
                    url: urlApi,
                    data: method === 'POST' || method === 'PUT' ? model : null
                })
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(error);
                });
            });
        }
    }

    postService.$inject = ['$http', '$q'];

    angular
        .module('app')
        .service('postService', postService);

})();