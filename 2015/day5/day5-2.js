const fs = require('fs');

start('./2015/day5/day5.in');

function run(data){
    let niceLines = data.split("\n").map(line => {
        if(!/(..).*\1/.test(line)) return false;
        if(!/(.).\1/.test(line)) return false;
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