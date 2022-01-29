const fs = require('fs');

start('./2021/day14/day14.in');
// start('./2021/day14/day14-test.in');

function run(data){
    let lines = data.split("\n");
    let pairInsertions = getPairInsertions(lines);

    let polymer = lines[0].trim();
    for(let i=0; i<10; i++){
        polymer = insertPairs(polymer, pairInsertions);
    }

    let counts = countLetters(polymer);
    console.log(counts.highest - counts.lowest);
}

function countLetters(polymer){
    let counts = {};

    for(let i=0; i<polymer.length; i++){
        let letter = polymer[i];
        counts[letter] = counts[letter] || 0;
        counts[letter]++;
    }

    counts.lowest = Infinity;
    counts.highest = 0;
    for(let letter in counts){
        if(counts[letter] < counts.lowest){
            counts.lowest = counts[letter];
        }
        if(counts[letter] > counts.highest){
            counts.highest = counts[letter];
        }
    }
    return counts;
}

function insertPairs(polymer, pairInsertions){
    let result = [];
    result.push(polymer[0]);
    for(let i=0; i<polymer.length-1; i++){
        let pair = polymer[i] + polymer[i+1];
        let insert = pairInsertions[pair];
        result.push(insert + polymer[i+1]);
    }
    return result.join("");
}

function getPairInsertions(lines){
    let pairs = {};
    for(let i=2; i<lines.length; i++){
        let split = lines[i].trim().split(" ");
        pairs[split[0]] = split[2];
    }
    return pairs;
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