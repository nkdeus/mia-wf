// Configuration globale
let SCROLL_TRIGGER_START = "top center+=50px";
let EASE = 'power3.inOut';
let DELAY_INCREMENT = 0.2; // Délai de 0.2 secondes entre chaque animation
let H1_DECAL_Y = 30; 

// Tableau de mots pour l'animation
let words = ["blonde", "bien", "longoria", "vien", "ferme la porte"];
let usedWords = []; // Tableau pour suivre les mots déjà utilisés

function initH1Intro() {
    const h1 = document.querySelector('h1');
    const splitText = new SplitText(h1, { type: "words" });
    const words = splitText.words;

    // Animation initiale
    gsap.set(words, { 
        opacity: 0,
        y: 30
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

    function animateText() {
        // Si tous les mots ont été utilisés, réinitialiser la liste
        if (usedWords.length === words.length) {
            usedWords = [];
        }
        
        // Filtrer les mots non utilisés
        const availableWords = words.filter(word => !usedWords.includes(word));
        
        // Sélectionner un mot aléatoire parmi les mots disponibles
        const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        usedWords.push(randomWord); // Ajouter le mot à la liste des mots utilisés
        
        span.textContent = randomWord;
        
        // Recréer le SplitText avec le nouveau mot
        splitText.revert();
        const newSplitText = new SplitText(span, { type: "chars,words" });
        const newChars = newSplitText.chars;
        gsap.set(newChars, { opacity: 0, y: H1_DECAL_Y * -1 });

        // Ajuster la largeur du fond
        gsap.to(bgElement, {
            width: span.offsetWidth,
            duration: 0.5,
            ease: "power2.inOut"
        });

        // Animation des lettres
        gsap.to(newChars, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.inOut",
            onComplete: () => {
                // Attendre avant de changer le mot
                setTimeout(() => {
                    // le new mot arrive
                    gsap.to(newChars, {
                        opacity: 0,
                        y: H1_DECAL_Y,
                        duration: 0.5,
                        stagger: 0.02,
                        ease: "power2.inOut",
                        onComplete: () => {
                            // Attendre avant de changer le mot
                            animateText();
                        }
                    });
                }, 1000); // Attendre 1 seconde avant de changer le mot
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
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Enregistrer ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(SplitText) 
    // Initialiser le background du hero
    initHeroBackground();
    
    // Attendre que tous les scripts soient chargés
    window.addEventListener('load', () => {
        // Initialiser l'animation d'intro du H1
        initH1Intro();
    });
}); 