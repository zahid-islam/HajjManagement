app.controller('SupplierLedgerReportController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.TotalAmount = 0;
    $scope.date = {};
    $scope.SupplierLedger = [];
    $scope.PartyName = "";
    $scope.loading = true;
    $scope.GetAllSupplierLedger = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllSupplierLedger" + location.search
        }).success(function (response) {
            if (response.Success) {
                $scope.date = response.date;
                angular.forEach(response.data, function (item, key) {
                    if (key == 0) {
                        item.Balance = item.PayableAmount == 0 ? -item.PaidAmount : item.PayableAmount;
                    }
                    else {
                        let prevBalance = response.data[(key - 1)].Balance;
                        item.Balance = item.Status == 2 ? (prevBalance + item.PayableAmount) : (prevBalance - item.PaidAmount);
                    }
                });
                $scope.SupplierLedger = response.data;
                $scope.PartyName = response.supplierName;
                $scope.loading = false;
            }
        }).error(function (response) {
        });
    };
    $scope.GetAllSupplierLedger();
    
    $scope.PayableAmountTotal = 0;
    $scope.PaidAmountTotal = 0;
    $scope.Balance = 0;

    $scope.SetGrandTotals = function (item) {
        $scope.PayableAmountTotal = $scope.PayableAmountTotal + item.PayableAmount;
        $scope.PaidAmountTotal = $scope.PaidAmountTotal + item.PaidAmount;
        $scope.Balance = $scope.Balance + item.Balance;
    };

}]);