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
