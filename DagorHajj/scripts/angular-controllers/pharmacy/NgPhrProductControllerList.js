app.controller("NgPhrProductControllerList", function ($scope, $http) {

    $scope.filteredProducts = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;


    $scope.GetProducts = function () {
        $scope.Products = [];
        $http({
            method: "POST",
            url: "/PhrProduct/GetProducts"



        }).success(function mySucces(response) {           

            $scope.Products = response;
            $scope.figureOutProductToDisplay();


        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    }

    $scope.figureOutProductToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredProducts = $scope.Products.slice(begin, end);
    };

    $scope.GetProducts();


    $scope.pageChanged = function () {
        $scope.figureOutProductToDisplay();
    };

   


    

})