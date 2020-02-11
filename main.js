class Card {
  constructor(title, source, content) {
    this.title = title;
    this.source = source;
    this.content = content;
  }
}

var cards = [];

var cardButton = document.getElementById("addCard");
var rebuttalButton = document.getElementById("addRebuttal");

var cardParent = document.getElementById("cardParent");
var rebuttalParent = document.getElementById("rebuttalParent");

var fileLabel = document.getElementById("fileLabel");

function replaceStr(str, key, rep) {
  var g = str.replace(key, rep);
  while (g.replace(key, rep) != g) {
    g = g.replace(key, rep);
  }
  return g;
}

function addCard(title, src, contentTxt) {
  var editable = title == null;

  // Creating a fieldset
  var fieldset = document.createElement("fieldset");

  // Creating a legend for the fieldset
  var legend = document.createElement("legend");
  var legendHeader = document.createElement("h3");
  legendHeader.innerHTML = "Enter your card title";

  legend.appendChild(legendHeader);
  var legendInput = document.createElement("input");
  legendInput.type = "text";
  if (editable) {
    legendInput.value = "";
  } else {
    legendInput.value = title;
  }
  legend.appendChild(legendInput);
  fieldset.appendChild(legend);

  // Creating body for the fieldset
  var sourceText = document.createElement("h4");
  sourceText.innerHTML = "Enter the web URL: ";
  fieldset.appendChild(sourceText);

  var source = document.createElement("input");
  source.type = "text";
  source.innerHTML = "Source of card";
  if (editable) {
    source.value = "Source of card";
  } else {
    source.value = src;
  }
  fieldset.appendChild(source);

  var brArr = []
  brArr.push(document.createElement("br"));
  brArr.push(document.createElement("br"));
  brArr.push(document.createElement("br"));

  fieldset.appendChild(brArr[0]);
  fieldset.appendChild(brArr[1]);

  var content = document.createElement("textarea");
  content.innerHTML = "Enter the content of your card here";
  if (editable) {
    content.innerHTML = "Enter the content of your card here";
  } else {
    content.innerHTML = contentTxt;
  }
  fieldset.appendChild(content);

  //create the element
  fieldset.appendChild(brArr[2]);
  var createButton = document.createElement("button");
  createButton.innerHTML = "Create";
  function create() {
    legendHeader.innerHTML = legendInput.value;
    legendInput.remove();

    var link = document.createElement("a");
    link.innerHTML = source.value;
    link.href = source.value;
    sourceText.parentNode.replaceChild(link, sourceText);
    source.remove();

    var tempCardArr = [legendHeader.innerHTML, link.innerHTML, content.value];
    var cardLength = cards.length;
    cards.push(tempCardArr);
    console.log(tempCardArr);
    console.log('----------');

    var contentText = document.createElement("p");
    contentText.innerHTML = replaceStr(content.value, "\n", "<br>");
    content.parentNode.replaceChild(contentText, content);

    for (var i = 0; i < brArr.length; i++) {
      brArr[i].remove();
    }
    brArr = [];

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
      cards.splice(cardLength, 1);
      fieldset.remove();
    };
    fieldset.appendChild(deleteButton);

    createButton.remove();
  }
  createButton.onclick = create;
  if (!editable) {
    create();
  }

  fieldset.appendChild(createButton);

  cardParent.appendChild(fieldset);
}

cardButton.onclick = function() {addCard(null, null, null);};

function download() {
  var cardClasses = [];
  for (var i = 0; i < cards.length; i++) {
    cardClasses.push(new Card(cards[i][0], cards[i][1], cards[i][2]));
  }
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cardClasses)));
  element.setAttribute('download', "debateDocs.json");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function Load_Data() {
  var reader = new FileReader();
  reader.onload = function(event) {
    console.log(event.target.result);
    var json = JSON.parse(event.target.result);
    for (var i = 0; i < json.length; i++) {
      var title = json[i].title;
      var source = json[i].source;
      var content = json[i].content;
      addCard(title, source, content);
    }
  };
  reader.readAsText(event.target.files[0]);
}
