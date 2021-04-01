app.filter('groupBy', function ($parse) {
    return _.memoize(function (items, field) {
        var getter = $parse(field);
        return _.groupBy(items, function (item) {
            return getter(item);
        });
    });
});
app.controller('AdminSystemUserController', ['$scope', '$http', '$window', '$filter', 'appMessage', function HospitalControllerCreate($scope, $http, $window, $filter, appMessage) {

    $scope.user = {};
    $scope.alerts = [];
    $scope.appMessage = appMessage;

    // Automatically set the focus to a textbox when this page loads
    //$window.scrollTo(0, angular.element(document.getElementById('txtName').focus()).offsetTop);
    
    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.SaveUserPrivilege = function () {
        $http({
            method: "POST",
            url: "SaveUserPrivilege",
            data: $scope.user
        }).success(function mySucces(response) {
            $scope.submitted = false;
            if (response.Success) {
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });                
                $scope.user.UserId = undefined;
                $scope.user.Password = undefined;
                $scope.user.RepeatPassword = undefined;
                $scope.allModules = false;
                $scope.checkAllModules();
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.UpdateUserPrivilege = function () {
        $http({
            method: "POST",
            url: "UpdateUserPrivilege",
            data: $scope.user
        }).success(function mySucces(response) {
            $scope.submitted = false;
            if (response.Success) {
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                //$scope.user.UserId = undefined;
                //$scope.user.Password = undefined;
                //$scope.user.RepeatPassword = undefined;
                //$scope.allModules = false;
                //$scope.checkAllModules();
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
   
    $scope.GetAllPrivileges = function(){
        $http({
            method: "Get",
            url: "/Hajj/UserAdmin/GetAllPrivileges"
        }).success(function (response) {
            $scope.user.modulePrivileges = response;
            //$scope.uniqueData = response.map(item => item.ModuleName).filter(function (elem, index, self) {
            //    return index == self.indexOf(elem);
            //});
            var modules = [];
            var module = {};
            var previleges = [];
            //angular.forEach(response, function (key, value) {
                
            //    if (modules.indexOf(value.ModuleName) < 0) {    //new
            //        modules.push(value.ModuleName);
            //    }
            //    else{       //old

            //    }
            //});
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.validateUser = function () {
        $http({
            method: "Get",
            url: "/Hajj/UserAdmin/IsValidUser?userId=" + $scope.user.UserId
        }).success(function (response) {
            if (!response.Valid) {
                $scope.alerts.push({ 'type': 'danger', 'msg': 'User already exist.' });
            }
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.checkAllModules = function () {
        angular.forEach($scope.user.modulePrivileges, function (key, privilege) {
            key.selectedModule = $scope.allModules;
            angular.forEach(key.MenuPrivileges, function (key, val) {
                key.selectedMenu = $scope.allModules;
                key.ListView = $scope.allModules;
                key.Create = $scope.allModules;
                key.Edit = $scope.allModules;
                key.ReportPreview = $scope.allModules;
            });
        });
    };

    $scope.checkSingleModule = function (module) {
        angular.forEach(module.MenuPrivileges, function (key, val) {
            key.selectedMenu = module.selectedModule;
            key.ListView = module.selectedModule;
            key.Create = module.selectedModule;
            key.Edit = module.selectedModule;
            key.ReportPreview = module.selectedModule;
        });
    };

    $scope.checkSingleMenu = function (menu) {
        menu.ListView = menu.selectedMenu;
        menu.Create = menu.selectedMenu;
        menu.Edit = menu.selectedMenu;
        menu.ReportPreview = menu.selectedMenu;
    };

    $scope.GetUserPrivilegeById = function () {
        $http({
            method: "Get",
            url: "/Hajj/UserAdmin/GetUserPrivilegeById" + location.search
        }).success(function (response) {
            $scope.user.Id = response.Id
            $scope.user.UserId = response.UserId;
            $scope.user.Email = response.Email;
            $scope.user.Password = response.Password;
            angular.forEach(response.AllPrivileges, function (modulePrivilege) {                
                angular.forEach(modulePrivilege.MenuPrivileges, function (menuPrivilege) {
                    //any privilege makes menu selected
                    menuPrivilege.selectedMenu = (menuPrivilege.ListView || menuPrivilege.Create || menuPrivilege.Edit || menuPrivilege.ReportPreview) ? true : false;
                    if (menuPrivilege.selectedMenu) {     //any menu selected selects a module
                        modulePrivilege.selectedModule = true;
                    }
                });
                if (!modulePrivilege.selectedModule) {          //any module not selected means all modules selection false
                    $scope.allModules = false;
                }
            });

            $scope.user.modulePrivileges = response.AllPrivileges;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.initCreate = function () {
        $scope.GetAllPrivileges();
    };

    $scope.initEdit = function () {
        $scope.GetUserPrivilegeById();
    };
}]);