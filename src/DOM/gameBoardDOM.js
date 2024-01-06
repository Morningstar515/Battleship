import { playRound } from "..";

// Gamebord DOM setup
export function generateBoard(game,player,computer){
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
            tile.classList.add('tile','h-3','w-full','border','border-black');
            tile.setAttribute('id', 'tile-' + '[' + i + ',' + j + ']');

                tile.addEventListener('mouseover', mouseOver(tile,player,computer) );
                tile.addEventListener('mouseleave', () => {

                    tile.style.backgroundColor = 'white';
                    tile.removeEventListener('mouseover', mouseOver);
                    tile.addEventListener('mouseover',mouseOver)
                })
                
            row.append(tile);
        }
    }
}


// Tile event mouseover callback function
function mouseOver(tile,player,computer){
    let tempTile = document.querySelector('#tile')
    console.log(tempTile)

    tempTile.style.backgroundColor = 'lightblue';
    addHandle(tempTile,player,computer);
}

// Tile event click callback function
function addHandle(tile,player,computer){
    let tempTile = document.getElementById(tile.id)
    console.log(tempTile)
    tempTile.addEventListener('click', function event(){
        let str = JSON.stringify(tempTile.classList)
        let cords = str.match(/\[([\d,\d]+)\]/);
        playRound(player,computer, cords);
        this.removeEventListener('click', event) 

    tempTile.addEventListener('mouseleave', () => {
        tempTile.style.backgroundColor = 'white';
        this.removeEventListener('click',event);
    });                    
    })

}





export function shipPlacementDOM(tile,shipLen,i,j){ 



    

}

export function getShipCords(){

}


export function attackClick(target){
    let cords = document.get
}






