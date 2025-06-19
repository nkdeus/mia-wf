// nav.js : insertion dynamique d'un menu de navigation dans #side-menu

document.addEventListener('DOMContentLoaded', function() {
    // Enregistrer le plugin ScrollTo
    gsap.registerPlugin(ScrollToPlugin);
    
    var menuContainer = document.getElementById('menu-container');
    var content = document.getElementById('content');
    if (!menuContainer || !content) return;

    // Récupérer tous les H2 dans #content
    var h2s = content.querySelectorAll('h2');
    if (h2s.length === 0) return;

    // Créer la nav
    var nav = document.createElement('nav');
    var ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    ul.style.margin = '0';

    var navLinks = []; // Stocker les liens pour la gestion de l'active

    h2s.forEach(function(h2, idx) {
        // Créer un id unique si pas déjà présent
        if (!h2.id) {
            h2.id = 'section-h2-' + idx;
        }
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.dataset.target = '#' + h2.id;
        a.textContent = h2.textContent;
        
        a.addEventListener('click', function(e) {
            e.preventDefault();
            // Retirer la classe active de tous les liens
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Calculer la position Y du H2 cible de manière stable
            var targetElement = document.getElementById(h2.id);
            var contentRect = content.getBoundingClientRect();
            var targetRect = targetElement.getBoundingClientRect();
            var contentOffset = contentRect.top + window.scrollY;
            var targetPosition = targetRect.top + window.scrollY;
            console.log('Content offset:', contentOffset);
            console.log('Target element position:', targetRect.top + window.scrollY);
            console.log('Final target position:', targetPosition);

            // Utiliser GSAP pour un scroll fluide avec offset
            gsap.to(window, {
                duration: 0.3,
                scrollTo: {
                    y: targetPosition - (idx === 0 ? 240 : 120)
                },
                onComplete: function() {
                    setTimeout(function() {
                        document.body.classList.add('scrolling');
                    }, 100);
                },
                ease: "Linear.easeNone"
            });
        });
        
        navLinks.push(a); // Ajouter le lien à notre tableau
        li.appendChild(a);
        ul.appendChild(li);
    });
    nav.appendChild(ul);
    menuContainer.appendChild(nav);

    // Fonction pour déterminer quelle section est visible
    function updateActiveLink() {
        var activeSection = null;
        var windowHeight = window.innerHeight;
        
        h2s.forEach(function(h2) {
            var rect = h2.getBoundingClientRect();
            var elementTop = rect.top;
            var elementBottom = rect.bottom;
            
            // L'élément est visible si sa partie supérieure est dans le viewport
            // avec un offset pour déclencher un peu avant
            if (elementTop <= windowHeight * 0.5 && elementBottom >= 0) {
                activeSection = h2;
            }
        });
        
        // Si aucune section n'est trouvée, prendre la plus proche du haut
        if (!activeSection) {
            var minDistance = Infinity;
            h2s.forEach(function(h2) {
                var rect = h2.getBoundingClientRect();
                var distance = Math.abs(rect.top);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeSection = h2;
                }
            });
        }
        
        // Mettre à jour les classes active
        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });
        
        if (activeSection) {
            var activeLink = navLinks.find(function(link) {
                return link.dataset.target === '#' + activeSection.id;
            });
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Écouter le scroll pour mettre à jour le lien actif
    window.addEventListener('scroll', function() {
        // Utiliser requestAnimationFrame pour optimiser les performances
        requestAnimationFrame(updateActiveLink);
    });

    // Initialiser l'état actif au chargement
    updateActiveLink();
}); 