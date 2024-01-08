import { contains, gameboard } from "./classes/gameboard";
import { Ship } from "./classes/Ship";
import { generateBoard, shipPlacementDOM } from "./DOM/gameBoardDOM";
import { Player } from "./classes/Player";
import { getRandomCords } from "./classes/Player";

startGame();


function startGame(){

    let game1 = new gameboard();
    let game2 = new gameboard();
    let player = new Player("player1",game1,true,false);
    let computer = new Player("computer1",game2,false,true);

    generateBoard(game1, player, computer);
    generateBoard(game2, computer, player);

    /* Pre-determined cords */
    let playerShip =    [ [[0,0],[1,0],[2,0],[3,0],[4,0]], [[2,2],[2,3],[2,4],[2,5]], [[4,2],[4,3],[4,4]], [[6,1],[7,1],[8,1]], [[8,9],[9,9]] ]
    let computerShip =  [ [[1,1],[1,2],[1,3],[1,4],[1,5]], [[2,2],[2,3],[2,4],[2,5]], [[5,2],[6,2],[7,2]], [[7,5],[7,6],[7,7]], [[9,2],[9,3]] ]

    playerShip.forEach(set => {
        let ship = new Ship(set.length,0,false);
        ship.cords = set;
        player.gameboard.shipsArray.push(ship);
    });

    computerShip.forEach(set => {
        let ship = new Ship(set.length,0,false);
        ship.cords = set
        computer.gameboard.shipsArray.push(ship);
    });


}


//Primary Game logic
export function playRound(player,enemy,cords){
    
    // If player attacking
    if(!player.AI){
        let playerAtk =  player.playerAttack(cords,enemy)
        return playerAtk;
    }

    // If AI attacking
    else{
        let compAtk = player.playerAttack(cords ,enemy)
        return compAtk;

    }
    
}




