app.controller("NgPhrPurchaseOrderControllerEdit", function ($scope, $http) {

    //================= GLOBAL VARIABLE ===================

    $scope.phrPurchaseOrder = {};
    $scope.phrPurchaseOrderDetails = [];
    $scope.phrPurchaseOrderDetail = {};
    $scope.phrProduct = {};
    $scope.phrSupplier = {};
    $scope.alerts = [];


    // Set Order Id While Update this Id

    var paramId = location.search.substr(4);
    $scope.phrPurchaseOrder.Id = paramId;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


    //=================COMBO DATA============
    $scope.GetStores = function () {

        $http({
            method: "POST",
            url: "/PhrStore/GetStores"

        }).success(function mySucces(response) {

            $scope.stores = response;

        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    }

    //============= TypeAhead ==============================


    //============== Product ===============================
    $scope.GetProducts = function (val) {
        return $http.get('/PhrProduct/FindProductByName', {
            params: {
                name: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
    };

    $scope.SetProductId = function (data) {
        $scope.phrPurchaseOrderDetail.ProductId = data.Id;
        $scope.phrPurchaseOrderDetail.ProductName = data.ProductName;
        $scope.phrPurchaseOrderDetail.OrderUnit = data.PackUnit;
        $scope.phrPurchaseOrderDetail.PackSize = data.PackSize;
    };


    //===================== Supplier ============================

    $scope.GetSuppliers = function (val) {
        return $http.get('/PhrSupplier/FindAllSupplierByName', {
            params: {
                name: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
    };

    $scope.SetSupplierId = function (data) {
        $scope.phrPurchaseOrder.SupplierId = data.Id;
    };



    $scope.GetPurchaseOrderById = function () {

        $http({
            method: "POST",
            url: "/PhrPurchaseOrder/GetPurchaseOrderById?Id=" + ($scope.phrPurchaseOrder.Id)

        }).success(function mySucces(response) {

            if (response.PhrPurchaseOrder.OrderDate != null && response.PhrPurchaseOrder.OrderDate.length > 5) {
                var value = new Date(parseInt(response.PhrPurchaseOrder.OrderDate.substr(6)));
                var date = value.getDate() + "-" + parseInt(value.getMonth() + 1) + "-" + value.getFullYear();
                response.PhrPurchaseOrder.OrderDate = date;
            }

            if (response.PhrPurchaseOrder.DeliveryDate != null && response.PhrPurchaseOrder.DeliveryDate.length > 5) {
                var value = new Date(parseInt(response.PhrPurchaseOrder.DeliveryDate.substr(6)));
                var date = value.getDate() + "-" + parseInt(value.getMonth() + 1) + "-" + value.getFullYear();
                response.PhrPurchaseOrder.DeliveryDate = date;
            }

            $scope.phrPurchaseOrder = response.PhrPurchaseOrder;

            $scope.phrPurchaseOrderDetails = response.PhrPurchaseOrder.PhrPurchaseOrderDetail;

            $scope.phrSupplier.SupplierName = $scope.phrPurchaseOrder.SupplierName;


        }).error(function myError(response) {
            alert(response);
        });

    };


    //User add purchase Order detail into table
    $scope.AddNew = function () {

        var matches = true;

        // Make sure user hasnt already added this item
        angular.forEach($scope.phrPurchaseOrderDetails, function (item) {
            if ($scope.phrPurchaseOrderDetail.ProductId === item.ProductId) {
                matches = false;
                $scope.alerts.push({ 'type': 'info', 'msg': 'You have already selected to withdraw this item!' });
            }
        });

        if (matches != false && $scope.phrPurchaseOrderDetail.ProductId != '' && $scope.phrPurchaseOrderDetail.ProductId != null) {
            $scope.phrPurchaseOrderDetails.push({
                'ProductId': $scope.phrPurchaseOrderDetail.ProductId,
                'ProductName': $scope.phrPurchaseOrderDetail.ProductName,
                'OrderQty': $scope.phrPurchaseOrderDetail.OrderQty,
                'OrderUnit': $scope.phrPurchaseOrderDetail.OrderUnit,
                'PackSize': $scope.phrPurchaseOrderDetail.PackSize,
                'CurrentStock': $scope.phrPurchaseOrderDetail.CurrentStock,
                'CurrentSoldQty': $scope.phrPurchaseOrderDetail.CurrentSoldQty
            });

            $scope.phrPurchaseOrderDetail.ProductId = '';
            $scope.phrPurchaseOrderDetail.OrderQty = '';
            $scope.phrPurchaseOrderDetail.OrderUnit = '';
            $scope.phrPurchaseOrderDetail.PackSize = '';
            $scope.phrPurchaseOrderDetail.CurrentStock = '';
            $scope.phrPurchaseOrderDetail.CurrentSoldQty = '';
            $scope.phrProduct.ProductName = '';
        }


    };

    $scope.Edit = function (val) {
        var index = $scope.phrPurchaseOrderDetails.indexOf(val);
        $scope.phrPurchaseOrderDetails.splice(index, 1);
        $scope.phrPurchaseOrderDetail = val;
        $scope.phrPorduct.ProductName = $scope.phrPurchaseOrderDetail.ProductName;

    };

    $scope.Delete = function (val) {
        var index = $scope.phrPurchaseOrderDetails.indexOf(val);
        $scope.phrPurchaseOrderDetails.splice(index, 1);
    };


    // It will post the form data on Server
    $scope.SavePurchaseOrder = function () {
        $scope.phrPurchaseOrder.PhrPurchaseOrderDetail = $scope.phrPurchaseOrderDetails;

        $http({
            method: "POST",
            url: "/PhrPurchaseOrder/SavePurchaseOrder",
            data: $scope.phrPurchaseOrder

        }).success(function mySucces(response) {
            $scope.alerts.push({ 'type': 'success', 'msg': 'Data Updated Successfully.' });
            $scope.ClearForm();
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data Saving Failure!.' });
        });
    };


    // clear all input and textarea fields in a form
    $scope.ClearForm = function () {
        $scope.phrPurchaseOrder = {};
        $scope.phrPurchaseOrderDetails = [];
        $scope.phrSupplier = {};
        
    };



    $scope.GetStores();


    //=========Call The Method When Param Value is not = 0
    if (paramId != "") {
        $scope.GetPurchaseOrderById();

    }




});