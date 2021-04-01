//clear combobox data i.e. unselect selected data
function clearComboboxData(comboboxId) {
    var html = "<option value=\"\"></option>";
    $("#" + comboboxId).html(html).combobox("refresh");
    $("#" + comboboxId).data("combobox").clearElement();
}

//calculate column total
function GetColumnTotal(tableName, columnNumber) {
    var rows = $('#' + tableName + ' tbody tr');
    var totalAmount = 0;
    rows.each(function() {
        var amount = parseFloat($('td:nth-child(' + columnNumber + ') input', this).val());
        if (!isNaN(amount)) {
            totalAmount += amount;
        }
    });
    return totalAmount;
}

//update table serial number
function UpdateSN(tableName) {
    var rows = $('#' + tableName + ' tbody tr');
    var sn = 0;
    rows.each(function () {
        sn++;
        $("td:nth-child(1)", this).html(sn);
    });
}

//remove table row
function RemoveTableRow(tableName, rowIndex) {
    $('#modal-alert').modal('hide');
    $('#' + tableName + ' tr#' + rowIndex).remove();
    UpdateSN(tableName);
}

//console.log(GetTimeDifference("08:45 AM", "11:25 AM"));

function ConvertTimeStringtoTime(timeString, clockDifference) {

    var sec = "00";

    var time = timeString.split(":");
    var hour = +(time[0]);
    var minute = time[1];

    hour += clockDifference;

    var date = new Date();

    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(sec);

    return date.getTime();
}

//get time difference between two times where time format will be '08:00 AM'
//return Time Format = HH:mm
function GetTimeDifference(time1, time2) {

    var clockDifference = 0;

    var startTime = time1.split(" ");
    var endTime = time2.split(" ");

    if (startTime[1] != endTime[1]) clockDifference += 12;

    var startDate = ConvertTimeStringtoTime(startTime[0], 0);
    var endDate = ConvertTimeStringtoTime(endTime[0], clockDifference);

    var difference = endDate - startDate;
    var seconds = difference / 1000;
    var minutes = seconds / 60;
    //var hour = Math.floor(minutes / 60);
    //minutes = minutes % 60;
    //return hour + ":" + minutes;
    return (minutes / 60).toFixed(2);
}

//get difference between two dates in terms of days
function GetDateDifferenceInDays(date1, date2) {
    var start = date1.split("-");
    var end = date2.split("-");
    var dateDifference = Math.abs(new Date(end[2], end[1] - 1, end[0]) - new Date(start[2], start[1] - 1, start[0]));

    var days = dateDifference / 86400000;

    if (isNaN(days)) {
        return 0;
    }
    else {
        return days + 1;
    }
}

//get difference between two dates in terms of Month
function GetDateDifferenceInMonth(date1, date2) {
    var start = date1.split("-");
    var end = date2.split("-");

    var startDate = new Date(start[2], start[1] - 1, start[0]);
    var endDate = new Date(end[2], end[1] - 1, end[0]);

    var diffYears = endDate.getFullYear() - startDate.getFullYear();
    var diffMonths = endDate.getMonth() - startDate.getMonth();

    var months = (diffYears * 12 + diffMonths);

    if (isNaN(months)) {
        return 0;
    }
    else {
        return months + 1;
    }
}


function readURL(input, placeholder) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#' + placeholder).attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function ShowFileName(input, placeholder) {

    if (input.files && input.files[0]) {
        console.log(input.files[0].name);
        $('#' + placeholder).text(input.files[0].name);
    }
}

function CountClass() {
    $('table.table-condensed tbody tr').each(function () {
        var oldItems = $(this).children('td.day.old').length;
        var newItems = $(this).children('td.day.new').length;
        //alert(oldItems);
        if (oldItems >= 7) {
            $(this).hide();
        }
        else {
            $(this).children('td.day.old').text("");
            //$(this).children('td.day.old').removeAttr('class');
        }
        if (newItems >= 7) {
            $(this).hide();
        }
        else {
            $(this).children('td.day.new').text("");
            //$(this).children('td.day.new').removeAttr('class');
        }
    });
}

function NumberToLocalWords(number) {
    if (number == 0)
        return "Zero";

    if (number < 0)
        return "Minus " + NumberToLocalWords(Math.abs(number));

    var words = "";

    if (Math.floor(number / 10000000) > 0) {
        words += NumberToLocalWords(Math.floor(number / 10000000)) + " Crore ";
        number %= 10000000;
    }

    if (Math.floor(number / 100000) > 0) {
        words += NumberToLocalWords(Math.floor(number / 100000)) + " Lac ";
        number %= 100000;
    }

    if (Math.floor(number / 1000) > 0) {
        words += NumberToLocalWords(Math.floor(number / 1000)) + " Thousand ";
        number %= 1000;
    }

    if (Math.floor(number / 100) > 0) {
        words += NumberToLocalWords(Math.floor(number / 100)) + " Hundred ";
        number %= 100;
    }

    if (number > 0) {
        if (words != "")
            words += "and ";

        var unitsMap = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        var tensMap = ["zero", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

        if (number < 20)
            words += unitsMap[number];
        else {
            words += tensMap[Math.floor(number / 10)];
            if ((number % 10) > 0)
                words += "-" + unitsMap[number % 10];
        }
    }

    return words;
}

function validatePartialForm() {
    var isValid = true;
    $("form .mandatory").each(function () {
        if ($(this).val() == '' || $(this).val() == 'undefinided' || $(this).val() == null) {
            $(this).addClass('parsley-error');
            $(this).removeClass('parsley-success');
            isValid = false;
        }
    });
    return isValid;
}

$(document).ready(function () {

    $('.mandatory').change(function () {

        if ($(this).val() == '' || $(this).val() == 'undefinided' || $(this).val() == null) {
            $(this).removeClass('parsley-success');
            $(this).addClass('parsley-error');
        }
        else {
            $(this).addClass('parsley-success');
            $(this).removeClass('parsley-error');
        }
    });

    $(document).on('click', '.del', function () {
        //$(this).parent().parent().remove();
        var rowIndex = $(this).parent().parent().attr('id');
        var tableName = $(this).parent().parent().parent().parent().attr('id');
        var data = '<a href="javascript:void(0);" class="btn btn-sm btn-white" data-dismiss="modal">No</a>';
        data += '<a href="javascript:void();" onclick="RemoveTableRow(\'' + tableName + '\',' + rowIndex + ');" class="btn btn-sm btn-danger">Yes</a>';
        $('#modal-alert .modal-footer').html(data);
    });

    $("#changePasswordSubmit").click(function () {
        var oldPassword = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
        var confirmNewPassword = $('#confirmNewPassword').val();

        if (newPassword != confirmNewPassword) {
            $("#changePasswordActionResult").text('New Password & Confirm Password does not match');
        } else {
            $.ajax({
                cache: false,
                async: true,
                type: "POST",
                url: '/Account/ChangePassword',
                data: JSON.stringify({ "newPassword": newPassword, "oldPassword": oldPassword }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#changePasswordActionResult").text(data.Message);
                    if (data.Sucess) {

                    } else {

                    }
                }
            });
        }
    });
});