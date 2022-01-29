const fs = require('fs');

start('./2021/day15/day15.in');
// start('./2021/day15/day15-test.in');

function run(data){
    let map = getMap(data);
    let best = findLowestRiskPath(map, [0,0], [map.length-1, map[0].length-1]);
    console.log("RESULT", best);
}

function findLowestRiskPath(map, start, destination){
    let points = {};
    let queue = [];
    setPoint([start], 0, points, queue);

    while(queue.length > 0){
        let point = queue.shift();
        let neighbors = findNeighbors(point, points, map);
        neighbors.forEach(neighbor => {
            let newRisk = point.risk + map[neighbor.coord[0]][neighbor.coord[1]];
            if(newRisk < neighbor.risk){
                let newPath = point.path.concat([neighbor.coord]);
                setPoint(newPath, newRisk, points, queue);
            }
        });
    }
    return points[destination.toString()];
}

function setPoint(path, risk, points, queue){
    let coordStr = path[path.length-1].toString();
    points[coordStr] = points[coordStr] || {};
    points[coordStr].path = path;
    points[coordStr].risk = risk;
    points[coordStr].coord = path[path.length-1];
    queue.push(points[coordStr]);
}

function getPoint(coord, points){
    let coordStr = coord.toString();
    points[coordStr] = points[coordStr] || {
        path: null,
        risk: Infinity,
        coord: coord
    };
    return points[coordStr];
}

function findNeighbors(point, points, map){
    let coord = point.coord;
    let neighborCoords = [
        [coord[0]-1, coord[1]],
        [coord[0]+1, coord[1]],
        [coord[0], coord[1]-1],
        [coord[0], coord[1]+1]
    ];
    neighborCoords = neighborCoords.filter(coord => isValidCoord(coord, map));
    return neighborCoords.map(coord => getPoint(coord, points));
}

function isValidCoord(coord, map){
    return coord[0] >= 0 && coord[0] < map.length &&
        coord[1] >= 0 && coord[1] < map[coord[0]].length;
}

function getMap(data){
    let map = [];
    let lines = data.split("\n");
    lines.forEach(line => {
        map.push(line.trim().split("").map(x => parseInt(x)));
    });
    return map;
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