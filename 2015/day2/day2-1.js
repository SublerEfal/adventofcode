const fs = require('fs');

start();

function run(data){
    let presents = getPresents(data);
    calculateSurfaces(presents);
    let requiredSurface = presents.reduce((acc, present) => {
        return acc + present.surface + present.smallestSurface;
    }, 0);
    console.log(requiredSurface);
}

function calculateSurfaces(presents){
    presents.forEach(present => {
        present.s1 = present.l * present.w;
        present.s2 = present.w * present.h;
        present.s3 = present.h * present.l;
        present.surface = 2*present.s1 + 2*present.s2 + 2*present.s3;
        present.smallestSurface = Math.min(present.s1, present.s2, present.s3);
    });
}

function getPresents(input){
    return input.split("\n").map(line => {
        let data = line.split("x");
        return {
            l: parseInt(data[0]),
            w: parseInt(data[1]),
            h: parseInt(data[2]),
        }
    });
}

function start() {
    fs.readFile('./2015/day2/day2-in.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }else{
            run(data);
        }
    });
}