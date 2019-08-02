(function($) {
  function Utils() {}

  Utils.prototype = {
    constructor: Utils,
    isElementInView: function(element, fullyInView) {
      if ($(element).length > 0) {
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
    }
  };

  var Utils = new Utils();

  function setFooterHeight() {
    if ($(window).width() > 767) {
      $("body").css("margin-bottom", $("#footer").height());
    } else {
      $("body").css("margin-bottom", 0);
    }
  }

  //setFooterHeight();

  function isInView() {
    var isElementInView = Utils.isElementInView($(".pp-possible"), false);

    var scrollTop = $(window).scrollTop(),
      elementOffset = $(".pp-possible").offset().top,
      distance = elementOffset - scrollTop,
      height = $(window).height();

    if ($(window).scrollTop() > $(window).height()) {
      $(".pp-orange-tab").css("display", "block");
    } else {
    }

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
  //  isInView();

  //RESIZE STUFF
  var resizeTimer;
  var scrollTimer;

  //$(window).on("resize", function(e) {
  //clearTimeout(resizeTimer);
  //resizeTimer = setTimeout(function() {
  //setFooterHeight();
  //}, 250);
  //});

  // $(window).on("scroll", function(e) {
  //   isInView();
  // });

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

  $('a[href*="#"]').on("click", function(e) {
    e.preventDefault();
    $("html, body").scrollTop($($(this).attr("href")).offset().top);
  });

  $(document).ready(function() {
    $("#nav-main").mmenu(
      {
        extensions: ["position-right"]
      },
      {
        clone: true,
        offCanvas: {
          pageSelector: "#wrap"
        }
      }
    );

    $("#mm-nav-main").removeClass("pp-main-nav");

    var api = $("#mm-nav-main").data("mmenu");

    $("#burger").click(function() {
      api.open();
    });
    $("#close").click(function() {
      api.close();
    });
  });

  function setMountainHeight(activeMountain) {
    var h = activeMountain.attr("data-mountain-height");
    var perc = Number(100 - ((h - 8000) / 1000) * 100);
    var myID = "#" + activeMountain.attr("id");

    //$(myID).css("background-position-y", perc + "%");
  }

  function moveSlider(slider, activeMountainHeight) {
    var perc = ((activeMountainHeight - 8000) / 1000) * 100;
    slider
      .find(".pp-mountain-explorer__scale > div > div")
      .css({ bottom: perc + "%" })
      .html(function() {
        return "<span>" + activeMountainHeight + "m</span>";
      });
  }

  function makeMountainActive(stage, newIndex) {
    var percentage = newIndex == 0 ? "0%" : "-" + (newIndex - 1) * 100 + "%";
    var rID = stage.attr("id");
    var randomMountainID = "#" + rID + "__mountain-" + newIndex;
    var randomID = "#" + rID + "__thumbnail-" + newIndex;

    stage.find(".pp-mountain-explorer__mountain").removeClass("active");

    $(".pp-mountain-explorer__thumbnails__thumbnail").removeClass("active");

    $(randomMountainID).addClass("active");
    $(randomID).addClass("active");

    $(".pp-mountain-explorer__phases").css({
      left: percentage
    });

    var newActiveMountain = stage.find(
      ".pp-mountain-explorer__mountain.active"
    );
    var newActiveMountainHeight = Number(
      newActiveMountain.attr("data-mountain-height")
    );

    moveSlider(stage, newActiveMountainHeight);
  }

  $(".pp-mountain-explorer").each(function() {
    //SET THE FIRST ITEM OF THE SLIDER AS ACTIVE
    $(this)
      .find(".pp-mountain-explorer__mountain:first-child")
      .addClass("active");

    var randomID = "#" + $(this).attr("id") + "__thumbnail-1";

    $(randomID).addClass("active");

    var activeMountain = $(this).find(".pp-mountain-explorer__mountain.active");
    var activeMountainHeight = Number(
      activeMountain.attr("data-mountain-height")
    );

    moveSlider($(this), activeMountainHeight);

    $(this)
      .find(".pp-mountain-explorer__mountain")
      .each(function() {
        setMountainHeight($(this));
      });

    var stageID = "#" + $(this).attr("id");

    $(this)
      .find(".pp-mountain-explorer__navigation__next")
      .click(function() {
        var activeM = $(".pp-mountain-explorer__thumbnails__thumbnail.active");
        var currentIndex = Number(activeM.attr("data-mountain-no"));
        var newIndex = currentIndex < 14 ? currentIndex + 1 : 1;
        makeMountainActive($(stageID), newIndex);
      });
    $(this)
      .find(".pp-mountain-explorer__navigation__prev")
      .click(function() {
        var activeM = $(".pp-mountain-explorer__thumbnails__thumbnail.active");
        var currentIndex = Number(activeM.attr("data-mountain-no"));
        var newIndex = currentIndex == 1 ? 14 : currentIndex - 1;
        makeMountainActive($(stageID), newIndex);
      });
    $(".pp-mountain-explorer__thumbnails__thumbnail").click(function() {
      var o = Number($(this).attr("data-mountain-no"));

      makeMountainActive($(stageID), o);
    });
  });
})(jQuery);
