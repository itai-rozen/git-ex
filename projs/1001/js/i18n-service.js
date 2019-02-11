'use strict';
var gCurrLang = 'en';
var gTrans = {
    'rate-me': {
        en:'Rate me' ,
        he: 'דרג אותי'
    },
    'next-page': {
        en: 'Next Page',
        he: 'לעמוד הבא'
    },
    'prev-page': {
        en: 'Prev Page',
        he: 'לעמוד הקודם'
    },
    id: {
        en: 'id',
        he: 'מסד'
    },
    name: {
        en: 'name',
        he: 'שם'
    },
    price: {
        en: 'price',
        he: 'מחיר'
    },
    link: {
        en: 'link',
        he: 'קישור'
    },
    actions: {
        en: 'actions',
        he: 'פעולות'
    },
    add: {
        en: 'add+',
        he: '+הוסף'
    },
    'please-rate': {
        en: 'please rate',
        he: 'דרג נא'
    },
    'new-price': {
        en: 'New Price',
        he: 'מחיר עדכני'
    },
    DELETE: {
        en: 'DELETE',
        he: 'מחק'
    },
    UPDATE: {
        en: 'UPDATE',
        he: 'עדכן'
    },
    READ: {
        en: 'READ',
        he: 'קרא'
    },
    'current-rate': {
        en: 'Current Rate:',
        he: 'דרוג נוכחי:'
    },
    'Book-Shop':{
        en: 'Book-Shop  <span><img src="img/logo.png"></span>',
        he: 'חנות הספרים  <span><img src="img/logo.png"></span>'
    }
}

function doTrans(lang){
    gCurrLang = lang;
    var elCurrencys = document.querySelectorAll('.currency')
    elCurrencys.forEach(function(elCurrency){
        elCurrency.innerHTML = (gCurrLang === 'en')? '$' : '₪';
    })
    var els = document.querySelectorAll('[data-trans]');
    for (var i = 0; i < els.length; i++){
        var elValue = els[i];
        var txt = gTrans[elValue.dataset.trans][lang];
        elValue.innerHTML = txt; 
    }
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function getCurrencySign(){
    var sign = (gCurrLang === 'en')? '$' : '₪';
    return sign;
}