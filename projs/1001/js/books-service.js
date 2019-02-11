'use strict';
const PAGE_SIZE = 4;
var gBooks = [];
var gCurrPageIdx = 0;

function createBooks() {
    for (var i = 0; i < 20; i++) {
        var book = createBook(getRandBookName());
        gBooks.push(book);

    }
}

function createBook(bookName) {
    return {
        id: makeId(),
        name: bookName,
        price: getRandomIntInclusive(30, 100),
        // imgUrl: '',
        rate: getRandomIntInclusive(0, 10)
    }
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books;

    strHtmls = books.map(function (book) {
        return `<tr><th scope="row">${book.id}</th>
                <td> ${book.name} </td>
                <td class="update-price"> ${book.price}<span class="currency">$</span> </td>
                <td><span>
                <button onclick="onDeleteBook('${book.id}')" data-trans="DELETE" class="btn-del">DELETE</button>
                <button onclick="onReadAndUpdateBook('${book.id}')" data-trans="UPDATE" class="btn-update">UPDATE</button>
                <button onclick="onReadBook('${book.id}')" data-trans="READ" class="btn-read">READ</button>
                </span></td>
                </tr>`
    });
    $('tbody').html(strHtmls.join(''));

}

function getRandBookName() {
    var loremStr = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorem nesciunt modi nemo' +
        'tempore, iste nam reiciendis sapiente quae repudiandae distinctio odio quod. Consequatur iste iusto veniam' +
        'incidunt, id unde!';
    var loremWords = loremStr.split(' ');
    var bookName = '';
    for (var i = 0; i < getRandomIntInclusive(1, 3); i++) {
        var randLorem = getRandomIntInclusive(0, loremWords.length - 1);
        bookName += loremWords[randLorem] + ' ';
    }
    return bookName;
}

function deleteBook(id) {
    var bookIdx = findIdxById(id);
    gBooks.splice(bookIdx, 1);

}

function addBook() {
    var bookName = $('.book-name').val();
    var price = $('.book-price').val();
    price = +price;
    var book = createBook(bookName);
    book.price = price.toFixed(2);
    gBooks.unshift(book);
    renderBooks();
    hideModal('.modal-add');
}

function revealModal(className) {
    $(className).removeClass('close');
}

function submittedPrice() {
    return $('.new-price').val();
}

function updateBook(id) {
    document.querySelector('.update-price').innerHTML =
        `<input class="input-update" type="number"><span><button data-trans="UPDATE" onclick="updatePrice('${id}')">UPDATE</button></span>`

}

function updatePrice(id) {
    var $newPrice = $(".input-update").val();
    var bookIdx = findIdxById(id);
    $newPrice = +$newPrice
    $newPrice = $newPrice.toFixed(2);
    console.log('new price',$newPrice);
    gBooks[bookIdx].price = $newPrice;
    console.log('gBooks[bookIdx].price',gBooks[bookIdx].price);
    
    renderBooks();
    hideModal('modal-update');
}



function findIdxById(id) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === id;
    });
    return bookIdx;
}

function getObjectById(id) {
    var book = gBooks.find(function (book) {
        return book.id === id;
    });
    return book;
}

function readBook(id) {
    $('.modal-container').removeClass('close');
    var book = getObjectById(id);
    $('.book-id').text(book.id);
    $('.centered').text(book.name);
    $('.price').html(book.price + getCurrencySign());
    displayBookRate(book.rate);
}


function hideModal(className) {
    $(className).addClass('close');
}

function nextPage() {
    if (gCurrPageIdx >= ((gBooks.length / PAGE_SIZE)) - 1) return;
    gCurrPageIdx++;
}
function prevPage() {
    if (gCurrPageIdx === 0) return;
    gCurrPageIdx--;
}

function getBooks() {
    var fromIdx = gCurrPageIdx * PAGE_SIZE
    var books = gBooks.slice(fromIdx, fromIdx + PAGE_SIZE)
    return books;
}

