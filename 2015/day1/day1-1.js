const fs = require('fs');

start();

function run(data){
    let floor = data.split("").reduce((acc, x) => {
        return acc += x === "(" ? 1 : -1;
    }, 0);
    console.log(floor);
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