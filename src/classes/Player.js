import { EqualCords, gameboard } from "./gameboard";


export class Player {
    constructor(name,gameboard,currentTurn,AI){
        this.name = name;
        this.gameboard = gameboard;
        this.currentTurn = currentTurn;
        this.AI = AI;
    }

    playerAttack(cords,enemy,player){
        return enemy.gameboard.recieveHit(cords,player);
    }
}

// Random Co-Ordinate generation for computer
export function getRandomCords(game){
    let cord = [];
    while(cord.length < 2){
        let num = Math.floor(Math.random() * 10)
        cord.push(num);
    }
    cord = JSON.stringify(cord);


    for (let i = 0; i <= game.missLocations.length; i++) {
        if(game.missLocations.length < 1){
            return cord;
        }
        else if(EqualCords(cord,game.missLocations[i])){
            getRandomCords(game);

        }
        else{
            return cord;
        }
        
    }
    for (let i = 0; i <= game.hitLocations.length; i++) {

        if(game.hitLocations.length < 1 ){
            return cord
        }
        else if(EqualCords(cord,game.hitLocations[i])){
            return cord;
        }
        else{
            getRandomCords(game);
        }
        
    }
}