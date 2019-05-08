(function () {
    'use strict';

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state({
                name: 'home',
                url: '/home',
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: '/src/home/home.html',
            })
            .state('post', {
                abstract: true,
                template: '<ui-view />',
                controller: 'PostController',
                controllerAs: 'vm',
                params: { id: null },
            })
            .state('post.list', {
                url: '/post',
                templateUrl: '/src/post/post.list.html',
            })
            .state('post.create', {
                url: '/post-create',
                templateUrl: '/src/post/post.form.html',
            })
            .state('post.edit', {
                url: '/post-edit',
                templateUrl: '/src/post/post.form.html',
            });

        $locationProvider.html5Mode(true);
    }

    angular
        .module('app')
        .config(config);
})();