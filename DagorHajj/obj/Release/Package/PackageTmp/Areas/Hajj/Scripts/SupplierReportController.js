app.controller('SupplierReportController', ['$scope', '$http', 'routeData', function ($scope, $http, routeData) {

    $scope.Supplier = {};
    $scope.Supplier.Id = routeData.Id;

    $scope.GetSupplierById = function () {
        $http({
            method: "GET",
            url: "/Hajj/Supplier/GetSupplierById?id=" + $scope.Supplier.Id
        }).success(function (response) {
            if (response.Success) {
                $scope.CurrentDateTime = new Date();
                $scope.Supplier = response.data;               
               
            }
            console.log($scope.Supplier);
        }).error(function (response) {
            //$scope.alerts.push({
            //    'type': 'danger',
            //    'msg': 'Data Fetching Failure!.'
            //});
        });
    };


    if ($scope.Supplier.Id != "") {
        $scope.GetSupplierById();
    }

}]);