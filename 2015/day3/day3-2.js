const fs = require('fs');

start();

function run(data){
    let directions = getDirections(data);
    let giftsPerHouse = findGiftsPerHouse(directions);
    console.log(Object.keys(giftsPerHouse).length);
}

function findGiftsPerHouse(directions){
    let giftsPerHouse = {};
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;

    giftsPerHouse[`${x},${y}`] = giftsPerHouse[`${x},${y}`] || 0;
    giftsPerHouse[`${x},${y}`]++;
    giftsPerHouse[`${x},${y}`]++;
    directions.forEach((direction,index) => {
        if(index % 2 === 0){
            switch(direction){
                case "^": y--; break;
                case "v": y++; break;
                case "<": x--; break;
                case ">": x++; break;
            }
            giftsPerHouse[`${x},${y}`] = giftsPerHouse[`${x},${y}`] || 0;
            giftsPerHouse[`${x},${y}`]++;
        }else{
            switch(direction){
                case "^": ry--; break;
                case "v": ry++; break;
                case "<": rx--; break;
                case ">": rx++; break;
            }
            giftsPerHouse[`${rx},${ry}`] = giftsPerHouse[`${rx},${ry}`] || 0;
            giftsPerHouse[`${rx},${ry}`]++;
        }
    
    });

    return giftsPerHouse;
}

function getDirections(data){
    return data.split("");
}

function start() {
    fs.readFile('./2015/day3/day3-in.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }else{
            try{
                run(data);
            }catch(e){
                console.error(e.message);
            }
        }
    });
}