app.controller("NgPhrProductGroupControllerCreate", function ($scope, $http, $routeParams) {

    $scope.ProductGroup = {};

    $scope.ProductGroup.Id = $routeParams.Id;
    
    $scope.GetProductGroup = function () {
        $http({
            method: "POST",
            url: "PhrProductGroup/GetProductGroup?Id=" + $scope.ProductGroup.Id

        }).success(function mySucces(response) {
            $scope.ProductGroup = response;
        }).error(function myError(response) {
            $scope.errors = response.data;
        });
    }

    $scope.SaveProductGroup = function () {

        $http({
            method: "POST",
            url: "PhrProductGroup/SaveProductGroup",
            data: $scope.ProductGroup

        }).success(function mySucces(response) {
            $scope.ProductGroup = {};

        }).error(function myError(response) {

        });
    }

    $scope.GetProductGroup();
});