app.controller('SupplierListController', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage,$filter) {

    //================= GLOBAL VARIABLE ===================

    $scope.appMessage = appMessage;
    $scope.filteredSuppliers = [];
    $scope.showItems = [10, 25, 50, 100];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.alerts = [];
    $scope.DataList = [];
    

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.GetSuppliers = function () {

        $scope.phrSuppliers = [];

        $http({
            method: "GET",
            url: "/Hajj/Supplier/GetSuppliers",

        }).success(function (response) {
            
            if (response.Success) {
                $scope.phrSuppliers = response.data;
                $scope.DataList = response.data;
                $scope.figureOutSupplierToDisplay();
            }
        }).error(function (response) {

        });
    };

    

    $scope.figureOutSupplierToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredSuppliers = $scope.DataList.slice(begin, end);
    };

    $scope.GetSuppliers();


    $scope.pageChanged = function () {
        $scope.figureOutSupplierToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.phrSuppliers, $scope.searchText);
        $scope.figureOutSupplierToDisplay();
    };


}]);