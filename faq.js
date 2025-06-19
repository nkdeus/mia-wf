// Configuration globale
document.addEventListener('DOMContentLoaded', () => {
    // Enregistrer le plugin ScrollTo
    gsap.registerPlugin(ScrollToPlugin);
    
    // Sélectionner tous les éléments FAQ
    const faqItems = document.querySelectorAll('.faq-question');

    // Ajouter l'écouteur d'événements à chaque élément FAQ
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Trouver le parent faq-item-title
            const parentTitle = item.closest('.faq-item-title');
            
            // Fermer tous les autres éléments FAQ
            document.querySelectorAll('.faq-item-title').forEach(otherTitle => {
                if (otherTitle !== parentTitle) {
                    otherTitle.classList.remove('open');
                }
            });
            
            // Toggle la classe 'open' sur le parent
            parentTitle.classList.toggle('open');

            // Si l'élément est ouvert, scroll vers lui
            if (parentTitle.classList.contains('open')) {
                setTimeout(() => {
                    gsap.to(window, {
                        duration: 0.8,
                        scrollTo: {
                            y: parentTitle,
                            offsetY: 100 // Offset pour ne pas coller en haut de l'écran
                        },
                        ease: "power2.out"
                    });
                }, 300); // Attendre 300ms pour que l'animation CSS soit terminée
            }
        });
    });
}); 