let xMin = 155;
let xMax = 215;
let yMin = -132;
let yMax = -72;
// let xMin = 20;
// let xMax = 30;
// let yMin = -10;
// let yMax = -5;

let bestY = findDyOptions(0, yMin, yMax);
let highestY = (bestY*bestY+bestY)/2;
console.log(highestY);

function findDyOptions(y, yMin, yMax){
    let bestY = -Infinity;
    for(let dy=0; dy<1000; dy++){
        let curDy = dy;
        let curY = y;
        let step = 0;
        while(curY >= yMin){
            step++;
            curY += curDy--;
            if(curY >= yMin && curY <= yMax){
                bestY = dy;
            }
        }
    }
    return bestY;
}