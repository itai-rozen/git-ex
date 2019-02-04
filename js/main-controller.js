'use strict';

// div
function renderProjs() {

    var strHtmls = gProjs.map(function(proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" onclick="renderModal(${proj.id})" data-toggle="modal" href="#projectsModal">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${proj.name}</h4>
        <p class="text-muted">${proj.title}</p>
        </div>
        </div>
        </div>`;
    });
    $('.my-projects').html(strHtmls.join(''));
}


// Modal
function renderModal(id) {
    var proj = getProjById(id);
    $('.portfolio-modal h2').html(proj.name);
    $('.portfolio-modal p  .item-intro text-muted').html(proj.title);
    $('.modal-description').html(proj.desc);
    $('.project-date').html(proj.publishedAt);
    $('.project-category').html(''+proj.labels[0]+','+proj.labels[1]);
    $('.modal-img').html('<img class="img-fluid d-block mx-auto" src="img/portfolio/'+proj.id+'-full.jpg" alt="">')

}

function onSubmitForm(){
    var subject = $('.subject-input').val();
    var email = $('.email-input').val();
    var bodyMsg = $('.body-input').val();
    // https://mail.google.com/mail/?view=cm&fs=1&to=me@example.com&su=SUBJECT&body=BODY
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+email+'&su='+subject+'&body='+bodyMsg,'_');
}