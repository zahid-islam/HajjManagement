app.controller("NgPhrPurchaseOrderControllerList", function ($scope, $http) {

    $scope.filteredPurchaseOrders = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;


    $scope.GetPurchaseOrders = function () {
        $scope.phrPurchaseOrders = [];

        $http({
            method: "POST",
            url: "/PhrPurchaseOrder/GetPurchaseOrders"

        }).success(function mySucces(response) {


            angular.forEach(response, function (value, key) {

                if (value.OrderDate != null && value.OrderDate.length > 5) {
                    value.OrderDate = new Date(parseInt(value.OrderDate.substr(6)));
                }

                if (value.DeliveryDate != null && value.DeliveryDate.length > 5) {
                    value.DeliveryDate = new Date(parseInt(value.DeliveryDate.substr(6)));
                }
            });

            $scope.phrPurchaseOrders = response;
            $scope.figureOutPurchaseOrderToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    };


    $scope.figureOutPurchaseOrderToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredPurchaseOrders = $scope.phrPurchaseOrders.slice(begin, end);
    };

    $scope.GetPurchaseOrders();


    $scope.pageChanged = function () {
        $scope.figureOutPurchaseOrderToDisplay();
    };

});