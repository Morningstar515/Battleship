import { type } from "os";
import { playRound } from "..";
import { Player } from "../classes/Player";
import { getRandomCords } from "../classes/Player";
import { Ship } from "../classes/Ship";
import { gameboard } from "../classes/gameboard";





// Gamebord DOM setup
export function generateBoard(game,player,enemy){
    let playerDiv = document.getElementById('leftBoard');
    let computerDiv = document.getElementById('rightBoard');
    

    //Populate 2nd board if 1st is done
    if(playerDiv.innerHTML !== ''){
        playerDiv = computerDiv;
    }

    // Create tiles and give unique class identifiers
    for (let i = 0; i < game.rows; i++) {
        let row = document.createElement('div');
        row.classList.add('h-full','h-4','flex',)
        playerDiv.append(row);

        for (let j = 0; j < game.columns; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tile','h-3','w-full','border','border-black','id');
            tile.setAttribute('id', 'tile-' + '[' + i + ',' + j + ']');
            tile.isSet = false;
            row.append(tile);
        }

    }
       // shipPlacementDOM()
        recieveAttacks(player,enemy)

  
}




function recieveAttacks(player,enemy){
    if(player.AI){
        let computerDiv = document.getElementById('rightBoard').getElementsByTagName('div');
        // Set up computer board to recieve attacks
        for (let i = 0; i < 10; i++) {
            let node = computerDiv[i * 11].childNodes;
            node.forEach(tile => {
            if(player.AI){
                tile.addEventListener('mouseover', function over(){
                    if(tile.isSet == false){
                        tile.style.backgroundColor = 'lightblue';
                    }
                });
    
                tile.addEventListener('mouseleave', function leave(){
                    if(tile.isSet == false){
                        tile.style.backgroundColor = 'white';
                    }
                });
                attackHandle(tile,enemy,player);
            }
            });
        }
    }
    else{
        return;
    }

}
    



// Tile event click callback function and attack DOM logic for players
function attackHandle(tile,player,enemy){
    tile.addEventListener('click', function event(){

        let str = JSON.stringify(tile.id)
        let cords = str.match(/\[([\d,\d]+)\]/);
        console.log(JSON.stringify(cords[0]))
        if(player.gameboard.missLocations.includes(cords[0]) || player.gameboard.hitLocations.includes(cords[0])){
            return
        } 
        else{
            let playerHit = playRound(player,enemy,cords[0])
            if(playerHit){
                tile.style.backgroundColor = 'red'
                tile.isSet = true;
            } 
            else{
                tile.style.backgroundColor = 'lightblue';
                tile.isSet = true;
            }
    
            //Follow player attack with computer counter attack
            computerAttackDOM(enemy,player)
        }


    })
} 





function computerAttackDOM(computer,player){

    let compCords = getRandomCords(player.gameboard);
    let compuerHit = playRound(computer,player,compCords);
    let tile = document.getElementById("tile-"+compCords);

    if(player.gameboard.missLocations.includes(compCords) || player.gameboard.hitLocations.includes(compCords)){
        return
    }
    else{
        if(compuerHit){
            tile.style.backgroundColor = 'red'
            tile.isSet = true;
        } 
        else{
            tile.style.backgroundColor = 'lightblue';
            tile.isSet = true;
        }
    }
}



export function shipPlacementDOM(player){
    const startingShips = [5,4,3,3,2];
    startingShips.forEach(length => {
        let ship = new Ship(length,0,false);
        player.gameboard.shipsArray.push(ship);
    });

    

}







