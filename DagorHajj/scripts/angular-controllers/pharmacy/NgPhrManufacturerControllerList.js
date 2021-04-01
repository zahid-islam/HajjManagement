app.controller("NgPhrManufacturerControllerList", function ($scope, $http) {


    $scope.filteredManufacturers = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;


    $scope.GetManufacturers = function () {
        $scope.Manufacturers = [];

        $http({
            method: "POST",
            url: "/PhrManufacturer/GetManufacturers"

        }).success(function mySucces(response) {

            $scope.Manufacturers = response;
            $scope.figureOutManufacturerToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    };


    $scope.figureOutManufacturerToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredManufacturers = $scope.Manufacturers.slice(begin, end);
    };

    $scope.GetManufacturers();


    $scope.pageChanged = function () {
        $scope.figureOutManufacturerToDisplay();
    };

});