moneyReceiptApp.controller('BookingMoneyReceiptController', ['$scope', '$http', 'routeData', '$filter', function ($scope, $http, routeData, $filter) {

    $scope.BookingReceipt = {};
    $scope.BookingReceipt.Id = routeData.Id;
    $scope.alerts = [];
    $scope.DateTime = $filter('date')(Date.now(), 'dd-MM-yyyy');

    $scope.GetBookingReceptById = function () {
        var Id = $scope.BookingReceipt.Id;
        $http({
            method: "GET",
            url: "/Hajj/Booking/GetBookingReceptById?id=" + Id
        }).success(function (response) {
                    
            $scope.BookingReceipt = response;
            $scope.BookingReceipt.Date = new Date(parseInt(response.Date.substr(6)));
            $scope.BookingReceipt.Date = $filter('date')($scope.BookingReceipt.Date, 'dd-MM-yyyy');
            
        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Fetching Failure!.'
            });
        });
    };

    if ($scope.BookingReceipt.Id != "") {
        $scope.GetBookingReceptById();
    }

}]);