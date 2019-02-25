(function($) {
  function Utils() {}

  Utils.prototype = {
    constructor: Utils,
    isElementInView: function(element, fullyInView) {
      var pageTop = $(window).scrollTop();
      var pageBottom = pageTop + $(window).height();
      var elementTop = $(element).offset().top;
      var elementBottom = elementTop + $(element).height();

      if (fullyInView === true) {
        return pageTop < elementTop && pageBottom > elementBottom;
      } else {
        return elementTop <= pageBottom && elementBottom >= pageTop;
      }
    }
  };

  var Utils = new Utils();

  function setFooterHeight() {
    if ($(window).width() > 767) {
      $("body").css("margin-bottom", $("#footer").height());
    }
  }
  setFooterHeight();

  function isInView() {
    var isElementInView = Utils.isElementInView($(".pp-possible"), false);

    var scrollTop = $(window).scrollTop(),
      elementOffset = $(".pp-possible").offset().top,
      distance = elementOffset - scrollTop,
      height = $(window).height();

    if (isElementInView) {
      var opac = parseInt(100 - (distance / height) * 100) - 30;
      $(".pp-possible__article").css({
        bottom: 300 - distance / 4 + "px"
      });
      $(".pp-possible__logo").css({
        opacity: opac / 80
      });
    }
  }
  isInView();

  //RESIZE STUFF
  var resizeTimer;
  var scrollTimer;

  $(window).on("resize", function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      setFooterHeight();
    }, 250);
  });

  $(window).on("scroll", function(e) {
    isInView();
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

  $(".pp-mountain").append(function() {
    return '<div class="pp-mountain__countdown pp-monospace text-center" id="countdown"><div class="timer"></div><div class="container"><a href="#support"><span>Support Project Possible</span></a></div></div>';
  });

  $("#countdown .timer").countdown("2019/03/15", function(event) {
    $(this).text(event.strftime("%D Days %-Hh %Mm %Ss"));
  });

  $(".thumbnail.hover-stats").click(function(e) {
    e.preventDefault();
    $(this).attr("href", $(this).data("link"));
  });
})(jQuery);
