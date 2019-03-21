export default class Meniu {    
    static showMeniu() {
        var elements = document.getElementsByClassName("mobile-meniu");

        elements[0].classList.add("animated-in");
        elements[1].classList.add("animate-overlay-in");
        
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    }

    static closeMeniu() {
        var elements = document.getElementsByClassName("mobile-meniu");

        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }
}