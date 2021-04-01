app.controller("TicketListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredTicket = [];
    $scope.DataList = [];
    $scope.TicketInfos = [];
    $scope.showItems = [10, 25, 50, 100];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllTicket = function () {
        
        $http({
            method: "Get",
            url: "/Hajj/Ticket/GetAllTicket"

        }).success(function (response) {

            $scope.TicketInfos = response;
            $scope.DataList = response;
            $scope.figureOutTicketToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllTicket();

    $scope.figureOutTicketToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredTicket = $scope.TicketInfos.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutTicketToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.TicketInfos, $scope.searchText);
        $scope.figureOutTicketToDisplay();
    };
}]);