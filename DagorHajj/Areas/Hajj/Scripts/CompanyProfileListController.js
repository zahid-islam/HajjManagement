app.controller("CompanyProfileListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredCompanyProfile = [];
    $scope.DataList = [];
    $scope.CompanyProfileInfos = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllCompanyProfile = function () {
        //$scope.employees = [];

        $http({
            method: "Get",
            url: "/Hajj/CompanyProfile/GetAllCompanyProfile"

        }).success(function (response) {

            $scope.CompanyProfileInfos = response;
            $scope.DataList = response;
            $scope.figureOutCompanyProfileToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllCompanyProfile();

    $scope.figureOutCompanyProfileToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredCompanyProfile = $scope.CompanyProfileInfos.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutCompanyProfileToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.CompanyProfileInfos, $scope.searchText);
        $scope.figureOutCompanyProfileToDisplay();
    };


}]);