app.controller('PaymentCreateCtrl', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage, $filter) {

    //================= GLOBAL VARIABLE ===================
    $scope.Payment = {};
    $scope.SupplierList = [];
    $scope.paymenttypes = [{ type: 'Cash' }, { type: 'Cheque' }];
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.Payment.ID = 0;
    $scope.Due = 0;
    var paidAmount = 0;
    var tempAmount = 0;
    var due = 0;
    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);

    $scope.SelectHajjiRef = function (Val) {
        if ($scope.Payment.PaymentFor == 'Hajji') {
            $scope.Payment.HajjiID = Val.ID;
            $scope.Payment.UmrahID = null;
        }
        else if ($scope.Payment.PaymentFor == 'Umrah') {
            $scope.Payment.UmrahID = Val.ID;
            $scope.Payment.HajjiID = null;
        }

        $scope.GetHajjiContractAmount();
    }
    $scope.SelectSupplier = function (val) {
        $scope.Payment.SupplierId = val.Id;
    };
    $scope.OriginalDue = 0;
    $scope.GetDueAmount = function (val) {
        if ($scope.Payment.PaymentType == "Cash") {
            $scope.Due = val != null || "" ? $scope.OriginalDue - val : $scope.OriginalDue;
        }
        else {
            $scope.Due = $scope.OriginalDue;
        }
    }

    $scope.GetDueAmountForEdit = function (val) {

        var tempDue = due + tempAmount;

        if (val != null || "") {

            val = parseInt(val)

            if (val <= tempAmount) {

                $scope.Due = tempDue - val;
            }
            else if (val > tempAmount) {

                if (val > due) {

                    $scope.Due = due - val;
                }
                else {
                    $scope.Due = due - (val - tempAmount);
                }
            }
        }
        else {
            $scope.Due = tempDue;
        }
    }

    $scope.GetHajjiContractAmount = function () {
        var hajjiId = $scope.Payment.HajjiID;
        var umrahId = $scope.Payment.UmrahID;
        $http({
            method: "Get",
            url: "/Hajj/Payment/GetHajjiInfoByHajjiId?hajjiId=" + hajjiId,
        }).success(function (response) {
            $scope.OriginalDue = response.due;
            $scope.Due = response.due;
            $scope.ContractAmount = response.ContractAmount;
            due = parseInt(response.due);
        }).error(function () {

        });
    };

    $scope.GetAllSupplier = function () {

        var id = $scope.Payment.GroupLeaderID;
        var paymentFor = $scope.Payment.PaymentFor;
        $http({
            method: "post",
            url: "/Hajj/SupplierPayment/GetAllSupplier",
            data: { Id: id, PaymentFor: paymentFor }
        }).success(function (response) {
            $scope.SupplierList = response;
            //if ($scope.Payment.HajjiID) {
            //    $scope.HajjiReference = $filter('filter')($scope.HajjiReferenceList, { ID: $scope.Payment.HajjiID })[0];
            //}
            //else if ($scope.Payment.UmrahID) {
            //    $scope.HajjiReference = $filter('filter')($scope.HajjiReferenceList, { ID: $scope.Payment.UmrahID })[0];
            //}
        }).error(function () {

        });
    };
    $scope.GetAllSupplier();

    $scope.Purposes = [];
    $scope.GetAllPurpose = function () {
        $http({
            method: "post",
            url: "/Hajj/SupplierPayment/GetAllPurpose"
        }).success(function (response) {
            $scope.Purposes = response;
        }).error(function () {

        });
    };
    $scope.GetAllPurpose();

    $scope.OnSelectPurpose = function (val) {
        $scope.Payment.PaymentFor = val.Name
    }

    $scope.GetAllLeader = function () {

        $http({
            method: "GET",
            url: "/Hajj/Payment/GetAllLeaders"
        }).success(function (response) {
            $scope.GroupLeaderList = response;

            //if (routeData.hajjiId > 0) {
            //    $http({
            //        method: "GET",
            //        url: "/Hajj/Payment/GetHajjiByrouteId?id=" + routeData.hajjiId
            //    }).success(function (response) {
            //        $scope.Payment = response;
            //        $scope.HajjiReference = response.HajjiReference;
            //        $scope.GroupLeader = response.GroupLeader;

            //    }).error(function () {

            //    });
            //}
            //find group leader id from hajji link click
            //find group leader from groupleaderlist by group leader id
            //assign group leader ng-model data equals found group leader
        }).error(function () {

        });
    };
    $scope.GetAllLeader();
    //===================== Save Group Leader Data ===============

    $scope.SavePayment = function () {

        var url = "";
        url = "/Hajj/SupplierPayment/SaveSupplierPayment";
        $http({
            method: "POST",
            url: url,
            data: $scope.Payment
        }).success(function (response) {
            if (response.Success == true) {
                $scope.submitted = false;
                $scope.Payment.ID = response.Id;
                $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
            }
            else {
                $scope.submitted = false;
                $scope.Payment.ID = response.Id;
                $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
            }
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.GetPaymentById = function () {

        $http({
            method: "Get",
            url: "/Hajj/SupplierPayment/GetPaymentById" + location.search
        }).success(function (response) {
            response.PaymentDate = response.PaymentDate != null ? new Date(parseInt(response.PaymentDate.substr(6))) : null;
            $scope.Payment = response;
            if ($scope.Payment.SupplierId) {
                $scope.Supplier = $filter('filter')($scope.SupplierList, { Id: $scope.Payment.SupplierId })[0];
                if ($scope.Supplier != null) {
                    $scope.Payment.SupplierName = $scope.Supplier.SupplierName;
                }
            }
        }).error(function (response) {
            $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
        });
    };

    if (location.search) {
        if (location.search.toLowerCase().indexOf("hajjiid") >= 0) {
            $scope.Payment.PaymentFor = "Hajji";
            $http({
                method: "Get", url: "/Hajj/Payment/GetHajjiInfoByHajjiId" + location.search
            }).success(function (response) {
                $scope.ContractAmount = response.ContractAmount;
                $scope.Due = response.due;
                $scope.OriginalDue = response.due;
                $scope.Payment.GroupLeaderID = response.GroupLeaderID;
                $scope.GroupLeader = $filter('filter')($scope.GroupLeaderList, { ID: response.GroupLeaderID })[0];
                $scope.Payment.HajjiID = response.ID;
                $scope.Payment.UmrahID = null;
                $scope.GetAllHajji();
            }).error(function (response) {
                $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
            });
        }
        else if (location.search.toLowerCase().indexOf("umrahid") >= 0) {
            $scope.Payment.PaymentFor = "Umrah";
            $http({
                method: "Get", url: "/Hajj/Payment/GetUmrahInfoByHajjiId" + location.search
            }).success(function (response) {
                $scope.ContractAmount = response.ContractAmount;
                $scope.Due = response.due;
                $scope.OriginalDue = response.due;
                $scope.Payment.GroupLeaderID = response.GroupLeaderID;
                $scope.GroupLeader = $filter('filter')($scope.GroupLeaderList, { ID: response.GroupLeaderID })[0];
                $scope.Payment.UmrahID = response.ID;
                $scope.Payment.HajjiID = null;
                $scope.GetAllHajji();
            }).error(function (response) {
                $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
            });
        }
    }

}]);