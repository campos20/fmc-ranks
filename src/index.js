import { parser } from "./handler.js";
import { sheet2Table } from "./sheet2Table.js";
import { isValidLine, classes } from "./utils.js";

function generateTable() {
  var text = textArea.value;

  var sheet = parser(text);
  if (sheet === null) {
    alert("No FMC data recognized.");
    return;
  }

  var columns = columnInput.value; // This is actually the number of group columns (pos, name, results, mean count as 1 column)
  var completeTable = sheet2Table(sheet, columns);
  var table = completeTable["table"];
  table.id = "table";

  tableDiv.innerHTML = "";
  tableDiv.appendChild(table);

  columns = table.rows[0].cells.length / 6; // Table might change column numbers
  columnInput.value = columns; // Update value on the input

  var woajTable = completeTable["woaj"];
  woajTable.id = "woajTable";
  tableDiv.appendChild(woajTable);

  help.setAttribute("style", "display: none"); // hide help, user got 1 right
  mainDiv.setAttribute("style", "float: left");
  downloadButton.disabled = false;

  buildTableControl(table);

  // Fix name widths, considering classes
  for (var i = 0; i < classes.length; i++) {
    var maxWidth = 0;
    $("." + classes[i]).each(function () {
      var width = $(this).width();
      maxWidth = Math.max(maxWidth, width);
    });
    $("." + classes[i]).each(function () {
      $(this).width(maxWidth);
    });
  }

  // Fix woaj widths
  var tableWidth = $("#table").width();
  $("#woajTable").width(tableWidth);
}

function downloadImage() {
  html2canvas(tableDiv).then((canvas) => {
    var img = canvas.toDataURL("image/png");

    var a = document.createElement("a");
    a.href = img;
    a.download = "FMC.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

function clearImage() {
  tableDiv.innerHTML = "";
  tableControlDiv.innerHTML = "";
  downloadButton.disabled = true;
}

function clearData() {
  var array = [];
  var textArray = textArea.value.split("\n");
  for (var i = 0; i < textArray.length; i++) {
    var line = textArray[i];
    if (isValidLine(line)) {
      array.push(line);
    }
  }
  textArea.value = array.join("\n");
}

function buildTableControl(vale) {
  tableControlDiv.innerHTML = "";
  tableControlDiv.appendChild(columnsDiv);
}

var mainDiv = document.createElement("div");
mainDiv.setAttribute("class", "mainDiv");

var title = document.createElement("h1");
title.innerHTML = "Paste the FMC raw content here";
document.body.appendChild(title);

var help = document.createElement("p");
help.innerHTML =
  'Click <a href="https://github.com/campos20/fmc-ranks/wiki">here</a> if you have doubts on how to use.';
document.body.appendChild(help);

var formGroup = document.createElement("div");

var textArea = document.createElement("textarea");
textArea.setAttribute("rows", "15");
textArea.setAttribute("cols", "45");

textArea.addEventListener("keypress", clearImage);

formGroup.appendChild(textArea);

mainDiv.appendChild(formGroup);

var buttonDiv = document.createElement("div");

var clearDataButton = document.createElement("button");
clearDataButton.innerHTML = "Clear data";
clearDataButton.onclick = clearData;
clearDataButton.setAttribute(
  "title",
  "Data preview. You can get a cleaner data view and it's easier to perform changes."
);

var generateButton = document.createElement("button");
generateButton.innerHTML = "Generate table";
generateButton.onclick = generateTable;

var downloadButton = document.createElement("button");
downloadButton.innerHTML = "Download image";
downloadButton.disabled = true;
downloadButton.onclick = downloadImage;

buttonDiv.appendChild(clearDataButton);
buttonDiv.appendChild(generateButton);
buttonDiv.appendChild(downloadButton);
mainDiv.appendChild(buttonDiv);

// Table control
var tableControlDiv = document.createElement("div");

// Appended after the image is generated
var columnsDiv = document.createElement("div");
columnsDiv.innerHTML = "Columns: ";

var columnInput = document.createElement("input");
columnInput.setAttribute("type", "number");
columnInput.setAttribute("min", "1");
columnInput.setAttribute("max", "10");
columnInput.setAttribute("step", "1");
columnInput.setAttribute("value", "0"); // Table generation handle 0 as default number of lines for each column.
columnInput.setAttribute("size", "3");
columnInput.addEventListener("change", generateTable);
columnsDiv.appendChild(columnInput);

mainDiv.appendChild(tableControlDiv);

document.body.appendChild(mainDiv);

var tableDiv = document.createElement("div");
tableDiv.setAttribute("class", "tableDiv"); //this crops whitespace from the image. see css
document.body.appendChild(tableDiv);

// Scramble generation

var scrambleTitle = document.createElement("h1");
scrambleTitle.innerHTML = "Generate new scrambles";
document.body.appendChild(scrambleTitle);

var generateScrambleDiv = document.createElement("div");

let generateScrambleForm = document.createElement("form");

var inputScrambleNumber = document.createElement("input");
inputScrambleNumber.setAttribute("type", "number");
inputScrambleNumber.setAttribute("min", "1");
inputScrambleNumber.setAttribute("placeholder", "Number of Scrambles");
inputScrambleNumber.required = true;
inputScrambleNumber.value = 3; // Initial value for scrambles
generateScrambleForm.appendChild(inputScrambleNumber);

var generateScrambleButton = document.createElement("button");
generateScrambleButton.innerHTML = "Generate new Scrambles";
generateScrambleButton.onclick = generateNewScrambles;
generateScrambleButton.type = "submit";
generateScrambleForm.appendChild(generateScrambleButton);

generateScrambleDiv.appendChild(generateScrambleForm);

let scrambleDisplayDiv = document.createElement("div");
generateScrambleDiv.appendChild(scrambleDisplayDiv);

document.body.appendChild(generateScrambleDiv);

function generateNewScrambles(event) {
  event.preventDefault();
  let numberOfScrambles = inputScrambleNumber.value;

  let url = new URL("https://scramble-web-api.herokuapp.com/scramble/333fm");
  url.searchParams.append("numberOfScrambles", numberOfScrambles);

  $.getJSON(url.href, function (data) {
    let table = document.createElement("table");
    let tbody = table.createTBody();

    let scrambles = data.scrambles;
    scrambles.forEach((scramble, i) => {
      let tr = document.createElement("tr");

      let scrambleImageTd = document.createElement("td");
      let scrambleImage = document.createElement("scramble-display");
      scrambleImage.setAttribute("scramble", scramble);
      scrambleImageTd.appendChild(scrambleImage);
      scrambleImageTd.setAttribute("style", "text-align: left;");
      tr.appendChild(scrambleImageTd);

      console.log(scrambleImage);

      let tdScramble = document.createElement("td");
      tdScramble.innerHTML = `${i + 1}. ${scramble}`;
      tr.appendChild(tdScramble);
      tbody.appendChild(tr);
    });

    scrambleDisplayDiv.innerHTML = "";
    scrambleDisplayDiv.appendChild(table);
  });
}
