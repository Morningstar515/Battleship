import { type } from "os";
import { playRound } from "..";
import { Player } from "../classes/Player";
import { getRandomCords } from "../classes/Player";
import { Ship } from "../classes/Ship";
import { EqualCords, gameboard } from "../classes/gameboard";
import { resolve } from "path";
import { isSet } from "util/types";
import { once } from "events";
import { removeAllListeners } from "process";





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
        console.log(player)
        await shipPlacementDOM(player);
    }
    else{
        console.log('we waited');
        recieveAttacks(player,enemy);
    }


}




function recieveAttacks(player,enemy){
    console.log(player)
    if(player.AI){
        let computerDiv = document.getElementById('rightBoard').getElementsByTagName('div');
        // Set up computer board to recieve attacks
        for (let i = 0; i < 10; i++) {
            let node = computerDiv[i * 11].childNodes;
            node.forEach(tile => {
            if(player.AI){
                tile.addEventListener('mouseover', function over(){
                    tile.classList.add('bg-blue-500');
                });
                tile.addEventListener('mouseleave', function leave(){
                    tile.classList.remove('bg-blue-500');
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
                tile.classList.add('bg-red-500')
                tile.isSet = true;
            } 
            else{
                tile.classList.add('bg-blue-300')
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
            tile.classList.add('bg-red-500')
            tile.isSet = true;
        } 
        else{
            tile.classList.add('bg-blue-300')
            tile.isSet = true;
        }
    }
}


export async function shipPlacementDOM(player){
    return new Promise(  async (resolve) => {
        //Create ships and store in ships array
        const startingShips = [5,4,3,3,2];
        let i = 0
        for(let length of startingShips){
            let ship = new Ship(length,0,false);
            player.gameboard.shipsArray.push(ship);
            let result =  await shipPlacement(player,startingShips[i]);
            i++;
        }
        removeAllListener();
        return resolve(); 
    })
}


function selection(tile,currShip){
    tile.classList.add("bg-green-500");
    for (let i = currShip; i > 0; i--) {

    // Get tile id's of next 4 tiles
        let tileIdRow = tile.id.match(/\[([\d,\d]+)\]/);

        //Find next row 1st digit and select
        let nextId = document.getElementById("tile-[" + (parseInt(tileIdRow[0][1]) + i - 1) + "," + parseInt(tileIdRow[0][3]) +']') 
        nextId.classList.add("bg-green-500")

        //Add deselect function
        tile.addEventListener('mouseleave', function leaveTile() {
            for (let i = currShip; i > 0; i--) {
                tileIdRow = tile.id.match(/\[([\d,\d]+)\]/);
                nextId = document.getElementById("tile-[" + (parseInt(tileIdRow[0][1]) + i - 1) + "," + parseInt(tileIdRow[0][3]) +']'); 
                nextId.classList.remove("bg-green-500")
                tile.removeEventListener('mouseleave', leaveTile);

            }                    
        })
    }
}


async function shipPlacement(player,currShip){
    return new Promise( (resolve) => {

        let tile = document.querySelectorAll(".tile");
        tile.forEach( oldtile => {

            let newTile = oldtile.cloneNode(true)
            oldtile.replaceWith(newTile);
            newTile.addEventListener('mouseover', function listeners(){

                selection(newTile,currShip);
                newTile.removeEventListener('mouseover',listeners);
                newTile.addEventListener('mouseover',listeners);

            })

            //Click function defining final position
            newTile.addEventListener('click',function click() {
                for (let i = currShip; i > 0; i--) {
                    let tileIdRow = newTile.id.match(/\[([\d,\d]+)\]/);
                    let nextId = document.getElementById("tile-[" + (parseInt(tileIdRow[0][1]) + i - 1) + "," + parseInt(tileIdRow[0][3]) +']') 
                    nextId.classList.remove("bg-green-500")
                    nextId.classList.add("bg-blue-500")
                    if(!player.AI){
                        player.gameboard.shipsArray[5-currShip].cords.push(JSON.parse(nextId.id.match(/\[([\d,\d]+)\]/)[0]));
                        console.log(player.gameboard.shipsArray)
                    }
                }
                resolve()
            })


            newTile.addEventListener('mouseleave', () => {
                if(!newTile.classList.contains("bg-blue-500")){
                    newTile.classList.remove("bg-green-500");
                }
            })
        })
    })
   
}


function removeAllListener(){
    let tile = document.querySelectorAll('.tile');
    tile.forEach(oldtile => {
        let newTile = oldtile.cloneNode(true)
        oldtile.replaceWith(newTile);
    })
}



