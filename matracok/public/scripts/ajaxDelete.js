var $form = $('#deleteMatracForm');
$form.on('submit', function (ev) {
    ev.preventDefault();

    var url = '/ajax' + $(this).attr('action');

    var _resolve = function () {
        const headers = {
            'csrf-token': $('[name="_csrf"]').val()
        }

        $.ajax({
            url,
            method: 'DELETE',
            dataType: 'json',
            headers
        })
            .done(function (data) {
                location.assign('/')
            })
            .fail(function (err) {
                $('.help-block').text(err)
            })
        
        $modal.modal('hide');
    }

    var _reject = function () {
        $modal.modal('hide');
    }
    
    var $modal = $('#deleteConfirmModal');
    $modal.modal('show');
    $modal.find('.modal-ok').on('click', _resolve)
    $modal.find('.modal-cancel').on('click', _reject)
})