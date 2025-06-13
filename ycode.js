document.addEventListener('DOMContentLoaded', () => {

    function initSlider() {
        const stepperContainer = document.querySelector('#stepper-container');
        const stepperItems = stepperContainer.querySelectorAll('.stepper');
        const slider = document.querySelector('[yc-slider-id="2yxs457c2"]').swiper;

        const isTouchDevice = () => {
            // Détection des appareils tactiles
            const hasTouchScreen = (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                (window.DocumentTouch && document instanceof DocumentTouch)
            );

            // Détection spécifique pour les Mac avec trackpad
            const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
            const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

            // Si c'est un Mac avec un trackpad, on considère que c'est un appareil non tactile
            if (isMac && hasFinePointer && !hasCoarsePointer) {
                return false;
            }

            return hasTouchScreen || hasCoarsePointer;
        };
        
        stepperItems.forEach((item, index) => {
            // Ajouter les deux événements pour tous les appareils
            item.addEventListener('click', () => {
                slider.slideTo(index);
            });

            // Ajouter mouseenter uniquement pour les appareils non tactiles
            if (!isTouchDevice()) {
                item.addEventListener('mouseenter', () => {
                    slider.slideTo(index);
                });
            }
        });
    }

    

    // Appeler slideNews au chargement
    window.addEventListener('load', () => {
        initSlider();
      
    });



}); 


