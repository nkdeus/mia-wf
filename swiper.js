// How to Slider Setup
  var swiper = new Swiper("#how-slider-thumbs", {
    spaceBetween: 20,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'horizontal',
    breakpoints: {
      768: {
        direction: 'vertical'
      }
    }
  });
  var swiper2 = new Swiper("#how-slider", {
    spaceBetween: 0,
    speed: 400,
    keyboard: true,
    loop: true,
    direction: 'horizontal',
    breakpoints: {
      768: {
        direction: 'vertical'
      }
    },
    navigation: {
      nextEl: "#how-slide-right",
      prevEl: "#how-slide-left",
    },
    thumbs: {
      swiper: swiper,
    },
  });
