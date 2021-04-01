app.controller("HajjiReferenceListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredHajjiReference = [];
    $scope.DataList = [];
    $scope.HajjiReferenceInfo = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllHajjiReference = function () {
        //$scope.employees = [];

        $http({
            method: "Get",
            url: "/Hajj/HajjiReference/GetAllHajjiReference"

        }).success(function (response) {

            $scope.HajjiReferenceInfo = response;
            $scope.DataList = response;
            $scope.figureOutHajjiReferenceToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllHajjiReference();

    $scope.figureOutHajjiReferenceToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredHajjiReference = $scope.HajjiReferenceInfo.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutHajjiReferenceToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.HajjiReferenceInfo, $scope.searchText);
        $scope.figureOutHajjiReferenceToDisplay();
    };


}]);