app.controller("NgPhrProductControllerCreate", function ($scope, $http) {

    

    //=======================Global Variable==================
   
    $scope.PhrProduct = {};
    $scope.PhrProductGeneric = {};
    $scope.PhrProductGroup = {};
    $scope.PhrPorductOrigin = {};
    $scope.PhrProductManufacturer = {};
    $scope.PhrProductType = {};
    $scope.StoreLocations = ["A", "B", "C", "D"];

    $scope.messageShowMessage = false;
    $scope.messageShowError = false;
    $scope.successStatus = null;
    $scope.errors = [];
    $scope.alerts = [];
    var paramId = location.search.substr(4);
    

    //============================TypeAhead==================

    //----------ProductGeneric-----------------------
    $scope.getProductGenerics = function (val) {

        return $http.get('/PhrProduct/FindProductGenericByName', {
            params: {
                genericName: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
    };   
    $scope.SetGenericNameId = function (data) {
        $scope.PhrProduct.ProductGenericId = data.Id;

    }

    //-----------ProductOrigin----------------
    $scope.getProductOrigins = function (val) {

        return $http.get('/PhrProduct/FindProductOriginByOriginName', {
            params: {
                originName: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
    };
    $scope.SetProductOriginId = function (data) {
        $scope.PhrProduct.OriginId = data.Id;      

    }

    //-----------ProductGroup----------------
    $scope.getProductGroups = function (val) {

        return $http.get('/PhrProduct/FindProductGroupByGroupName', {
            params: {
                groupName: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
    };
    $scope.SetProductGroupId = function (data) {
        $scope.PhrProduct.ProductGroupId = data.Id;       

    }

    //-----------ProductGroup----------------
    $scope.getProductManufacturers = function (val) {

        return $http.get('/PhrProduct/FindProductManufacturerByManufacturerName', {
            params: {
                manufacturerName: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
    };
    $scope.SetProductManufacturerId = function (data) {
        $scope.PhrProduct.ProductManufecturerId = data.Id;

    }

    //-----------ProductGroup----------------
    $scope.getProductTypes = function (val) {

        return $http.get('/PhrProduct/FindProductTypeByProductTypeName', {
            params: {
                typeName: encodeURIComponent(val),
                sensor: false
            }
        }).then(function (response) {

            return response.data.map(function (item) {
                return item;
            });
        });
    };
    $scope.SetProductTypeId = function (data) {
        $scope.PhrProduct.ProductTypeId = data.Id;

    }
    
    //======================End TypeAhead===============



    //=================SAVE UPDATE============================
    $scope.saveProduct = function () {

        $http({
            method: "POST",
            url: "/PhrProduct/SaveUpdateProduct",
            data: $scope.PhrProduct

        }).success(function mySucces(response) {

            $scope.alerts.push({ 'type': 'success', 'msg': 'Record created Successfully.' });
            $scope.PhrProduct = {};
            //$scope.GetSamples();

        }).error(function myError(response) {


          
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data saving failure.' });

        });
    }


    //==================UTIL METHODS============

    


    $scope.GetProductById = function () {

        $http({
            method: "POST",
            url: "/PhrProduct/GetProductById?Id=" + paramId


        }).success(function mySucces(response) {
            
           
            $scope.PhrProduct = response;            
             
            $scope.PhrProductGeneric.GenericName = $scope.PhrProduct.ProductGenericName;
            $scope.PhrProductGroup.GroupName = $scope.PhrProduct.ProductGroupName;
            $scope.PhrPorductOrigin.OriginName = $scope.PhrProduct.OriginName;
            $scope.PhrProductManufacturer.ManufacturerName = $scope.PhrProduct.ProductManufecturerName;
            $scope.PhrProductType.TypeName = $scope.PhrProduct.ProductTypeName;

            

        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    }

   
    
    $scope.DeleteSample = function (data) {
        $scope.Sample = data;


    }

    
    //====================ALERT=======================      


    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    
    
    //=========Call The Method When Param Value is not = 0
    if ( paramId != "")
    {
        $scope.GetProductById();

    }




    


   

})