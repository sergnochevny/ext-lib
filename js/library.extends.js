function alert(message, ok) {
    var modal =
        '<div id="alert" class="modal fade">' +
        '   <div class="modal-dialog">' +
        '       <div class="modal-content">' +
        '           <div class="modal-header">' +
        '               <button id="close-confirm" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '               <h4 class="modal-title">Alert&hellip;</h4>' +
        '           </div>' +
        '           <div class="modal-body">' +
        '               <p>' + message + '</p>' +
        '           </div>' +
        '           <div class="modal-footer">' +
        '               <button id="ok-confirm" type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>' +
        '           </div>' +
        '       </div><!-- /.modal-content -->' +
        '   </div><!-- /.modal-dialog -->' +
        '</div><!-- /.modal -->';
    $.when($('body').append(modal)).done(
        function () {
            $('#alert').on('hidden.bs.modal',
                function (event) {
                    $(this).remove();
                }
            );
            $('#ok-confirm').on('click',
                function (event) {
                    !ok || ok();
                }
            );
            $('#alert').modal('show');

        }
    );
};

function confirm(message, ok, cancel) {
    var modal =
        '<div id="confirm" class="modal fade">' +
        '   <div class="modal-dialog">' +
        '       <div class="modal-content">' +
        '           <div class="modal-header">' +
        '               <button id="close-confirm" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '               <h4 class="modal-title">Confirmation&hellip;</h4>' +
        '           </div>' +
        '           <div class="modal-body">' +
        '               <p>' + message + '</p>' +
        '           </div>' +
        '           <div class="modal-footer">' +
        '               <button id="yes-confirm" type="button" class="btn btn-primary" data-dismiss="modal">Yes</button>' +
        '               <button id="no-confirm" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>' +
        '           </div>' +
        '       </div><!-- /.modal-content -->' +
        '   </div><!-- /.modal-dialog -->' +
        '</div><!-- /.modal -->';
    $.when($('body').append(modal)).done(
        function () {
            $('#confirm').on('hidden.bs.modal',
                function (event) {
                    $(this).remove();
                }
            );
            $('#no-confirm').on('click',
                function (event) {
                    !cancel || cancel();
                }
            );
            $('#yes-confirm').on('click',
                function (event) {
                    !ok || ok();
                }
            );
            $('#confirm').modal('show');

        }
    );
};

(function ($) {
    $.fn.extend(
        {
            waitloader: function (action) {
                var wait_loader_fa = '<div class="ui-widget-overlay" id="wait_loader">' +
                    '<i class="fa fa-spinner fa-pulse fa-4x" aria-hidden="true"></i>' +
                    '</div>';
                switch (action) {
                    case 'show':
                        if ($('.loader').length > 0) {
                            $('.loader').fadeIn();
                        } else {
                            if ($('#wait_loader').length == 0) {
                                $(wait_loader_fa).appendTo(this).css('z-index', '100000000');
                            }
                        }
                        break;
                    case 'remove':
                        if ($('.loader').length > 0) {
                            $('.loader').fadeOut(1000);
                        } else {
                            if ($('#wait_loader').length > 0) {
                                $('#wait_loader').remove();
                            }
                        }
                        break;
                }
            }
        }
    );

    $.fn.extend(yii, {
        confirm: function (message, ok, cancel) {
            confirm(message, ok, cancel);
        }
    });

    $.fn.extend(yii, {
        alert: function (message, ok) {
            alert(message, ok);
        },
    });


    $('document').ready(
        function () {
            $('[data-pjax-container]').on('pjax:start', function () {
                $('body').waitloader('show');
            }).on('pjax:end', function () {
                $('body').waitloader('remove');
            });
            $(document).on("ajaxSend", function () {
                $('body').waitloader('show');
            }).on("ajaxComplete", function () {
                $('body').waitloader('remove');
            });
        }
    );
})(jQuery);

