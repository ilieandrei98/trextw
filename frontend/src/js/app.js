import Router from "./utils/router.js";
import Layout from "./utils/layout.js";
import Page from "./utils/page.js";
import Auth from "./utils/authentication.js";

window.endPoint = "http://localhost:3000";

class App {
  constructor() {
      this.state = {};

      this.router = new Router(
        {
          login: new Page("login.html"),
          register: new Page("register.html"),
          "app/newsfeed": new Page("news-feed.html", "general.js"),
          topics: new Page("topics.html", "topics.js"),
          "app/readmore": new Page("read-more.html", "readmore.js"),
          about: new Layout(new Page("menu.html"), new Page("about.html")),
          app: new Layout(
            new Page("general-layout.html"),
            new Page("add-group-popup.html"),
            new Page("join-group-popup.html")
          )
        },
        document.getElementById("router")
      );

      this.auth = new Auth(window.endPoint);
      window.pages = [];
      window.user = {
        fullName: ""
      };

      if (window.localStorage.getItem("userId")) {
        window.user.userId = window.localStorage.getItem("userId");
        window.user.fullName = window.localStorage.getItem("username");
      }
  }
}

const app = new App();

window.app = app;
