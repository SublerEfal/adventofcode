const fs = require('fs');

start();

function run(data){
    let floor = data.split("").reduce((acc, x, index) => {
        acc += x === "(" ? 1 : -1;
        if(acc === -1){
            console.log("entering basement at " + (index+1));
        }
        return acc;
    }, 0);
}

function start() {
    fs.readFile('./2015/day1/day1-in.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }else{
            run(data);
        }
    });
}