gmakaApp.controller('ReportHajjCtrl', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.HajjInfo = {};
    $scope.CompanyInfo = {};

    $scope.DateTime = $filter('date')(Date.now(), 'dd-MM-yyyy');
    var routData = location.search;

    $scope.GetHajjInfoById = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetHajjInfoById" + routData
        }).success(function (response) {
            $scope.HajjInfo = response.hajjiInfo;
            $scope.CompanyInfo = response.companyInfo;
        }).error(function (response) {
        });
    };
    $scope.GetHajjInfoById();

}]);