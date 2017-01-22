var $logoutButton = $('#logoutButton')
$logoutButton.on('click', function (ev) {
    ev.preventDefault()

    var _resolve = function () {
        $.ajax({
                url: '/ajax/logout',
                method: 'GET'
        })
        .done(function (data) {
                location.assign('/')
        })
        $modal.modal('hide');
    }

    var _reject = function () {
        $modal.modal('hide');
    }
    
    var $modal = $('#logoutConfirmModal');
    $modal.modal('show');
    $modal.find('.modal-ok').on('click', _resolve)
    $modal.find('.modal-cancel').on('click', _reject)
})