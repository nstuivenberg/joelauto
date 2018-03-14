var punten = 0;
var carElement;

document.body.addEventListener('keydown',keypress);


/**
 * Deze functie wordt geladen als de pagina wordt geladen.
 * Misschien wil je niet dat het spelletje begint onpageload, maar als je bijvoorbeeld op een start knop drukt.
 * Dan zou je iets met deze functie moeten doen (en in de html).
 * Deze functie is verantwoordelijk voor het maken en plaatsen van de 'auto'. Het rode vlak. En hij laat vervolgens
 * één element gemaakt door de functie elementCreator() naar beneden vallen.
 * Hoe ga jij ervoor zorgen dat die meerdere element gaat laten vallen?
 */
function onStart() {
     drop(elementCreator());

     carElement = document.createElement("div");
     carElement.setAttribute("id", "auto");
     carElement.style.width = "100px";
     carElement.style.height = "100px";
     carElement.style.left = "8vw";

     document.getElementsByClassName("trapezoid")[0].appendChild(carElement);
}

/**
 * Deze functie ontvangt een DOM-element.
 * Deze laat hij vervolgens langzaamaan naar beneden vallen.
 * Deze functie checkt ook of er een botsing met een element dat de class coin heeft.
 * Als dat het geval is, krijg je er een punt bij
 * Wat zou je hier toevoegen zodat die kan checken of je een pion aanraakt?
 * @param DOMElement
 */
function drop(DOMElement) {
    var element = DOMElement;
    document.body.appendChild(element);
    var movement = setInterval(dropping, 100)


    function dropping() {
        var top = parseInt(element.style.top);
        var width = parseInt(element.style.width);
        var height = parseInt(element.style.height);

        var className = element.getAttribute("class");

        if(top === 100) {
            // De auto heeft de munt niet geraakt & de munt is helemaal onderaan
            clearInterval(movement);
            //Dit verwijdert het element!
            document.body.removeChild(element);
        } else if (isTouching(carElement, element) && className === "coin") {
            punten++;
            clearInterval(movement);
            document.body.removeChild(element);

        } else {
            top++;
            width++;
            height++;
            element.style.top = top + "vh";
            element.style.height = height + "px";
            element.style.width = width + "px";
        }
    }
}

/**
 * Deze functie is verantwoordelijk voor het maken van een HTML element. Er zit nog geen random factor in.
 * Wat je hier nog kan maken: zorgen dat er een pion ipv van een muntje naar beneden komt
 * Ervoor zorgen dat die links of rechts begint.
 * Hoe zou je dat doen?
 * @returns {Element}
 */
function elementCreator() {
    var anElement = document.createElement("div");
    anElement.setAttribute("class","coin");

    // We doen onderstaande niet in de CSS, want anders kunnen we hem niet aanpassen.
    anElement.style.top = "1vh";
    anElement.style.width = "10px";
    anElement.style.height = "10px";

    //Rechts style.right doen.
    anElement.style.left = "30vw";
    //anElement.style.right = "30vw";

    return anElement;
}

/**
 * Deze functie geeft de top en left van een element terug
 * Super handig als je wilt checken of het ene element het andere element aanraakt
 * @param el
 * @returns {{top: number, left: number}}
 */
function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

/**
 * Deze functie vergelijkt of twee html-element elkaar aanraken. Als je deze functie aanroept, zorg er altijd voor dat
 * het eerste element de auto is.
 * @param one: should be the car
 * @param two: Element that is going down!
 * @returns {boolean}
 */
function isTouching(one, two) {
    var oneY = getOffset(one).top;
    var oneYEnd = oneY;
    var oneX = getOffset(one).left;
    var oneXEnd = oneX;


    var oneH = parseInt(one.style.height);
    var oneW = parseInt(one.style.width);


    if(oneH !== undefined
        && oneH !== null
        && !isNaN(oneH)
        && oneH !== "") {
        oneYEnd += oneH;
    } else {
        console.log("WARNING. COULD NOT FIND HEIGHT OF FIRST ELEMENT");
    }

    if(oneW !== undefined
        && oneW !== null
        && !isNaN(oneW)
        && oneW !== "") {
        oneXEnd += oneW;
    } else {
        console.log("WARNING. COULD NOT FIND WIDTH OF FIRST ELEMENT");
    }

    var twoY = getOffset(two).top;
    var twoX = getOffset(two).left;
    var twoYEnd = twoY;
    var twoXEnd = twoX;
    var twoH = parseInt(two.style.height);
    var twoW = parseInt(two.style.width);
    if(twoH !== undefined
        && twoH !== null
        && !isNaN(twoH)
        && twoH !== "") {
        twoYEnd += twoH;
    } else {
        console.log("WARNING. COULD NOT FIND HEIGHT OF SECOND ELEMENT");
    }

    if(twoW !== undefined
        && twoW !== null
        && !isNaN(twoW)
        && twoW !== "") {
        twoXEnd += twoW;
    } else {
        console.log("WARNING. COULD NOT FIND WIDTH OF SECOND ELEMENT");
    }


    if (twoYEnd > oneY && oneYEnd > twoY) {
        console.log("THEY ARE TOUCHING on Y");
        if (twoXEnd > oneX && oneXEnd > twoX) {
            console.log("THEY ARE TOUCHING on X (and Y)");
            return true;
        }
        return false;
    }
    return false;
}

/**
 * Deze functie verplaats de auto 2vw naar links of rechts. De auto gaat als het goed is niet buiten de baan.
 * @param direction
 */
function useTheWheelLuke(direction) {

    var left = parseInt(carElement.style.left);

    if(direction === "L") {

        left = left - 2;
        if(left < 0) {
            left = 0;
        }
    }
    if(direction === "R") {
        left += 2;
        if (left > 52) {
            left = 52;
        }
    }
    carElement.style.left = left + "vw";
}
function keypress(event){
    if(event.keyCode == 37){
        useTheWheelLuke("L");
    }
    if(event.keyCode ==  39) {
        useTheWheelLuke("R");
    }
}