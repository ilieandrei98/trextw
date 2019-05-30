const userModel = require("../models/recomandation/userModel");
const articleManager = require("./articleManager");

class PreferenceManager {
  async getUserPreferenceTags(userId) {
    let query = { _id: userId };
    let user = await userModel.findOne(query).exec();

    if (user == null) {
      return Array(0);
    }

    let articles = [];
    for (let i = 0; i < user.preferences.length; i++) {
      var data = await articleManager.searchTagInTheDatabase(
        user.preferences[i].tag,
        parseInt(user.preferences[i].relevance)
      );

      for (let j = 0; j < data.length; j++) {
        var found = articles.find(x => x._id === data[j]._id);
        if (!found) {
          articles.push(data[j]);
        }
      }
    }

    return this.shuffle(articles);
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);

    return array;
  }
}

module.exports = new PreferenceManager();
