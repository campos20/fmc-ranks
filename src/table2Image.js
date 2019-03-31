export function table2Image(table) {

    for (var i=0; i<table["names"].length; i++) {
        var name = table["names"][i];
        var results = table["results"][i];
        var avg = (table["avgs"][i]).toFixed(2);

        console.log(name+" "+results+" = "+avg);
    }

}
