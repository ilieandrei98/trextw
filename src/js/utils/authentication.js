export default class Auth {

    constructor(endpoint) {
        this.baseUrl = endpoint + "/api/users/";
    }

    verifyLogin = (e) => {
        e.preventDefault();
        document.getElementById("login-error").textContent = "";

        let user = this.getUserObject("login-form");
        fetch(this.baseUrl + "login", { method: "POST", body: JSON.stringify(user) }, (rsp, err) => {
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(rsp => {
            window.localStorage.clear();
            window.localStorage.setItem('userId', rsp._id);
            window.localStorage.setItem('username', rsp.fullName);
            window.user.fullName = rsp.fullName;
            window.user.userId = rsp._id;
            if (rsp.topics.length == 0) {
                window.app.router.goTo("topics");
            } else {
                window.app.router.goTo("default");
            }
        }).catch(err => {
            document.getElementById("login-error").textContent = "Ati introdus datele gresit!";

        })
    };

    registerUser = (e) => {
        e.preventDefault();
        document.getElementById("register-error").textContent = "";

        let user = this.getUserObject("register-form");
        if (user.password != user.repeatPassword) {
            document.getElementById("register-error").textContent = "Parolele nu se potrivesc!";
            return;
        }

        console.log(user);
        // call register api
        fetch(this.baseUrl + "register", { method: "POST", body: JSON.stringify(user) }, (rsp, err) => {
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(rsp => {
            window.localStorage.clear();
            window.localStorage.setItem('userId', rsp._id);
            window.localStorage.setItem('username', rsp.fullName);
            window.user.fullName = rsp.fullName;
            window.user.userId = rsp._id;
            window.app.router.goTo("topics");
        }).catch(err => {
            document.getElementById("register-error").textContent = "Userul deja exista!";

        })
    }

    updateTopics = (topics) => {
        fetch(`${this.baseUrl}add-topics`, {
            method: "POST", body: JSON.stringify({
                userId: window.user.userId,
                topics: topics
            })
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(rsp => {
            console.log(rsp);
            window.app.router.goTo("default");
        });
    }

    getUserObject = (id) => {
        let form = new FormData(document.getElementById(id));
        let obj = {};

        form.forEach((value, key) => {
            obj[key] = value;
        });

        return obj;
    };
}