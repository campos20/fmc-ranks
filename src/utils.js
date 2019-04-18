export function avg(list) {

    if (list.length === 0) return Infinity;

    var sum = 0;
    for (var i=0; i < list.length; i++) {
        if (isNaN(list[i])) return Infinity;
        sum += Number(list[i]);
    }
    return sum/list.length;
}

export function single(list) {
    var best = Infinity;

    for (var i=0; i<list.length; i++) {
        if (! isNaN(list[i]) && Number(list[i]) < best) {
            best = Number(list[i]);
        }
    }
    return best;
}

export function getThreeConsecutiveValids(line) {
    var out = [];
    var array = line.split(/[ ,=]+/);
    for (var i=0; i<array.length; i++ ) {
        var part = array[i];
        if (isValidResult(part)) {
            out.push(part);
        }
        else {
            out = [];
        }
        if (out.length === 3) {
            return out;
        }
    }
    out = [];
    return out;
}

export function isValidLine(line) {
    console.log(getThreeConsecutiveValids(line));
    return getThreeConsecutiveValids(line).length === 3;
}


function isValidResult(result) {
    // We accept as valid any integer > 0, also DNF and DNS.
    if (!isNaN(result) && parseInt(result, 10) > 0) return true;
    if (result.toUpperCase === "DNF") return true;
    if (result.toUpperCase === "DNS") return true;
    return false;
}

export function getName(validLine) {
    var out = [];
    var array = validLine.split(/[ ,=]+/);
    for (var i = 0; i<array.length; i++) {
        var part = array[i];
        if (isNaN(part)) {
            out.push(part);
        }
        else {
            break;
        }
    }
    return out.join(" ");
}