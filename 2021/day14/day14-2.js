const fs = require('fs');

start('./2021/day14/day14.in');
// start('./2021/day14/day14-test.in');

function run(data){
    let lines = data.split("\n");
    
    let insertions = getInsertions(lines);
    let meta = {};
    let pairs = getStartPairs(lines[0].trim(), meta);

    for(let i=0; i<40; i++){
        console.log(JSON.parse(JSON.stringify(pairs)));
        pairs = processInsertions(pairs, insertions, meta);
    }

    let counts = countLetters(pairs, meta);
    console.log(counts);
    console.log(counts.highest - counts.lowest);
}

function countLetters(pairs, meta){
    let counts = {};

    for(let pair in pairs){
        counts[pair[0]] = counts[pair[0]] || 0;
        counts[pair[0]] += pairs[pair];
        if(pair === meta.lastPair){
            counts[pair[1]] = counts[pair[1]] || 0;
            counts[pair[1]] += 1;
        }
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

function processInsertions(pairs, insertions, meta){
    let newPairs = {};

    for(let pair in pairs){
        let count = pairs[pair]
        let pair1 = pair[0] + insertions[pair];
        let pair2 = insertions[pair] + pair[1];
        newPairs[pair1] = newPairs[pair1] || 0;
        newPairs[pair1] += count;
        newPairs[pair2] = newPairs[pair2] || 0;
        newPairs[pair2] += count;
        if(pair === meta.lastPair){
            meta.lastPair = pair2;
        }
    }
    return newPairs;
}

function getStartPairs(polymer, meta){
    let pairs = {};
    for(let i=0; i<polymer.length-1; i++){
        let pair = polymer[i] + polymer[i+1];
        pairs[pair] = pairs[pair] || 0;
        pairs[pair]++;
        if(i === polymer.length-2){
            meta.lastPair = pair;
        }
    }
    return pairs;
}

function getInsertions(lines){
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