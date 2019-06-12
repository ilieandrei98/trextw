export default class Layout {
    constructor(...pages) {
        this.pages = pages;
    }

    load() {
        return Promise.all(this.pages.map(page => page.load()));
    }

    show(el) {
        for (let page of this.pages) {
            const div = document.createElement('div');
            //div.style.width = "100vw";
            //div.style.height = "100vh";
            page.show(div);
            el.appendChild(div);
        }
    }
}
