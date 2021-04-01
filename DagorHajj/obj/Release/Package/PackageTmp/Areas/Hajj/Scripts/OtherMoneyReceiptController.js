OtherReceiptApp.controller('OtherMoneyReceiptController', ['$scope', '$http', 'routeData', '$filter', function ($scope, $http, routeData, $filter) {

    $scope.PaymentReceipt = {};
    $scope.PaymentReceipt.Id = routeData.Id;
    $scope.alerts = [];
    $scope.DateTime = $filter('date')(Date.now(), 'dd-MM-yyyy');

    //$scope.GetPaymentReceptById = function () {
    //    var Id = $scope.PaymentReceipt.Id;
    //    $http({
    //        method: "GET",
    //        url: "/Hajj/Payment/GetPaymentReceptById?id=" + Id
    //    }).success(function (response) {

    //        $scope.PaymentReceipt = response;
    //        $scope.PaymentReceipt.Date = new Date(parseInt(response.Date.substr(6)));
    //        $scope.PaymentReceipt.Date = $filter('date')($scope.PaymentReceipt.Date, 'dd-MM-yyyy');

    //    }).error(function (response) {
    //        $scope.alerts.push({
    //            'type': 'danger',
    //            'msg': 'Data Fetching Failure!.'
    //        });
    //    });
    //};

    //if ($scope.PaymentReceipt.Id != "") {
    //    $scope.GetPaymentReceptById();
    //}

}]);