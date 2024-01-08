import { assert } from "console";
import { Ship } from "./Ship";
import { parse } from "path";
import { json } from "stream/consumers";


export class gameboard{
    constructor(){
        this.rows = 10;
        this.columns = 10;
        this.board = this.buildBoard()
        this.shipsArray = [];
        this.missLocations = [];
        this.hitLocations = []; //< ---- log all calls
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

    async shipPlacement(ship,cords){
        if(this.shipsArray.length == 0){
            this.shipsArray.push(ship);
            ship.cords.push(cords);
        }
        else if(contains(cords,this.shipsArray) !== false){
             return 'space already taken';
        }
        else{
            this.shipsArray.push(ship);
            ship.cords.push(cords);
        }
    }
    
    //Must be Array containing cords
    recieveHit(cords){
        if(contains(cords,this.shipsArray) !== false){
            let hitShip = this.shipsArray[shipLocator(cords,this.shipsArray)];
            hitShip.isHit();
            this.hitLocations.push(cords);
        }
        else{
            this.missLocations.push(cords);
        }
    }

    //Check win condition
    win(){
        this.shipsArray.every( (ship) => {
            if(ship.sunk == true){
                console.log('here')

                return true;
            }
            else{
                return false;
            }
        })
    }


}// end gameboard class

//Hit location helper function, returns ship cords if found         /* <--- Gross cubic function needs to be fixed */
export function contains(shipCords, shipsArray){

    let result = false;
    shipCords.forEach(cord => {
        let i = 0;
        shipsArray.forEach( ship => {
            ship.forEach( (element) => {
                if(EqualCords(JSON.stringify(element),cord)){
                   result = cord;
                   return result;
                }
                i++;
            })
        })
    });
    return result;
}


//Identifying ship type based on occupied cords
function shipLocator(shipCords,shipsArray){
    let result = '';
    shipCords.forEach(cord => {
        let i = 0;
        shipsArray.forEach( ship => {
            for (let j = 0; j < ship.cords.length; j++) {
                let stringShip = JSON.stringify(ship.cords[j]);
                let stringCord = JSON.stringify(cord);
                if(stringShip.includes(stringCord)){    
                    result = i;
                    return result;
                }
            }
            i++;
        })
    });
    return result;
}


// IsEqual function for contains cords bullshit
export function EqualCords(c1,c2){

    for (let i = 0; i < c1.length; i++) {
        if(c1[i] !== c2[i]){
            return false
        }
    }
    return true;

}