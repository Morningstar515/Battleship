import { once } from "events";
import { playRound } from "..";
import { title } from "process";
import { Player } from "../classes/Player";





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

            // Set up computer board to recieve attacks
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
                addHandle(tile,enemy,player);
            }

            row.append(tile);

            // Tile event click callback function and attack DOM logic for players
            function addHandle(tile,player,enemy){
                tile.addEventListener('click', function event(){
                    let str = JSON.stringify(tile.id)
                    let cords = str.match(/\[([\d,\d]+)\]/);
                    let playerHit = playRound(player,enemy,cords[0])
                    console.log(playerHit)
                    if(playerHit){
                        tile.style.backgroundColor = 'red'
                        tile.isSet = true;
                    } 
                    else{
                        tile.style.backgroundColor = 'lightblue';
                        tile.isSet = true;
                    }
                }) 
            } 

        }
   
    }
}

function computerAttackDOM(player,computer,cords){
let compCords = [getRandomCords(player.gameboard)]
let compuerAtk = computer.playerAttack(compCords);
let tile = document.getElementById('tile-' + cords);
}






export function shipPlacementDOM(tile,shipLen,i,j){ 



    

}

export function getShipCords(){

}


export function attackClick(target){
    let cords = document.get
}






