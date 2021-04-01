app.controller("NgPhrSalesInvoiceControllerCreate", function ($scope, $http) {


    //================= GLOBAL VARIABLE ===================    
    //----------List---------------
    $scope.PhrSalesInvoiceTypes = [];
    $scope.PhrSalesInvoiceDetails = [];
     

    //----------Singel Object------
    $scope.PhrSalesInvoice = {};
    $scope.IpdPatient = {};
    $scope.PhrProduct = {};
    $scope.PhrSalesInvoiceDetail = {};

    //---------Other Variables-----------
    $scope.Quantity = "";
    $scope.Vat = 0;
    $scope.Discount = 0;
    $scope.TotalDeduction = 0;
    $scope.LineTotal = 0;
    $scope.alerts = [];

    //================SAVE METHOD====
    
    $scope.saveSalesInvoice = function () {

        $http({
            method: "POST",
            url: "/PhrSalesInvoice/SaveSalesInvoice",
            data: $scope.PhrSalesInvoice

        }).success(function mySucces(response) {

           
            $scope.alerts.push({ 'type': 'success', 'msg': 'Record created Successfully.' });
            $scope.Sample = {};
            $scope.GetSamples();

        }).error(function myError(response) {
           
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data saving failure.' });

        });
    }
    //=================COMBO DATA============
    $scope.GetInvoiceTypes = function () {
        
        $http({
            method: "POST",
            url: "/PhrSalesInvoice/PhrInvoiceData"

        }).success(function mySucces(response) {
            
            $scope.PhrSalesInvoiceTypes = response.invoiceTypeList;
            $scope.PhrSalesInvoice.InvoiceDate = new Date();
            
        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    }

  
    
    //=============TYPE AHEAD====================
    //------------Patient----------------------
    $scope.GetPatients = function (val) {

        
        return $http.get('/PhrSalesInvoice/GetPatientByPatientId', {
            params: {
                patientId: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
    };
    $scope.SetPatientId = function (data) {
        $scope.IpdPatient = data;
        $scope.PhrSalesInvoice.PatientId = data.Id;

       
    

    }


    //------------Products----------------------
    $scope.GetProducts = function (val) {

        return $http.get('/PhrSalesInvoice/GetProductByProductName', {
            params: {
                productName: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
    };
    $scope.SetProduct = function (data)
    {
        $scope.PhrProduct = data;




    }

    //==============KEY PRESS EVENT===========
    $scope.myFunct = function (keyEvent) {
        
        
        if (keyEvent.which === 97) {
            
            $scope.PhrSalesInvoiceDetail = {};
            $scope.PhrSalesInvoiceDetail.ProductId = $scope.PhrProduct.Id;
            $scope.PhrSalesInvoiceDetail.Quantity = $scope.Quantity;
            $scope.PhrSalesInvoiceDetail.ItemTotal = $scope.Quantity * $scope.PhrProduct.Mrp;
            $scope.PhrSalesInvoiceDetail.ProductName = $scope.PhrProduct.ProductName;
            $scope.PhrSalesInvoiceDetail.Mrp = $scope.PhrProduct.Mrp;
            $scope.PhrSalesInvoiceDetail.Uom = $scope.PhrProduct.Uom;           

            $scope.PhrSalesInvoiceDetails.push($scope.PhrSalesInvoiceDetail);


            //Calculation
            $scope.LineTotal = $scope.LineTotal + $scope.PhrSalesInvoiceDetail.ItemTotal;            
            $scope.PhrSalesInvoice.TotalAmount = $scope.LineTotal;
            $scope.TotalDeduction = $scope.Vat + $scope.Discount;
            $scope.PhrSalesInvoice.GrandTotalAmount = $scope.PhrSalesInvoice.TotalAmount - $scope.TotalDeduction;
            $scope.PhrSalesInvoice.PhrSalesInvoiceDetail = $scope.PhrSalesInvoiceDetails;
            
        }
           

    }
    //==============OTHER METHODS=============

    $scope.RemoveInvoiceDetail = function (data) {
       
        var i = $scope.PhrSalesInvoiceDetails.indexOf(data);
        if (i != -1) {
            $scope.PhrSalesInvoiceDetails.splice(i, 1);
        }

        $scope.PhrSalesInvoice.TotalAmount = $scope.PhrSalesInvoice.TotalAmount - data.ItemTotal;
        $scope.PhrSalesInvoice.GrandTotalAmount = $scope.PhrSalesInvoice.TotalAmount - $scope.TotalDeduction;

    }

    //====================ALERT=======================      


    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


    


    //==========================VALIDATION METHODS=========================
    $scope.IsReadOnly = false;

    $scope.EnableDisablePatient = function () {


        if ($scope.PhrSalesInvoice.InvoiceTypeId == 1) {
            $scope.IsReadOnly = false;
        }
        else
        {
            $scope.IsReadOnly = true;
            $scope.IpdPatient.Id = "";
            $scope.IpdPatient.PatientName = "";
            $scope.IpdPatient.CabinName = "";
        }
    }


    //===============METHOD CALLS=================

    $scope.GetInvoiceTypes();
   

});