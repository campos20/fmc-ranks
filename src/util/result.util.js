export function getConsecutiveValids(line, n) {
  var out = [];
  var array = line.split(/[ ,=]+/);
  for (var i = 0; i < array.length; i++) {
    var part = array[i];
    if (isValidResult(part)) {
      out.push(part);
    } else {
      out = [];
    }
    if (out.length === n) {
      return out;
    }
  }
  return out;
}

export function isValidLine(line, n) {
  return getConsecutiveValids(line, n).length === n;
}

export function isValidResult(result) {
  // We accept as valid any integer > 0, also DNF and DNS.
  if (!isNaN(result) && parseInt(result, 10) > 0) return true;
  if (result.toUpperCase() === "DNF") return true;
  if (result.toUpperCase() === "DNS") return true;
  return false;
}

export function getName(validLine) {
  var out = [];
  var array = validLine.split(/[ ,=]+/);
  array.forEath((part) => {
    if (!isValidResult(part)) {
      out.push(part);
    } else {
      return;
    }
  });
  return out.join(" ");
}

export function outputFormat(result) {
  if (!isNaN(result)) {
    if (isFinite(result)) {
      return result.toFixed(2);
    } else {
      return "DNF";
    }
  }
  if (result.toUpperCase() == "DNF") {
    return "DNF";
  }
  if (result.toUpperCase() == "DNS") {
    return "DNS";
  }
}
