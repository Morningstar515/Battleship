import { type } from "os";
import { playRound } from "..";
import { Player } from "../classes/Player";
import { getRandomCords } from "../classes/Player";
import { Ship } from "../classes/Ship";
import { EqualCords, gameboard } from "../classes/gameboard";
import { resolve } from "path";
import { isSet } from "util/types";
import { once } from "events";





// Gamebord DOM setup
export async function generateBoard(game,player,enemy){
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
        if(!player.AI){
            await shipPlacementDOM(player)
            recieveAttacks(player,enemy)
        }
        else{
            return
        }


  
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


export async function shipPlacementDOM(player){
    return new Promise(  (resolve) => {

        //Create ships and store in ships array
        const startingShips = [5,4,3,3,2];
        let i = 0
        for(let length of startingShips){
            let ship = new Ship(length,0,false);
            player.gameboard.shipsArray.push(ship);
            shipPlacementDragAndDrop(startingShips[i]);
            i++;
        }
        return resolve; 
    })

}

function shipPlacementDragAndDrop(currShip){
    const ship = document.querySelectorAll(".ship");
    const tile = document.querySelectorAll('.tile')
    let pieceDivLeft = document.getElementById("pieceDivLeft");
    let rotateFlag = false;
    //Give tiles drop acceptance
    tile.forEach(tile => {
        tile.addEventListener('dragover', (event) => {
            event.preventDefault();
            if(!rotateFlag){
                let tileId = event.target.id.match(/\[([\d,\d]+)\]/)[1][2]; 
                event.target.classList.add('bg-green-500');
                let a = event.target.parentElement.previousSibling;
                for (let i = 1; i <= currShip / 2; i++) {
                    a.childNodes.forEach(element => {
                        let eleId = element.id.match(/\[([\d,\d]+)\]/)[1][2];
                        if(tileId == eleId){
                            element.classList.add('bg-green-500');
                            tile.addEventListener('dragleave', (event) => {
                                element.classList.remove('bg-green-500')
                           })
                           a = element.parentElement.previousSibling;
                        }
                    });
                    
                }


            }
        })

        tile.addEventListener('dragleave', (event) => {
            event.target.classList.remove('bg-green-500')
       })

    })



    ship.forEach( ship => {
        ship.addEventListener('dragstart', () => {
            ship.classList.add('opacity-20');
        })


        ship.addEventListener('dragend', () => {
            ship.classList.remove('opacity-20');
            if(ship.parentElement == document.getElementById("pieceDivLeft")){
                pieceDivLeft.removeChild(document.getElementById(ship.id))
            }
            else{
                pieceDivRight.removeChild(document.getElementById(ship.id))

            }
        })
    })



}



