import {parser} from './handler.js';
import {sheet2Table} from './sheet2Table.js';
import {isValidLine} from './utils.js'

function generateTable() {
    var text = textArea.value;

    var sheet = parser(text);
    if (sheet === null) {
        alert("No FMC data recognized.");
        return;
    }
    
    help.setAttribute("style", "display: none"); // hide help, user got 1 right
    
    mainDiv.setAttribute("style", "float: left");
        
    var table = sheet2Table(sheet);
    table.id = "table";
    
    tableDiv.innerHTML = "";
    tableDiv.appendChild(table);

    // fixed width for the results
    var width = $('#table tr td:nth-child(3)').width();
    var width2 = $('#table tr td:nth-child(4)').width();
    var width3 = $('#table tr td:nth-child(5)').width();

    var resultWidth = Math.max(width, width2, width3);

    $('#table tr td:nth-child(3)').width(resultWidth);
    $('#table tr td:nth-child(4)').width(resultWidth);
    $('#table tr td:nth-child(5)').width(resultWidth);
    
    downloadButton.disabled = false;
}

function downloadImage() {
    html2canvas(tableDiv).then(canvas => {
        var img = canvas.toDataURL("image/png");
        
        var a = document.createElement('a');
        a.href = img;
        a.download = "FMC.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}

function clearImage() {
    tableDiv.innerHTML = "";
    downloadButton.disabled = true;
    mainDiv.setAttribute("style", "float: none");
}

function isValidResult(result) {
    // We accept as valid any number
    if (!isNaN(result) && parseInt(result, 10) > 0) return true;
    if (result.toUpperCase === "DNF") return true;
    if (result.toUpperCase === "DNS") return true;
    return false;
}

function clearData() {
    var array = [];
    var textArray =  textArea.value.split("\n");
    for (var i=0; i<textArray.length; i++) {
        var line = textArray[i];
        if (isValidLine(line)) {
            array.push(line);
        }
    }
    textArea.value = array.join("\n");
}

var mainDiv = document.createElement('div');
mainDiv.setAttribute("class", "mainDiv");

var title = document.createElement('h1');
title.innerHTML = 'Paste the FMC raw content here';
document.body.appendChild(title);

var help = document.createElement('p');
help.innerHTML = 'Click <a href="https://github.com/campos20/fmc-ranks/wiki">here</a> if you have doubts on how to use.'
document.body.appendChild(help);

var formGroup = document.createElement('div');

var textArea = document.createElement('textarea');
textArea.setAttribute('rows', '15');
textArea.setAttribute('cols', '45');

textArea.addEventListener("keypress", clearImage);

formGroup.appendChild(textArea);

mainDiv.appendChild(formGroup);

var buttonDiv = document.createElement('div');

var clearDataButton = document.createElement('button');
clearDataButton.innerHTML = 'Clear data';
clearDataButton.onclick = clearData;
clearDataButton.setAttribute("title", "Data preview. You can get a cleaner data view and it's easier to perform changes.");

var generateButton = document.createElement('button');
generateButton.innerHTML = 'Generate table';
generateButton.onclick = generateTable;

var downloadButton = document.createElement('button');
downloadButton.innerHTML = 'Download image';
downloadButton.disabled = true;
downloadButton.onclick = downloadImage;

buttonDiv.appendChild(clearDataButton);
buttonDiv.appendChild(generateButton);
buttonDiv.appendChild(downloadButton);
mainDiv.appendChild(buttonDiv);

document.body.appendChild(mainDiv);

var tableDiv = document.createElement('div');
tableDiv.setAttribute("class", "tableDiv"); //this crops whitespace from the image. see css
document.body.appendChild(tableDiv);
