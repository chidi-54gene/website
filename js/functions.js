//PAGE LOADER
$(window).on("load", function() {
  "use strict";
  $(".loader").fadeOut(800);
  $('.side-menu').removeClass('opacity-0');
});


jQuery($ => {
  "use strict";
  let $window = $(window);
  let body = $("body");
  let $root = $("html, body");
  $('[data-toggle="tooltip"]').tooltip();

  /* ----- Back to Top ----- */
  $(body).append('<a href="#" class="back-top"><i class="fa fa-angle-up"></i></a>');
  let amountScrolled = 700;
  let backBtn = $("a.back-top");
  $window.on("scroll", function() {
      if ($window.scrollTop() > amountScrolled) {
          backBtn.addClass("back-top-visible");
      } else {
          backBtn.removeClass("back-top-visible");
      }
  });
  backBtn.on("click", function() {
      $root.animate({
          scrollTop: 0
      }, 700);
      return false;
  });

  /* ------- Smooth scroll ------- */
  $("a.pagescroll").on("click", function(event) {
      event.preventDefault();
      let action = $(this.hash).offset().top;
      if ($(this).hasClass('scrollupto')) {
          action -= 80;
      }
      $("html,body").animate({
          scrollTop: action
      }, 1200);
  });

  /* ------- navbar menu Position dynamically ------- */
  $(".dropdown").on("mouseenter", function() {
      let $elem = $(this).find('.dropdown-menu'),
          left = $elem.offset().left,
          width = $elem.width(),
          docW = $(window).width();

      if ((left + width) > docW) {
          $elem.addClass("right-show");
      } else if ((left + (width * 2)) < docW) {
          $elem.removeClass("right-show");
      }
  });

  /*------ Sticky MENU Fixed ------*/
  let headerHeight = $("header").outerHeight();
  let navbar = $("nav.navbar");
  if (navbar.not('.fixed-bottom').hasClass("static-nav")) {
      $window.scroll(function() {
          let $scroll = $window.scrollTop();
          let $navbar = $(".static-nav");
          let nextSection = $(".section-nav-smooth");
          if ($scroll > 250) {
              $navbar.addClass("fixedmenu");
              nextSection.css("margin-top", headerHeight);
          } else {
              $navbar.removeClass("fixedmenu");
              nextSection.css("margin-top", 0);
          }
          if ($scroll > 125) {
              $('.header-with-topbar nav').addClass('mt-0');
          } else {
              $('.header-with-topbar nav').removeClass('mt-0');
          }
      });
      $(function() {
          if ($window.scrollTop() >= $(window).height()) {
              $(".static-nav").addClass('fixedmenu');
          }
      })
  }
  if (navbar.hasClass("fixed-bottom")) {
      let navTopMargin = $(".fixed-bottom").offset().top;
      let scrollTop = $window.scrollTop();
      $(window).scroll(function() {
          if ($(window).scrollTop() > navTopMargin) {
              $('.fixed-bottom').addClass('fixedmenu');
          } else {
              $('.fixed-bottom').removeClass('fixedmenu');
          }
          if ($(window).scrollTop() < 260) {
              $('.fixed-bottom').addClass('menu-top');
          } else {
              $('.fixed-bottom').removeClass('menu-top');
          }
      });
      $(function() {
          if (scrollTop < 230) {
              $('.fixed-bottom').addClass('menu-top');
          } else {
              $('.fixed-bottom').removeClass('menu-top');
          }
          if (scrollTop >= $(window).height()) {
              $('.fixed-bottom').addClass('fixedmenu');
          }
      })
  }
  /*Menu Onclick*/
  let sideMenuToggle = $("#sidemenu_toggle");
  let sideMenu = $(".side-menu");
  if (sideMenuToggle.length) {
      sideMenuToggle.on("click", function() {
          $("body").addClass("overflow-hidden");
          sideMenu.addClass("side-menu-active");
          $(function() {
              setTimeout(function() {
                  $("#close_side_menu").fadeIn(300);
              }, 300);
          });
      });
      $("#close_side_menu , #btn_sideNavClose , .side-nav .nav-link.pagescroll").on("click", function() {
          $("body").removeClass("overflow-hidden");
          sideMenu.removeClass("side-menu-active");
          $("#close_side_menu").fadeOut(200);
          $(() => {
              setTimeout(() => {
                  $('.sideNavPages').removeClass('show');
                  $('.fas').removeClass('rotate-180');
              }, 400);
          });
      });
      $(document).keyup(e => {
          if (e.keyCode === 27) { // escape key maps to keycode `27`
              if (sideMenu.hasClass("side-menu-active")) {
                  $("body").removeClass("overflow-hidden");
                  sideMenu.removeClass("side-menu-active");
                  $("#close_side_menu").fadeOut(200);
                  $tooltip.tooltipster('close');
                  $(() => {
                      setTimeout(() => {
                          $('.sideNavPages').removeClass('show');
                          $('.fas').removeClass('rotate-180');
                      }, 400);
                  });
              }
          }
      });
  }

  /*
   * Side menu collapse opener
   * */
  $(".collapsePagesSideMenu").on('click', function() {
      $(this).children().toggleClass("rotate-180");
  });


  //    end of js
});
