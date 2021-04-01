app.controller('TicketCreateCtrl', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.Ticket = {};
    $scope.GroupLeaderList = [];
    $scope.InitialNameList = [];
    $scope.SupplierList = [];
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.Ticket.ID = 0;

    //=========================== Alerts ==================
    //start

    $scope.TicketSectors = [];
    $scope.Sector = {};
    $scope.ReapeatTimes = [$scope.Sector];

    $scope.ClickedOnAdd = function (val) {
        val.Status = true;
        $scope.Sector = {};
        $scope.ReapeatTimes.push($scope.Sector);
    };

    $scope.DuringSubmit = function () {

        
        $scope.TicketSectors = [];
        angular.forEach($scope.ReapeatTimes, function (item) {
            if (item.Sector && item.Date) {
                $scope.TicketSectors.push(item);
            }
        });
    };

    //end
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);

    $scope.GetAllGroupLeader = function () {
        $http({
            method: "GET",
            url: "/Hajj/Ticket/GetAllGroupLeader"
        }).success(function (response) {
            $scope.GroupLeaderList = response;
        }).error(function () {

        });
    };

    $scope.GetAllGroupLeader();

    $scope.GetAllSupplier = function () {
        $http({
            method: "GET",
            url: "/Hajj/Ticket/GetAllSupplier"
        }).success(function (response) {
            $scope.SupplierList = response;
        }).error(function () {

        });
    };

    $scope.GetAllSupplier();

    $scope.SelectgroupLeader = function (Val) {

        $scope.Ticket.GroupLeaderID = Val.ID;

    }

    $scope.SelectSupplier = function (supplierVal) {

        $scope.Ticket.SupplierID = supplierVal.Id;

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
            $scope.Due = $scope.Ticket.SellingRate - paidval;
        }
        else {
            $scope.Due = $scope.Ticket.SellingRate;
        }

    }

    //===================== Save Group Leader Data ===============

    $scope.SaveTicket = function () {
       
        
        var id = $scope.Ticket.ID || 0;
        if (id == 0) {
             $scope.DuringSubmit();
        }
                          
        $scope.Ticket.TicketSectors = $scope.TicketSectors;
        var url = "";

        url = "/Hajj/Ticket/SaveTicket";


        $http({
            method: "POST",
            url: url,
            data: $scope.Ticket

        }).success(function (response) {

            if (response.Success == true) {

                $scope.submitted = false;
                
                $scope.TicketSectors = response.model;

                angular.forEach($scope.TicketSectors, function (item) {

                    item.Date = item.Date != null ? new Date(parseInt(item.Date.substr(6))) : null;
                });

                $scope.Ticket.ID = response.Id;

                $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
            }
            else {
                $scope.submitted = false;
                $scope.Ticket.ID = response.Id;
                $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
            }
        }).error(function (response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.GetTicketById = function () {

        $http({

            method: "Get",
            url: "/Hajj/Ticket/GetTicketById?id=" + paramId

        }).success(function (response) {

            $scope.Ticket = response;
            $scope.GroupLeader = response.GroupLeader;
            $scope.PurchaseFrom = response.PurchaseFrom;
            $scope.Ticket.IssueDate = $scope.Ticket.IssueDate != null ? new Date(parseInt(response.IssueDate.substr(6))) : null;
            $scope.Ticket.FlightDate = $scope.Ticket.FlightDate != null ? new Date(parseInt(response.FlightDate.substr(6))) : null;
            $scope.Ticket.DateOfExpiry = $scope.Ticket.DateOfExpiry != null ? new Date(parseInt(response.DateOfExpiry.substr(6))) : null;
            $scope.Ticket.DoB = $scope.Ticket.DoB != null ? new Date(parseInt(response.DoB.substr(6))) : null;
            $scope.Due = response.SellingRate - response.PaidAmount;
            $scope.ReapeatTimes = response.TicketSectors;
            $scope.TicketSectors = response.TicketSectors;

            if ($scope.ReapeatTimes == 0)
            {
                
                var sectorDate = { Date:null,Status:true,Sector:null}              
                $scope.ReapeatTimes.push(sectorDate);
            }
          
                angular.forEach($scope.ReapeatTimes, function (item) {

                    item.Date = item.Date != null ? new Date(parseInt(item.Date.substr(6))) : null;

                    var lastElem = $scope.ReapeatTimes[$scope.ReapeatTimes.length - 1];

                    if (item == lastElem) {
                        item.Status = false;
                    }
                    else {
                        item.Status = true;
                    }
                });
            }).error(function (response) {
                $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
            });
        
        
    };

    if (paramId != "") {
        $scope.GetTicketById();
    }

}])