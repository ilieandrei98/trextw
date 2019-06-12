const articleModel = require("../models/articleModel");
const https = require("https");
const Promise = require("promise");

class ArticleManager {
  constructor() {
    this.maxPopularity = 5000;
  }

  searchArticleInDatabase(keyword) {
    keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let query = {
      $or: [
        { text: new RegExp(".*" + keyword + ".*") },
        { title: new RegExp(".*" + keyword + ".*") }
      ]
    };
    let data = articleModel.find(query);

    return data;
  }

  async searchTagInTheDatabase(tag, limit) {
    tag = tag.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&")
    let query = { tags: new RegExp(".*" + escape(tag) + ".*") };
    var articles = await articleModel.find(query).exec();

    var returnArticles = await this.wheelOfFortune(articles, limit);

    return returnArticles;
  }

  async wheelOfFortune(articles, limit) {
    if (limit > articles.length) {
      return articles;
    }

    var totalPopularity = 0;
    articles.forEach(element => {
      totalPopularity += element.popularity;
    });

    var cumulativeFitness = [];
    cumulativeFitness[0] = 0;
    for (let i = 1; i < articles.length; i++) {
      cumulativeFitness[i] =
        cumulativeFitness[i - 1] + articles[i].popularity / totalPopularity;
    }

    var alreadySelected = Array(articles.length);
    alreadySelected.fill(0);

    var selected = 0;
    var finalArray = [];

    while (selected <= limit) {
      var random = Math.random();
      for (let i = 0; i <= articles.length - 1; i++) {
        if (
          cumulativeFitness[i] <= random &&
          random <= cumulativeFitness[i + 1] &&
          alreadySelected[i + 1] == 0
        ) {
          alreadySelected[i + 1] = 1;
          selected++;

          finalArray.push(articles[i + 1]);
        }
      }
    }

    return finalArray;
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
