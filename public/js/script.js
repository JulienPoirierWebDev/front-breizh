


window.onload = init;

function init(){

    let card_arr = document.querySelectorAll("#section2 .card-event-element");

    card_arr.forEach(element => {
        element.addEventListener('mouseenter', function() {
            let children = element.childNodes;
            let children_arr = Array.from(children);
            let linkCard_html = children_arr[3];
            linkCard_html.classList.remove("hidden");
        })

        element.addEventListener('mouseleave', function() {
            let children = element.childNodes;
            let children_arr = Array.from(children);
            let linkCard_html = children_arr[3];
            linkCard_html.classList.add("hidden");

        })
    })



    /*EFFET CARD */

    let couleurUne = 60;
    let couleurDeux = 30;
    let couleurUne_bool = false;
    let couleurDeux_bool = true;

    let trouverCouleur = function(couleur,couleur_bool
    ) {
        let teinteMax =   60;

        return "hsl(" + couleur + ", 100%, 45%)"
    }

    let incrementCouleur_fct = function(couleur, couleur_bool) {
        if(couleur_bool){couleur++} else {couleur--}
        return couleur;
    }

    let testCouleurBool_fct = function(couleur, couleur_bool) {
        if (couleur === 60){couleur_bool = false} else if (couleur === 0){couleur_bool = true}
        return couleur_bool;
    }

    let changeLinear = function() {
        let styleCardAfter = document.createElement('style');

        couleurUne = incrementCouleur_fct(couleurUne,couleurUne_bool);
        couleurDeux = incrementCouleur_fct(couleurDeux,couleurDeux_bool);
        couleurUne_bool = testCouleurBool_fct(couleurUne,couleurUne_bool);
        couleurDeux_bool = testCouleurBool_fct(couleurDeux,couleurDeux_bool);
        if(document.getElementsByTagName('style').length == 0) {
            let styleCardAfter = document.createElement('style');

            styleCardAfter.innerHTML = '.card-event::after{background:linear-gradient(0deg,' + trouverCouleur(couleurUne, couleurUne_bool) + ',' + trouverCouleur(couleurDeux, couleurDeux_bool) + ')}.card-event::before{background:linear-gradient(0deg,' + trouverCouleur(couleurUne, couleurUne_bool) + ',#0e1538,' + trouverCouleur(couleurDeux, couleurDeux_bool) + ')}';
            document.head.appendChild(styleCardAfter)}
        else {
            let styleCardAfter = document.head.lastChild;
            styleCardAfter.innerHTML = '.card-event::after{background:linear-gradient(0deg,' + trouverCouleur(couleurUne, couleurUne_bool) + ',' + trouverCouleur(couleurDeux, couleurDeux_bool) + ')}.card-event::before{background:linear-gradient(0deg,' + trouverCouleur(couleurUne, couleurUne_bool) + ',#0e1538,' + trouverCouleur(couleurDeux, couleurDeux_bool) + ')}';
        }
    }

    setInterval(changeLinear,15);





}