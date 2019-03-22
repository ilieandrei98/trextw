var verifyLogin = function (e) {
    e.preventDefault();

    var user = getUserObject("login-form");

    console.log(user);
};

var registerUser = function(e){
    e.preventDefault();

    var user = getUserObject("register-form");

    console.log(user);
}

var getUserObject = function(id){
    var form = new FormData(document.getElementById(id));
    var obj = {};

    form.forEach(function(value, key){
        obj[key] = value;
    });

    return obj;
};