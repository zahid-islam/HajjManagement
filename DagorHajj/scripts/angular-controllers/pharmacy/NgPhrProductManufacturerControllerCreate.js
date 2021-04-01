app.controller("NgPhrProductManufacturerControllerCreate", function ($scope, $http, $routeParams) {

    $scope.ProductManufacturer = {};

    $scope.ProductManufacturer.Id = $routeParams.Id;

    $scope.GetProductManufacturer = function () {
        $http({
            method: "POST",
            url: "PhrProductManufacturer/GetProductManufacturer?Id=" + $scope.ProductManufacturer.Id

        }).success(function mySucces(response) {
            $scope.ProductManufacturer = response;
        }).error(function myError(response) {
            $scope.errors = response.data;
        });
    }

    $scope.SaveProductManufacturer = function () {

        $http({
            method: "POST",
            url: "PhrProductManufacturer/SaveProductManufacturer",
            data: $scope.ProductManufacturer

        }).success(function mySucces(response) {

            $scope.ProductManufacturer = {};

        }).error(function myError(response) {

        });
    }

    $scope.GetProductManufacturer();
});