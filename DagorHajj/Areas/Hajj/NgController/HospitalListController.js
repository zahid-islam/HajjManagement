app.controller('HospitalListController', ['$scope', '$http', 'appMessage', function HospitalControllerList($scope, $http, appMessage) {

    //================= GLOBAL VARIABLE ===================

    $scope.appMessage = appMessage;
    $scope.filteredHospitals = [];
    $scope.Hospitals = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.alerts = [];

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.Gethospitals = function () {


        $http({
            method: "POST",
            url: "/Administration/Hospital/GetHospitals"

        }).success(function mySucces(response) {

            $scope.Hospitals = response;
            $scope.figureOutHospitalToDisplay();

        }).error(function myError(response) {

        });
    };


    $scope.figureOutHospitalToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredHospitals = $scope.Hospitals.slice(begin, end);
    };

    $scope.Gethospitals();


    $scope.pageChanged = function () {
        $scope.figureOutHospitalToDisplay();
    };

}]);