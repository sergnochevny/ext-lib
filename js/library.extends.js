(function ($) {
    var _waitloader_counter = 0,
        _get_confirm_modal = function (message) {
            return '<div id="confirm" class="modal fade">' +
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
        },
        _get_alert_modal = function (message) {
            return '<div id="alert" class="modal fade">' +
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
        },
        _wait_loader_fa = '<div class="ui-widget-overlay" id="wait_loader">' +
            '<i class="fa fa-spinner fa-pulse fa-4x" aria-hidden="true"></i>' +
            '</div>';


    !$ || (function () {
        window.alert = function (message, ok) {
            $.when($('body').append(_get_alert_modal(message))).done(
                function () {
                    var _alert = $('#alert');
                    _alert.on('hidden.bs.modal',
                        function (event) {
                            $(this).remove();
                        }
                    );
                    $('#ok-confirm').on('click',
                        function (event) {
                            !ok || ok();
                        }
                    );
                    _alert.modal('show');
                }
            );
        };

        window.confirm = function (message, ok, cancel) {
            $.when($('body').append(_get_confirm_modal(message))).done(
                function () {
                    var _confirm = $('#confirm');
                    _confirm.on('hidden.bs.modal',
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
                    _confirm.modal('show');
                }
            );
        };

        var _waitloader_do_action = function (action) {
            var _loader = $('.loader'),
                _waitloader = $('#wait_loader');
            switch (action) {
                case 'show':
                    _waitloader_counter += 1;
                    if (_loader.length > 0) {
                        _loader.fadeIn();
                    } else {
                        if (!_waitloader.length) {
                            $(_wait_loader_fa).appendTo(this).css('z-index', '100000000');
                        }
                    }
                    break;
                case 'remove':
                    _waitloader_counter -= 1;
                    if (_waitloader_counter <= 0) {
                        _waitloader_counter = 0;
                        if (_loader.length > 0) {
                            _loader.fadeOut(1000);
                        } else {
                            if (_waitloader.length > 0) {
                                _waitloader.remove();
                            }
                        }
                    }
                    break;
            }
        };

        $.fn.extend(
            {
                waitloader: function (action) {
                    _waitloader_do_action.call(this, action);
                }
            }
        );

        !yii || $.fn.extend(yii, {
            alert: function (message, ok) {
                window.alert(message, ok);
            },
            confirm: function (message, ok, cancel) {
                window.confirm(message, ok, cancel);
            }
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

                $('body').waitloader('remove');

            }
        );
    })();
})(jQuery);