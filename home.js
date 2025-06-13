// Configuration globale
let SCROLL_TRIGGER_START = "top center+=50px";
let EASE = 'power3.inOut';
let DELAY_INCREMENT = 0.2; // Délai de 0.2 secondes entre chaque animation
let H1_DECAL_Y = -30; 
let H1_DELAY = 1666;

// Tableau de mots pour l'animation
let words = [];
let usedWords = []; // Tableau pour suivre les mots déjà utilisés
let isFirstAnimation = true; // Flag pour suivre si c'est la première animation

// Fonction pour récupérer les mots depuis les éléments dynamiques Webflow
function fetchWordsFromWebflow() {
   
    const isEnglish = document.documentElement.lang === 'en';
    words = isEnglish 
        ? ["access", "SaaS", "profiles", "costs"]
        : ["accès", "SaaS", "profils", "coûts"];

}

function initH1Intro() {
    const h1 = document.querySelector('h1');
    const splitText = new SplitText(h1, { type: "words" });
    const words = splitText.words;

    // Animation initiale
    gsap.set(words, { 
        opacity: 0,
        y: H1_DECAL_Y * -1
    });

    // Animation d'entrée
    gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        onStart: () => {
            gsap.set(h1, { opacity: 1 });
            gsap.to('.h1-fx-bg', {
                duration: 0.5,
                width: document.querySelector('h1 .h1-fx-target').offsetWidth,
                opacity: 1,
                ease: "power2.inOut"
             
            });
        },
        onComplete: () => {
            // Une fois l'animation d'intro terminée, on lance l'animation du mot changeant
             initTextAnimation();
        }
    });
}

function initTextAnimation() {
    // Vérifier si SplitText est disponible
    if (typeof SplitText === 'undefined') {
        console.error('SplitText n\'est pas chargé');
        return;
    }

    const span = document.querySelector('h1 .h1-fx-target');
    const bgElement = document.querySelector('.h1-fx-bg');
    const splitText = new SplitText(span, { type: "chars,words" });
    const chars = splitText.chars;
    
    // Animation initiale
    gsap.set(chars, { opacity: 0, y: H1_DECAL_Y * -1 });
    
    let currentWordIndex = 0;
    
    function animateText() {
        // Sélectionner le mot suivant dans l'ordre
        const word = words[currentWordIndex];
        currentWordIndex = (currentWordIndex + 1) % words.length; // Boucler sur la liste des mots
        
        span.textContent = word;
        
        // Recréer le SplitText avec le nouveau mot
        splitText.revert();
        const newSplitText = new SplitText(span, { type: "chars,words" });
        const newChars = newSplitText.chars;

        // N'appliquer le set que si ce n'est pas la première animation
        if (!isFirstAnimation) {
            gsap.set(newChars, { opacity: 0, y: H1_DECAL_Y * -1 });
        }
        isFirstAnimation = false;

        // Ajuster la largeur du fond
        gsap.to(bgElement, {
            width: span.offsetWidth,
            duration: 0.5,
            ease: "power4.inOut"
        });

        // Animation des lettres
        gsap.to(newChars, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            overwrite: "auto",
            ease: "power4.out",
            onComplete: () => {
                // Attendre avant de changer le mot
                setTimeout(() => {
                    // le new mot arrive
                    gsap.to(newChars, {
                        opacity: 0,
                        y: H1_DECAL_Y,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "power4.in",
                        overwrite: "auto",
                        onComplete: () => {
                            // Attendre avant de changer le mot
                            animateText();
                        }
                    });
                }, H1_DELAY);
            }
        });
    }
    
    // Démarrer l'animation
    animateText();
}

function initHeroBackground() {
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
        // Générer une valeur Y aléatoire entre 10 et 40 (inversé pour descendre)
        const randomY = gsap.utils.random(-10, -30);
        // Calculer l'opacité relative à la distance Y (plus la distance est grande, plus l'ombre est visible)
       
        gsap.set(icon.querySelector('#icon'), {
            y: randomY
        });
     
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
            y: -2,
            delay: delay,
            ease: EASE
        });

    });
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Enregistrer ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(SplitText);
    
    // Récupérer les mots depuis les éléments Webflow
    fetchWordsFromWebflow();
    
    // Initialiser le background du hero
    initHeroBackground();
    
    // Attendre que tous les scripts soient chargés
    window.addEventListener('load', () => {
        // Initialiser l'animation d'intro du H1
        initH1Intro();
    });
}); 