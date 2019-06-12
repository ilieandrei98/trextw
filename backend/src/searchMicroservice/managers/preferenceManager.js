const userModel = require("../../shared/userModel");
const groupModel = require("../../shared/groupModel");
const articleManager = require("./articleManager");

class PreferenceManager {
  async getUserPreferenceTags(userId) {
    let query = { _id: userId };
    let user = await userModel.findOne(query).exec();

    if (user == null) {
      return Array(0);
    }

    let articles = [];
    for (let i = 0; i < user.topics.length; i++) {
      var data = await articleManager.searchTagInTheDatabase(
        user.topics[i].tag,
        parseInt(user.topics[i].relevance)
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

  async getGroupPreferenceTags(groupId) {
    let query = { _id: groupId };
    let group = await groupModel.findOne(query).exec();

    if (group == null) {
      return Array(0);
    }

    let articles = [];
    for (let i = 0; i < group.tags.length; i++) {
      var data = await articleManager.searchTagInTheDatabase(
        group.tags[i].tag,
        parseInt(group.tags[i].relevance)
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
