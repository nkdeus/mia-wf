document.addEventListener('DOMContentLoaded', () => {

    function slideNews() {
        const newsList = document.querySelector('#news-list');
        const newsListTarget = document.querySelector('#news-list-target');
        if (!newsList) return;

        const newsListWidth = newsListTarget.offsetWidth;
        const newsItems = document.querySelectorAll('.news-list-item');
        const itemCount = newsItems.length;
        
        // Calculer la durée en fonction du nombre d'éléments (2 secondes par élément)
        const duration = itemCount * 4;
        
        const animation = gsap.to(newsList, {
            x: -newsListWidth,
            duration: duration,
            ease: "none",
            repeat: -1
        });

        // Ralentir l'animation au survol
        newsList.addEventListener('mouseenter', () => {
            animation.timeScale(0.3); // Ralentir à 30% de la vitesse normale
        });

        // Reprendre la vitesse normale quand le survol se termine
        newsList.addEventListener('mouseleave', () => {
            animation.timeScale(1);
        });
    }

    // Appeler slideNews au chargement
    window.addEventListener('load', () => {
        slideNews();
    });

    // Appeler slideNews au redimensionnement
    window.addEventListener('resize', () => {
        slideNews();
    });

}); 