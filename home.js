// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Animation simple avec GSAP
    gsap.from('h1', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'power2.out'
    });
}); 