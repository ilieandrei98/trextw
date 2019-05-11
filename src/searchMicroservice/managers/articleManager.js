const articleModel = require("../models/articleModel");
const https = require("https");
const Promise = require("promise");

class ArticleManager {
  constructor() {
    this.maxPopularity = 5000;
  }

  searchArticleInDatabase(keyword) {
    let query = {
      $or: [
        { text: new RegExp(".*" + keyword + ".*") },
        { title: new RegExp(".*" + keyword + ".*") }
      ]
    };
    let data = articleModel.find(query);

    return data;
  }

  searchArticleOnMedium(keyword) {
    let articlesToReturn = [];

    const options = {
      hostname: "medium.com",
      port: 443,
      path: "/search?q=" + keyword,
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    };

    return new Promise((resolve, reject) => {
      https
        .request(options, response => {
          let data = "";
          response.setEncoding("utf8");
          response.on("data", chunk => {
            data += chunk;
          });

          response.on("end", () => {
            data = data.replace("])}while(1);</x>", "");
            data.substring(1, data.length - 1);

            data = JSON.parse(String(data)).payload.value.posts;

            let promises = [];
            data.forEach(element => {
              promises.push(this.saveMediumArticle(element.id));
            });

            Promise.all(promises).then(values => {
              values.forEach(element => {
                articlesToReturn.push(element);
              });

              resolve(articlesToReturn);
            });
          });
        })
        .on("error", e => {
          console.error(`Problem with request: ${e.message}`);
        })
        .end();
    });
  }

  saveMediumArticle(mediumArticleId) {
    const options = {
      hostname: "medium.com",
      port: 443,
      path: "/_/api/posts/" + mediumArticleId,
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    };

    return new Promise((resolve, reject) => {
      https
        .request(options, response => {
          let data = "";
          response.setEncoding("utf8");
          response.on("data", chunk => {
            data += chunk;
          });

          response.on("end", () => {
            data = data.replace("])}while(1);</x>", "");
            data = JSON.parse(String(data)).payload.value;

            resolve(this.mapMediumArticle(data));
          });
        })
        .on("error", e => {
          console.error(`Problem with request: ${e.message}`);
        })
        .end();
    });
  }

  mapMediumArticle(mediumArticle) {
    var article = new articleModel();
    article.title = mediumArticle.title;
    article.mediumId = mediumArticle.id;
    article.previewImage = mediumArticle.virtuals.previewImage.imageId;
    article.popularity = mediumArticle.virtuals.totalClapCount;

    article.previewContent = "";
    mediumArticle.previewContent.bodyModel.paragraphs.forEach(element => {
      article.previewContent += element.text + "\n";
    });

    article.text = "";
    mediumArticle.content.bodyModel.paragraphs.forEach(element => {
      article.text += element.text + "\n";
    });

    mediumArticle.virtuals.tags.forEach(element => {
      article.tags.addToSet(element.slug);
    });

    articleModel.countDocuments({ mediumId: mediumArticle.id }).then(result => {
      if (result == 0) {
        article.save();
      }
    });

    return article;
  }
}

module.exports = new ArticleManager();
