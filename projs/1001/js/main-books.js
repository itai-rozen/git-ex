'use strict';

function init() {
    createBooks();
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onReadaAndAddNewBook() {
    revealModal('.modal-add');
}

function onReadAndUpdateBook(bookId) {
    revealModal('.modal-update');
    updateBook(bookId);
}
function onReadBook(bookId){
    readBook(bookId);

}

function onRateBook() {
    rateBook();
    renderBooks();
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}

function onTrans(lang){
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans(lang);
}

