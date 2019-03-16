export default class Router {
    constructor(routes, el) {
        this.routes = routes;
        this.el = el;
        window.onhashchange = this.hashChanged.bind(this);
        this.hashChanged();
    }

    async hashChanged(ev) {
        if (window.location.hash.length > 0) {
            const pageName = window.location.hash.substr(1);
            if(this.routes[pageName]){
                this.show(pageName);
            }else{
                this.show('default');
            }
        } else if (this.routes['default']) {
            this.show('default');
        }
    }

    async show(pageName) {
        const page = this.routes[pageName];
        await page.load();
        this.el.innerHTML = '';
        page.show(this.el);
    }
}

