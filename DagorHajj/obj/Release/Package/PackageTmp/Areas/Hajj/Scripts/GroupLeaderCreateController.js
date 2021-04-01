app.controller('GroupLeaderCreateCtrl', ['$scope', 'FileUploadService', '$http', 'appMessage', '$filter', function ($scope, FileUploadService, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.GroupLeader = {};
    $scope.alerts = [];
    $scope.IsFormSubmitted = false;
    $scope.DistrictList = [{ name: 'DHAKA' }, { name: 'FARIDPUR' }, { name: 'GAZIPUR' }, { name: 'GOPALGANJ' }, { name: 'JAMALPUR' },
        { name: 'KISHOREGONJ' }, { name: 'MADARIPUR' }, { name: 'MANIKGANJ' }, { name: 'MUNSHIGANJ' }, { name: 'MYMENSINGH' },
        { name: 'NARAYANGANJ' }, { name: 'NARSINGDI' }, { name: 'NETRAKONA' }, { name: 'RAJBARI' }, { name: 'SHARIATPUR' }, { name: 'SHERPUR' }, { name: 'TANGAIL' }, { name: 'BANDARBAN' }, { name: 'BRAHMANBARIA' }, { name: 'CHANDPUR' },
        { name: 'CHITTAGONG' }, { name: 'COMILLA' }, { name: 'COX’S BAZAR' }, { name: 'FENI' }, { name: 'KHAGRACHHARI' }, { name: 'LAKSHMIPUR' },
        { name: 'NOAKHALI' }, { name: 'RANGAMATI' }, { name: 'BOGRA' }, { name: 'CHAPAINABABGANJ' }, { name: 'JOYPURHAT' }, { name: 'PABNA' }, { name: 'NAOGAON' }, { name: 'NATORE' }, { name: 'RAJSHAHI' },
        { name: 'SIRAJGANJ' }, { name: 'BAGERHAT' }, { name: 'CHUADANGA' }, { name: 'JESSORE' }, { name: 'JHENAIDAH' }, { name: 'KHULNA' },
        { name: 'KUSHTIA' }, { name: 'MAGURA' }, { name: 'MEHERPUR' }, { name: 'NARAIL' }, { name: 'SATKHIRA' }, { name: 'BARGUNA' }, { name: 'BARISAL' },
        { name: 'BHOLA' }, { name: 'JHALOKATI' }, { name: 'PATUAKHALI' }, { name: 'PIROJPUR' }, { name: 'HABIGANJ' }, { name: 'MAULVIBAZAR' }, { name: 'SUNAMGANJ' }, { name: 'SYLHET' }, { name: 'DINAJPUR' }, { name: 'GAIBANDHA' },
        { name: 'KURIGRAM' }, { name: 'LALMONIRHAT' }, { name: 'NILPHAMARI' }, { name: 'PANCHAGARH' }, { name: 'RANGPUR' }, { name: 'THAKURGAON' }, ];
    //$scope.IsFileValid = false;
    $scope.IsFormValid = false;
    $scope.uploadData = [];
    $scope.appMessage = appMessage;
    $scope.GroupLeader.ID = 0;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);


    //=========================== Alerts ==================
    $scope.$watch("GroupLeaderForm.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });

    //File Select Event
    $scope.SelectPassportFile = function (file) {

        if (file[0].name) {

            $scope.CheckPassportValid(file[0]);
            if ($scope.IsPassportValid == true) {
                $scope.uploadData.push(file[0]);
                $scope.GroupLeader.PassportAttach = file[0].name;
            }
            else {
                $scope.alerts.push({
                    'type': 'danger', 'msg': $scope.errorMessage
                });
                ClearPassportForm();
            }
        }
    }
    $scope.SelectFile = function (file) {

        if (file[0].name) {

            $scope.CheckFileValid(file[0]);
            if ($scope.IsFileValid == true) {
                $scope.uploadData.push(file[0]);
                $scope.GroupLeader.NIDAttach = file[0].name;
            }
            else {
                $scope.alerts.push({
                    'type': 'danger', 'msg': $scope.errorMessage
                });
                ClearFileForm();
            }
        }
    }
    $scope.SelectImageFile = function (file) {

        if (file[0].name) {

            $scope.CheckImageFileValid(file[0]);
            if ($scope.IsImageFileValid == true) {
                $scope.uploadData.push(file[0]);
                $scope.GroupLeader.ImageAttach = file[0].name;
            }
            else {
                $scope.alerts.push({
                    'type': 'danger', 'msg': $scope.errorMessage
                });
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
            $scope.errorMessage = "File Attachment is invalid. Maximum 1 MB file size is supported"
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

    //===================== Save Group Leader Data ===============

    $scope.SaveGroupLeader = function () {

        if (paramId != "" || $scope.GroupLeader.ID > 0) {

            var passportInfo = $scope.GroupLeader.PassportAttach != null ? $scope.GroupLeader.PassportAttach.split("/") : null;
            var nidInfo = $scope.GroupLeader.NIDAttach != null ? $scope.GroupLeader.NIDAttach.split("/") : null;
            var imageInfo = $scope.GroupLeader.ImageAttach != null ? $scope.GroupLeader.ImageAttach.split("/") : null;

            if (passportInfo != null && passportInfo.length == 1) {
                $scope.GroupLeader.PassportAttach = passportInfo[0];
            } else if (passportInfo != null && passportInfo.length > 1) {
                var count = passportInfo.length;
                $scope.GroupLeader.PassportAttach = passportInfo[count - 1];

            }
            else {
                $scope.GroupLeader.PassportAttach = null;

            }
            if (nidInfo != null && nidInfo.length == 1) {
                $scope.GroupLeader.NIDAttach = nidInfo[0];
            } else if (nidInfo != null && nidInfo.length > 1) {
                var count = nidInfo.length;
                $scope.GroupLeader.NIDAttach = nidInfo[count - 1];

            }
            else {
                $scope.GroupLeader.NIDAttach = null;

            } if (imageInfo != null && imageInfo.length == 1) {
                $scope.GroupLeader.ImageAttach = imageInfo[0];
            } else if (imageInfo != null && imageInfo.length > 1) {
                var count = imageInfo.length;
                $scope.GroupLeader.ImageAttach = imageInfo[count - 1];

            }
            else {
                $scope.GroupLeader.ImageAttach = null;

            }
        }

        var url = "";


        if ($scope.uploadData.length > 0) {


            var uploadFile = $scope.uploadData;
            var groupLeader = $scope.GroupLeader;
            FileUploadService.UploadFile(uploadFile, groupLeader).then(function (response) {
                if (response.Success == true) {

                    $scope.GroupLeader.ID = response.Id;
                    $scope.submitted = false;
                    $scope.GroupLeader.PassportAttach = response.model.PassportAttach;
                    $scope.GroupLeader.NIDAttach = response.model.NIDAttach;
                    $scope.GroupLeader.ImageAttach = response.model.ImageAttach;
                    $scope.alerts.push({
                        'type': 'success', 'msg': response.Msg
                    });
                }
                else {
                    $scope.submitted = false;
                    $scope.GroupLeader.ID = response.Id;
                    $scope.alerts.push({
                        'type': 'danger', 'msg': response.Msg
                    });
                }
                //if (paramId != "") {
                //    $scope.GetGroupLeaderById();
                //}

            }, function (e) {
                alert(e);
            });

        }
        else {

            url = "/Hajj/GroupLeader/SaveGroupLeader";

            $http({
                method: "POST",
                url: url,
                data: $scope.GroupLeader

            }).success(function (response) {

                if (response.Success == true) {
                    $scope.submitted = false;
                    $scope.GroupLeader.ID = response.Id;
                    $scope.GroupLeader.PassportAttach = response.model.PassportAttach;
                    $scope.GroupLeader.NIDAttach = response.model.NIDAttach;
                    $scope.GroupLeader.ImageAttach = response.model.ImageAttach;
                    $scope.alerts.push({
                        'type': 'success', 'msg': response.Msg
                    });
                }
                else {
                    $scope.submitted = false;
                    $scope.GroupLeader.ID = response.Id;
                    $scope.alerts.push({
                        'type': 'danger', 'msg': response.Msg
                    });
                }

            }).error(function (response) {

                $scope.alerts.push({
                    'type': 'danger', 'msg': $scope.appMessage.failure
                });
            });

        }


    };

    $scope.GetGroupLeaderById = function () {

        $http({

            method: "Get",
            url: "/Hajj/GroupLeader/GetGroupLeaderById?id=" + paramId

        }).success(function (response) {

            $scope.GroupLeader = response;

        }).error(function (response) {
            $scope.alert.push({
                'type': 'danger', 'msg': $scope.AppMessage.fetch_warning
            });
        });
    };

    if (paramId != "") {
        $scope.GetGroupLeaderById();
    }

}])

.factory('FileUploadService', function ($http, $q) {
    var fac = {};
    fac.UploadFile = function (file, groupLeader) {


        var formData = new FormData();
        if (groupLeader.PassportAttach == null || groupLeader.PassportAttach == "") {
            groupLeader.PassportAttach = "";
        }
        if (groupLeader.NIDAttach == null || groupLeader.NIDAttach == "") {
            groupLeader.NIDAttach = "";
        }

        if (groupLeader.ImageAttach == null || groupLeader.ImageAttach == "") {
            groupLeader.ImageAttach = "";
        }
        for (var i = 0; i < file.length; i++) {
            formData.append(file[i].name, file[i]);
        }
        for (var key in groupLeader) {

            if ((groupLeader[key] != null) && (key == "DoB" || key == "PassportExpiryDate" || key == "PassportIssueDate")) {
                var data = (new Date(groupLeader[key])).toUTCString();
                formData.append(key, data);
                continue;
            }

            if (groupLeader[key] != null) {
                formData.append(key, groupLeader[key]);
            }
        }
        var defer = $q.defer();
        $http.post("/Hajj/GroupLeader/SaveGroupLeader", formData, {
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