(function($) {
  function setFooterHeight() {
    $('body').css("margin-bottom", $("#footer").height());
  }
  setFooterHeight();
  //RESIZE STUFF
  var resizeTimer;

  $(window).on("resize", function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      setFooterHeight();
    }, 250);
  });

  $(".pp-carousel__stage").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
})(jQuery);
