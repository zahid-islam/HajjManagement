
app.controller('ChequeManagementController', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage, $filter) {

    //================= GLOBAL VARIABLE ===================

    $scope.appMessage = appMessage;
    $scope.filteredCheques = [];
    $scope.showItems = [10, 25, 50, 100];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.alerts = [];
    $scope.DataList = [];
    $scope.Payment = {};

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.GetCheques = function () {

        $scope.CheckData = [];

        $http({
            method: "GET",
            url: "/Hajj/ChequeManagement/ChequeManagementReport"

        }).success(function (response) {

            if (response.Success) {
                $scope.CheckData = response.data;
                $scope.DataList = response.data;
                $scope.figureOutChequeToDisplay();
            }
        }).error(function (response) {

        });
    };



    $scope.figureOutChequeToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredCheques = $scope.DataList.slice(begin, end);
    };

    $scope.GetCheques();


    $scope.pageChanged = function () {
        $scope.figureOutChequeToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.CheckData, $scope.searchText);
        $scope.figureOutChequeToDisplay();
    };

    $scope.ShowModalForCheckManagement = function (data) {
        console.log(data);
        $scope.Payment = data;
        $('#check-management').modal('show');
    };

    $scope.StatusData = [
        {Status:'Pending'},
        { Status: 'Deposited' },
        { Status: 'Cancelled' }
        ];

    $scope.SetStatus = function (x) {
        $scope.Status = x;
    }
    $scope.UpdateChequeManagementData = function () {
       
        $http({
            method: "POST",
            url: "/Hajj/ChequeManagement/UpdateChequeManagement",
            data: $scope.Payment
        }).success(function mySucces(response) {
            if (response.Success) {
                $('#check-management').modal('hide');
                $scope.GetCheques();
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
            
        }).error(function myError(response) {
            
        });
    };

}]);