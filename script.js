const playerFactory = (name, type, marker) => {
    console.log(`Player ${name} created!`);
    return {name, type, marker, score: 0}
};

const board = (function () {
    const boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    return {

        get: () => {return boardArray},

        set: (marker, position) => {
            boardArray[position] = marker},

        clear: () => {
            for (let i = 0; i < boardArray.length; i++) {
                boardArray[i] = 0;
            }
            console.log("BOARD CLEAR");
        },

        isOccupied: (position) => {return boardArray[position] !== 0}
        
    };
})();

const game = (function () {

    const _moveHuman = (player) => {
        const position = prompt(`${player.name}, what is your move?`);
        if(board.isOccupied(position)){
            _moveHuman(player);
        } else {
            board.set(player.marker, position);
        }
        console.log(board.get());
    };

    const _round = (player1, player2) => {

        if(player2.type === "human"){
            for(let i = 0; i < 9; i++) {
                if(i%2 === 0){
                    _moveHuman(player1);
                } else {
                    _moveHuman(player2);
                }
            }
        }
    };

    return {
        start: () => {
            const player1 = playerFactory(prompt("Player 1 name:", "Player 1"), "human", "x");
            const player2 = playerFactory(prompt("Player 2 name:", "Player 2"), "human", "o");
            const numberOfWins = prompt("How much victories?", 1);
            console.log(player1);
            console.log(player2);

            for (let i = 0; i < numberOfWins; i++) {
                _round(player1, player2);
                board.clear();
            }
            
        },
    };
})();

game.start();