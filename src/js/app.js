import Router from './utils/router.js';
import Layout from './utils/layout.js';
import Page from './utils/page.js';

class App {
    constructor() {
        this.state={
            
        }
        this.router = new Router(
            {
                login: new Page('login.html'),
                register: new Page('register.html'),
                newsfeed: new Page('news-feed.html'),
                topics: new Page('topics.html'),
                readmore: new Page('read-more.html'),
                default: new Page('general-layout.html'),
                about: new Layout(new Page('menu.html'), new Page('about.html')),
                home: new Layout( new Page("add-group-popup.html")),
                default: new Page('general-layout.html'),                
            },
            document.getElementById('router')
        );
    }
}

const app = new App();
