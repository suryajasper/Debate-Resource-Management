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
    legendInput.innerHTML = "";
  } else {
    legendInput.innerHTML = title;
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
    source.innerHTML = "Source of card";
  } else {
    source.innerHTML = src;
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

    cards.push([legendHeader.innerHTML, link.innerHTML, content.value]);

    var contentText = document.createElement("p");
    contentText.innerHTML = replaceStr(content.value, "\n", "<br>");
    content.parentNode.replaceChild(contentText, content);

    for (var i = 0; i < brArr.length; i++) {
      brArr[i].remove();
    }
    brArr = [];

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
