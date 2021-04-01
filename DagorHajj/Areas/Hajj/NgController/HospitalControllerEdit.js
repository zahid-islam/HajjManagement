app.controller('HospitalControllerEdit', ['$scope', '$http', '$window', 'appMessage', function HospitalControllerEdit($scope, $http, $window, appMessage) {


    $scope.Hospital = {};
    $scope.alerts = [];
    $scope.appMessage = appMessage;

    // Automatically set the focus to a textbox when this page loads
    $window.scrollTo(0, angular.element(document.getElementById('txtName').focus()).offsetTop);

    // Set Order Id While Update this Id

    var paramId = location.search.substr(4);
    $scope.Hospital.Id = paramId;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.SaveHospital = function () {


        $http({
            method: "POST",
            url: "SaveHospital",
            data: $scope.Hospital

        }).success(function mySucces(response) {
            $scope.submitted = false;
            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.update });

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });

    };


    $scope.GetHospitalById = function () {

        $http({
            method: "POST",
            url: "GetHospitalById?id=" + (paramId)

        }).success(function mySucces(response) {
            $scope.Hospital = response;

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    }

    $scope.GetHospitalById();

}]);