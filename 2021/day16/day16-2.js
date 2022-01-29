const fs = require('fs');

start('./2021/day16/day16.in');
// start('./2021/day16/day16-test.in');

function run(data){
    // data = "9C0141080250320F1802104A08"; // Test
    let bin = data.split("").map(x => "0000" + parseInt(x, 16).toString(2)).map(x => x.substring(x.length-4)).join("");

    let reader = {index: 0};
    let result = readPacket(bin, reader);
    console.log(result);
}

function readPacket(bin, reader, trailingBits=true){
    let version = readBitsAsNumber(bin, reader, 3);
    reader.versionSum = reader.versionSum || 0;
    reader.versionSum += version;
    let typeId = readBitsAsNumber(bin, reader, 3);
    let content;
    if(typeId === 4){
        content = readLiteralNumber(bin, reader);
    }else{
        let values = readOperatorPacket(bin, reader);
        content = processOperatorPacket(values, typeId);
    }
    if(trailingBits){
        reader.index += (8 - reader.index % 8);
    }
    return content;
}

function processOperatorPacket(packets, typeId){
    switch(typeId){
        case 0: return packets.reduce((acc,x) => acc+x, 0);
        case 1: return packets.reduce((acc,x) => acc*x, 1);
        case 2: return packets.reduce((acc,x) => Math.min(acc, x), Infinity);
        case 3: return packets.reduce((acc,x) => Math.max(acc, x), -Infinity);
        case 5: return packets[0] > packets[1] ? 1 : 0;
        case 6: return packets[0] < packets[1] ? 1 : 0;
        case 7: return packets[0] === packets[1] ? 1 : 0;
    }
}

function readOperatorPacket(bin, reader){
    let lengthTypeId = bin[reader.index++];
    let subpackets = [];
    if(lengthTypeId === "0"){
        let lengthOfSubpacket = readBitsAsNumber(bin, reader, 15);
        let endIndex = reader.index + lengthOfSubpacket;
        while(reader.index < endIndex){
            subpackets.push(readPacket(bin, reader, false));
        }
    }else{
        let subpacketsCount = readBitsAsNumber(bin, reader, 11);
        for(let i=0; i<subpacketsCount; i++){
            subpackets.push(readPacket(bin, reader, false));
        }
    }
    return subpackets;
}

function readLiteralNumber(bin, reader){
    let h="1";
    let bits = "";
    while(h==="1"){
        h = bin[reader.index++];
        bits += readBits(bin, reader, 4);
    }
    return parseInt(bits, 2);
}

function readBits(bin, reader, length){
    let bits = bin.substring(reader.index, reader.index+length);
    reader.index += length;
    return bits;
}

function readBitsAsNumber(bin, reader, length){
    return parseInt(readBits(bin, reader, length), 2);
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