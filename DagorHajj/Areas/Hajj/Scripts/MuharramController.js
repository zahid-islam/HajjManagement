
app.controller('MuharramController', ['$scope', '$http', 'appMessage', '$filter', '$window', function ($scope, $http, appMessage, $filter, $window) {

    //================= GLOBAL VARIABLE ===================

    //$scope.Muharram = {};
    $scope.MuharramType = {};
    $scope.MuharramType.ID = 0;
    $scope.MuharramTypeList = {};
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.ActionStatus = "Add";
  

    // Set Order Id While Update this Id

    var paramId = location.search.substr(4);
    $scope.MuharramType.ID = paramId;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    //========= Set Date when page load
    $scope.SetInitialValue = function () {

        $("input[name=SupplierName]").focus();
        $("input[name=SupplierName]").select();
    }
    $scope.SetInitialValue();
   
    $scope.Muharrams = [];
    $scope.GetMuharrams = function () {
        $http({
            method: "GET",
            url: "/Hajj/MuharramRelation/GetMuharrams",
        }).success(function mysucces(response) {
            $scope.MuharramTypeList.Muharrams = response;
        }).error(function myError(response) {

        });
    };
    $scope.GetMuharrams();

    //GetById in Index page
    $scope.GetMuharramByid = function () {
        $http({
            method: "GET",
            url: "/Hajj/MuharramRelation/GetMuharramByid?id=" + ($scope.Supplier.Id)
        }).success(function mySucces(response) {
            $scope.Muharram = response.data[0];
          
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
            $window.scrollTo(0, 0);
        });
    }

    //Save Data
    $scope.SaveMuharram = function () {
                $http({
                method: "POST",
                url: "/Hajj/MuharramRelation/SaveMuharram",
                data: $scope.MuharramType
            }).success(function mySucces(response) {
                if (response.Success) {
                    $scope.MuharramType.Id = response.Id;
                    $scope.submitted = false;
                    $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                    $scope.MuharramType = {};
                    $window.scrollTo(0, 0);//scrolbar top on page for message show
                    $scope.GetMuharrams();
                }
                else {
                    $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    $window.scrollTo(0, 0);
                }
            }).error(function myError(response) {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                $window.scrollTo(0, 0);
            });
          
    };

    // Update Data
    $scope.UpdateMuharram = function () {
        $http({
            method: "POST",
            url: "/Hajj/MuharramRelation/UpdateMuharram",
            data: $scope.MuharramType

        }).success(function mySucces(response) {
            if (response) {
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.update });
                $scope.MuharramType = {};
                $window.scrollTo(0, 0);
                $scope.ActionStatus = "Add";
                $scope.GetMuharrams();
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                $window.scrollTo(0, 0);
            }

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            $window.scrollTo(0, 0);
        });
    };

    //Fetch Details Data
    $scope.SetUpdateData = function (entity) {
        if (entity != null) {
            $scope.ActionStatus = "Edit";
            $scope.RequisitionDetailTemp = entity;

            $scope.MuharramType.ID = entity.ID;
            $scope.MuharramType.RelationType = entity.RelationType;
           
        }
    }

    //Cancel Details Field Data
    $scope.CancelChildUpdate = function () {
        $scope.ActionStatus = "Add";
        $scope.MuharramType.RelationType = "";
    }
    //=========Call The Method When Param Value is not = 0
    if (paramId != "") {
        $scope.GetMuharramByid();
    }
    else {
        $scope.MuharramType.ID = 0;
    }

}]);