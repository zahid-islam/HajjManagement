app.controller("NgPhrProductGenericControllerList", function ($scope, $http) {

    $scope.filteredProductGenerics = [];
    $scope.itemsPerPage = 15;
    $scope.currentPage = 1;
    $scope.maxSize = 10;


    $scope.GetProductGenerics = function () {
        $scope.ProductGenerics = [];

        $http({
            method: "POST",
            url: "PhrProductGeneric/GetProductGenerics"

        }).success(function mySucces(response) {
           
            $scope.ProductGenerics = response;
            $scope.figureOutProductGenericToDisplay();
        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    }


    $scope.figureOutProductGenericToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredProductGenerics = $scope.ProductGenerics.slice(begin, end);
    };

    $scope.GetProductGenerics();
    

    $scope.pageChanged = function () {
        $scope.figureOutProductGenericToDisplay();
    };

});