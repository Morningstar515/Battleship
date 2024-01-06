import { EqualCords, gameboard } from "./gameboard";


export class Player {
    constructor(name,gameboard,currentTurn,AI){
        this.name = name;
        this.gameboard = gameboard;
        this.currentTurn = currentTurn;
        this.AI = AI;
    }

    playerAttack(cords,player){
        if(player.AI == true){
            player.gameboard.recieveHit(getRandomCords(player.gameboard));
        }
        else{
            player.gameboard.recieveHit(cords); 
        }
    }

}

// Random Co-Ordinate generation for computer
export function getRandomCords(game){
    let cord = [];
    while(cord.length < 2){
        let num = Math.floor(Math.random() * 100)
        cord.push(num);
    }

    if(game.hitLocations.every( (x)=> EqualCords(x,cord)) && game.missLocations.every( (x) => EqualCords(x,cord))){
        return cord;
    }
    else{
        return getRandomCords(game);
    }
}