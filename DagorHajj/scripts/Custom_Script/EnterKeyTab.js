//$('form').on('keydown', 'input, select, textarea', function (e) {
//    var self = $(this)
//      , form = self.parents('form:eq(0)')
//      , focusable
//      , next
//    ;
//    if (e.keyCode == 13) {
//        focusable = form.find('input,a,select,button,textarea').filter(':visible:not([readonly])');
//        next = focusable.eq(focusable.index(this) + 1);

//        if (next.length) {
//            next.focus();
//        } else {

//            form.submit();
//        }
//        return false;
//    }
//});





$('form').on('keydown', 'input, select, textarea', function (e) {
    var self = $(this)
      , form = self.parents('form:eq(0)')
      , focusable
      , next
    ;
    if (e.keyCode == 13) {
        focusable = form.find('input,a,select,button,textarea').filter(':visible');
        next = focusable.eq(focusable.index(this) + 1);

        if (next.length) {
            next.focus();
            $("input:text").focus(function () { $(this).select(); });

        } else {

            form.submit();
        }
        return false;
    }

   
    
    if (e.keyCode == 27) {
        focusable = form.find('input,a,select,button,textarea').filter(':visible');
        prev = focusable.eq(focusable.index(this) - 1);

        if (prev.length) {
            prev.focus();
            $("input:text").focus(function () { $(this).select(); });

        } else {

            form.submit();
        }
        return false;
    }
});