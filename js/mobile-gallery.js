$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoPlay: true,
    center: true,
    nav: true,

    navText: ['<div class="mobile-gallery__prev"><i class="fa-solid fa-backward"></i></div>','<div class="mobile-gallery__next"><i class="fa-solid fa-forward"></i></div>']
  });


  $("#prev").click(function(){
        owl.trigger("owl.prev");
    });
    
  $("#next").click(function(){
      owl.trigger("owl.next");
  });


  $(window).resize(function(){
    checkSizeWindow();
  });

  checkSizeWindow();

  function checkSizeWindow(){
    if($(window).width() > 768){
        $(".owl-carousel").trigger('destroy.owl.carousel');
    }else {
      $(".owl-carousel").owlCarousel({
        items: 1,
      });
    }    
  }
});
