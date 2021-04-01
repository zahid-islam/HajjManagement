app.controller("NgPhrPurchaseInvoiceReturnControllerList", function ($scope, $http) {

    $scope.filteredPurchaseInvoicesReturn = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;


    $scope.GetPurchaseInvoicesReturn = function () {
        $scope.phrPurchaseInvoices = [];

        $http({
            method: "POST",
            url: "/PhrPurchaseInvoiceReturn/GetPurchaseInvoicesReturn"

        }).success(function mySucces(response) {


            angular.forEach(response, function (value, key) {

                if (value.ReturnDate != null && value.ReturnDate.length > 5) {
                    value.ReturnDate = new Date(parseInt(value.ReturnDate.substr(6)));
                }
            });

            $scope.phrPurchaseInvoicesReturn = response;
            $scope.figureOutPurchaseInvoiceReturnToDisplay();

        }).error(function myError(response) {

            $scope.errors = response;

        });
    };


    $scope.figureOutPurchaseInvoiceReturnToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredPurchaseInvoicesReturn = $scope.phrPurchaseInvoicesReturn.slice(begin, end);
    };

    $scope.GetPurchaseInvoicesReturn();


    $scope.pageChanged = function () {
        $scope.figureOutPurchaseInvoiceReturnToDisplay();
    };

});