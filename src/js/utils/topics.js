class Topics {
  constructor(baseUrl) {
    this.topics = [];
    this.addedTopics = [];
    fetch(`${baseUrl}/api/tags/default`, { method: "GET" }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    }).then((rsp) => {
      this.topics = rsp;
      this.loadTopics();
    })

  }

  addTopic = (topic) => {
    let temp, item, a;
    this.addedTopics.push(topic);
    temp = document.getElementById("chosen-topics").getElementsByTagName("template")[0];
    //get the DIV element from the template:
    item = temp.content.querySelector("div");
    //Create a new node, based on the template:
    a = document.importNode(item, true);
    a.addEventListener("click", this.removeTopic.bind(this, topic))
    //Add data from the array:
    a.textContent += topic.tagName;
    a.id = `topic-${topic._id}`;
    //append the new node wherever you like:
    document.getElementById("chosen-topics").appendChild(a);
  }

  removeTopic(topic) {
    document.getElementById(`topic-${topic._id}`).remove();
    this.addedTopics = this.addedTopics.filter(el => el._id !== topic._id);
  }

  loadTopics() {
    let temp, item, a;
    console.log('watafakload');
    document.getElementById("fullname").textContent = window.user.fullName;
    //get the template element:
    temp = document.getElementById("topic-list").getElementsByTagName("template")[0];
    //get the DIV element from the template:
    item = temp.content.querySelector("div");
    //for each item in the array:
    this.topics.forEach(topic => {

      //Create a new node, based on the template:
      a = document.importNode(item, true);
      a.addEventListener("click", this.addTopic.bind(this, topic))
      //Add data from the array:
      a.getElementsByTagName("p")[0].textContent += topic.tagName;
      //append the new node wherever you like:
      document.getElementById("topic-list").appendChild(a);
    })
  }

  proceed = () => {
    window.app.auth.updateTopics(this.addedTopics.map(topic => topic.tagName));
  }
}

window.pages.push(new Topics("http://10.20.0.15:3000"));