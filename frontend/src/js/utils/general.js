export default class General {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.loadArticles();
    }

    loadArticles() {
        fetch(`${this.baseUrl}/api/articles/preferences/${window.localStorage.getItem("userId")}`, { method: "GET" }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(rsp => {
            let temp, item, a;
            //get the template element:
            temp = document.getElementById("content-list").getElementsByTagName("template")[0];
            //get the DIV element from the template:
            item = temp.content.querySelector("div");
            //for each item in the array:
            rsp.forEach(article => {

                //Create a new node, based on the template:
                a = document.importNode(item, true);
                a.getElementsByClassName("article-footer")[0].getElementsByTagName("a")[0].addEventListener("click", this.openArticle.bind({}, article._id));
                //Add data from the array:
                // a.getElementsByTagName("p")[0].textContent += topic.tagName;
                a.getElementsByClassName("article-title")[0].textContent = article.title;
                a.getElementsByClassName("popularity-score")[0].textContent = `${article.popularity} likes`;
                a.getElementsByClassName("article-content")[0].textContent = article.previewContent;
                let tempHtml = "";
                article.tags.forEach(tag => {
                    if (tag) {
                        tempHtml += `<div class="tag-label article-tag-label">${tag}</div>`;
                    }
                })
                a.getElementsByClassName("article-footer")[0].getElementsByTagName("div")[0].innerHTML = tempHtml;
                //append the new node wherever you like:
                document.getElementById("content-list").appendChild(a);
            })
        })
    }

    openArticle = (id) => {
        window.app.router.goTo('app/readmore/id/' + id);
    }
}

window.pages.push(new General(window.endPoint));