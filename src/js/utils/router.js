import Readmore from "./readmore.js";

export default class Router {
    constructor(routes, el) {
        this.routes = routes;
        this.el = el;
        window.onhashchange = this.hashChanged.bind(this);
        this.hashChanged();
    }

    async hashChanged(ev) {
        if (window.location.hash.length >= 0) {
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
        console.log(window.pages);
        
    }

    changeRouter(el) {
        this.el = el;
    }
}

