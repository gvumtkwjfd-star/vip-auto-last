jQuery(document).ready(function($){
  $("iframe[src*='youtube.com']").wrap("<div class='videoadapt'></div>");
  $(".videoadapt").wrap("<div class='videoadapt-wrap'></div>");

  $("table").wrap("<div class='table-responsive'></div>");

  $('.wpcf7-form').on('submit', function() {
    $(this).find('.wpcf7-submit').attr('disabled', true).addClass("loading");
  });
  $('.wpcf7').on('wpcf7submit', function () {
    $(this).find('.wpcf7-submit').removeAttr('disabled').removeClass("loading");
  });

  $("input[type='tel']").mask("+7 (999) 999-99-99");

  $('.spec-item-descr').matchHeight({
    property: 'min-height'
  });

  $('.catalog-filter-label').matchHeight({
    property: 'min-height'
  });

  var site_logo = $(".site-logo");
  $(".offcanvas-logo").html(site_logo.html());

  $('[data-toggle="tooltip"]').tooltip({
    html: true
  });

  var name = $('h1').text();
  var link = $('.service-link').attr('content');
  $('input.cf77_url').val(link);
  $('input.cf77_title').val(name);

  $('.same-avto').click(function (){
    var nameAvto = $(this).parents('.parent-item').find('.parent-item-title').text();
    var linkAvto = $(this).parents('.parent-item').find('.same-avto-link').attr('href');
    var priceAvto = $(this).parents('.parent-item').find('.spec-item-price').text();
    $('input.linkAvto').val(linkAvto);
    $('input.nameAvto').val(nameAvto);
    $('input.priceAvto').val(priceAvto);
  })

  $('.btn-product').click(function (){
    var nameAvto = $('h1').text();
    var linkAvto = $('.service-link').attr('content');
    var priceAvto = $('.car-price').text();
    $('input.linkAvto').val(linkAvto);
    $('input.nameAvto').val(nameAvto);
    $('input.priceAvto').val(priceAvto);
  })

  $.fancybox.defaults.backFocus = false;

  var carousel_reviews = new Swiper(".carousel-reviews", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    loopedSlides: 4,
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".reviews-carousel-next",
      prevEl: ".reviews-carousel-prev",
    },
    pagination: {
      el: ".reviews-pagination",
      clickable: true,
      // dynamicBullets: true, // если включить, то надо добавить в род. обертку с классом wrapper класс dynamicBullets-wrap
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  var carouselTalk = new Swiper(".carousel-talk", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    loopedSlides: 4,
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".talk-carousel-next",
      prevEl: ".talk-carousel-prev",
    },
    pagination: {
      el: ".talk-pagination",
      clickable: true,
      dynamicBullets: true, // если включить, то надо добавить в род. обертку с классом wrapper класс dynamicBullets-wrap
    },
    breakpoints: {
      376: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      }
    },
  });
  $().fancybox({
    selector : '.talk-item:not(.swiper-slide-duplicate)',
    backFocus : false,
    toolbar  : false,
    smallBtn : true,
    hash     : false,
    loop: true,
  });
  $(document).on('click', '.talk-item.swiper-slide-duplicate', function(e) {
    var $slides = $(this)
      .parent()
      .children('.talk-item:not(.swiper-slide-duplicate)');
    $slides
      .eq( ( $(this).attr("data-swiper-slide-index") || 0) % $slides.length )
      .trigger("click.fb-start", { $trigger: $(this) });
    return false;
  });

  // $('.kwiz-left [type="radio"]').next('.wpcf7-list-item-label').after('<i class="kwiz-step-next"></i>');

  $(".kwiz input[type=radio]").click(function(){
    $(this).parents(".fieldset-cf7mls").find(".cf7mls_next.action-button").click();
  });

  document.addEventListener( 'wpcf7mailsent', function( event ) {
    if ( '153' == event.detail.contactFormId ) {
      $('.kwiz').addClass('form-succens');
    }
  }, false );

  function classOnScroll(){
    let $box = $('body'),
      $scroll = $(window).scrollTop();
    if($scroll > 500){
      if(!$box.hasClass('scrolled'))
        $box.addClass('scrolled');
    }
    else
      $box.removeClass('scrolled');
  }
  classOnScroll();
  $(window).on('scroll resize',classOnScroll);

  function classOnScroll2(){
    let $box = $('body'),
      $scroll = $(window).scrollTop();
    if($scroll > 450){
      if(!$box.hasClass('scrolled2'))
        $box.addClass('scrolled2');
    }
    else
      $box.removeClass('scrolled2');
  }
  classOnScroll2();
  $(window).on('scroll resize',classOnScroll2);

  var galleryCar = new Swiper(".gallery-car", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    loopedSlides: 1,
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".gallery-car-next",
      prevEl: ".gallery-car-prev",
    },
    // pagination: {
    //   el: ".gallery-car-pagination",
    //   clickable: true,
    //   dynamicBullets: true,
    // },
  });

  $().fancybox({
    selector : '.gallery-car-slide:not(.swiper-slide-duplicate) a',
    backFocus : false,
    toolbar  : false,
    smallBtn : false,
    hash     : false,
    loop: true,
  });
  $(document).on('click', '.gallery-car-slide.swiper-slide-duplicate a', function(e) {
    var $slides = $(this)
      .parents('.gallery-car')
      .find('.gallery-car-slide:not(.swiper-slide-duplicate)');
    $slides
      .eq( ( $(this).attr("data-swiper-slide-index") || 0) % $slides.length )
      .trigger("click.fb-start", { $trigger: $(this) });
    return false;
  });

  $('.page-num-1').parent('').addClass('page-num-first');
  $('.page-num-p').parent('').addClass('page-num-prev');
  $('.page-num-n').parent('').addClass('page-num-next');
  $('.page-num-2').parent('').addClass('page-num-last');

  $('.page-num-first + span.current').prev('').addClass('page-num-no-active').after('<span class="page-numbers page-num-prev page-num-no-active"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 15L2 8L9 1" stroke="#010103" stroke-width="1.5"/></svg></span>');
  $('span.current + .page-num-last').addClass('page-num-no-active').prev('').after('<span class="page-numbers page-num-next page-num-no-active"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 15L8 8L1 1" stroke="#010103" stroke-width="1.5"/></svg></span>');

  var url=document.location.href;
  $.each($(".page-numbers"),function(){
    if(this.href==url){
      $(this).addClass('active');
    }
  });
  $('.pagination').each(function () {
    if ( $(this).children().length > 4) {
      $(this).removeClass('no-visible');
    }
  });

});
