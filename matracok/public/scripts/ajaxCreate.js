var $createButton = $('#createButton')
$createButton.on('click', function (ev) {
    ev.preventDefault()

    var $createModal = $(
    `<div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="createModal">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
            <div class="modal-header">Új matrac hozzáadása</div>
            <div class="modal-body">
                <div class="alert alert-danger"></div>
                <div class="form-area"></div>
            </div>
            </div>
        </div>
      </div>`)  

    var $errorBox = $createModal.find('.alert')
    $errorBox.text('Hibás adatok.').hide()
    
    var $formArea = $createModal.find('.form-area')
    $formArea.load('/matrac/create #createForm', function () {
        var $createForm = $formArea.find('form')
        $createForm.on('submit', function (ev) {
            ev.preventDefault();
            $errorBox.hide();

            $.ajax({
                url: '/ajax/matrac/create',
                method: 'POST',
                data: $(this).serializeArray(),
                dataType: 'json'
            })
            .done(function (json) {
                if (json.success) {
                    location.assign('/')
                } else {
                    $errorBox.show()
                }
            })
        }); 

        $createModal.modal('show')
    })
})