const fs = require('fs');

start('./2021/day13/day13.in');
// start('./2021/day13/day13-test.in');

function run(data){
    let lines = data.split("\n");
    let input = getInput(lines);

    input.instructions.forEach(instruction => fold(input.map, instruction));
    printMap(input.map);
}

function fold(map, foldInstruction){
    if(foldInstruction.axis === "y"){
        for(let x=0; x<map[0].length; x++){
            for(let y=foldInstruction.value+1; y<map.length; y++){
                if(map[y][x]){
                    let toY = foldInstruction.value-(y-foldInstruction.value);
                    map[toY][x] = true;
                }
            }
        }
        map.length = foldInstruction.value;
    }

    if(foldInstruction.axis === "x"){
        for(let y=0; y<map.length; y++){
            for(let x=foldInstruction.value+1; x<map[y].length; x++){
                if(map[y][x]){
                    let toX = foldInstruction.value-(x-foldInstruction.value);
                    map[y][toX] = true;
                }
            }
            map[y].length = foldInstruction.value;
        }
    }
}

function countDots(map){
    let dots = 0;
    loopMap(map, function(x){
        if(x){
            dots++;
        }
    });
    return dots;
}

function printMap(map){
    for(let y=0; y<map.length; y++){
        let arr = [];
        for(let x=0; x<map[y].length; x++){
            arr.push(map[y][x] ? "#" : ".");
        }
        console.log(arr.join(""));
    }
}

function getInput(lines){
    let maxCoords = getMaxMapCoordinates(lines);
    let map = new Array(maxCoords.maxY+1);
    for(let i=0; i<map.length; i++){
        map[i] = new Array(maxCoords.maxX+1);
    }

    let instructions = [];
    lines.forEach(line => {
        let coordMatch = line.match(/^(\d+),(\d+)\s*$/);
        if(coordMatch){
            let x = parseInt(coordMatch[1]);
            let y = parseInt(coordMatch[2]);
            map[y][x] = true;
            return;
        }
        
        //fold along x=5
        let instructionMatch = line.match(/^fold along (.)=(\d+)/);
        if(instructionMatch){
            instructions.push({
                axis: instructionMatch[1],
                value: parseInt(instructionMatch[2])
            });
        }
    });
    return {map, instructions};
}

function loopMap(map, f){
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map[y].length; x++){
            f(map[y][x], x, y, map);
        }
    }
}

function getMaxMapCoordinates(lines){
    let maxX = 0;
    let maxY = 0;
    lines.forEach(line => {
        let match = line.match(/^(\d+),(\d+)\s*$/) || [null,0,0];
        let x = parseInt(match[1]);
        let y = parseInt(match[2]);
        if(x > maxX) maxX = x;
        if(y > maxY) maxY = y;
    });
    return {maxX: maxX, maxY: maxY};
}

function start(fileName) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }else{
            try{
                run(data);
            }catch(err){
                console.error(err.stack);
            }
        }
    });
}