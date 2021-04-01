app.controller('BedControllerEdit', ['$scope', '$http', 'appMessage', function NgPhrCustomerControllerEdit($scope, $http, appMessage) {

    //================= GLOBAL VARIABLE ===================


    $scope.AppMessage = appMessage;
    $scope.Bed = {};
    $scope.alerts = [];


    // Set Order Id While Update this Id

    var paramId = location.search.substr(4);
    $scope.Bed.Id = paramId;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };




    $scope.GetBedById = function () {
       
        $http({
            method: "POST",
            url: "GetBedById?bedId=" + ($scope.Bed.Id)

        }).success(function mySucces(response) {
            $scope.Bed = response;
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_Warning });
        });
    }


    // It will post the form data on Server
    $scope.UpdateBed = function () {

        $http({
            method: "POST",
            url: "UpdateBed",
            data: $scope.Bed

        }).success(function mySucces(response) {
            $scope.submitted = false;
            $scope.alerts.push({ 'type': 'success', 'msg': $scope.AppMessage.update });

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.AppMessage.failure });
        });

    };


    $scope.GetAllWard = function () {
        
        

        $http({
            method: "POST",
            url: "GetAllWard",
            //data: $scope.Ward

        }).success(function mySucces(response) {
            $scope.Wards = response;

        }).error(function myError(response) {

        });
    };

    $scope.GetAllWard(); // Bind The Combo First

    //=========Call The Method When Param Value is not = 0
    if (paramId != "") {

        $scope.GetBedById();

    }

}]);