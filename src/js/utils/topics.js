alert("abc");
var isButtonActive = [];
var topicContent = ["", "", ""];
var topicContentId = [-1,-1 ,-1 ];
for (var x = 1; x <= 15; x++) isButtonActive[x] = 0;

isTopicAvailable = function () {
    for (var i = 0; i < 3; i++){
        if (topicContentId[i] == -1) {
            return i;
        }
    }
    return -1;
}

writeTopic = function (buttonNumber,whereTo) {
    topicContent[whereTo] = document.getElementById("button" + buttonNumber.toString()).innerHTML;
    topicContentId[whereTo] = buttonNumber;
    document.getElementById("topic" + (whereTo + 1).toString()).classList.remove("topic-miniature-unused");
    document.getElementById("topic" + (whereTo + 1).toString()).innerHTML = topicContent[whereTo];
}

resetTopic = function (buttonNumber) {
    for (var i = 0; i < 3; i++){
        if (topicContentId[i] == buttonNumber)
        {
            topicContent[i] = "";
            topicContentId[i] = -1;
            document.getElementById("topic" + (i+1).toString()).className += " topic-miniature-unused";
            }
    }
}

topicClick = function (topicNumber) {
    document.getElementById("topic" + topicNumber.toString()).className += " topic-miniature-unused";
    isButtonActive[topicContentId[topicNumber - 1]] = 0;
    document.getElementById("button"+topicContentId[topicNumber - 1].toString()).classList.remove("topic-item-active");
    topicContentId[topicNumber - 1] = -1;
    topicContent[topicNumber - 1] = "";
}

toggleActive = function (buttonNumber) {
  console.log("abc");
    var buttonName = "button" + buttonNumber.toString();
    if (!isButtonActive[buttonNumber]) {
        if (isTopicAvailable() != -1) {
            document.getElementById(buttonName).className += " topic-item-active";
            writeTopic(buttonNumber, isTopicAvailable());
        }
        else
        isButtonActive[buttonNumber] = 1 - isButtonActive[buttonNumber];
  } else {
      document.getElementById(buttonName).classList.remove("topic-item-active");
      resetTopic(buttonNumber);
  }
  isButtonActive[buttonNumber] = 1 - isButtonActive[buttonNumber];
};
/* #region   */
// window.onload = function () {
//   document.addEventListener('click', function (e) {
//     if(e.target.classList[0] == 'topic-item') {
//       var x = e.target.id.toString().substring(6);
//       toggleActive(x);
//       }
//   });
// var x = document.getElementsByClassName('topic-item');
window.onload = function () {
  document.getElementById("button1").addEventListener("click", function () {
    toggleActive(1);
  });
  document.getElementById("button2").addEventListener("click", function () {
    toggleActive(2);
  });
  document.getElementById("button3").addEventListener("click", function () {
    toggleActive(3);
  });
  document.getElementById("button4").addEventListener("click", function () {
    toggleActive(4);
  });
  document.getElementById("button5").addEventListener("click", function () {
    toggleActive(5);
  });
  document.getElementById("button6").addEventListener("click", function () {
    toggleActive(6);
  });
  document.getElementById("button7").addEventListener("click", function () {
    toggleActive(7);
  });
  document.getElementById("button8").addEventListener("click", function () {
    toggleActive(8);
  });
  document.getElementById("button9").addEventListener("click", function () {
    toggleActive(9);
  });
  document.getElementById("button10").addEventListener("click", function () {
    toggleActive(10);
  });
  document.getElementById("button11").addEventListener("click", function () {
    toggleActive(11);
  });
  document.getElementById("button12").addEventListener("click", function () {
    toggleActive(12);
  });
  document.getElementById("button13").addEventListener("click", function () {
    toggleActive(13);
  });
  document.getElementById("button14").addEventListener("click", function () {
    toggleActive(14);
  });
  document.getElementById("button15").addEventListener("click", function () {
    toggleActive(15);
  });
  document.getElementById("topic1").addEventListener("click", function () {
    topicClick(1);
  });
  document.getElementById("topic2").addEventListener("click", function () {
    topicClick(2);
  });
  document.getElementById("topic3").addEventListener("click", function () {
    topicClick(3);
  });

}
//}

/* #endregion */
