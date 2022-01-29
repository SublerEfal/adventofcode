const TEST = false;
const MATRIX_SIZE = 10;
const STEPS = 100;
const MAX_ENERGY = 9;

let octopi = getOctopi();
let steps = 0;
let simultaneousFlashStep = null;
while(simultaneousFlashStep === null){
    steps++;
    if(updateAllOctopi(octopi) === MATRIX_SIZE*MATRIX_SIZE){
        simultaneousFlashStep = steps;
    }
}
printOctopi(octopi);
console.log("First step with simultaneous flashes: " + simultaneousFlashStep);

function printOctopi(octopi){
    let arry = [];
    for(let y=0; y<MATRIX_SIZE; y++){
        let arrx = [];
        for(let x=0; x<MATRIX_SIZE; x++){
            arrx.push(octopi[getIndex(x,y)]);
        }
        arry.push(arrx.join(""));
    }
    console.log(arry.join("\n"));
    console.log("");
}

function updateAllOctopi(octopi){
    let flashedOctopi = [];
    for(let y=0; y<MATRIX_SIZE; y++){
        for(let x=0; x<MATRIX_SIZE; x++){
            updateOctopus(x, y, octopi, flashedOctopi);
        }
    }
    flashedOctopi.forEach(index => octopi[index]=0);
    return flashedOctopi.length;
}

function updateOctopus(x, y, octopi, flashedOctopi){
    let index = getIndex(x, y);
    if(index === null) return;
    octopi[index]++;
    if(octopi[index] === MAX_ENERGY+1){
        flashedOctopi.push(index);
        updateSurroundingOctopi(x, y, octopi, flashedOctopi);
    }
    return flashedOctopi;
}

function updateSurroundingOctopi(ox, oy, octopi, flashedOctopi){
    for(let x=ox-1; x<=ox+1; x++){
        for(let y=oy-1; y<=oy+1; y++){
            if(!(x===ox && y===oy)){
                updateOctopus(x, y, octopi, flashedOctopi);
            }
        }
    }
}

function getIndex(x, y){
    if(x<0 || y<0 || x>=MATRIX_SIZE || y>=MATRIX_SIZE) return null;
    return y*MATRIX_SIZE+x;
}

function getOctopi(){
    return getInput().split("\n").join("").split("");
}

function getInput(){
//     if(TEST) return `548
// 274
// 526`;

    if(TEST) return `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

    return `5251578181
6158452313
1818578571
3844615143
6857251244
2375817613
8883514435
2321265735
2857275182
4821156644`;
}