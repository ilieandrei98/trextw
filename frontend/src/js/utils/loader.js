export default class Loader {
    constructor(){}
    
    showLoader() {
        var loader = document.getElementsByClassName("loader-overlay")[0];
        loader.style.display = "block";
    }

    closeLoader() {
        var loader = document.getElementsByClassName("loader-overlay")[0];
        loader.style.display = "none";
    }
}