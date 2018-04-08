import $ from 'jquery';

class Modal {
    constructor() {
        this.openModalButton = $('.open-modal');
        this.modal = $('.modal');
        this.closeModalButton = $('.modal__close');
        this.events();
    }

    events() {

        // Clicking the open modal button.
        this.openModalButton.click(this.openModal.bind(this));

        // Clicking the X close modal button.
        this.closeModalButton.click(this.closeModal.bind(this));

        // Pushes any key.
        $(document).keyup(this.keyPressHandler.bind(this));


    }

    keyPressHandler(e) {
        if (e.keyCode == 27){
            // The escape key.
            this.closeModal();
        }
    }

    openModal() {
        this.modal.addClass('modal--is-visible');
        return false;                               /* Prevents browser moving to the top of the page. Stays where it is when the user clicked the button.*/
    }

    closeModal() {
        this.modal.removeClass('modal--is-visible');
    }
}

export default Modal;