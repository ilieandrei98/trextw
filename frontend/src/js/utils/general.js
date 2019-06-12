export default class General {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.loadArticles();
  }

  startLoading() {
    var filter = document.getElementsByClassName("filters-container")[0];
    filter.style.display = "none";
  }

  finishLoading() {

  }

  loadArticles() {
    this.startLoading();
    fetch(
      `${this.baseUrl}/api/articles/preferences/${window.localStorage.getItem(
        "userId"
      )}`,
      { method: "GET" }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(rsp => {
        let temp, item, articleTemplate;
        temp = document
          .getElementById("content-list")
          .getElementsByTagName("template")[0];
        item = temp.content.querySelector("div");

        rsp.forEach(article => {
          articleTemplate = document.importNode(item, true);
          articleTemplate
            .getElementsByClassName("article-footer")[0]
            .getElementsByTagName("a")[0]
            .addEventListener("click", this.openArticle.bind({}, article._id));

          articleTemplate.getElementsByClassName("article-title")[0].textContent = article.title;
          articleTemplate.getElementsByClassName("popularity-score")[0].textContent = `${article.popularity} likes`;
          articleTemplate.getElementsByClassName("article-content")[0].textContent = article.previewContent;

          let tempHtml = "";
          article.tags.forEach(tag => {
            if (tag) {
              tempHtml += `<div class="tag-label article-tag-label">${tag}</div>`;
            }
          });

          articleTemplate
            .getElementsByClassName("article-footer")[0]
            .getElementsByTagName("div")[0].innerHTML = tempHtml;

          document.getElementById("content-list").appendChild(articleTemplate);
          
          var filter = document.getElementsByClassName("filters-container")[0];
          filter.style.display = "block";
        });
      });
  }

  openArticle = id => {
    window.app.router.goTo("app/readmore/id/" + id);
  };
}

window.pages.push(new General(window.endPoint));
