document.addEventListener('DOMContentLoaded', () => {
    function initSlider() {
        const stepperContainer = document.querySelector('#stepper-container');
        const stepperItems = stepperContainer.querySelectorAll('.stepper');
        
        // Détection améliorée des appareils tactiles
        const isTouchDevice = () => {
            return (
                'ontouchstart' in window || // iOS & Android
                navigator.maxTouchPoints > 0 || // Windows
                (window.DocumentTouch && document instanceof DocumentTouch) || // iOS
                window.matchMedia('(pointer: coarse)').matches // Modern browsers
            );
        };
        
        stepperItems.forEach((item, index) => {
            if (isTouchDevice()) {
                // Pour les appareils tactiles (mobile et tablette)
                item.addEventListener('touchstart', () => {
                    slider.slideTo(index);
                });
            } else {
                // Pour les appareils non tactiles (desktop)
                item.addEventListener('mouseenter', () => {
                    slider.slideTo(index);
                });
            }
        });
    }

    window.addEventListener('load', () => {
        initSlider();
    });
}); 