(function ($) {
  "use strict";
  
  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Initialize after DOM ready
  $(document).ready(function() {
    const nav = $('nav');
    const navHeight = nav.outerHeight();
    
    // Mobile menu toggle
    $('.navbar-toggler').on('click', function() {
      $('#mainNav').toggleClass('navbar-reduce');
      $('#mobileMenu').attr('aria-expanded', function(i, attr) {
        return attr === 'true' ? 'false' : 'true';
      });
    });

    // Preloader
    $(window).on('load', function () {
      $('#preloader').fadeOut('slow', function() {
        $(this).remove();
      });
    });

    // Back to top button with IntersectionObserver
    const backToTopObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        $('.back-to-top').toggleClass('show', !entry.isIntersecting);
      });
    }, {threshold: 0.1});
    
    if ($('.intro').length) {
      backToTopObserver.observe(document.querySelector('.intro'));
    }

    $('.back-to-top').click(function(e) {
      e.preventDefault();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Modern smooth scrolling
    $('a.js-scroll[href*="#"]').on('click', function(e) {
      e.preventDefault();
      const target = $(this.hash);
      if (target.length) {
        const targetPosition = target.offset().top - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });

    // Initialize counters with error handling
    try {
      $('.counter').counterUp({
        delay: 15,
        time: 2000
      });
    } catch (e) {
      console.error('Counter initialization failed:', e);
    }

    // Enhanced typed animation
    if ($('.text-slider').length) {
      try {
        new Typed('.text-slider', {
          strings: $('.text-slider-items').text().split(','),
          typeSpeed: 80,
          backSpeed: 30,
          backDelay: 1100,
          loop: true,
          showCursor: true,
          smartBackspace: true
        });
      } catch (e) {
        console.error('Typed initialization failed:', e);
      }
    }

    // Improved carousel with lazy loading
    if ($('#testimonial-mf').length) {
      $('#testimonial-mf').owlCarousel({
        margin: 20,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        lazyLoad: true,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          992: { items: 3 }
        }
      });
    }

    // Debounced scroll handler
    const handleScroll = debounce(function() {
      const scrollTop = $(window).scrollTop();
      $('.navbar-expand-md').toggleClass('navbar-reduce navbar-trans', scrollTop > 50);
    }, 100);

    $(window).on('scroll', handleScroll);
  });

})(jQuery);
