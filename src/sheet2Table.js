import { outputFormat, numberOfColumnsByGroup } from "./utils.js";

export function sheet2Table(sheet, columns) {
  const defaultLines = 15;

  var numberOfCompetitors = sheet["names"].length;

  if (columns < 1 || columns > numberOfCompetitors / defaultLines) {
    columns = Math.ceil(numberOfCompetitors / defaultLines);
  }

  var table = document.createElement("table");

  // Header
  var thead = document.createElement("thead");
  var headerContent = ["Pos", "Name", "R1", "R2", "R3", "Mean"];
  var classes = ["Position", "Name", "Result", "Result", "Result", "Mean"];

  var trHeader = document.createElement("tr");
  for (var j = 0; j < columns; j++) {
    for (var i = 0; i < headerContent.length; i++) {
      var th = document.createElement("th");
      th.innerHTML = headerContent[i];
      th.classList.add(classes[i]);
      trHeader.appendChild(th);
    }
  }
  thead.appendChild(trHeader);
  table.appendChild(thead);

  // Table body
  var numberOfLines = Math.ceil(sheet["names"].length / columns);
  var tableArray = [];
  for (var i = 0; i < numberOfLines; i++) {
    var tr = document.createElement("tr");
    tableArray.push(tr);
  }

  for (var i = 0; i < numberOfCompetitors; i++) {
    var line = i % numberOfLines;

    // Positions
    var td = document.createElement("td");
    td.classList.add("position");
    var pos = sheet["pos"][i];
    if (i > 0 && pos === sheet["pos"][i - 1]) {
      td.innerHTML = "-";
    } else {
      td.innerHTML = sheet["pos"][i];
    }
    tableArray[line].appendChild(td);

    // Names
    td = document.createElement("td");
    td.innerHTML = sheet["names"][i];
    tableArray[line].appendChild(td);

    // Results
    for (var j = 1; j < 4; j++) {
      var result = sheet["R" + j][i];
      td = document.createElement("td");
      td.innerHTML = result;
      tableArray[line].appendChild(td);

      // Format result
      var index = sheet["R" + j + "Ordered"].indexOf(result);
      if (index < 3) {
        td.classList.add("woaj" + (index + 1));
      }
      if (isNaN(result)) {
        if (result.toUpperCase() === "DNF") {
          td.classList.add("DNF");
        } else if (result.toUpperCase() === "DNS") {
          td.classList.add("DNS");
        }
      }
    }

    // Mean
    var mean = sheet["avgs"][i];
    td = document.createElement("td");
    td.innerHTML = outputFormat(mean);
    tableArray[line].appendChild(td);
    if (pos <= 3) {
      td.classList.add("woaj" + pos);
    }
  }

  // Fill the table with empty squares if needed
  for (var i = numberOfCompetitors; i < columns * numberOfLines; i++) {
    for (var j = 0; j < numberOfColumnsByGroup; j++) {
      tableArray[i % numberOfLines].appendChild(document.createElement("td"));
    }
  }

  var tbody = document.createElement("tbody");
  for (var i = 0; i < tableArray.length; i++) {
    tbody.appendChild(tableArray[i]);
  }
  table.appendChild(tbody);

  // We treat woaj as a different table so its width match the original table.
  var woajTable = document.createElement("table");
  var tfoot = document.createElement("tfoot");
  var trFoot = document.createElement("tr");
  var tdFoot = document.createElement("td");
  tdFoot.innerHTML = "Woaj";
  tdFoot.classList.add("woaj1");
  trFoot.appendChild(tdFoot);

  for (var i = 1; i < 4; i++) {
    tdFoot = document.createElement("td");
    tdFoot.innerHTML = sheet["R" + i + "Ordered"][0];
    tdFoot.classList.add("woaj1");
    trFoot.appendChild(tdFoot);
  }

  tdFoot = document.createElement("td");
  tdFoot.innerHTML = sheet["woajMean"];
  tdFoot.classList.add("woaj1");
  trFoot.appendChild(tdFoot);

  woajTable.appendChild(trFoot);

  var out = {};
  out["table"] = table;
  out["woaj"] = woajTable;

  return out;
}
