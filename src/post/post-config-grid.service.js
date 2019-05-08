(function () {
    'use strict';

    function postConfigGridService() {
        this.render = render;

        function render() {
            var gridOptions = getOptions();
            gridOptions.columnDefs = getColumnDefs();
            return gridOptions;
        }

        function getColumnDefs() {

            var editCellRendererFunc = function (params) {
                return params.data === undefined ?
                    "" :
                    '<a ui-sref="post.edit({ id: ' + params.data.id + '})"  ui-sref-opts="{reload: true}" class="btn btn-xs grey">Alterar</i></a>';
            };

            var removeCellRendererFunc = function (params) {
                return params.data === undefined ?
                    "" :
                    '<a ng-click="vm.remove(' + params.data.id + ')" class="btn btn-xs red">Excluir</i></a>';
            };

            var statusValueGetter = function (params) {

                if (params.data === undefined) return "-";

                switch (params.data.Status) {
                    case 0:
                        return 'Ativo';
                    default:
                        return 'Inativo';
                }
            };

            return [{
                    headerName: 'Alterar',
                    field: 'id',
                    type: 'actions',
                    width: 85,
                    cellRenderer: editCellRendererFunc
                },
                {
                    headerName: 'Excluír',
                    field: 'id',
                    type: 'actions',
                    width: 85,
                    cellRenderer: removeCellRendererFunc
                },
                {
                    headerName: 'Nº',
                    field: 'id',
                    width: 60
                },
                {
                    headerName: 'Titulo',
                    field: 'title',
                    width: 140
                },
                // {
                //     headerName: 'Status',
                //     field: 'status',
                //     width: 120,
                //     valueGetter: statusValueGetter,
                //     type: 'dimension'
                // }
            ];
        }


        function getOptions() {
            return {
                columnDefs: {},
                rowData: [],
                rowGroupPanelShow: 'always',
                angularCompileRows: true,
                enableColResize: true,
                enableSorting: true,
                enableFilter: true,
                rowHeight: 28,
                enableRangeSelection: true,
                getRowNodeId: function (data) {
                    return data.id;
                },
                components: {},
                isExternalFilterPresent: function () {
                    return false;
                },
                columnTypes: {
                    'dimension': {
                        enableRowGroup: true,
                        enablePivot: true
                    },
                    'actions': {
                        suppressResize: true,
                        cellClass: 'text-center'
                    }
                },
            };
        }
    }

    angular
        .module('app')
        .service('postConfigGridService', postConfigGridService);

    postConfigGridService.$inject = [];

})();