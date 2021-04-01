app.controller('TicketReportController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.TotalAmount = 0;
    $scope.date = {};
    $scope.Ticket = {};
    $scope.PartyName = "";
    $scope.loading = true;
    $scope.InvoiceTicketById = function () {
        $http({
            method: "GET",
            url: "/Hajj/Ticket/GetTicketByIdReport" + location.search
        }).success(function (response) {
            if (response.Success) {
                $scope.date = response.date;
                $scope.Ticket = response.data;
                console.log($scope.Ticket);
                if ($scope.Ticket) {
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

    $scope.InvoiceTicketById();
}]);