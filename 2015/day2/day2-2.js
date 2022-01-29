const fs = require('fs');

start();

function run(data){
    let presents = getPresents(data);
    calculateSurfaces(presents);
    let requiredRibbon = presents.reduce((acc, present) => {
        let ribbonBase = (2*present.l+2*present.w+2*present.h)-2*Math.max(present.l, present.w, present.h);
        let ribbonBow = present.l*present.w*present.h;
        return acc + ribbonBase + ribbonBow;
    }, 0);
    console.log(requiredRibbon);
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