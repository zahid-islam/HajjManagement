app.controller('OtherCreateCtrl', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.Other = {};
    $scope.GroupLeaderList = [];
    $scope.InitialNameList = [];
    $scope.SupplierList = [];
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.Other.ID = 0;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);

    $scope.GetAllGroupLeader = function () {
        $http({
            method: "GET",
            url: "/Hajj/Others/GetAllGroupLeader"
        }).success(function (response) {
            $scope.GroupLeaderList = response;
        }).error(function () {

        });
    };

    $scope.GetAllGroupLeader();

    $scope.GetAllSupplier = function () {
        $http({
            method: "GET",
            url: "/Hajj/Others/GetAllSupplier"
        }).success(function (response) {
            $scope.SupplierList = response;
        }).error(function () {

        });
    };

    $scope.GetAllSupplier();

    $scope.SelectgroupLeader = function (Val) {

        $scope.Other.GroupLeaderID = Val.ID;

    };
    $scope.SelectSupplier = function (supplierVal) {

        $scope.Other.SupplierID = supplierVal.Id;

    };
   
   
   
    $scope.GetAllInitialName = function () {

        $scope.InitialNameList.push("Mr");
        $scope.InitialNameList.push("Mrs");
        $scope.InitialNameList.push("Miss");
        $scope.InitialNameList.push("Mastr");
    }

    $scope.GetAllInitialName();

    $scope.GetDueAmount = function (val) {
        if (val != null && val != "") {
            var paidval = parseInt(val)
            $scope.Due = $scope.Other.SellingRate - paidval;
        }
        else {
            $scope.Due = $scope.Other.SellingRate;
        }
        
    }
    //===================== Save Group Leader Data ===============

    $scope.SaveOther = function () {

        var url = "";
        url = "/Hajj/Others/SaveOther";
        $http({
            method: "POST",
            url: url,
            data: $scope.Other

        }).success(function (response) {

            if (response.Success == true) {

                $scope.submitted = false;
                $scope.Other.ID = response.Id;
                $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
            }
            else {
                $scope.submitted = false;
                $scope.Other.ID = response.Id;
                $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
            }
        }).error(function (response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.GetOtherById = function () {

        $http({

            method: "Get",
            url: "/Hajj/Others/GetOtherById?id=" + paramId

        }).success(function (response) {

            $scope.Other = response;
            $scope.GroupLeader = response.GroupLeader;
            $scope.PurchaseFrom = response.PurchaseFrom;
            $scope.Other.DateOfExpiry = $scope.Other.DateOfExpiry != null ? new Date(parseInt(response.DateOfExpiry.substr(6))) : null;
            $scope.Other.DoB = $scope.Other.DoB != null ? new Date(parseInt(response.DoB.substr(6))) : null;
            $scope.Other.IssueDate = $scope.Other.IssueDate != null ? new Date(parseInt(response.IssueDate.substr(6))) : null;
            $scope.Due = response.SellingRate - response.PaidAmount;
        }).error(function (response) {
            $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
        });
    };
    
   
    if (paramId != "") {
        $scope.GetOtherById();
    }

}])