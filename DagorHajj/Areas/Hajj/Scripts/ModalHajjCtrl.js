app.controller('ModalHajjCtrl', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.Grouopleadr = [];
    $scope.AllHajjis = [];
    $scope.Suppliers = [];
    $scope.CopyAllHajjis = [];
    $scope.alerts = [];
    $scope.DateTime = $filter('date')(Date.now(), 'dd-MM-yyyy');

    var paramId = location.search;

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.OnSelectGroupLeader = function (val) {
        $scope.GrpLeaderId = val.ID;
        $scope.AllHajjis = $scope.CopyAllHajjis.filter(function (obj) {
            return obj.GroupLeaderID == val.ID;
        });
    };

    $scope.OnSelectGrpLeader = function (val) {
        $scope.GroupLeaderId = val.ID;
    };

    $scope.OnSelectHajji = function (val) {
        $scope.HajjId = val.ID;
    };

    $scope.ClearHajjiDropdown = function (val) {
        $scope.AllHajjis = [];
    };

    $scope.GroupLeader = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GroupLeader"
        }).success(function (response) {
            $scope.Grouopleadr = response;
        }).error(function (response) {
            
        });
    };
    $scope.GroupLeader();

    $scope.OnSelectSupplier = function (val) {
        $scope.SupplierId = val.Id;
    };

    $scope.GetSupplier = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetSupplier"
        }).success(function (response) {
            $scope.Suppliers = response;
        }).error(function (response) {

        });
    };
    $scope.GetSupplier();

    $scope.AllHajji = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/AllHajji"
        }).success(function (response) {
            $scope.CopyAllHajjis = response;
        }).error(function (response) {

        });
    };
    $scope.AllHajji();

    // Invoice report start here
    $scope.TicketOtherHolder = [];
    $scope.InvoiceFor = [{ Id: 1, ForName: 'Ticket' }, { Id: 2, ForName: 'Other' }];
    $scope.OnSelectInvoiceFor = function (val) {
        $scope.InvoiceForId = val.Id;

        if ($scope.InvoiceForId == 1) {
            $scope.TicketOtherHolder = [];
            $scope.TicketOtherHolder = $scope.InvoiceTicket;
        };
        if ($scope.InvoiceForId == 2) {
            $scope.TicketOtherHolder = [];
            $scope.TicketOtherHolder = $scope.InvoiceOther;
        };
    };

    $scope.OnSelectInvoice = function (val) {
        $scope.InvoiceId = val.ID;
    };

    $scope.InvoiceTicket = [];
    $scope.GetAllTicket = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllTicket"
        }).success(function (response) {
            $scope.InvoiceTicket = response;
        }).error(function (response) {

        });
    };
    $scope.GetAllTicket();

    $scope.InvoiceOther = [];
    $scope.GetAllOther = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllOther"
        }).success(function (response) {
            $scope.InvoiceOther = response;
        }).error(function (response) {

        });
    };
    $scope.GetAllOther();
}]);