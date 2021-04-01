app.controller('ImageUpCreateCtrl', ['$scope', 'FileUploadService', '$http', 'appMessage', '$filter', function ($scope, FileUploadService, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.Message = "";
    $scope.FileInvalidMessage = "";
    $scope.Pilimgrim = {};
    $scope.SelectedFileForUpload = null;
    $scope.IsFormSubmitted = false;
    $scope.IsFileValid = false;
    $scope.IsFormValid = false;
    $scope.appMessage = appMessage;
    $scope.uploadData = [];
    $scope.alerts = [];
    //Form Validation 
    $scope.$watch("ImageDemoForm.$valid", function (isvalid) {

        $scope.IsFormValid = isvalid;
    });

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    //File Select Event

    $scope.selectPassportFile = function (file) {

        if (file[0].name) {
            $scope.uploadData.push(file[0]);
            $scope.Pilimgrim.PassportAttach = file[0].name;
        }
    }
    $scope.selectNIDFile = function (file) {

        if (file[0].name) {
            $scope.uploadData.push(file[0]);
            $scope.Pilimgrim.NIDAttach = file[0].name;
        }
    }
    $scope.selectImageFile = function (file) {

        if (file[0].name) {
            $scope.uploadData.push(file[0]);
            $scope.Pilimgrim.ImageAttach = file[0].name;
        }
    }
    //File Type Check
    $scope.ChechFileValid = function (file) {
        var isValid = false;

        if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'text/plain'
        || file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        || file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        || file.type == 'application/pdf') && file.size <= (512 * 1024)) {

            $scope.FileInvalidMessage = "";
            isValid = true;
        }
        else {
            $scope.FileInvalidMessage = "Selected file is Invalid. (only file type png, jpeg and gif and 512 kb size allowed)";
        }

        $scope.IsFileValid = isValid;


    };
    //File Save

    $scope.SaveFiles = function () {
        $scope.IsFormSubmitted = true;
        $scope.Message = "";

        //for (var i = 0; i < $scope.uploadData.length; i++) {

        //    $scope.ChechFileValid($scope.uploadData[i], i);
        //}
        if ($scope.IsFormValid) {

            //for (var i = 0; i < $scope.uploadData.length; i++) {
            var Pilimgrim = $scope.Pilimgrim;
            var uploadFile = $scope.uploadData;
            FileUploadService.UploadFile(uploadFile, Pilimgrim).then(function (d) {
            }, function (e) {
                alert(e);
            });
        }
        $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
        ClearForm();
        //}
        //else {
        //    $scope.Message = "All the are required";
        //}
    };
    //Clear Form
    function ClearForm() {
        $scope.FileDescription = "";
        angular.forEach(angular.element("input[type='file']"), function (inputElem) {
            angular.element(inputElem).val(null);
        });
        $scope.uploadData = [];
        $scope.ImageDemoForm.$setPristine();
        $scope.IsFormSubmitted = false;
    }
}])

.factory('FileUploadService', function ($http, $q) {
    var fac = {};
    fac.UploadFile = function (file, palim) {


        var formData = new FormData();
        formData.append('model', palim);
        //formData.append('file', file);
        var defer = $q.defer();
        var url = "";
        url = "/Hajj/ImageUpDemo/SaveFiles";
        $http({
            method: "POST",
            url: url,           
            data: { model: palim, formData },
        })

        //$http.post("/Hajj/ImageUpDemo/SaveFiles", formData, {

        //    withCredentials: true,
        //    headers: { 'Content-Type': undefined },
        //    transformRequest: angular.identity,
        //    //data:palim
        //})
        .success(function (d) {
            defer.resolve(d);
        })
        .error(function () {
            defer.reject("File Upload Failed!");
        });

        return defer.promise;
    }
    return fac;
});