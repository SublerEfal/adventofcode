module.exports = class MyMap {
    constructor(input) {
        this.map = input.split("\n").map(x => x.trim());
        this.width = this.map[0].length;
        this.height = this.map.length;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getValueAt(x, y){
        let value = parseInt(this.map[y]?.[x]);
        return typeof value === "number" ? value : null;
    }

    getAdjacentValues(x, y){
        let up = ((this.getValueAt(x, y-1)+1) || Infinity)-1;
        let down = ((this.getValueAt(x, y+1)+1) || Infinity)-1;
        let left = ((this.getValueAt(x-1, y)+1) || Infinity)-1;
        let right = ((this.getValueAt(x+1, y)+1) || Infinity)-1;
        return {up, down, left, right};
    }

    isLowPoint(x, y){
        let value = this.getValueAt(x, y);
        let adj = this.getAdjacentValues(x, y);
        return value < adj.up &&
            value < adj.down &&
            value < adj.left &&
            value < adj.right;
    }

    findBasin(x, y, basinPoints=[]){
        let value = this.getValueAt(x, y);
        if(value === null) return;
        if(value > 8) return;
        if(basinPoints.indexOf(`${x},${y}`) > -1) return;
        basinPoints.push(`${x},${y}`); 

        let adj = this.getAdjacentValues(x, y);

        for(let direction in adj){
            if(adj[direction] > value && adj[direction] < 9){
                switch(direction){
                    case "up": this.findBasin(x, y-1, basinPoints); break;
                    case "down": this.findBasin(x, y+1, basinPoints); break;
                    case "left": this.findBasin(x-1, y, basinPoints); break;
                    case "right": this.findBasin(x+1, y, basinPoints); break;
                }
            }
        }
        return basinPoints;
    }
}