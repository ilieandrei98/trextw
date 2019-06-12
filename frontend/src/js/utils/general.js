export default class General {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.loadArticles();
  }

  async checkElement(selector) {
    while (document.getElementsByClassName(selector) === null) {
        await this.rafAsync()
    }
    return true;
  }

  rafAsync() {
      return new Promise(resolve => {
          requestAnimationFrame(resolve);
      });
  }

  loadArticles() {
    this.checkElement('filters-container').then(element => {      
          //document.getElementsByClassName("filters-container")[0].classList.add("not-none-class");
          document.getElementsByClassName("filters-container")[0].style.display = "none";
          document.getElementsByClassName("feed-title")[0].style.display = "none";
          document.getElementsByClassName("loader-overlay")[0].style.display = "block";
    });

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
        this.checkElement('filters-container').then(element => {      
          document.getElementsByClassName("filters-container")[0].style.display = "block";
          document.getElementsByClassName("feed-title")[0].style.display = "block";
          document.getElementsByClassName("loader-overlay")[0].style.display = "none";
        });
      });
    }
}

window.pages.push(new General(window.endPoint));
