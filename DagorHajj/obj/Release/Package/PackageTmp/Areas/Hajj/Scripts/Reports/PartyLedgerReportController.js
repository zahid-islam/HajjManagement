app.controller('PartyLedgerReportController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.TotalAmount = 0;
    $scope.date = {};
    var paramId = location.search;
    $scope.PartyLedger = {};
    $scope.PartyName = "";
    $scope.loading = true;
    $scope.GetPartyLedgerReport = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/PartyLedgerReportByPartyName/" + paramId
        }).success(function (response) {
            if (response.Success) {
                $scope.date = response.date;
                $scope.PartyLedger = response.data;
                $scope.PartyName = response.groupLeaderName;
                console.log($scope.PartyLedger);
                if ($scope.PartyLedger) {
                    $scope.loading = false;

                }
            }
        }).error(function (response) {
            //$scope.alerts.push({
            //    'type': 'danger',
            //    'msg': 'Data Fetching Failure!.'
            //});
        });
    };


    $scope.GetPartyLedgerReport();
    $scope.Total = 0;
    $scope.SetGrandTotals = function (item) {
        $scope.Total = $scope.Total + item.Amount;
    };

}]);