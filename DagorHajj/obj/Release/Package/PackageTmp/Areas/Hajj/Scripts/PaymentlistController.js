app.controller("PaymentListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredPayment = [];
    $scope.DataList = [];
    $scope.PaymentInfo = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllPayment = function () {

        $http({
            method: "Get",
            url: "/Hajj/Payment/GetAllPayment"

        }).success(function (response) {

            $scope.PaymentInfo = response;
            $scope.DataList = response;
            $scope.figureOutPaymentToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllPayment();

    $scope.figureOutPaymentToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredPayment = $scope.PaymentInfo.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutPaymentToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.PaymentInfo, $scope.searchText);
        $scope.figureOutPaymentToDisplay();
    };

}]);