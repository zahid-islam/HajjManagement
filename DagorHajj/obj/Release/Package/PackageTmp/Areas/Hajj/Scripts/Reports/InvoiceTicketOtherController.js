app.controller('InvoiceTicketOtherController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.loading = true;
    $scope.TotalAmount = 0;
    $scope.InvoiceById = {};
    var paramId = location.search;
    $scope.Ticket = {};
    $scope.PartyName = "";
    $scope.loading = true;
    $scope.GetAllTicketOrOtherById = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GetAllTicketOrOtherById" + paramId
        }).success(function (response) {
            if (response.Success) {
                $scope.InvoiceById = response;
            }
            $scope.loading = false;
        }).error(function (response) {

        });
    };
    $scope.GetAllTicketOrOtherById();

}]);