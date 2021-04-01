app.controller('BookingCreateCtrl', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.Booking = {};
    $scope.HajjYearList = [];
    $scope.GroupLeaderList = [];
    $scope.PaymentForList = [{ type: 'Hajji' }, { type: 'Umrah' }];
    $scope.paymenttypes = [{ type: 'Cash' }, { type: 'Cheque' }];
    $scope.HajjiReferenceList = [];
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.Booking.ID = 0;
    $scope.Due = 0;
    $scope.ContractAmount = 0;
    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);

    $scope.SelectHajjiRef = function (Val) {

        if ($scope.Booking.PaymentFor == 'Hajji') {

            $scope.Booking.HajjiID = Val.ID;
            $scope.Booking.UmrahID = null;
        }
        else if ($scope.Booking.PaymentFor == 'Umrah') {

            $scope.Booking.UmrahID = Val.ID;
            $scope.Booking.HajjiID = null;
        }

        $scope.GetHajjiContractAmount();
    }

    $scope.GetHajjTenYear = function () {

        var currentYear = (new Date()).getFullYear();
        for (var i = 0; i < 10; i++) {
            var data = { Year: currentYear + i };
            $scope.HajjYearList.push(data);
        }
    }
    $scope.GetHajjTenYear();

    $scope.SelectGroupLeader = function (val) {

        $scope.Booking.GroupLeaderID = val.ID;
        $scope.GetAllHajji();
    };

    $scope.GetDueAmount = function (val) {
        $scope.Due = val != null || "" ? $scope.ContractAmount - val : $scope.ContractAmount;
    }

    $scope.GetHajjiContractAmount = function () {
        var hajjiId = $scope.Booking.HajjiID;
        var umrahID = $scope.Booking.UmrahID;
        $http({
            method: "post",
            url: "/Hajj/Booking/GetHajjiContractAmount",
            data: { HajjiID: hajjiId, UmrahID: umrahID }
        }).success(function (response) {
            $scope.ContractAmount = response.ContractAmount;
            $scope.Due = $scope.Booking.PaidAmount != null || "" ? $scope.ContractAmount - $scope.Booking.PaidAmount : $scope.ContractAmount;
        }).error(function () {

        });
    }

    $scope.GetAllHajji = function () {
        var id = $scope.Booking.GroupLeaderID;
        var paymentFor = $scope.Booking.PaymentFor;
        $http({
            method: "post",
            url: "/Hajj/Booking/GetAllHajji",
            data: { Id: id, PaymentFor: paymentFor }
        }).success(function (response) {
            $scope.HajjiReferenceList = response;
        }).error(function () {

        });
    };
    $scope.GetAllLeader = function () {
        $http({
            method: "GET",
            url: "/Hajj/Booking/GetAllLeaders"
        }).success(function (response) {
            $scope.GroupLeaderList = response;
        }).error(function () {

        });
    };
    $scope.GetAllLeader();

    //===================== Save Group Leader Data ===============

    $scope.SaveBooking = function () {

        var url = "";
        url = "/Hajj/Booking/SaveBooking";
        $http({
            method: "POST",
            url: url,
            data: $scope.Booking

        }).success(function (response) {

            if (response.Success == true) {
                $scope.submitted = false;
                $scope.Booking.ID = response.Id;
                $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
            }
            else {
                $scope.submitted = false;
                $scope.Booking.ID = response.Id;
                $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
            }
        }).error(function (response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.GetBookingById = function () {

        $http({

            method: "Get",
            url: "/Hajj/Booking/GetBookingById?id=" + paramId

        }).success(function (response) {

            $scope.Booking = response;
            $scope.GetHajjiContractAmount();
            $scope.HajjiReference = response.HajjiReference;
            $scope.GroupLeader = response.GroupLeader;
            $scope.Booking.BookingDate = response.BookingDate != null ? new Date(parseInt(response.BookingDate.substr(6))) : null;
            $scope.Booking.ChequeDate = response.ChequeDate != null ? new Date(parseInt(response.ChequeDate.substr(6))) : null;

        }).error(function (response) {
            $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
        });
    };

    if (paramId != "") {
        $scope.GetBookingById();
    }

}])