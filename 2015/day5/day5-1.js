const fs = require('fs');

start('./2015/day5/day5.in');

function run(data){
    // data = data.split("\n").slice(0,3).join("\n");
    let niceLines = data.split("\n").map(line => {
        if((line.match(/([aeiou])/g) || []).length < 3) return false;
        if(!/([a-z])\1/.test(line)) return false;
        if(/ab|cd|pq|xy/.test(line)) return false;
        return true;
    });
    console.log(niceLines.filter(x => x === true).length);
}

function start(fileName) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }else{
            try{
                run(data);
            }catch(err){
                console.error(err.stack);
            }
        }
    });
}