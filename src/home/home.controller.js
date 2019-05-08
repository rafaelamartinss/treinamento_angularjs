(function() {
    'use strict';

    function HomeController() {
        var vm = this;
        vm.title = "HOME"; 
    }

    HomeController.$inject = [];

    angular
        .module('app')
        .controller('HomeController', HomeController);
})();