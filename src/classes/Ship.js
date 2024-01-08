export class Ship {
    constructor(length,hitMarks,sunk){
        this.length = length;
        this.hitMarks = hitMarks;
        this.sunk = sunk;
        this.cords = []

    }

    isHit(){
        if(this.isSunk()){
            return 'already hit here'
        }
        else{
            this.hitMarks += 1;
            this.isSunk()
            return true;
        }

    }

    isSunk(){
        if(this.hitMarks == this.length){
            this.sunk = true;
            return true;
        }
        else{
            return false;
        }
    }
}