// Elements

const body = document.querySelector('body');
const deleteButton = body.querySelector('.delete-button');

// Functions

// handleUserAction

const handleUserAction = (event) => {

    event.preventDefault();

    createModal();
    showModal();
    makeModalResponsive();
    
}

// createModal

const createModal = () => {

    const bookID = deleteButton.dataset.bookId;

    let html = '<div class="modal-container"><div class="modal-box">';
    html += '<span id="close-button" class="close-button">&times;</span><p>Do You Really Want To Delete This Book?</p>';
    html += '<p>This Action Cannot Be Undone.</p>';

    html += '<form action="/books/' + bookID + '/delete" method="POST">'
    html += '<p><input type="submit" id="delete-button" class="delete-button" value="YES, DELETE THIS BOOK" />'
    html += '<a id="cancel-button" class="button cancel-button">Cancel</a></p></form></div></div>'
    
    body.insertAdjacentHTML('afterbegin', html);

}

// showModal

const showModal = () => body.querySelector('.modal-container').style.display = 'block';

// makeModalResponsive

const makeModalResponsive = () => {

    const modalContainer = body.querySelector('.modal-container');
    const closingButton = modalContainer.querySelector('#close-button');
    const cancelButton = modalContainer.querySelector('#cancel-button');

    closingButton.addEventListener('click', () => modalContainer.style.display = '');
    cancelButton.addEventListener('click', () => modalContainer.style.display = '');

    modalContainer.addEventListener('click', (event) => {

        if (event.target.className === 'modal-container')
            modalContainer.style.display = '';

    });

}

// Event Handlers

deleteButton.addEventListener('click', handleUserAction);