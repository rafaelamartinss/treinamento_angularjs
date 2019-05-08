(function () {
    'use strict';

    function PostController(
        $stateParams,
        $state,
        $timeout,
        factory,
        grid
    ) {
        var vm = this;

        function init() {
            vm.total = 0;
            vm.displayed = 0;
            vm.baseStateName = "post";
            vm.key = "id";
            vm.forms = {};
            vm.model = {};
            vm.gridOptions = grid.render();
            vm.gridOptions.onFilterChanged = function () {
                vm.displayed = vm.gridOptions.api.getModel().rootNode.childrenAfterFilter.length;
            };
            vm.errors = [];
        }

        init();

        vm.redirectList = function () {
            $state.go(vm.baseStateName + '.list', {}, {
                reload: true
            });
        }

        vm.list = function () {
            factory.fetchAll()
                .then(function (modelList) {
                    vm.gridOptions.api.setRowData([]);
                    vm.gridOptions.api.updateRowData({
                        add: modelList
                    });
                })
                .catch(function (e) {
                    console.error(e);
                });
        };

        vm.edit = function () {
            var id = $stateParams.id;

            if (!id) {
                vm.redirectList();
                return;
            }

            factory.fetch(id)
                .then(function (model) {
                    vm.model = model;
                })
                .catch(function (e) {
                    console.error(e);                   
                });
        };

        vm.new = function () {
            vm.model = {};
        }

        vm.update = function () {
            factory.update(vm.model, vm.model[vm.key])
                .then(function () {
                    vm.redirectList();
                })
                .catch(function (e) {
                    console.error(e);
                });
        };

        vm.create = function () {
            
            factory.create(vm.model)
                .then(function () {
                    vm.redirectList();
                })
                .catch(function (e) {
                    vm.errors = e.data.errors || [];
                });
        };

        vm.createOrUpdate = function () {
            vm.errors = [];
            if (vm.model[vm.key] !== null && vm.model[vm.key] !== undefined && vm.model[vm.key] !== 0) {
                vm.update();
            } else {
                vm.create();
            }
            return true;
        };

        vm.remove = function (id) {
            factory.remove(id)
                .then(function () {
                    var rowNode = vm.gridOptions.api.getRowNode(id);
                    vm.gridOptions.api.updateRowData({
                        remove: [rowNode.data]
                    });
                })
                .catch(function (e) {
                    console.error(e);
                });
        };

        vm.load = function () {
            var stateName = $state.current.name;

            switch (stateName) {
                case vm.baseStateName + ".list":
                    return vm.list();
                case vm.baseStateName + ".create":
                    return vm.new();
                case vm.baseStateName + ".edit":
                    return vm.edit();
                default:
                    console.error("Invalid state");
                    return;
            }
        };

        $timeout(function () {
            vm.load();
        }, 0);
    }

    PostController.$inject = [
        '$stateParams',
        '$state',
        '$timeout',
        'postService',
        'postConfigGridService'
    ];

    angular
        .module('app')
        .controller('PostController', PostController);
})();