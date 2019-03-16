import Router from './utils/router.js';
import Layout from './utils/layout.js';
import Page from './utils/page.js';

class App {
    constructor() {
        this.router = new Router(
            {
                about: new Layout(new Page('menu.html'), new Page('about.html')),
                home: new Layout(new Page('menu.html'), new Page('home.html')),
                default: new Page('menu.html'),
            },
            document.getElementById('router')
        );
    }
}

const app = new App();
