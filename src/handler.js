import {avg, single, isValidLine, getThreeConsecutiveValids, getName} from './utils.js';

export function parser(text) {

    const wcaMax = 80;

    var names = [];
    var avgs = [];
    var singles = [];
    var pos = [];
    var R1 = [];
    var R2 = [];
    var R3 = [];
    
    var array = text.split("\n");
    for (var i=0; i<array.length; i++) {
        var line = array[i];
        if (isValidLine(line)){
            var temp = getThreeConsecutiveValids(line);
            
            var r3 = temp.pop().toUpperCase();
            var r2 = temp.pop().toUpperCase();
            var r1 = temp.pop().toUpperCase();

            // make strange things as DNF, set < wxaMax or < 1 to DNF
            if (isNaN(r1)) {
                if (r1 !== "DNF" && r1 !== "DNS") r1 = "DNF";
            }
            else {
                r1 = Number(r1);
                if (r1 > wcaMax || r1 < 1) r1 = "DNF";
            }
            if (isNaN(r2)) {
                if (r2 !== "DNF" && r2 !== "DNS") r2 = "DNF";
            }
            else {
                r2 = Number(r2);
                if (r2 > wcaMax || r2 < 1) r2 = "DNF";
            }
            if (isNaN(r3)) {
                if (r3 !== "DNF" && r3 !== "DNS") r3 = "DNF";
            }
            else {
                r3 = Number(r3);
                if (r3 > wcaMax || r3 < 1) r3 = "DNF";
            }
            
            var name = getName(line);
            var attempts = [r1, r2, r3];
            var average = avg(attempts);
            var best = single(attempts);
            
            // bubble sort :D
            var index = 0;
            while (index < avgs.length && average>avgs[index]) {
                index++;
            }
            while (index < avgs.length && average===avgs[index] && best>singles[index]) {
                index++;
            }
            
            names.splice(index, 0, name);
            R1.splice(index, 0, r1);
            R2.splice(index, 0, r2);
            R3.splice(index, 0, r3);
            avgs.splice(index, 0, average);
            singles.splice(index, 0, best);
        }
    }
    
    if (names.length === 0) {
        return null;
    }
    
    for (var i=0; i<names.length; i++) {
        var p = i+1; // position
        if (i>0 && avgs[i] === avgs[i-1] && singles[i] === singles[i-1]) {
            p = pos[pos.length-1];
        }
        pos.push(p);
    }
    
    var R1Ordered = [];
    var R2Ordered = [];
    var R3Ordered = [];

    for (var i=0; i<R1.length; i++) {
        if (R1Ordered.indexOf(R1[i])<0) {
            R1Ordered.push(R1[i]);
        }
    }
    for (var i=0; i<R2.length; i++) {
        if (R2Ordered.indexOf(R2[i])<0) {
            R2Ordered.push(R2[i]);
        }
    }    
    for (var i=0; i<R3.length; i++) {
        if (R3Ordered.indexOf(R3[i])<0) {
            R3Ordered.push(R3[i]);
        }
    }
    
    R1Ordered.sort();
    R2Ordered.sort();
    R3Ordered.sort();
    
    var table = {};
    table["pos"] = pos;
    table["names"] = names;
    table["R1"] = R1;
    table["R2"] = R2;
    table["R3"] = R3;
    table["avgs"] = avgs;
    table["R1Ordered"] = R1Ordered;
    table["R2Ordered"] = R2Ordered;
    table["R3Ordered"] = R3Ordered;
    
    table["woaj1"] = R1Ordered[0];
    table["woaj2"] = R2Ordered[0];
    table["woaj3"] = R3Ordered[0];
    
    table["woajMean"] = avg([R1Ordered[0], R2Ordered[0], R3Ordered[0]]).toFixed(2);
    if (!isFinite(table["woajMean"])) table["woajMean"] = "DNF";
    
    return table;
}
