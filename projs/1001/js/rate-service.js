'use-strict';
function displayBookRate(starsNum) {
    var strHtml = '';
    for (var i = 0; i < starsNum; i++) {
        strHtml += `<img src="img/star-full.png">`
    }
    $('.book-rate').html(strHtml);
}

function rateBook() {
    $('.modal-rate').removeClass('close');
    for (var i = 0; i < 10; i++) {
        document.querySelector('.star-' + (i + 1)).src ='img/star-empty.png';
    };
}

function updateRate(numOfStars) {
    for (var i = 0; i < 10; i++) {
        document.querySelector('.star-' + (i + 1)).src = (i < numOfStars) ? 'img/star-full.png' : 'img/star-empty.png';
    };
    var book = getObjectById(($('.book-id').text()));
    book.rate = numOfStars;
    displayBookRate(book.rate);
    $('.modal-rate').addClass('green');
    $('.modal-rate button').addClass('green');
}