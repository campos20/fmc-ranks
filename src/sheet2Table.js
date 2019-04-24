import {outputFormat, numberOfColumnsByGroup} from './utils.js'

export function sheet2Table(sheet, columns) {

    const defaultLines = 15;

    var numberOfCompetitors = sheet["names"].length;

    if (columns < 1 || columns > numberOfCompetitors/defaultLines) {
        columns = Math.ceil(numberOfCompetitors/defaultLines);
    }

    var table = document.createElement('table');
    
    // Header
    var thead = document.createElement('thead');
    var headerContent = ["Pos", "Name", "R1", "R2", "R3", "Mean"];
    var classes = ["Position", "Name", "Result", "Result", "Result", "Mean"];
    
    var trHeader = document.createElement('tr');
    for (var j=0; j<columns; j++) {
        for (var i=0; i<headerContent.length; i++) {
            var th = document.createElement('th');
            th.innerHTML = headerContent[i];
            th.classList.add(classes[i]);
            trHeader.appendChild(th);
        }
    }
    thead.appendChild(trHeader);
    table.appendChild(thead);

    // Table body
    var numberOfLines = Math.ceil(sheet["names"].length/columns);
    var tableArray = [];
    for (var i=0; i<numberOfLines; i++){
        var tr = document.createElement('tr');
        tableArray.push(tr);
    }
    
    for (var i=0; i<numberOfCompetitors; i++) {
        var line = i%numberOfLines;

        // Positions
        var td = document.createElement('td');
        td.classList.add("position");
        var pos = sheet["pos"][i];
        if (i>0 && pos === sheet["pos"][i-1]){
            td.innerHTML = "-";
        }
        else {
            td.innerHTML = sheet["pos"][i]
        }
        tableArray[line].appendChild(td);

        // Names 
        td = document.createElement('td');
        td.innerHTML = sheet["names"][i];
        tableArray[line].appendChild(td);

        // Results
        for (var j=1; j<4; j++) {
            var result = sheet["R"+j][i];
            td = document.createElement('td');
            td.innerHTML = result;
            tableArray[line].appendChild(td);

            // Format result
            var index = sheet["R"+j+"Ordered"].indexOf(result);
            if (index < 3) {
                td.classList.add("woaj"+(index+1));
            }
            if (isNaN(result)) {
                if (result.toUpperCase() === "DNF"){
                    td.classList.add("DNF");
                }
                else if (result.toUpperCase() === "DNS"){
                    td.classList.add("DNS");
                }
            }
        }

        // Mean
        var mean = sheet["avgs"][i];
        td = document.createElement('td');
        td.innerHTML = outputFormat(mean);
        tableArray[line].appendChild(td);
        if (pos <= 3) {
            td.classList.add("woaj"+pos);
        }
    }

    // Fill the table with empty squares if needed
    for (var i=numberOfCompetitors; i<columns*numberOfLines; i++){
        for (var j=0; j<numberOfColumnsByGroup; j++){
            tableArray[i%numberOfLines].appendChild(document.createElement('td'));
        }
    }

    var tbody = document.createElement('tbody');    
    for (var i=0; i<tableArray.length; i++) {
        tbody.appendChild(tableArray[i]);
    }
    table.appendChild(tbody);
    
    var tfoot = document.createElement('tfoot');
    var trFoot = document.createElement('tr');
    
    for (var i=0; i<columns; i++) {
        trFoot.appendChild(document.createElement('td'));

        var woaj1 = document.createElement('td');
        woaj1.innerHTML = sheet["woaj1"];
        var woaj2 = document.createElement('td');
        woaj2.innerHTML = sheet["woaj2"];
        var woaj3 = document.createElement('td');
        woaj3.innerHTML = sheet["woaj3"];
        var woajMean = document.createElement('td');
        woajMean.innerHTML = sheet["woajMean"];
        
        var tdWoaj = document.createElement('td');
        tdWoaj.innerHTML = "Woaj"
        trFoot.appendChild(tdWoaj);

        trFoot.appendChild(woaj1);
        trFoot.appendChild(woaj2);
        trFoot.appendChild(woaj3);
        trFoot.appendChild(woajMean);
    }
    
    tfoot.appendChild(trFoot);
    table.appendChild(tfoot);
    
    return table;
}