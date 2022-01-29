const fs = require('fs');

start('./2021/day12/day12.in');
// start('./2021/day12/day12-test1.in');
// start('./2021/day12/day12-test2.in');
// start('./2021/day12/day12-test3.in');

function run(data){
    let caves = getCaves(data);
    let paths = findAllPaths(caves["start"]);
    // paths.forEach(path => console.log(path));
    console.log(paths.length);
}

function findAllPaths(cave, paths=[], path=[]){
    path.push(cave.name);
    if(cave.name === "end"){
        paths.push([...path]);
        path.pop();
        return;
    }

    cave.connections.forEach(nextCave => {
        if(isSmallCave(nextCave) && path.indexOf(nextCave.name) > 0) return;
        findAllPaths(nextCave, paths, path);
    });
    path.pop();
    return paths;
}

function isSmallCave(cave){
    return /[a-z]/.test(cave.name);
}

function getCaves(data){
    let lines = data.split("\n");

    
    let caves = {};
    lines.forEach(line => {
        let lineSplit = line.split("-");
        let cave1 = lineSplit[0].trim();
        let cave2 = lineSplit[1].trim();
        caves[cave1] = caves[cave1] || createNewCave(cave1);
        caves[cave2] = caves[cave2] || createNewCave(cave2);
        if(cave2 !== "start"){
            caves[cave1].connections.push(caves[cave2]);
        }
        if(cave1 !== "start"){
            caves[cave2].connections.push(caves[cave1]);
        }
        return caves;
    });
    return caves;
}

function createNewCave(caveName){
    return {
        name: caveName,
        connections: []
    };
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