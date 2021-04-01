app.controller("NgPhrProductGroupControllerList", function ($scope, $http) {

    $scope.ProductGroups = [];

    $scope.GetProductGroups = function () {

        $http({
            method: "POST",
            url: "PhrProductGroup/GetProductGroups"

        }).success(function mySucces(response) {

            $scope.ProductGroups = response;

        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    }
    $scope.GetProductGroups();

});