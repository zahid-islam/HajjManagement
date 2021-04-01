app.controller('HajjiCreateCtrl', ['$scope', 'FileUploadService', '$http', 'appMessage', '$filter', function ($scope, FileUploadService, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.Hajji = {};
    $scope.GroupLeaderList = [];
    $scope.MuharramRelationList = [];
    $scope.InitialNameList = [];
    $scope.HajjYearList = [];
    $scope.HajjiStatusList = [];  
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
    //$scope.IsFileValid = false;
    $scope.IsFormValid = false;
    $scope.uploadData = [];
    $scope.appMessage = appMessage;
    $scope.Hajji.ID = 0;

    //=========================== Alerts ==================
    $scope.$watch("HajjiForm.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });

    $scope.GetPermanentAddress = function () {

        if ($scope.chechBoxStatus == true) {
            $scope.Hajji.PermanentDistrict = $scope.Hajji.District;
            $scope.Hajji.PermanentThana = $scope.Hajji.Thana;
            $scope.Hajji.PermanentPostOffice = $scope.Hajji.PostOffice;
            $scope.Hajji.PermanentPostCode = $scope.Hajji.PostCode;
            $scope.Hajji.PermanentAddress = $scope.Hajji.PresentAddress;
        }
        else {
            $scope.Hajji.PermanentDistrict = '';
            $scope.Hajji.PermanentThana = '';
            $scope.Hajji.PermanentPostOffice = '';
            $scope.Hajji.PermanentPostCode = '';
            $scope.Hajji.PermanentAddress = '';
        }
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);

    $scope.GetAllGroupLeader = function () {
        $http({
            method: "GET",
            url: "/Hajj/Hajji/GetAllGroupLeader"
        }).success(function (response) {
            $scope.GroupLeaderList = response;
        }).error(function () {

        });
    };
     $scope.GetAllGroupLeader();

     $scope.GetAllHajjiStatus = function () {
        $http({
            method: "GET",
            url: "/Hajj/Hajji/GetAllHajjiStatus"
        }).success(function (response) {
            $scope.HajjiStatusList = response;
        }).error(function () {

        });
    };

     $scope.GetAllHajjiStatus();

     $scope.GetAllMuharramRelation = function () {
         $http({
             method: "GET",
             url: "/Hajj/Hajji/GetAllMuharramRelation"
         }).success(function (response) {
             $scope.MuharramRelationList = response;
         }).error(function () {

         });
     };
     $scope.GetAllMuharramRelation();

    $scope.SelectgroupLeader = function (Val) {

        $scope.Hajji.GroupLeaderID = Val.ID;

    }
    $scope.SelectHajjiStatus = function (Val) {

        $scope.Hajji.Status = Val.ID;

    }
    $scope.SelectMuharramStatus = function (Val) {

        $scope.Hajji.MuharramRelationID = Val.ID;

      }
      
    $scope.GetAllInitialName = function () {

        $scope.InitialNameList.push("Mr");
        $scope.InitialNameList.push("Mrs");
        $scope.InitialNameList.push("Miss");
        $scope.InitialNameList.push("Mastr");
    }

    $scope.GetAllInitialName();

    $scope.GetHajjTenYear = function () {

        var currentYear = (new Date()).getFullYear();
        for (var i = 0; i < 10; i++) {
            var data = { Year: currentYear + i };
            $scope.HajjYearList.push(data);
        }
    }
    $scope.GetHajjTenYear();

    //File Select Event

    //File Select Event
    $scope.SelectPassportFile = function (file) {

        if (file[0].name) {

            $scope.CheckPassportValid(file[0]);
            if ($scope.IsPassportValid == true) {
                $scope.uploadData.push(file[0]);
                $scope.Hajji.PassportAttach = file[0].name;
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
                $scope.Hajji.NIDAttach = file[0].name;
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.errorMessage });
                ClearFileForm();
            }
        }
    }
    $scope.SelectImageFile = function (file) {

        if (file[0].name) {

            $scope.CheckImageFileValid(file[0]);
            if ($scope.IsImageFileValid == true) {
                $scope.uploadData.push(file[0]);
                $scope.Hajji.ImageAttach = file[0].name;
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

        //if (file.type != 'application/pdf') {
        //    $scope.IsFileValid = false;
        //    $scope.errorMessage = "Invalid file type supplied. Valid file types are jpg, jpeg, and png."
        //    return;
        //}
        if (file.size > (1024 * 1024)) {
            $scope.IsFileValid = false;
            $scope.errorMessage = "Attach File is invalid. Maximum supported file size is 1MB"
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

   
    //Clear Form
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

    $scope.SaveHajjiData = function () {

        if (paramId != "" || $scope.Hajji.ID > 0) {

            var passportInfo = $scope.Hajji.PassportAttach != null ? $scope.Hajji.PassportAttach.split("/") : null;
            var nidInfo = $scope.Hajji.NIDAttach != null ? $scope.Hajji.NIDAttach.split("/") : null;
            var imageInfo = $scope.Hajji.ImageAttach != null ? $scope.Hajji.ImageAttach.split("/") : null;

            if (passportInfo != null && passportInfo.length == 1) {
                $scope.Hajji.PassportAttach = passportInfo[0];
            } else if (passportInfo != null && passportInfo.length > 1) {
                var count = passportInfo.length;
                $scope.Hajji.PassportAttach = passportInfo[count - 1];

            }
            else {
                $scope.Hajji.PassportAttach = null;

            }
            if (nidInfo != null && nidInfo.length == 1) {
                $scope.Hajji.NIDAttach = nidInfo[0];
            } else if (nidInfo != null && nidInfo.length > 1) {
                var count = nidInfo.length;
                $scope.Hajji.NIDAttach = nidInfo[count - 1];

            }
            else {
                $scope.Hajji.NIDAttach = null;

            } if (imageInfo != null && imageInfo.length == 1) {
                $scope.Hajji.ImageAttach = imageInfo[0];
            } else if (imageInfo != null && imageInfo.length > 1) {
                var count = imageInfo.length;
                $scope.Hajji.ImageAttach = imageInfo[count - 1];

            }
            else {
                $scope.Hajji.ImageAttach = null;

            }
        }

        var url = "";
        if ($scope.uploadData.length > 0) {
           
                var uploadFile = $scope.uploadData;
                var hajji = $scope.Hajji;
                FileUploadService.UploadFile(uploadFile, hajji).then(function (response) {
                    if (response.Success == true) {

                        $scope.Hajji.ID = response.Id;
                        $scope.Hajji.PassportAttach = response.model.PassportAttach;
                        $scope.Hajji.NIDAttach = response.model.NIDAttach;
                        $scope.Hajji.ImageAttach = response.model.ImageAttach;
                        $scope.submitted = false;
                        $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
                    }
                    else {
                        $scope.submitted = false;
                        $scope.Hajji.ID = response.Id;
                        $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
                    }
                  

                }, function (e) {
                    alert(e);
                });
          
        }
        else {

            url = "/Hajj/Hajji/SaveHajjiData";
            $http({
                method: "POST",
                url: url,
                data: $scope.Hajji

            }).success(function (response) {
                if (response.Success == true) {

                    $scope.Hajji.ID = response.Id;
                    $scope.submitted = false;
                    $scope.Hajji.PassportAttach = response.model.PassportAttach;
                    $scope.Hajji.NIDAttach = response.model.NIDAttach;
                    $scope.Hajji.ImageAttach = response.model.ImageAttach;
                    $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
                }
                else {
                    $scope.submitted = false;
                    $scope.Hajji.ID = response.Id;
                    $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
                }
            }).error(function () {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            });
        }
    };

    $scope.GetHajjiById = function () {

        $http({

            method: "Get",
            url: "/Hajj/Hajji/GetHajjiById?id=" + paramId

        }).success(function (response) {

            $scope.Hajji = response;
            $scope.Hajji.PerformingHajj = response.PerformingHajj;
            $scope.RelationWithMaharram = response.RelationWithMaharram;
            $scope.StatusTitle = response.StatusTitle;
            $scope.Hajji.DoB = $scope.Hajji.DoB != null ? new Date(parseInt(response.DoB.substr(6))) : null;
            $scope.Hajji.PassportExpiryDate = $scope.Hajji.PassportExpiryDate != null ? new Date(parseInt(response.PassportExpiryDate.substr(6))) : null;
            $scope.Hajji.PassportIssueDate = $scope.Hajji.PassportIssueDate != null ? new Date(parseInt(response.PassportIssueDate.substr(6))) : null;
            $scope.GroupLeader = response.GroupLeader;
        }).error(function (response) {
            //$scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
        });
    };

    if (paramId != "") {
        $scope.GetHajjiById();
    }

}])

.factory('FileUploadService', function ($http, $q) {
    var fac = {};
    fac.UploadFile = function (file, hajji) {


        var formData = new FormData();
        if (hajji.PassportAttach == null || hajji.PassportAttach == "") {
            hajji.PassportAttach = "";
        }
        if (hajji.NIDAttach == null || hajji.NIDAttach == "") {
            hajji.NIDAttach = "";
        }

        if (hajji.ImageAttach == null || hajji.ImageAttach == "") {
            hajji.ImageAttach = "";
        }
        for (var i = 0; i < file.length; i++) {
            formData.append(file[i].name, file[i]);
        }
        for (var key in hajji) {

            if ((hajji[key] != null) && (key == "DoB" || key == "PassportExpiryDate" || key == "PassportIssueDate")) {
                var data = (new Date(hajji[key])).toUTCString();
                formData.append(key, data);
                continue;
            }

            if (hajji[key] != null) {
                formData.append(key, hajji[key]);
            }
        }
        var defer = $q.defer();
        $http.post("/Hajj/Hajji/SaveHajjiData", formData, {
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
//app.directive('validFile', function () {
//    return {
//        require: 'ngModel',
//        link: function (scope, elem, attrs, ngModel) {
//            var validFormats = ['jpg', 'jpeg', 'png'];
//            var isValidPicture = false;
//            elem.bind('change', function () {
//                //alert('File size:' + this.files[0].size);
//                if (this.files[0].size <= 512000) {
//                    isValidPicture = true;
//                }
//                validImage(false);
//                scope.$apply(function () {
//                    ngModel.$render();
//                });

//            });
//            ngModel.$render = function () {
//                ngModel.$setViewValue(elem.val());
//            };
//            function validImage(bool) {
//                ngModel.$setValidity('extension', bool);
//            }
//            ngModel.$parsers.push(function (value) {
//                var ext = value.substr(value.lastIndexOf('.') + 1);
//                if (ext == '' || isValidPicture == false) return;
//                if (validFormats.indexOf(ext) == -1) {
//                    return value;
//                }
//                validImage(true);
//                return value;
//            });
//        }
//    };

//});