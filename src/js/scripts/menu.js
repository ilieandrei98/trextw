export default class Menu {
    showMenu() {
        var elements = document.getElementById("mobile-menu");

        elements[0].classList.add("animated-in");
        elements[1].classList.add("animate-overlay-in");
        
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    }

    closeMenu() {
        var elements = document.getElementById("mobile-menu");

        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }
}