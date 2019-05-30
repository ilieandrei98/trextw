export default class Page {
    constructor(url, js) {
        this.url = 'src/views/' + url;
        this.js = js ? 'src/js/utils/' + js : null;
    }

    load() {
        return fetch(this.url, { method: "GET" }).then(res => res.text()).then(html => {
            this.html = html
            this.js ? new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.id = this.js;
                document.body.appendChild(script);
                script.type = "module";
                script.onload = resolve;
                script.onerror = reject;
                script.async = true;
                script.src = `${this.js}?cachebuster=${new Date().getTime()}`;
            }).then(() => {
                document.getElementById(this.js).remove();
            }) : null;
        });
    }

    show(el) {
        el.innerHTML = this.html;
    }
}
