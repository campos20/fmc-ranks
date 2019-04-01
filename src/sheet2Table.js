export function sheet2Table(sheet) {

    var table = document.createElement('table');
    
    var header = document.createElement('thead');
    var headerContent = ["Pos", "Name", "R1", "R2", "R3", "Mean"];
    
    var trHeader = document.createElement('tr');
    for (var i=0; i<headerContent.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = headerContent[i];
        trHeader.appendChild(th);
    }
    header.appendChild(trHeader);
    table.appendChild(header);
    
    for (var i=0; i<sheet["names"].length; i++) {
        var tr = document.createElement('tr');        

        var pos = sheet["pos"][i];
        var name = sheet["names"][i];
        var r1 = sheet["R1"][i];
        var r2 = sheet["R2"][i];
        var r3 = sheet["R3"][i];
        var mean = (sheet["avgs"][i]).toFixed(2);
        
        var tdPos = document.createElement('th');
        if (pos < 4){
            tdPos.setAttribute("class", "woaj"+pos);
        }
        if (i>0 && sheet["pos"][i] === sheet["pos"][i-1]){
            pos = "-";
        }
        tdPos.innerHTML = pos;
        tr.appendChild(tdPos);
        
        var tdName = document.createElement('td');        
        tdName.innerHTML = name;
        tr.appendChild(tdName);
        
        var tdR1 = document.createElement('td');
        tdR1.innerHTML = r1;
        tr.appendChild(tdR1);
        var index = sheet["R1Ordered"].indexOf(r1);
        if (index < 3) {
            tdR1.setAttribute("class", "woaj"+(index+1));
        }
        
        var tdR2 = document.createElement('td');
        tdR2.innerHTML = r2;
        tr.appendChild(tdR2);
        index = sheet["R2Ordered"].indexOf(r2);
        if (index < 3) {
            tdR2.setAttribute("class", "woaj"+(index+1));
        }

        var tdR3 = document.createElement('td');
        tdR3.innerHTML = r3;
        tr.appendChild(tdR3);
        index = sheet["R3Ordered"].indexOf(r3);
        if (index < 3) {
            tdR3.setAttribute("class", "woaj"+(index+1));
        }
        
        var tdMean = document.createElement('td');
        tdMean.innerHTML = mean;
        if (!isFinite(mean)) tdMean.innerHTML = "DNF";
        tr.appendChild(tdMean);

        table.appendChild(tr);
    }
    
    var tfoot = document.createElement('tfoot');
    var trFoot = document.createElement('tr');
    
    var woaj1 = document.createElement('td');
    woaj1.innerHTML = sheet["woaj1"];
    woaj1.setAttribute("class", "woaj1");
    var woaj2 = document.createElement('td');
    woaj2.innerHTML = sheet["woaj2"];
    woaj2.setAttribute("class", "woaj1");
    var woaj3 = document.createElement('td');
    woaj3.innerHTML = sheet["woaj3"];
    woaj3.setAttribute("class", "woaj1");
    var woajMean = document.createElement('td');
    woajMean.innerHTML = sheet["woajMean"];
    woajMean.setAttribute("class", "woaj1");
    
    trFoot.appendChild(document.createElement('td'));
    
    var tdWoaj = document.createElement('td');
    tdWoaj.innerHTML = "woaj"
    trFoot.appendChild(tdWoaj);

    trFoot.appendChild(woaj1);
    trFoot.appendChild(woaj2);
    trFoot.appendChild(woaj3);
    trFoot.appendChild(woajMean);
    
    table.appendChild(trFoot);
    
    return table;
}
