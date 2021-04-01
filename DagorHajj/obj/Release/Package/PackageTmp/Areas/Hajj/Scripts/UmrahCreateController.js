app.controller('UmrahCreateCtrl', ['$scope', 'FileUploadService', '$http', 'appMessage', '$filter', function ($scope, FileUploadService, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.Umrah = {};
    $scope.VisitTypes = [];
    $scope.GroupLeaderList = [];
    $scope.MuharramRelationList = [];
    $scope.InitialNameList = [];
    $scope.UmrahStatusList = [];
    $scope.MuharramRelationList = [];
    $scope.DistrictList = [{ name: 'DHAKA' }, { name: 'FARIDPUR' }, { name: 'GAZIPUR' }, { name: 'GOPALGANJ' }, { name: 'JAMALPUR' },
       { name: 'KISHOREGONJ' }, { name: 'MADARIPUR' }, { name: 'MANIKGANJ' }, { name: 'MUNSHIGANJ' }, { name: 'MYMENSINGH' },
       { name: 'NARAYANGANJ' }, { name: 'NARSINGDI' }, { name: 'NETRAKONA' }, { name: 'RAJBARI' }, { name: 'SHARIATPUR' }, { name: 'SHERPUR' }, { name: 'TANGAIL' }, { name: 'BANDARBAN' }, { name: 'BRAHMANBARIA' }, { name: 'CHANDPUR' },
       { name: 'CHITTAGONG' }, { name: 'COMILLA' }, { name: 'COX’S BAZAR' }, { name: 'FENI' }, { name: 'KHAGRACHHARI' }, { name: 'LAKSHMIPUR' },
       { name: 'NOAKHALI' }, { name: 'RANGAMATI' }, { name: 'BOGRA' }, { name: 'CHAPAINABABGANJ' }, { name: 'JOYPURHAT' }, { name: 'PABNA' }, { name: 'NAOGAON' }, { name: 'NATORE' }, { name: 'RAJSHAHI' },
       { name: 'SIRAJGANJ' }, { name: 'BAGERHAT' }, { name: 'CHUADANGA' }, { name: 'JESSORE' }, { name: 'JHENAIDAH' }, { name: 'KHULNA' },
       { name: 'KUSHTIA' }, { name: 'MAGURA' }, { name: 'MEHERPUR' }, { name: 'NARAIL' }, { name: 'SATKHIRA' }, { name: 'BARGUNA' }, { name: 'BARISAL' },
       { name: 'BHOLA' }, { name: 'JHALOKATI' }, { name: 'PATUAKHALI' }, { name: 'PIROJPUR' }, { name: 'HABIGANJ' }, { name: 'MAULVIBAZAR' }, { name: 'SUNAMGANJ' }, { name: 'SYLHET' }, { name: 'DINAJPUR' }, { name: 'GAIBANDHA' },
       { name: 'KURIGRAM' }, { name: 'LALMONIRHAT' }, { name: 'NILPHAMARI' }, { name: 'PANCHAGARH' }, { name: 'RANGPUR' }, { name: 'THAKURGAON' }, ];

    $scope.alerts = [];
    $scope.IsFormSubmitted = false;
   // $scope.IsFileValid = false;
    $scope.IsFormValid = false;
    $scope.uploadData = [];
    $scope.appMessage = appMessage;
    $scope.Umrah.ID = 0;
    $scope.SupplierList = [];
    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);

    $scope.$watch("UmrahForm.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });

    $scope.SelectgroupLeader = function (Val) {

        $scope.Umrah.GroupLeaderID = Val.ID;

    }
    $scope.SelectUmrahStatus = function (Val) {

        $scope.Umrah.Status = Val.ID;

    }
    $scope.SelectSupplier = function (Val) {
        $scope.Umrah.SupplierId = Val.Id;
    }
    $scope.SelectMuharramStatus = function (Val) {

        $scope.Umrah.MuharramRelationID = Val.ID;
    }

    $scope.GetPermanentAddress = function () {

        if ($scope.chechBoxStatus == true) {
            $scope.Umrah.PermanentDistrict = $scope.Umrah.District;
            $scope.Umrah.PermanentThana = $scope.Umrah.Thana;
            $scope.Umrah.PermanentPostOffice = $scope.Umrah.PostOffice;
            $scope.Umrah.PermanentPostCode = $scope.Umrah.PostCode;
            $scope.Umrah.PermanentAddress = $scope.Umrah.PresentAddress;
        }
        else {
            $scope.Umrah.PermanentDistrict = '';
            $scope.Umrah.PermanentThana = '';
            $scope.Umrah.PermanentPostOffice = '';
            $scope.Umrah.PermanentPostCode = '';
            $scope.Umrah.PermanentAddress = '';
        }
    };
    $scope.GetAllSupplier = function () {
        $http({
            method: "GET",
            url: "/Hajj/Umrah/GetAllSupplier"
        }).success(function (response) {
            $scope.SupplierList = response;
        }).error(function () {

        });
    };

    $scope.GetAllSupplier();

    $scope.GetAllGroupLeader = function () {
        $http({
            method: "GET",
            url: "/Hajj/Umrah/GetAllGroupLeader"
        }).success(function (response) {
            $scope.GroupLeaderList = response;
        }).error(function () {

        });
    };

    $scope.GetAllGroupLeader();

    $scope.GetAllUmrahStatus = function () {
        $http({
            method: "GET",
            url: "/Hajj/Umrah/GetAllUmrahStatus"
        }).success(function (response) {
            $scope.UmrahStatusList = response;
        }).error(function () {

        });
    };

    $scope.GetAllUmrahStatus();

    $scope.GetAllMuharramRelation = function () {
        $http({
            method: "GET",
            url: "/Hajj/Umrah/GetAllMuharramRelation"
        }).success(function (response) {
            $scope.MuharramRelationList = response;
        }).error(function () {

        });
    };
    $scope.GetAllMuharramRelation();

    //$scope.GetAllMuharram = function () {

    //    $scope.MuharramRelationList.push("Own");
    //    $scope.MuharramRelationList.push("Father");
    //    $scope.MuharramRelationList.push("Mother");
    //    $scope.MuharramRelationList.push("Son");
    //    $scope.MuharramRelationList.push("Doughter");
    //}
    //$scope.GetAllMuharram();

    $scope.GetAllInitialName = function () {

        $scope.InitialNameList.push("Mr");
        $scope.InitialNameList.push("Mrs");
        $scope.InitialNameList.push("Miss");
        $scope.InitialNameList.push("Mastr");
    }

    $scope.GetAllInitialName();
    //File Select Event

    $scope.SelectPassportFile = function (file) {

        if (file[0].name) {

            $scope.CheckPassportValid(file[0]);
            if ($scope.IsPassportValid == true) {
                $scope.uploadData.push(file[0]);
                $scope.Umrah.PassportAttach = file[0].name;
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.errorMessage });
                ClearPassportForm();
            }
        }
    }
    $scope.SelectFile = function (file) {

        if (file[0].name) {

            $scope.CheckFileValid(file[0]);
            if ($scope.IsFileValid == true) {
                $scope.uploadData.push(file[0]);
                $scope.Umrah.NIDAttach = file[0].name;
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.errorMessage });
                ClearFileForm();
            }
        }
    }
    $scope.selectImageFile = function (file) {

        if (file[0].name) {

            $scope.CheckImageFileValid(file[0]);
            if ($scope.IsImageFileValid == true) {
                $scope.uploadData.push(file[0]);
                $scope.Umrah.ImageAttach = file[0].name;
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.errorMessage });
                ClearImageForm();
            }
        }
    }

    $scope.CheckImageFileValid = function (file) {

        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
            $scope.IsImageFileValid = false;
            $scope.errorMessage = "Invalid file type supplied. Valid file types are jpg, jpeg, and png."
            return;
        }
        if (file.size > (512 * 1024)) {
            $scope.IsImageFileValid = false;
            $scope.errorMessage = "Invalid file type supplied. Valid file types are jpg, jpeg, and png."
            return;
        }

        $scope.IsImageFileValid = true;
        $scope.errorMessage = "";
    };

    $scope.CheckFileValid = function (file) {

        if (file.type != 'application/pdf') {
            $scope.IsFileValid = false;
            $scope.errorMessage = "Invalid file type supplied. Valid file types are jpg, jpeg, and png."
            return;
        }
        if (file.size > (1024 * 1024)) {
            $scope.IsFileValid = false;
            $scope.errorMessage = "Invalid file type supplied. Valid file types are jpg, jpeg, and png."
            return;
        }

        $scope.IsFileValid = true;
        $scope.errorMessage = "";
    };

    $scope.CheckPassportValid = function (file) {

        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'application/pdf') {
            $scope.IsPassportValid = false;
            $scope.errorMessage = "Invalid file type supplied. Valid file types are jpg, jpeg, and png."
            return;
        }
        if (file.size > (512 * 1024)) {
            $scope.IsPassportValid = false;
            $scope.errorMessage = "Invalid file type supplied. Valid file types are jpg, jpeg, and png."
            return;
        }

        $scope.IsPassportValid = true;
        $scope.errorMessage = "";
    };

    // Clear File 

    function ClearImageForm() {
        $scope.FileDescription = "";

        angular.forEach(angular.element("input[type='file'][id='imageFile']"), function (inputElem) {
            angular.element(inputElem).val(null);
        });
        //$scope.HajjiForm.$setPristine();
        //$scope.IsFormSubmitted = false;
    }
    function ClearFileForm() {
        $scope.FileDescription = "";

        angular.forEach(angular.element("input[type='file'][id='file']"), function (inputElem) {
            angular.element(inputElem).val(null);
        });
        //$scope.HajjiForm.$setPristine();
        //$scope.IsFormSubmitted = false;
    }
    function ClearPassportForm() {
        $scope.FileDescription = "";

        angular.forEach(angular.element("input[type='file'][id='passportFile']"), function (inputElem) {
            angular.element(inputElem).val(null);
        });
        //$scope.HajjiForm.$setPristine();
        //$scope.IsFormSubmitted = false;
    }


    //===================== Save Pilimgram Data ===============

    $scope.SaveUmrahData = function () {

        if (paramId != "" || $scope.Umrah.ID > 0) {

            var passportInfo = $scope.Umrah.PassportAttach != null ? $scope.Umrah.PassportAttach.split("/") : null;
            var nidInfo = $scope.Umrah.NIDAttach != null ? $scope.Umrah.NIDAttach.split("/") : null;
            var imageInfo = $scope.Umrah.ImageAttach != null ? $scope.Umrah.ImageAttach.split("/") : null;

            if (passportInfo != null && passportInfo.length == 1) {
                $scope.Umrah.PassportAttach = passportInfo[0];
            } else if (passportInfo != null && passportInfo.length > 1) {
                var count = passportInfo.length;
                $scope.Umrah.PassportAttach = passportInfo[count - 1];

            }
            else {
                $scope.Umrah.PassportAttach = null;

            }
            if (nidInfo != null && nidInfo.length == 1) {
                $scope.Umrah.NIDAttach = nidInfo[0];
            } else if (nidInfo != null && nidInfo.length > 1) {
                var count = nidInfo.length;
                $scope.Umrah.NIDAttach = nidInfo[count - 1];

            }
            else {
                $scope.Umrah.NIDAttach = null;

            } if (imageInfo != null && imageInfo.length == 1) {
                $scope.Umrah.ImageAttach = imageInfo[0];
            } else if (imageInfo != null && imageInfo.length > 1) {
                var count = imageInfo.length;
                $scope.Umrah.ImageAttach = imageInfo[count - 1];

            }
            else {
                $scope.Umrah.ImageAttach = null;

            }
        }
        var url = "";
        if ($scope.uploadData.length > 0) {


            var uploadFile = $scope.uploadData;
            var umrah = $scope.Umrah;
            FileUploadService.UploadFile(uploadFile, umrah).then(function (response) {

                if (response.Success == true) {
                    $scope.Umrah.ID = response.Id;
                    $scope.Umrah.PassportAttach = response.model.PassportAttach;
                    $scope.Umrah.NIDAttach = response.model.NIDAttach;
                    $scope.Umrah.ImageAttach = response.model.ImageAttach;
                    $scope.submitted = false;
                    $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
                }
                else {
                    $scope.submitted = false;
                    $scope.Umrah.ID = response.Id;
                    $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
                }

                //if (paramId != "") {
                //    $scope.GetUmrahById();
                //}

            }, function (e) {
                alert(e);
            });



        }
        else {

            url = "/Hajj/Umrah/SaveUmrahData";
            $http({
                method: "POST",
                url: url,
                data: $scope.Umrah

            }).success(function (response) {

                if (response.Success == true) {

                    $scope.submitted = false;
                    $scope.Umrah.ID = response.Id;
                    $scope.Umrah.PassportAttach = response.model.PassportAttach;
                    $scope.Umrah.NIDAttach = response.model.NIDAttach;
                    $scope.Umrah.ImageAttach = response.model.ImageAttach;
                    $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
                }
                else {
                    $scope.submitted = false;
                    $scope.Umrah.ID = response.Id;
                    $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
                }


            }).error(function (response) {

                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            });
        }


    };
    $scope.GetUmrahById = function () {

        $http({

            method: "Get",
            url: "/Hajj/Umrah/GetUmrahById?id=" + paramId

        }).success(function (response) {

            $scope.Umrah = response;
            $scope.GroupLeader = response.GroupLeader;
            $scope.StatusTittle = response.StatusTittle;
            $scope.RelationWithMaharram = response.RelationWithMaharram;
            $scope.Umrah.DoB = $scope.Umrah.DoB != null ? new Date(parseInt(response.DoB.substr(6))) : null;
            $scope.Umrah.PassportExpiryDate = $scope.Umrah.PassportExpiryDate != null ? new Date(parseInt(response.PassportExpiryDate.substr(6))) : null;
            $scope.Umrah.PassportIssueDate = $scope.Umrah.PassportIssueDate != null ? new Date(parseInt(response.PassportIssueDate.substr(6))) : null;

            $scope.Umrah.FlightDate = $scope.Umrah.FlightDate != null ? new Date(parseInt(response.FlightDate.substr(6))) : null;
            $scope.Umrah.FlightArrivalDate = $scope.Umrah.FlightArrivalDate != null ? new Date(parseInt(response.FlightArrivalDate.substr(6))) : null;
            $scope.Umrah.DepartureDate = $scope.Umrah.DepartureDate != null ? new Date(parseInt(response.DepartureDate.substr(6))) : null;

            if ($scope.Umrah.SupplierId) {
                var supplier = $filter('filter')($scope.SupplierList, { Id: $scope.Umrah.SupplierId })[0];
                if (supplier != null) {
                    $scope.Umrah.PurchaseFrom = supplier.SupplierName;
                }
            }

        }).error(function (response) {
            $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
        });
    };


    if (paramId != "") {
        $scope.GetUmrahById();
    }

}])

.factory('FileUploadService', function ($http, $q) {
    var fac = {};
    fac.UploadFile = function (file, umrah) {


        var formData = new FormData();
        if (umrah.PassportAttach == null || umrah.PassportAttach == "") {
            umrah.PassportAttach = "";
        }
        if (umrah.NIDAttach == null || umrah.NIDAttach == "") {
            umrah.NIDAttach = "";
        }

        if (umrah.ImageAttach == null || umrah.ImageAttach == "") {
            umrah.ImageAttach = "";
        }
        for (var i = 0; i < file.length; i++) {
            formData.append(file[i].name, file[i]);
        }
        for (var key in umrah) {

            if ((umrah[key] != null) && (key == "DoB" || key == "PassportExpiryDate" || key == "PassportIssueDate" || key == "FlightArrivalDate" || key == "DepartureDate" || key == "FlightDate")) {
                var data = (new Date(umrah[key])).toUTCString();
                formData.append(key, data);
                continue;
            }
            if (umrah[key] != null) {
                formData.append(key, umrah[key]);
            }
        }
        var defer = $q.defer();
        $http.post("/Hajj/Umrah/SaveUmrahData", formData, {
            withCredentials: true,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity,
        })
        .success(function (response) {
            defer.resolve(response);
        })
        .error(function () {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            //defer.reject("File Upload Failed!");
        });

        return defer.promise;
    }
    return fac;
});

//var datestr = (new Date(fromDate)).toUTCString();
//formdata.append("start", datestr);