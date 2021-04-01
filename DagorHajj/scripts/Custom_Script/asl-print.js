function printReport(url) {
    window.open(url, '_blank', 'width=' + screen.availWidth + ',height=' + screen.availHeight + ',fullscreen=yes');
}

app.factory('printerService', function () {
    return {
        printReport: function (url) {
            window.open(url, '_blank', 'width=' + screen.availWidth + ',height=' + screen.availHeight + ',fullscreen=yes');
        }
    };
});

app.run(function ($rootScope, printerService) {
    $rootScope.printer = printerService;
});