app.controller("BookingListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredBooking = [];
    $scope.DataList = [];
    $scope.BookingInfo = [];
    $scope.showItems = [10, 25, 50, 100];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;    

    $scope.GetAllBooking = function () {
   
        $http({
            method: "Get",
            url: "/Hajj/Booking/GetAllBooking"

        }).success(function (response) {

            $scope.BookingInfo = response;
            $scope.DataList = response;
            $scope.figureOutBookingToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllBooking();

    $scope.figureOutBookingToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredBooking = $scope.BookingInfo.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutBookingToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.BookingInfo, $scope.searchText);
        $scope.figureOutBookingToDisplay();
    };

}]);