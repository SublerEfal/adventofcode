const fs = require('fs');

start('./2021/day16/day16.in');
// start('./2021/day16/day16-test.in');

function run(data){
    // data = "A0016C880162017C3686B18A3D4780"; // Test
    let bin = data.split("").map(x => "0000" + parseInt(x, 16).toString(2)).map(x => x.substring(x.length-4)).join("");

    let reader = {index: 0};
    readPacket(bin, reader);
    console.log(reader.versionSum);
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
        content = readOperatorPacket(bin, reader);
    }
    if(trailingBits){
        reader.index += (8 - reader.index % 8);
    }
    return content;
}

function readOperatorPacket(bin, reader){
    let lengthTypeId = bin[reader.index++];
    if(lengthTypeId === "0"){
        let lengthOfSubpacket = readBitsAsNumber(bin, reader, 15);
        let endIndex = reader.index + lengthOfSubpacket;
        let subpackets = [];
        while(reader.index < endIndex){
            subpackets.push(readPacket(bin, reader, false));
        }
    }else{
        let subpacketsCount = readBitsAsNumber(bin, reader, 11);
        let subpackets = [];
        for(let i=0; i<subpacketsCount; i++){
            subpackets.push(readPacket(bin, reader, false));
        }
    }
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