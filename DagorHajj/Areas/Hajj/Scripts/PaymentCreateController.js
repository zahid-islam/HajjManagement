app.controller('PaymentCreateCtrl', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage, $filter) {

    //================= GLOBAL VARIABLE ===================
    $scope.Payment = {};
    $scope.HajjiReferenceList = [];
    $scope.GroupLeaderList = [];
    $scope.PaymentForList = [{ type: 'Hajji' }, { type: 'Umrah' }, { type: 'Ticket' }, { type: 'Others' }];
    $scope.paymenttypes = [{ type: 'Cash' }, { type: 'Cheque' }];
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.Payment.ID = 0;
    $scope.Due = 0;
    $scope.ContractAmount = 0;
    $scope.Payment.HajjiID = 0;
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
            $scope.Payment.TicketId = null;
            $scope.Payment.OtherId = null;
        }
        else if ($scope.Payment.PaymentFor == 'Umrah') {
            $scope.Payment.UmrahID = Val.ID;
            $scope.Payment.HajjiID = null;
            $scope.Payment.TicketId = null;
            $scope.Payment.OtherId = null;
        }
        else if ($scope.Payment.PaymentFor == 'Ticket') {
            $scope.Payment.UmrahID = null;
            $scope.Payment.HajjiID = null;
            $scope.Payment.TicketId = Val.ID;
            $scope.Payment.OtherId = null;
        }
        else if ($scope.Payment.PaymentFor == 'Others') {
            $scope.Payment.UmrahID = null;
            $scope.Payment.HajjiID = null;
            $scope.Payment.TicketId = null;
            $scope.Payment.OtherId = Val.ID;
        }
        $scope.GetHajjiContractAmount();
    }
    $scope.SelectGroupLeader = function (val) {
        $scope.Payment.GroupLeaderID = val.ID;
        $scope.GetAllHajji();
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
        var url = "";
        if ($scope.Payment.HajjiID) {
            url = "/Hajj/Payment/GetHajjiInfoByHajjiId?hajjiId=" + $scope.Payment.HajjiID;
        }
        else if ($scope.Payment.UmrahID) {
            url = "/Hajj/Payment/GetUmrahInfoByUmrahId?umrahId=" + $scope.Payment.UmrahID;
        }
        else if ($scope.Payment.TicketId) {
            url = "/Hajj/Payment/GetTicketInfoByTicketId?ticketId=" + $scope.Payment.TicketId;
        }
        else if ($scope.Payment.OtherId) {
            url = "/Hajj/Payment/GetOtherInfoByOtherId?otherId=" + $scope.Payment.OtherId;
        }
        $http({
            method: "Get",
            url: url,
        }).success(function (response) {
            $scope.OriginalDue = response.due;
            $scope.Due = response.due;
            $scope.ContractAmount = response.ContractAmount;
            due = parseInt(response.due);
        }).error(function () {

        });
    };

    $scope.GetAllHajji = function () {

        var id = $scope.Payment.GroupLeaderID;
        var paymentFor = $scope.Payment.PaymentFor;
        $http({
            method: "post",
            url: "/Hajj/Payment/GetAllHajji",
            data: { Id: id, PaymentFor: paymentFor }
        }).success(function (response) {
            $scope.HajjiReferenceList = response;
            if ($scope.Payment.HajjiID) {
                $scope.HajjiReference = $filter('filter')($scope.HajjiReferenceList, { ID: $scope.Payment.HajjiID })[0];
            }
            else if ($scope.Payment.UmrahID) {
                $scope.HajjiReference = $filter('filter')($scope.HajjiReferenceList, { ID: $scope.Payment.UmrahID })[0];
            }
            else if ($scope.Payment.TicketId) {
                $scope.HajjiReference = $filter('filter')($scope.HajjiReferenceList, { ID: $scope.Payment.TicketId })[0];
            }
            else if ($scope.Payment.OtherId) {
                $scope.HajjiReference = $filter('filter')($scope.HajjiReferenceList, { ID: $scope.Payment.OtherId })[0];
            }
        }).error(function () {

        });
    };
    //$scope.GetAllHajji();

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
        url = "/Hajj/payment/SavePayment";
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
            url: "/Hajj/Payment/GetPaymentById" + location.search
        }).success(function (response) {

            $scope.Payment = response;

            $scope.GetHajjiContractAmount();
            $scope.HajjiReference = response.HajjiReference;
            $scope.GroupLeader = response.GroupLeader;
            $scope.Payment.PaymentDate = response.PaymentDate != null ? new Date(parseInt(response.PaymentDate.substr(6))) : null;
            $scope.Payment.ChequeDate = response.ChequeDate != null ? new Date(parseInt(response.ChequeDate.substr(6))) : null;
            paidAmount = response.Amount;
            tempAmount = parseInt(paidAmount);

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
                method: "Get", url: "/Hajj/Payment/GetUmrahInfoByUmrahId" + location.search
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