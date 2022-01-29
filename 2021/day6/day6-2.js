const TEST = false;

const NEW_FISH_TIMER = 8;
const PARENT_RESET_TIMER = 6;

let states = getStartStates();
passDays(256, states);
console.log(countFish(states));

function countFish(states){
    return states.reduce((a,x) => a+x, 0);
}

function passDays(days, states){
    for(let i=0; i<days; i++){
        passDay(states);
    }
}

function passDay(states){
    let newBorns = states[0];
    for(let i=1; i<states.length; i++){
        states[i-1] = states[i];
    }
    states[6] += newBorns;
    states[8] = newBorns;
}

function getStartStates(){
    let input = getInput().split(",").map(x => parseInt(x));
    let states = [];
    for(let i=0; i<=NEW_FISH_TIMER; i++){
        states[i] = 0;
    }
    for(let i=0; i<input.length; i++){
        states[input[i]]++;
    }
    return states;
}

function getInput(){
    if(TEST) return "3,4,3,1,2";
    return "1,1,1,3,3,2,1,1,1,1,1,4,4,1,4,1,4,1,1,4,1,1,1,3,3,2,3,1,2,1,1,1,1,1,1,1,3,4,1,1,4,3,1,2,3,1,1,1,5,2,1,1,1,1,2,1,2,5,2,2,1,1,1,3,1,1,1,4,1,1,1,1,1,3,3,2,1,1,3,1,4,1,2,1,5,1,4,2,1,1,5,1,1,1,1,4,3,1,3,2,1,4,1,1,2,1,4,4,5,1,3,1,1,1,1,2,1,4,4,1,1,1,3,1,5,1,1,1,1,1,3,2,5,1,5,4,1,4,1,3,5,1,2,5,4,3,3,2,4,1,5,1,1,2,4,1,1,1,1,2,4,1,2,5,1,4,1,4,2,5,4,1,1,2,2,4,1,5,1,4,3,3,2,3,1,2,3,1,4,1,1,1,3,5,1,1,1,3,5,1,1,4,1,4,4,1,3,1,1,1,2,3,3,2,5,1,2,1,1,2,2,1,3,4,1,3,5,1,3,4,3,5,1,1,5,1,3,3,2,1,5,1,1,3,1,1,3,1,2,1,3,2,5,1,3,1,1,3,5,1,1,1,1,2,1,2,4,4,4,2,2,3,1,5,1,2,1,3,3,3,4,1,1,5,1,3,2,4,1,5,5,1,4,4,1,4,4,1,1,2";
}