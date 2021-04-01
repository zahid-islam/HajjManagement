app.controller('PartyLedgerReportController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.TotalAmount = 0;
    $scope.date = {};
    $scope.PartyLedger = [];
    $scope.PartyName = "";
    $scope.loading = true;
    $scope.GetPartyLedgerReport = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/PartyLedgerReportByPartyName" + location.search
        }).success(function (response) {
            if (response.Success) {
                $scope.date = response.date;
                angular.forEach(response.data, function (item, key) {
                    if (key == 0) {
                        item.Balance = item.ReceivableAmount;
                        item.Balance = item.ReceivableAmount == 0 ? -item.ReceivedAmount : item.ReceivableAmount;
                    }
                    else {
                        let prevBalance = response.data[(key - 1)].Balance;
                        item.Balance = item.Status == 2 ? (prevBalance + item.ReceivableAmount) : (prevBalance - item.ReceivedAmount); 
                    }
                });
                $scope.PartyLedger = response.data;
                $scope.PartyName = response.groupLeaderName;
                $scope.loading = false;
            }
        }).error(function (response) {
        });
    };
    $scope.GetPartyLedgerReport();

    $scope.ReceivableAmountTotal = 0;
    $scope.ReceivedAmountTotal = 0;
    $scope.Balance = 0;

    $scope.SetGrandTotals = function (item) {
        $scope.ReceivableAmountTotal = $scope.ReceivableAmountTotal + item.ReceivableAmount;
        $scope.ReceivedAmountTotal = $scope.ReceivedAmountTotal + item.ReceivedAmount;
        $scope.Balance = $scope.Balance + item.Balance;
    };

}]);