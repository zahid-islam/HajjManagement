app.controller("NgPhrCustomerControllerList", function ($scope, $http) {

    $scope.filteredCustomers = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;


    $scope.GetCustomers = function () {
        $scope.phrCustomers = [];

        $http({
            method: "POST",
            url: "GetCustomers"

        }).success(function mySucces(response) {

            $scope.phrCustomers = response;
            $scope.figureOutCustomerToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    };


    $scope.figureOutCustomerToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredCustomers = $scope.phrCustomers.slice(begin, end);
    };

    $scope.GetCustomers();


    $scope.pageChanged = function () {
        $scope.figureOutCustomerToDisplay();
    };

});