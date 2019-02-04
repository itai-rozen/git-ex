'use strict';
console.log('Starting up');

var gProjs = [];

function initPage() {
    createProjs();
    renderProjs();
}


function createProjs() {
    var proj1 = createProj(1000, "Mine Sweeper", "Try sweeping all the mines on the board!",
        " a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden 'mines' or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field. ",
        "projs/mine-sweeper", Date.now(), ["Matrix", "mouse events"])
    var proj2 = createProj(1001, "Book Shop", "a convenient platform for book-shop owners",
        "An example website designed to help shop-owners organize their inventory", "projs/book-shop",Date.now(), ["Table", "star rating system"])

    gProjs.push(proj1, proj2);
}

function createProj(id, name, title, desc, url, date, labels) {

    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: date,
        labels: labels
    }
}







function getProjById(id) {
    return gProjs.find(function (proj) {
        return  (proj.id === id);
    })
}


