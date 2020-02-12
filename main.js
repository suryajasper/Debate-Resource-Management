class Card {
  constructor(title, source, content) {
    this.title = title;
    this.source = source;
    this.content = content;
  }
}
class Rebuttal {
  constructor(title, source, content) {
    this.title = title;
    //this.side = side;
    this.source = source;
    this.content = content;
  }
}

var cards = [];
var rebuttals = [];

var cardButton = document.getElementById("addCard");
var rebuttalButton = document.getElementById("addRebuttal");

var cardParent = document.getElementById("cardParent");
var rebuttalParent = document.getElementById("rebuttalParent");

var fileLabel = document.getElementById("fileLabel");

var autoSave = document.getElementById("autosave");

var searchField = document.getElementById("searchField");
var searchButton = document.getElementById("searchButton");

function replaceStr(str, key, rep) {
  var g = str.replace(key, rep);
  while (g.replace(key, rep) != g) {
    g = g.replace(key, rep);
  }
  return g;
}

function createSelect(values, name) {
  var select = document.createElement("select");
  select.required = true;
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.innerHTML = values[i];
    select.appendChild(option);
  }
  return select;
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
    if (autoSave.checked) {
      saveCardsInBrowser();
    }
    //console.log(tempCardArr);
    //console.log('----------');

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
      if (autoSave.checked) {
        saveCardsInBrowser();
      }
      fieldset.remove();
    };
    fieldset.appendChild(deleteButton);
    try {
      createButton.remove();
    }
    catch (error) { }
  }
  if (editable) {
    var createButton = document.createElement("button");
    createButton.innerHTML = "Create";
    createButton.onclick = create;
    fieldset.appendChild(createButton);
  }
  else {
    create();
  }

  cardParent.appendChild(fieldset);
}

function addRebuttal(title, src, contentTxt) {
  var editable = title == null;

  // Creating a fieldset
  var fieldset = document.createElement("fieldset");

  // Creating a legend for the fieldset
  var legend = document.createElement("legend");
  var legendHeader = document.createElement("h3");
  legendHeader.innerHTML = "What argument are you refuting?";

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

  var select = createSelect(["Aff", "Neg"], "side");
  var labelSelect = document.createElement("label");
  labelSelect.for = "side";
  labelSelect.innerHTML = "Side for rebuttal";

  fieldset.appendChild(labelSelect);
  fieldset.appendChild(select);

  // Creating body for the fieldset
  var sourceText = document.createElement("h4");
  sourceText.innerHTML = "Enter the web URL: ";
  fieldset.appendChild(sourceText);

  var source = document.createElement("input");
  source.type = "text";
  if (editable) {
    source.value = "Source for rebuttal";
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
  if (editable) {
    content.innerHTML = "Enter the content of your rebuttal here";
  } else {
    content.innerHTML = contentTxt;
  }
  fieldset.appendChild(content);

  //create the element
  fieldset.appendChild(brArr[2]);

  function create() {
    legendHeader.innerHTML = legendInput.value;
    legendInput.remove();

    labelSelect.innerHTML = "Side: " + select.value;
    labelSelect.style.display = "block";
    if (select.value === "Neg") {
      labelSelect.style.color = "rgb(129, 21, 21)";
    } else if (select.value === "Aff") {
      labelSelect.style.color = "rgb(33, 55, 147)";
    }
    labelSelect.style.fontSize = 17;
    select.remove();

    var link = document.createElement("a");
    link.innerHTML = source.value;
    link.href = source.value;
    sourceText.parentNode.replaceChild(link, sourceText);
    source.remove();

    var tempRebutArr = [legendHeader.innerHTML, link.innerHTML, content.value];
    var RebutLength = rebuttals.length;
    rebuttals.push(tempRebutArr);
    if (autoSave.checked) {
      saveRebuttalsInBrowser();
    }
    //console.log(tempCardArr);
    //console.log('----------');

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
      rebuttals.splice(RebutLength, 1);
      if (autoSave.checked) {
        saveRebuttalsInBrowser();
      }
      fieldset.remove();
    };
    fieldset.appendChild(deleteButton);
    try {
      createButton.remove();
    }
    catch (error) { }
  }
  if (editable) {
    var createButton = document.createElement("button");
    createButton.innerHTML = "Create";
    createButton.onclick = create;
    fieldset.appendChild(createButton);
  }
  else {
    create();
  }
  rebuttalParent.appendChild(fieldset);
}

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
function saveCardsInBrowser() {
  var cardClasses = [];
  for (var i = 0; i < cards.length; i++) {
    cardClasses.push(new Card(cards[i][0], cards[i][1], cards[i][2]));
  }
  window.localStorage.setItem('cards', JSON.stringify(cardClasses));
}
function saveRebuttalsInBrowser() {
  var rebutClasses = [];
  for (var i = 0; i < rebuttals.length; i++) {
    rebutClasses.push(new Rebuttal(rebuttals[i][0], rebuttals[i][1], rebuttals[i][2]));
  }
  window.localStorage.setItem('rebuttals', JSON.stringify(rebutClasses));
}

function getCards() {
  console.log(window.localStorage.getItem('cards'));
}
function getRebuttals() {
  console.log(window.localStorage.getItem('rebuttals'));
}

function loadFromBrowser() {
  if (window.localStorage.getItem('cards') != undefined) {
    cardArr = JSON.parse(window.localStorage.getItem('cards'));
    for (var i = 0; i < cardArr.length; i++) {
      addCard(cardArr[i].title, cardArr[i].source, cardArr[i].content);
    }
  }
  if (window.localStorage.getItem('rebuttals') != undefined) {
    rebutArr = JSON.parse(window.localStorage.getItem('rebuttals'));
    console.log("loading a rebuttal");
    for (var i = 0; i < rebutArr.length; i++) {
      addRebuttal(rebutArr[i].title, rebutArr[i].source, rebutArr[i].content);
    }
  }
  if (window.localStorage.getItem('autoSave') != undefined) {
    autoSave.checked = window.localStorage.getItem('autoSave') === 'true';
  }
}

function Search(keyword) {
  var cardClasses = [];
  for (var i = 0; i < cards.length; i++) {
    cardClasses.push(new Card(cards[i][0], cards[i][1], cards[i][2]));
  }
  var rebutClasses = [];
  for (var i = 0; i < rebuttals.length; i++) {
    rebutClasses.push(new Rebuttal(rebuttals[i][0], rebuttals[i][1], rebuttals[i][2]));
  }

  var cardFieldsets = [];
  var rebutFieldsets = [];

  keywordArr = keyword.split(' ');
  console.log(keywordArr);
  console.log(cardClasses);

  for (var i = 0; i < keywordArr.length; i++) {
    for (var j = 0; j < cardClasses.length; j++) {
      if (cardClasses[j].title.includes(keywordArr[i]) || cardClasses[j].source.includes(keywordArr[i]) || cardClasses[j].content.includes(keywordArr[i])) {
        var title = cardClasses[j].title;
        for (var k = 0; k < cardParent.children.length; k++) {
          if (!(cardParent.children[k].children[0].children[0].innerHTML === title)) {
            cardFieldsets.push(cardParent.children[k]);
            //cardParent.children[k].remove();
          }
        }
      }
    }
  }

  for (var i = 0; i < keywordArr.length; i++) {
    for (var j = 0; j < rebutClasses.length; j++) {
      if (rebutClasses[j].title.includes(keywordArr[i]) || rebutClasses[j].source.includes(keywordArr[i]) || rebutClasses[j].content.includes(keywordArr[i])) {
        var title = rebutClasses[j].title;
        for (var k = 0; k < rebuttalParent.children.length; k++) {
          if (!(rebuttalParent.children[k].children[0].children[0].innerHTML === title)) {
            rebutFieldsets.push(rebuttalParent.children[k]);
            //rebuttalParent.children[k].remove();
          }
        }
      }
    }
  }

  console.log("searched " + keyword)
  console.log("rebut " + rebutFieldsets.length.toString());
  console.log("card  " + cardFieldsets.length.toString() );
  console.log(cardFieldsets);
}


cardButton.onclick = function() {addCard(null, null, null);};
rebuttalButton.onclick = function() {addRebuttal(null, null, null);};
autoSave.onchange = function() {
  window.localStorage.setItem('autoSave', autoSave.checked.toString());
};

searchButton.onclick = function () {
  Search(searchField.value);
};

loadFromBrowser();
