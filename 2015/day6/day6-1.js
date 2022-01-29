const fs = require('fs');

start('./2015/day6/day6.in');

function run(data){
    data.split("\n").forEach(line => {
        let action = line.match(/^\D+/)[0].trim();
        let x1 = parseInt(line.match(/\d+,\d+/g)[0].match(/(\d+)/g)[0]);
        let y1 = parseInt(line.match(/\d+,\d+/g)[0].match(/(\d+)/g)[1]);
        let x2 = parseInt(line.match(/\d+,\d+/g)[1].match(/(\d+)/g)[0]);
        let y2 = parseInt(line.match(/\d+,\d+/g)[1].match(/(\d+)/g)[1]);
    });
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


