app.controller("NgPhrProductGenericControllerCreate", function ($scope, $http, $routeParams) {

    $scope.ProductGeneric = {};

    $scope.ProductGeneric.Id = $routeParams.Id;

    $scope.GetProductGeneric = function () {
        $http({
            method: "POST",
            url: "PhrProductGeneric/GetProductGeneric?Id=" + ($scope.ProductGeneric.Id)

        }).success(function mySucces(response) {
            $scope.ProductGeneric = response;
        }).error(function myError(response) {
            $scope.errors = response.data;
        });
    }

    $scope.SaveProductGeneric = function () {

        $http({
            method: "POST",
            url: "PhrProductGeneric/SaveProductGeneric",
            data: $scope.ProductGeneric

        }).success(function mySucces(response) {
            $scope.ProductGeneric = {};

        }).error(function myError(response) {

        });
    }

    $scope.GetProductGeneric();
});