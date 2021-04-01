app.controller("NgPhrPurchaseInvoiceControllerList", function ($scope, $http) {

    $scope.filteredPurchaseInvoices = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;


    $scope.GetPurchaseInvoices = function () {
        $scope.phrPurchaseInvoices = [];

        $http({
            method: "POST",
            url: "/PhrPurchaseInvoice/GetPurchaseInvoices"

        }).success(function mySucces(response) {


            angular.forEach(response, function (value, key) {

                if (value.GRDate != null && value.GRDate.length > 5) {
                    value.GRDate = new Date(parseInt(value.GRDate.substr(6)));
                }

                if (value.ChallanDate != null && value.ChallanDate.length > 5) {
                    value.ChallanDate = new Date(parseInt(value.ChallanDate.substr(6)));
                }
            });

            $scope.phrPurchaseInvoices = response;
            $scope.figureOutPurchaseInvoiceToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    };


    $scope.figureOutPurchaseInvoiceToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredPurchaseInvoices = $scope.phrPurchaseInvoices.slice(begin, end);
    };

    $scope.GetPurchaseInvoices();


    $scope.pageChanged = function () {
        $scope.figureOutPurchaseInvoiceToDisplay();
    };

});