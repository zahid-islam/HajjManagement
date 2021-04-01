app.controller("NgPhrPurchaseInvoiceReturnControllerEdit", function ($scope, $http) {


    //================= GLOBAL VARIABLE ===================

    $scope.phrPurchaseInvoiceReturn = {};
    $scope.phrPurchaseInvoiceReturnDetails = [];
    $scope.phrPurchaseInvoiceReturnDetail = {};

    $scope.phrProduct = {};
    $scope.phrProducts = [];
    $scope.phrSupplier = {};
    $scope.stores = [];
    $scope.alerts = [];



    // Set Invoice Id While Update this Id

    var paramId = location.search.substr(4);
    $scope.phrPurchaseInvoiceReturn.Id = paramId;


    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.GetPurchaseInvoiceReturnById = function () {

        $http({
            method: "POST",
            url: "/PhrPurchaseInvoiceReturn/GetPurchaseInvoiceReturnById?Id=" + ($scope.phrPurchaseInvoiceReturn.Id)

        }).success(function mySucces(response) {

            if (response.PhrPurchaseInvoiceReturn.ReturnDate != null && response.PhrPurchaseInvoiceReturn.ReturnDate.length > 5) {

                var value = new Date(parseInt(response.PhrPurchaseInvoiceReturn.ReturnDate.substr(6)));
                var date = value.getDate() + "-" + parseInt(value.getMonth() + 1) + "-" + value.getFullYear();
                response.PhrPurchaseInvoiceReturn.ReturnDate = date;
            };
            
            $scope.phrPurchaseInvoiceReturn = response.PhrPurchaseInvoiceReturn;
            $scope.phrPurchaseInvoiceReturnDetails = response.PhrPurchaseInvoiceReturn.PhrPurchaseInvoiceReturnDetail;
            $scope.phrSupplier.SupplierName = $scope.phrPurchaseInvoiceReturn.SupplierName;

            $scope.GetProductsByPurchaseInvoiceChallanNoAndSupplierId($scope.phrPurchaseInvoiceReturn.ChallanNo, $scope.phrPurchaseInvoiceReturn.SupplierId);

        }).error(function myError(response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': 'Featching Data Failure!.' });

        });

    };


    $scope.GetProductsByPurchaseInvoiceChallanNoAndSupplierId = function (paramOne, paramTwo) {

        $http({
            method: "POST",
            url: "/PhrPurchaseInvoice/GetProductsByPurchaseInvoiceChallanNoAndSupplierId?challanNo=" + (paramOne) + "&supplierId=" + (paramTwo)

        }).success(function mySucces(response) {

            $scope.phrProducts = response;

        }).error(function myError(response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': 'Featching Data Failure!.' });

        });

    };



    //=================COMBO DATA============

    //================ STORES =================

    $scope.GetStores = function () {

        $http({
            method: "POST",
            url: "/PhrStore/GetStores"

        }).success(function mySucces(response) {

            $scope.stores = response;

        }).error(function myError(response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': 'Featching Data Failure!.' });

        });
    }



    // =================== CASCADE COMBO  PRODUCT ======================

    $scope.GetProductsByPurchaseInvoiceId = function (val) {

        $http({
            method: "POST",
            url: "/PhrPurchaseInvoice/GetProductsByPurchaseInvoiceId?Id=" + (val.Value)

        }).success(function mySucces(response) {

            $scope.phrProducts = response;

        }).error(function myError(response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': 'Featching Data Failure!.' });

        });

    };


  


    

    //============= TypeAhead ==============================

    // =================== Challan Number ==================

    $scope.GetChallanNumbers = function (val) {
        return $http.get('/PhrPurchaseInvoice/FindPurchaseInvoicesChallanByChallanNo', {
            params: {
                challanNo: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
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
        
        $scope.phrPurchaseInvoiceReturn.SupplierId = data.Id;
    };


    //User add purchase invoice detail item into table
    $scope.AddNew = function () {

        var matches = true;

        // Make sure user hasnt already added this item
        angular.forEach($scope.phrPurchaseInvoiceReturnDetails, function (item) {
            if ($scope.phrPurchaseInvoiceReturnDetail.ProductId === item.ProductId) {
                matches = false;
                $scope.alerts.push({ 'type': 'info', 'msg': 'You have already selected to withdraw this item!' });
            }
        });

        if (matches != false && $scope.phrPurchaseInvoiceReturnDetail.ProductId != '' && $scope.phrPurchaseInvoiceReturnDetail.ProductId != null) {
            $scope.phrPurchaseInvoiceReturnDetails.push({
                'ProductId': $scope.phrPurchaseInvoiceReturnDetail.ProductId,
                'ProductName': $scope.phrPurchaseInvoiceReturnDetail.ProductName,
                'LargeUnitQty': $scope.phrPurchaseInvoiceReturnDetail.LargeUnitQty,
                'LargeUnitPrice': $scope.phrPurchaseInvoiceReturnDetail.LargeUnitPrice,
                'SmallUnitQty': $scope.phrPurchaseInvoiceReturnDetail.SmallUnitQty,
                'SmallUnitPrice': $scope.phrPurchaseInvoiceReturnDetail.SmallUnitPrice,
                'VatAmount': $scope.phrPurchaseInvoiceReturnDetail.VatAmount,
                'VatPercentage': $scope.phrPurchaseInvoiceReturnDetail.VatPercentage,
                'LineTotal': $scope.phrPurchaseInvoiceReturnDetail.LineTotal
            });

            $scope.phrPurchaseInvoiceReturnDetail.ProductId = '';
            $scope.phrPurchaseInvoiceReturnDetail.LargeUnitQty = '';
            $scope.phrPurchaseInvoiceReturnDetail.LargeUnitPrice = '';
            $scope.phrPurchaseInvoiceReturnDetail.SmallUnitQty = '';
            $scope.phrPurchaseInvoiceReturnDetail.SmallUnitPrice = '';
            $scope.phrPurchaseInvoiceReturnDetail.VatAmount = '';
            $scope.phrPurchaseInvoiceReturnDetail.VatPercentage = '';
            $scope.phrProduct.ProductName = '';

            $scope.phrPurchaseInvoiceReturn.TotalTP = $scope.calculateTotal();

        };
    };

    $scope.Edit = function (val) {

        var index = $scope.phrPurchaseInvoiceReturnDetails.indexOf(val);
        $scope.phrPurchaseInvoiceReturnDetails.splice(index, 1);
        $scope.phrPurchaseInvoiceReturnDetail = val;

        $scope.phrProduct = val;
        

       $scope.phrPurchaseInvoiceReturn.TotalTP =  $scope.calculateTotal();

    };

    $scope.SetProductData = function (data) {

        $scope.phrPurchaseInvoiceReturnDetail.ProductId = data.ProductId;
        $scope.phrPurchaseInvoiceReturnDetail.ProductName = data.ProductName;
        $scope.phrPurchaseInvoiceReturnDetail.LargeUnitQty = data.LargeUnitQty;
        $scope.phrPurchaseInvoiceReturnDetail.LargeUnitPrice = data.LargeUnitPrice;
        $scope.phrPurchaseInvoiceReturnDetail.SmallUnitQty = data.SmallUnitQty;
        $scope.phrPurchaseInvoiceReturnDetail.SmallUnitPrice = data.SmallUnitPrice;
        $scope.phrPurchaseInvoiceReturnDetail.VatAmount = data.VatAmount;
        $scope.phrPurchaseInvoiceReturnDetail.VatPercentage = data.VatPercentage;
    };


    $scope.Delete = function (val) {
        var index = $scope.phrPurchaseInvoiceReturnDetails.indexOf(val);
        $scope.phrPurchaseInvoiceReturnDetails.splice(index, 1);
        $scope.phrPurchaseInvoiceReturn.TotalTP =  $scope.calculateTotal();
    };


    // It will post the form data on Server
    $scope.SavePurchaseInvoiceReturn = function () {

        $scope.phrPurchaseInvoiceReturn.PhrPurchaseInvoiceReturnDetail = $scope.phrPurchaseInvoiceReturnDetails;

        $http({
            method: "POST",
            url: "/PhrPurchaseInvoiceReturn/SavePurchaseInvoiceReturn",
            data: $scope.phrPurchaseInvoiceReturn

        }).success(function mySucces(response) {
            $scope.alerts.push({ 'type': 'success', 'msg': 'Data Inserted Successfully.' });
            $scope.ClearForm();
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data Saving Failure!.' });
        });
    };


    // Calculate Total amount for table Line Items
    $scope.calculateTotal = function () {
        var count = 0;
        angular.forEach($scope.phrPurchaseInvoiceReturnDetails, function (item) {

            count += (item.SmallUnitQty * item.SmallUnitPrice);
        });
        
       return count;
    };

    // clear all input and textarea fields in a form
    $scope.ClearForm = function () {
        $scope.phrPurchaseInvoiceReturn = {};
        $scope.phrPurchaseInvoiceReturnDetails = [];
        $scope.phrSupplier = {};
    };

    $scope.GetStores();

    //=========Call The Method When Param Value is not = 0
    if (paramId != "") {
        $scope.GetPurchaseInvoiceReturnById();
    };

    

});