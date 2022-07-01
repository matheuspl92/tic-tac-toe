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
        
    };
})();

const game = (function () {

    const _move = (marker) => {
        board.set(marker, prompt("Which position?"));
        console.log(board.get());
    };

    const _round = (player1, player2) => {
        for(let i = 0; i < 9; i++) {
            if(i%2 === 0){
                _move(player1.marker);
            } else {
                _move(player2.marker);
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