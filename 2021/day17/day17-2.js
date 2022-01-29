try{
    let area = {
        xMin: 155,
        xMax: 215,
        yMin: -132,
        yMax: -72
    };

    // let area = {
    //     xMin: 20,
    //     xMax: 30,
    //     yMin: -10,
    //     yMax: -5
    // };

    let result = [];
    for(let dx=1; dx<1000; dx++){
        for(let dy=area.yMin; dy<1000; dy++){
            let probe = createProbe(dx, dy);
            if(runProbe(probe, area)){
                result.push(dx + "," + dy);
            }
        }
    }
    console.log(result);
}catch(ex){
    console.error(ex.stack);
}

function runProbe(probe, area){
    while(probe.y >= area.yMin){
        if(isInTargetArea(probe, area)){
            return true;
        }
        probe.x += probe.dx;
        probe.y += probe.dy;
        probe.dx = Math.max(probe.dx-1, 0);
        probe.dy--;
    }
    return false;
}

function isInTargetArea(probe, area){
    if(probe.x < area.xMin) return false;
    if(probe.x > area.xMax) return false;
    if(probe.y < area.yMin) return false;
    if(probe.y > area.yMax) return false;
    return true;
}

function createProbe(dx, dy){
    return {
        x: 0,
        y: 0,
        dx: dx,
        dy: dy
    };
}