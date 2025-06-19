// Script pour ajouter l'ancre #blog
(function() {
    // Vérifier le paramètre 61797474_page
    const urlParams = new URLSearchParams(window.location.search);
    const pageNumber = urlParams.get('61797474_page');

    if (pageNumber) {
        // Ajouter simplement l'ancre #blog à l'URL actuelle
        history.replaceState(null, '', window.location.href + '#blog');
    }
})();
