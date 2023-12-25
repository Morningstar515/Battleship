import { Ship } from "./Ship";

export class gameboard{
    constructor(){
        this.rows = 10;
        this.columns = 10;
        this.board = this.buildBoard()
        this.shipLocations = [];
        this.missLocations = [];
    }

    buildBoard(){
        let arr = []
        let value = 0;
        for (let i = 0; i < this.rows; i++) {
            arr[i] = []
            for (let j = 0; j < this.columns; j++) {  
                arr[i][j] = value++
            }
        }
        return arr;
    }

    shipPlacement(ship,cords){
        ship.cords.push(cords)
        this.shipLocations.push(cords);                              // [[2,2],[3,2],[4,2],[5,2],[6,2]]
    }                                                           // [[4,5],[4,6],[4,7]]

    receiveHit(cords){
        if(contains(cords,this.shipLocations)){
            cons
        }
        else{
            this.missLocations.push(cords);
        }
    }


}

//Hit location helper function
function contains(shipCords, locationsArray){
    for (let i = 0; i < locationsArray.length; i++) {
        for (let j = 0; j < locationsArray[i].length; j++) {
            if(locationsArray[i][j] === shipCords){
                return true;
            }
            else{
                return false;
            }
            
        }
    }
}