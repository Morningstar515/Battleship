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

    let ships = [5,4,3,3,2];

    /* Pre-determined cords */
    let playerShip =    [ [[0,0],[1,0],[2,0],[3,0],[4,0]], [[2,2],[2,3],[2,4],[2,5]], [[4,2],[4,3],[4,4]], [[6,1],[7,1],[8,1]], [[8,9],[9,9]] ]
    let computerShip =  [ [[1,1],[1,2],[1,3],[1,4],[1,5]], [[2,2],[2,3],[2,4],[2,5]], [[5,2],[6,2],[7,2]], [[7,5],[7,6],[7,7]], [[9,2],[9,3]] ]

    game1.shipsArray = playerShip;
    game2.shipsArray = computerShip;

}


//Primary Game logic
export function playRound(player,computer,temp){
    let cords = [];
    let compCords = [getRandomCords(player.gameboard)]
    cords.push(temp)
    let playerAtk =  player.playerAttack(cords,computer)
    let compAtk = computer.playerAttack(compCords ,player)
    return playerAtk;
}




