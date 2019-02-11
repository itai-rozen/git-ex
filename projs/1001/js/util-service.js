function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (max !== 100) return Math.floor((Math.random() * (max - min + 1)) + min); //The maximum is inclusive and the minimum is inclusive 
    
    return parseFloat((Math.random() * (max - min + 1)) + min).toFixed(2); //The maximum is inclusive and the minimum is inclusive 
}

