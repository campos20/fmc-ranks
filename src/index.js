import {basicText} from './basicText.js';
import {parser} from './handler.js';
import {table2Image} from './table2Image.js';

function generateImage() {
    console.clear();
    var text = textArea.value;

    // replace this by an alert after repository is done
    if (text.length === 0) {
        text = basicText();
        textArea.innerHTML = text;
    }
    
    var table = parser(text);
    table2Image(table);
}

var mainDiv = document.createElement('div');

var title = document.createElement('h1');
title.innerHTML = 'Paste the FMC raw content here';
mainDiv.appendChild(title);

var formGroup = document.createElement('div');
formGroup.setAttribute('class', 'form-group');

var textArea = document.createElement('textarea');
textArea.setAttribute('class', 'form-control rounded-0');
textArea.setAttribute('id', 'rawText');
textArea.setAttribute('rows', '10');

formGroup.appendChild(textArea);

mainDiv.appendChild(formGroup);

var button = document.createElement('button');
button.innerHTML = 'Generate image';
button.onclick = generateImage;

mainDiv.appendChild(button);

// remove this later, since this is for developing purposes
generateImage();

document.body.appendChild(mainDiv);
