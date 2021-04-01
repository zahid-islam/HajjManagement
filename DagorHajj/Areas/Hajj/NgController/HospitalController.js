app.controller('HospitalController', ['$scope', '$http', '$window', 'appMessage', function HospitalControllerCreate($scope, $http, $window, appMessage) {


    $scope.Hospital = {};
    $scope.alerts = [];
    $scope.appMessage = appMessage;

    // Automatically set the focus to a textbox when this page loads
    $window.scrollTo(0, angular.element(document.getElementById('txtName').focus()).offsetTop);


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
            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
            $scope.Hospital = {};

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });

    };
   

}]);