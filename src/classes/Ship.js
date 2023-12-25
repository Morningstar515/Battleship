export class Ship {
    constructor(length,hitMarks,sunk){
        this.length = length;
        this.hitMarks = hitMarks;
        this.sunk = sunk;
        this.cords = []

    }

    isHit(){
        this.hitMarks += 1;
    }

    isSunk(){
        if(this.hitMarks == this.length){
            this.sunk = true;
        }
        return true;
    }
}