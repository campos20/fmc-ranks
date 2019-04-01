import {parser} from './handler.js';
import {sheet2Table} from './sheet2Table.js';

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
    
    tableDiv.innerHTML = "";
    tableDiv.appendChild(table);
    
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

var generateButton = document.createElement('button');
generateButton.innerHTML = 'Generate table';
generateButton.onclick = generateTable;

var downloadButton = document.createElement('button');
downloadButton.innerHTML = 'Download image';
downloadButton.disabled = true;
downloadButton.onclick = downloadImage;

buttonDiv.appendChild(generateButton);
buttonDiv.appendChild(downloadButton);
mainDiv.appendChild(buttonDiv);

document.body.appendChild(mainDiv);

var tableDiv = document.createElement('div');
tableDiv.setAttribute("class", "tableDiv"); //this crops whitespace from the image. see css
document.body.appendChild(tableDiv);
