export default class Page {
    constructor(url) {
        this.url = 'src/views/' + url;
    }

    load() {
        return fetch(this.url, { method: "GET" }).then(res => res.text()).then(html => this.html = html);
    }

    show(el) {
        el.innerHTML = this.html;
    }
}
