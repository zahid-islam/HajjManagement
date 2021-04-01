app.controller('ReportsController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
    $scope.Hajj = {};
    $scope.Hajjes = [];
    $scope.Umrahes = [];

    var paramId = location.search;
  
    $scope.SetStatusId = function (val) {
        $scope.Hajj.Status = val.StatusId;
    }

    $scope.GetAllHajjStatus = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllHajjStatus"
        }).success(function (response) {
            if (response.Success) {
                $scope.Statuses = response.data;
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllHajjStatus();

    $scope.GetAllUmrahStatus = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllUmrahStatus"
        }).success(function (response) {
            if (response.Success) {
                $scope.UmrahStatus = response.data;
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllUmrahStatus();

    $scope.SetPerformYear = function (val) {
        $scope.Hajj.PerformingHajj = val.PerformingHajj;
    }

    $scope.Performs = [];
    $scope.GetAllHajjPerform = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllHajjPerform"
        }).success(function (response) {
            if (response.Success) {
                $scope.Performs = response.data;
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllHajjPerform();

    $scope.GetAllHajjList = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllHajjList" + paramId
        }).success(function (response) {
            if (response.Success) {
                $scope.Hajjes = response.data;
                
            }
        }).error(function (response) {
           
        });
    };
    $scope.GetAllHajjList();

    $scope.GetAllUmrahList = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllUmrahList" + paramId
        }).success(function (response) {
            if (response.Success) {
                $scope.Umrahes = response.data;

                //angular.forEach($scope.Umrahes, function (items) {
                //    angular.forEach(items, function (item) {
                //        item.DepartureDate = new Date(parseInt(item.DepartureDate.substr(6)), "dd-MM-yyyy");
                //    });
                //});
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllUmrahList();

    $scope.Tickets = [];
    $scope.GetAllTicketList = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllTicketList" + paramId
        }).success(function (response) {
            if (response.Success) {
                $scope.Tickets = response.data;
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllTicketList();

    $scope.Others = [];
    $scope.GetAllOtherList = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllOtherList" + paramId
        }).success(function (response) {
            if (response.Success) {
                $scope.Others = response.data;
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllOtherList();
  
    $scope.SetTransactionById = function (val) {
        $scope.Hajj.Id = val.Id
    }
    $scope.ChangeLedgerFor = function (val) {
        $scope.Hajj.Id = null;
    }
    $scope.Transactions = [];
    $scope.GetAllTransactionTypes = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllTransactionTypes"
        }).success(function (response) {
            if (response.Success) {
                $scope.Transactions = response.data;
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllTransactionTypes();

    $scope.SuplierPayForList = [];
    $scope.GetAllSupplerPaymentType = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllSupplerPaymentType"
        }).success(function (response) {
            $scope.SuplierPayForList = response;
        }).error(function (response) {

        });
    };
    $scope.GetAllSupplerPaymentType();

    $scope.Bookings = [];
    $scope.GetAllFlightBooking = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllFlightBooking" + paramId
        }).success(function (response) {
            if (response.Success) {
                $scope.Bookings = response.data;
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllFlightBooking();

    $scope.SupplierPaymentList = [];
    $scope.GetAllSupplierPayment = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllSupplierPayment" + paramId
        }).success(function (response) {
            if (response.Success) {
                $scope.SupplierPaymentList = response.data;
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllSupplierPayment();

    $scope.CollectionPaymentList = [];
    $scope.GetAllCollectionPayment = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllCollectionPayment" + paramId
        }).success(function (response) {
            if (response.Success) {
                $scope.CollectionPaymentList = response.data;
            }
        }).error(function (response) {

        });
    };
    $scope.GetAllCollectionPayment();
}]);