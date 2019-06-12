import Readmore from "./readmore.js";

export default class Router {
    self = this;
    constructor(routes, el) {
        this.routes = routes;
        this.el = el;
        window.onhashchange = this.hashChanged.bind(this);
        this.hashChanged();
    }

    async hashChanged(ev) {
        if (window.location.hash.length >= 0) {
            const token = localStorage.getItem("token");
            if(token){
                fetch(window.endPoint + '/api/authorization/verify', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token
                    })
                }).then(res => res.json()).then(data => {
                    if(!data.success){
                        this.goTo('login');
                    }
                });
            } else{
                if(window.location.hash != "#register" && window.location.hash != "#topics")
                    setTimeout(function(){self.goTo('login');}, 500);
            }

            const pageName = window.location.hash.substr(1);
            if (pageName.indexOf('app') >= 0) {
                if (this.el.id != "general-content") {
                    this.show('app').then(() => {
                        this.el = document.getElementById("general-content");
                        window.groups.loadGroups();
                        document.getElementById("header-username").textContent = window.localStorage.getItem("username");
                        document.getElementById("header-logo").textContent = window.localStorage.getItem("username")[0];
                    })
                }
            } else {
                this.el = document.getElementById("router");
            }
            if (pageName != 'app/' && pageName != 'app') {
                if (this.routes[pageName.split('/id/')[0]]) {
                    this.show(pageName.split('/id/')[0]);
                    if (pageName.split('/id/')[0] == "app/readmore") {
                        let readmore = new Readmore(window.endPoint, pageName.split('/id/')[1])
                    }
                } else {
                    this.goTo('app/newsfeed');
                }
            } else {
                this.goTo('app/newsfeed');
            }
        }
    }

    async show(pageName) {
        const page = this.routes[pageName];
        await page.load();
        this.el.innerHTML = '';
        page.show(this.el);
    }

    async goTo(pageName) {
        if (window.pages) {
            window.pages.pop();
        }
        window.location.hash = `#${pageName}`;
    }

    changeRouter(el) {
        this.el = el;
    }
}

