import { gameboard } from "./classes/gameboard";
import { generateBoard, shipPlacementDOM } from "./DOM/gameBoardDOM";

startGame();


function startGame(){
    let game1 = new gameboard();
    let game2 = new gameboard();
    console.log(game1.board)
    generateBoard(game1);
    generateBoard(game2);

}