// Configuration globale
const SCROLL_TRIGGER_START = "top center+=50px";
const EASE = 'power3.inOut';
const DELAY_INCREMENT = 0.2; // Délai de 0.2 secondes entre chaque animation

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Enregistrer ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Sélectionner tous les éléments avec la classe hero-icon-base dans .stage-hero
    const heroIcons = Array.from(document.querySelectorAll('.stage-hero .hero-icon-base'));
    
    // Trouver les icônes qui sont en haut du hero (dans les 20% premiers pixels)
    const heroSection = document.querySelector('.stage-hero');
    const heroHeight = heroSection.offsetHeight;
    const topThreshold = heroHeight * 0.2;
    
    const topIcons = heroIcons.filter(icon => {
        const rect = icon.getBoundingClientRect();
        const relativeTop = rect.top - heroSection.getBoundingClientRect().top;
        return relativeTop < topThreshold;
    });

    // Animer chaque icône avec ScrollTrigger
    heroIcons.forEach((icon, index) => {
        // Générer une valeur Y aléatoire entre -80 et -30
        const randomY = gsap.utils.random(-40, -10);
        // Calculer l'opacité relative à la distance Y (plus la distance est grande, plus l'ombre est visible)
        const shadowOpacity = gsap.utils.mapRange(-40, -10, 0.3, 0.7, randomY);
        
        // Appliquer le délai uniquement pour les icônes en haut
        const isTopIcon = topIcons.includes(icon);
        const delay = isTopIcon ? index * DELAY_INCREMENT : 0;

        // Animation de l'icône
        gsap.to(icon.querySelector('#icon'), {
            scrollTrigger: {
                trigger: icon,
                start: SCROLL_TRIGGER_START,
                toggleActions: "play none none reverse"
            },
            duration: 1.5,
            y: randomY,
            delay: delay,
            ease: EASE
        });

        // Animation de l'ombre
        gsap.to(icon.querySelector('#shadow'), {
            scrollTrigger: {
                trigger: icon,
                start: SCROLL_TRIGGER_START,
                toggleActions: "play none none reverse"
            },
            duration: 1.5,
            opacity: shadowOpacity,
            delay: delay,
            ease: EASE
        });
    });
}); 