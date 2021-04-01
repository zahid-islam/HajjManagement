app.controller('CompanyProfileCreateCtrl', ['$scope', 'FileUploadService', '$http', 'appMessage', '$filter', function ($scope, FileUploadService, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.CompanyProfile = {};
    $scope.uploadData = [];
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.CompanyProfile.ID = 0;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);

    //File Select

    $scope.SelectImageFile = function (file) {

        if (file[0].name) {

            $scope.CheckImageFileValid(file[0]);
            if ($scope.IsImageFileValid == true) {
                $scope.uploadData.push(file[0]);
                $scope.CompanyProfile.ImageAttach = file[0].name;
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.errorMessage });
                ClearImageForm();
            }
        }
    }

    $scope.CheckImageFileValid = function (file) {

        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type && 'image/jpg') {
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

    function ClearImageForm() {
        $scope.FileDescription = "";

        angular.forEach(angular.element("input[type='file'][id='imageFile']"), function (inputElem) {
            angular.element(inputElem).val(null);
        });
    }
    //===================== Save Group Leader Data ===============

    $scope.SaveCompanyProfile = function () {



        if (paramId != "" || $scope.CompanyProfile.ID > 0) {

            var imageInfo = $scope.CompanyProfile.ImageAttach != null ? $scope.CompanyProfile.ImageAttach.split("/") : null;

            if (imageInfo != null && imageInfo.length == 1) {
                $scope.CompanyProfile.ImageAttach = imageInfo[0];
            } else if (imageInfo != null && imageInfo.length > 1) {
                var count = imageInfo.length;
                $scope.CompanyProfile.ImageAttach = imageInfo[count - 1];

            }
            else {
                $scope.CompanyProfile.ImageAttach = null;

            }
        }
        var url = "";

        if ($scope.uploadData.length > 0) {


            var uploadFile = $scope.uploadData;
            var companyProfile = $scope.CompanyProfile;
            FileUploadService.UploadFile(uploadFile, companyProfile).then(function (response) {
                if (response.Success == true) {

                    $scope.CompanyProfile.ID = response.Id;
                    $scope.submitted = false;
                    $scope.CompanyProfile.ImageAttach = response.model.ImageAttach;
                    $scope.alerts.push({
                        'type': 'success', 'msg': response.Msg
                    });
                }
                else {
                    $scope.submitted = false;
                    $scope.CompanyProfile.ID = response.Id;

                    $scope.alerts.push({
                        'type': 'danger', 'msg': response.Msg
                    });
                }

            }, function (e) {
                alert(e);
            });

        }

        else {

            url = "/Hajj/CompanyProfile/SaveCompanyProfile";


            $http({
                method: "POST",
                url: url,
                data: $scope.CompanyProfile

            }).success(function (response) {

                if (response.Success == true) {

                    $scope.submitted = false;

                    $scope.CompanyProfile.ID = response.Id;

                    $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
                }
                else {
                    $scope.submitted = false;
                    $scope.CompanyProfile.ID = response.Id;
                    $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
                }
            }).error(function (response) {

                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            });
        }

    };

    $scope.GetCompanyProfileById = function () {

        $http({

            method: "Get",
            url: "/Hajj/CompanyProfile/GetCompanyProfileById?id=" + paramId

        }).success(function (response) {

            $scope.CompanyProfile = response;

        }).error(function (response) {
            $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
        });
    };

    if (paramId != "") {
        $scope.GetCompanyProfileById();
    }

}])

.factory('FileUploadService', function ($http, $q) {
    var fac = {};
    fac.UploadFile = function (file, companyProfile) {


        var formData = new FormData();

        if (companyProfile.ImageAttach == null || companyProfile.ImageAttach == "") {
            companyProfile.ImageAttach = "";
        }
        for (var i = 0; i < file.length; i++) {
            formData.append(file[i].name, file[i]);
        }
        for (var key in companyProfile) {
          
            if (companyProfile[key] != null) {
                formData.append(key, companyProfile[key]);
            }
        }
        var defer = $q.defer();
        $http.post("/Hajj/CompanyProfile/SaveCompanyProfile", formData, {
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