export default class General {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.loadArticles();
  }

  startLoading() {
    var filter = document.getElementsByClassName("filters-container")[0];
    filter.style.display = "none";
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
        articleHelper.setArticles(rsp);
        addArticlesToPage.call(this,rsp);
      });
    }
}

window.pages.push(new General(window.endPoint));
