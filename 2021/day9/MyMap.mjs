export default class MyMap {  // Create a class
    constructor(input) {  // Class constructor
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
        return parseInt(this.map[y][x]);
    }
}