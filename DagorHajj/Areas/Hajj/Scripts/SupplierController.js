app.controller('SupplierController', ['$scope', '$http', 'appMessage', function ($scope, $http, appMessage) {


    //================= GLOBAL VARIABLE ===================

    $scope.AppMessage = appMessage;
    $scope.Supplier = {};
    $scope.alerts = [];
    $scope.ButtonStatus = 'Add';
    $scope.IsProcessing = false;
    $scope.Title = "Supplier | New";
    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


    
    $scope.GetSupplierType = function () {
        $http({
            method: "GET",
            url: "/Hajj/Supplier/GetSupplierType"
        }).success(function (response) {
            if (response.Success) {
                $scope.SupplierType = response.data;
            }
        }).error(function (response) {
           // $scope.alerts.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_Warning });
        });
    };
    $scope.GetSupplierType();

    $scope.SetCutomerTypeIdId = function (data) {
        $scope.Supplier.SupplierTypeId = data.Id;
        $scope.Supplier.TypeName = data.TypeName;
    }


  

    $scope.hoverIn = function () {
        debugger;
        alert();
    }
    $scope.SaveSupplier = function () {

        $scope.IsProcessing = true;
        if ($scope.Supplier.Id > 0) {
            $scope.UpdateSupplier();
        }
        else {
            $http({
                method: "POST",
                url: "/Hajj/Supplier/SaveSupplier",
                data: $scope.Supplier

            }).success(function (response) {
                if (response.Success) {
                    $scope.submitted = false;
                    $scope.alerts.push({ 'type': 'success', 'msg': $scope.AppMessage.save });
                    //$scope.Supplier = {};
                    $scope.Supplier.Id = response.Id;
                    $scope.Title = "Supplier | Edit - " + response.Id;
                    $scope.IsProcessing = true;
                    $scope.ButtonStatus = 'Edit';
                }
                else {
                    $scope.IsProcessing = false;
                    $scope.alerts.push({ 'type': 'danger', 'msg': $scope.AppMessage.failure });
                }


            }).error(function (response) {
                $scope.IsProcessing = false;
              //  $scope.alerts.push({ 'type': 'danger', 'msg': $scope.AppMessage.failure });
            });
        }
    };


    //For edit controller
    var paramId = location.search.substr(4);
    $scope.Supplier.Id = paramId;


    $scope.GetSupplierById = function () {
        $http({
            method: "GET",
            url: "/Hajj/Supplier/GetSupplierById?Id=" + (paramId)
        }).success(function (response) {
            if (response.Success) {
                $scope.Supplier = response.data;
                $scope.Supplier.TypeName = response.data.SupplierType.TypeName;
            }
        }).error(function (response) {
           // $scope.alerts.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_Warning });
        });
    };


    // It will post the form data on Server
    $scope.UpdateSupplier = function () {
        $http({
            method: "POST",
            url: "/Hajj/Supplier/UpdateSupplier",
            data: $scope.Supplier

        }).success(function (response) {
            if (response.Success) {
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.AppMessage.update });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.AppMessage.failure });
            }
            

        }).error(function (Success) {
          //  $scope.alerts.push({ 'type': 'danger', 'msg': $scope.AppMessage.failure });
        });

    };




    //=========Call The Method When Param Value is not = 0
    if (paramId != "") {
        $scope.GetSupplierById();

    }

}]);