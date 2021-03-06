app.controller("NgPhrPurchaseInvoiceControllerEdit", function ($scope, $http) {

    //================= GLOBAL VARIABLE ===================

    $scope.phrPurchaseInvoice = {};
    $scope.phrPurchaseInvoiceDetails = [];
    $scope.phrPurchaseInvoiceDetail = {};
    $scope.phrPorduct = {};
    $scope.phrSupplier = {};
    $scope.alerts = [];


    // Set Invoice Id While Update this Id

    var paramId = location.search.substr(4);
    $scope.phrPurchaseInvoice.Id = paramId;

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
        $scope.phrPurchaseInvoiceDetail.ProductId = data.Id;
        $scope.phrPurchaseInvoiceDetail.ProductName = data.ProductName;
        $scope.phrPurchaseInvoiceDetail.LargeUnitPrice = data.PackMrp;
        $scope.phrPurchaseInvoiceDetail.SmallUnitPrice = data.Mrp;
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
        $scope.phrPurchaseInvoice.SupplierId = data.Id;
    };



    $scope.GetPurchaseInvoiceById = function () {

        $http({
            method: "POST",
            url: "/PhrPurchaseInvoice/GetPurchaseInvoiceById?Id=" + ($scope.phrPurchaseInvoice.Id)

        }).success(function mySucces(response) {

            if (response.PhrPurchaseInvoice.GRDate != null && response.PhrPurchaseInvoice.GRDate.length > 5) {
                var value = new Date(parseInt(response.PhrPurchaseInvoice.GRDate.substr(6)));
                var date = value.getDate() + "-" + parseInt(value.getMonth() + 1) + "-" + value.getFullYear();
                response.PhrPurchaseInvoice.GRDate = date;
            }

            $scope.phrPurchaseInvoice = response.PhrPurchaseInvoice;
            
            $scope.phrPurchaseInvoiceDetails = response.PhrPurchaseInvoice.PhrPurchaseInvoiceDetail;

            $scope.grno = $scope.phrPurchaseInvoice.GRNO;
            $scope.phrSupplier.SupplierName = $scope.phrPurchaseInvoice.SupplierName;


        }).error(function myError(response) {
            alert(response);
        });

    };


    //User add purchase invoice detail into table
    $scope.AddNew = function () {

        var matches = true;

        // Make sure user hasnt already added this item
        angular.forEach($scope.phrPurchaseInvoiceDetails, function (item) {
            if ($scope.phrPurchaseInvoiceDetail.ProductId === item.ProductId) {
                matches = false;
                $scope.alerts.push({ 'type': 'info', 'msg': 'You have already selected to withdraw this item!' });
            }
        });

        if (matches != false && $scope.phrPurchaseInvoiceDetail.ProductId != '' && $scope.phrPurchaseInvoiceDetail.ProductId != null) {
            $scope.phrPurchaseInvoiceDetails.push({
                'ProductId': $scope.phrPurchaseInvoiceDetail.ProductId,
                'ProductName': $scope.phrPurchaseInvoiceDetail.ProductName,
                'LargeUnitQty': $scope.phrPurchaseInvoiceDetail.LargeUnitQty,
                'LargeUnitPrice': $scope.phrPurchaseInvoiceDetail.LargeUnitPrice,
                'SmallUnitQty': $scope.phrPurchaseInvoiceDetail.SmallUnitQty,
                'SmallUnitPrice': $scope.phrPurchaseInvoiceDetail.SmallUnitPrice,
                'VatAmount': $scope.phrPurchaseInvoiceDetail.VatAmount,
                'VatPercentage': $scope.phrPurchaseInvoiceDetail.VatPercentage,
                'DiscountAmount': $scope.phrPurchaseInvoiceDetail.DiscountAmount,
                'LineTotal': $scope.phrPurchaseInvoiceDetail.LineTotal
            });

            $scope.phrPurchaseInvoiceDetail.ProductId = '';
            $scope.phrPurchaseInvoiceDetail.LargeUnitQty = '';
            $scope.phrPurchaseInvoiceDetail.LargeUnitPrice = '';
            $scope.phrPurchaseInvoiceDetail.SmallUnitQty = '';
            $scope.phrPurchaseInvoiceDetail.SmallUnitPrice = '';
            $scope.phrPurchaseInvoiceDetail.VatAmount = '';
            $scope.phrPurchaseInvoiceDetail.VatPercentage = '';
            $scope.phrPurchaseInvoiceDetail.DiscountAmount = '';
            $scope.phrPurchaseInvoiceDetail.LineTotal = '';
            $scope.phrPorduct.ProductName = '';
        }

        $scope.phrPurchaseInvoice.TotalTP = $scope.calculateTotal();

    };

    $scope.Edit = function (val) {
        var index = $scope.phrPurchaseInvoiceDetails.indexOf(val);
        $scope.phrPurchaseInvoiceDetails.splice(index, 1);
        $scope.phrPurchaseInvoiceDetail = val;
        $scope.phrPorduct.ProductName = $scope.phrPurchaseInvoiceDetail.ProductName;

        $scope.phrPurchaseInvoice.TotalTP = $scope.calculateTotal();

    };

    $scope.Delete = function (val) {
        var index = $scope.phrPurchaseInvoiceDetails.indexOf(val);
        $scope.phrPurchaseInvoiceDetails.splice(index, 1);
        $scope.phrPurchaseInvoice.TotalTP = $scope.calculateTotal();
    };


    // It will post the form data on Server
    $scope.SavePurchaseInvoice = function () {
        $scope.phrPurchaseInvoice.PhrPurchaseInvoiceDetail = $scope.phrPurchaseInvoiceDetails;

        $http({
            method: "POST",
            url: "/PhrPurchaseInvoice/SavePurchaseInvoice",
            data: $scope.phrPurchaseInvoice

        }).success(function mySucces(response) {
            $scope.alerts.push({ 'type': 'success', 'msg': 'Data Updated Successfully.' });
            $scope.ClearForm();
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data Saving Failure!.' });
        });
    };


    // Calculate Total amount for table Line Items
    $scope.calculateTotal = function () {
        var count = 0;
        angular.forEach($scope.phrPurchaseInvoiceDetails, function (item) {

            count += (item.SmallUnitQty * item.SmallUnitPrice);
        });
        return count;
    };

    // clear all input and textarea fields in a form
    $scope.ClearForm = function () {
        $scope.phrPurchaseInvoice = {};
        $scope.phrPurchaseInvoiceDetails = [];
        $scope.phrSupplier = {};
        $scope.grno = '';
    };


    // get Max Goods received number by current year
    $scope.GetGRNO = function () {
        $http({
            method: "POST",
            url: "/PhrPurchaseInvoice/GetGRNO"
        }).success(function mySucces(response) {

            $scope.grno = response;

        }).error(function myError(response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': 'Error occured while fetching data from database!.' });
        });
    };

    $scope.GetStores();
    

    //=========Call The Method When Param Value is not = 0
    if (paramId != "") {
        $scope.GetPurchaseInvoiceById();

    }

 


});