Array.prototype.firstOrUndefined = function(){
    return this.find(() => true);
};