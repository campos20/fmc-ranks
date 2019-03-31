import {avg, single} from './utils.js';

export function parser(text) {

    var names = [];
    var results = [];
    var avgs = [];
    var singles = [];
    
    var array = text.split("\n");
    for (var i=0; i<array.length; i++) {
        var line = array[i];
        var indexEqual = line.indexOf("=");
        if (indexEqual > 0){
            line = line.slice(0, indexEqual).trim();
            var temp = line.split(/[ ,=]+/);
            
            var r3 = temp.pop();
            var r2 = temp.pop();
            var r1 = temp.pop();
            
            var name = temp.join(" ");
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
            results.splice(index, 0, attempts);
            avgs.splice(index, 0, average);
            singles.splice(index, 0, best);
        }
    }

    var table = {};
    table["names"] = names;
    table["results"] = results;
    table["avgs"] = avgs;
    
    return table;
}
