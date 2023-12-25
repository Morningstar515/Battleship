
// Gamebord DOM setup
export function generateBoard(game,shipLen = [5,4,3,3,2]){
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
            tile.classList.add('tile','h-3','w-full','border','border-black',('tile-' + i + j));
    
            tile.addEventListener('mouseover', () => {    
                tile.style.backgroundColor = 'lightblue';

    
            });

            tile.addEventListener('mouseleave', () => {
                tile.style.backgroundColor = 'white';
            });
            
            row.append(tile);
        }
    }
}


export function shipPlacementDOM(tile,shipLen,i,j){ 



    

}

export function getShipCords(){

}


