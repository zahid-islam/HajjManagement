app.controller('OtherInvoiceTicketByIdReportController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.TotalAmount = 0;
    $scope.date = {};
    var paramId = location.search;
    $scope.Ticket = {};
    $scope.PartyName = "";
    $scope.loading = true;
    $scope.InvoiceTicketById = function (id) {
        //var id = 6;
        $http({
            method: "GET",
            url: "/Hajj/Reports/OtherInvoiceTicket?id="+id
        }).success(function (response) {
            if (response.Success) {
                $scope.date = response.date;
                $scope.Ticket = response.data;
               // $scope.PartyName = response.groupLeaderName;
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

    $scope.InvoiceTicketById(1);

}]);