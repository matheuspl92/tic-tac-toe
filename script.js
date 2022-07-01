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

        isOccupied: (position) => {return boardArray[position] !== 0},

        checkWinner: () => {

        // Array index order |0 1 2|
        //                   |3 4 5|
        //                   |6 7 8|
            console.log("ENTERED CHECK");

            if(boardArray[0]){
                if(boardArray[0]===boardArray[1] && boardArray[0]===boardArray[2]){return boardArray[0]}
                if(boardArray[0]===boardArray[3] && boardArray[0]===boardArray[6]){return boardArray[0]}
                if(boardArray[0]===boardArray[4] && boardArray[0]===boardArray[8]){return boardArray[0]}
            }

            if(boardArray[1]){
                if(boardArray[1]===boardArray[4] && boardArray[1]===boardArray[7]){return boardArray[1]}
            }

            if(boardArray[2]){
                if(boardArray[2]===boardArray[5] && boardArray[2]===boardArray[8]){return boardArray[2]}
                if(boardArray[2]===boardArray[4] && boardArray[2]===boardArray[6]){return boardArray[2]}
            }

            if(boardArray[3]){
                if(boardArray[3]===boardArray[4] && boardArray[3]===boardArray[5]){return boardArray[3]}
            }

            if(boardArray[6]){
                if(boardArray[6]===boardArray[7] && boardArray[6]===boardArray[8]){return boardArray[6]}
            }

            //check for empty positions
            for (let i = 0; i < boardArray.length; i++) {
                if(!boardArray[i]){return 0}
            }

            //if none is found
            return "draw";

        }
        
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
                    console.log(board.checkWinner());
                } else {
                    _moveHuman(player2);
                    console.log(board.checkWinner());
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