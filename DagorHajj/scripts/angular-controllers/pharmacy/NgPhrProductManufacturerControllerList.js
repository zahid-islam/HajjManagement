app.controller("NgPhrProductManufacturerControllerList", function ($scope, $http) {

    $scope.ProductManufacturers = [];

    $scope.GetProductManufacturers = function () {

        $http({
            method: "POST",
            url: "PhrProductManufacturer/GetProductManufacturers"

        }).success(function mySucces(response) {

            $scope.ProductManufacturers = response;
        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    }

    $scope.GetProductManufacturers();


    

});