String.prototype.isValidJSON = function() {
    try {
        JSON.parse(this);
    }
    catch(e) {
        return false;
    }
    return true;
}