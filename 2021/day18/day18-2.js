const fs = require('fs');

start('./2021/day18/day18.in');
// start('./2021/day18/day18-test.in');

function run(data){
    let lines = data.split("\n");
    let maxMagnitude = -Infinity;
    for(let i=0; i<lines.length; i++){
        for(let j=0; j<lines.length; j++){
            if(i===j) continue;
            let node = [eval(lines[i]), eval(lines[j])];
            while(true){
                if(explode(node)) continue;
                if(split(node)) continue;
                break;
            }
            maxMagnitude = Math.max(maxMagnitude, calculateMagnitude(node));
        }
    }
    
    console.log(maxMagnitude);
}

function explode(node){
    if(!(node instanceof Array)){
        return;
    }

    let queue = [node];
    let visited = [];
    let popVisited = function(){ visited.pop(); }
    while(queue.length > 0){
        element = queue.pop();
        if(element === popVisited){
            element();
            continue;
        }
        
        let node = element;
        // console.log(visited.length + " -- [" + (node[0] instanceof Array ? "arr" : node[0]) + "," + (node[1] instanceof Array ? "arr" : node[1]) + "]");
        if(visited.length === 3){
            for(let i=0; i<node.length; i++){
                if(node[i] instanceof Array){
                    explodeNode(node[i], visited.concat([node]));
                    node[i] = 0;
                    return true;
                }
            }
        }

        queue.push(popVisited)
        if(node[1] instanceof Array) queue.push(node[1]);
        if(node[0] instanceof Array) queue.push(node[0]);
        visited.push(node);
    }
    return false;
}

function split(node, parent, index){
    if(typeof node === "number"){
        if(node > 9){
            parent[index] = [Math.floor(node/2), Math.ceil(node/2)];
            return true;
        }
        return false;
    }

    if(split(node[0], node, 0)) return true;
    if(split(node[1], node, 1)) return true;
    return false;
}

function explodeNode(node, parents){
    for(let i=parents.length-1; i>=0; i--){
        if(typeof parents[i][0] === "number"){
            parents[i][0] += node[0];
            break;
        }else if(parents[i][0] !== parents[i+1] && parents[i][0] !== node){
             addToFirstNumberChild(node[0], parents[i][0], 1);
             break;
        }
    }

    for(let i=parents.length-1; i>=0; i--){
        if(typeof parents[i][1] === "number"){
            parents[i][1] += node[1];
            break;
        }else if(parents[i][1] !== parents[i+1] && parents[i][1] !== node){
            addToFirstNumberChild(node[1], parents[i][1], 0);
            break;
       }
    }
}

function addToFirstNumberChild(value, node, index){
    while(node[index] instanceof Array){
        node = node[index];
    }
    node[index] += value;
}

function calculateMagnitude(node){
    if(typeof node === "number"){
        return node;
    }
    return 3*calculateMagnitude(node[0]) + 2*calculateMagnitude(node[1]);
}

function printNode(node){
    if(typeof node === "number"){
        return node.toString();
    }

    let str = "[";
    node.forEach(child => {
        str += printNode(child);
        str += ","
    });
    return str.substring(0, str.length-1) + "]";
}

function createNode(node, parent){
    
    if(node instanceof Array){
        let newNode = {
            parent: parent
        };
        newNode.left = createNode(node[0], newNode);
        newNode.right = createNode(node[1], newNode);
        return newNode;
    }


}

function Node(left, right, parent){

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