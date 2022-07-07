const playerFactory = (name, type, marker, difficulty) => {
    console.log(`Player ${name} created!`);
    return {name, type, marker, score: 0, difficulty}
};

const board = (function () {
    const boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    return {

        get: () => {
            let copy = boardArray.slice();
            return copy},

        set: (marker, position) => {
            console.log(`BOARD SET: ${marker} : ${position}`)
            boardArray[position] = marker},

        clear: () => {
            for (let i = 0; i < boardArray.length; i++) {
                boardArray[i] = 0;
            }
            console.log("BOARD CLEAR");
        },

        isOccupied: (position) => {return boardArray[position] !== 0},

        checkState: () => {

        // Array index order |0 1 2|
        //                   |3 4 5|
        //                   |6 7 8|

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

    const _getRandomPosition = () => {
        min = Math.ceil(0); //Inclusive
        max = Math.floor(8); //Inclusive
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const _moveComputer = (player) => {
        if(player.difficulty === "easy"){
            const position = _getRandomPosition();

            if(board.isOccupied(position)){
                _moveComputer(player);
            } else {
                board.set(player.marker, position);
            }
            console.log(board.get());

        } else if(player.difficulty === "unbeatable"){
            const position = _minimax(false, false, board.get());
            console.log(`POSITION: ${position}`);
            board.set(player.marker, position);
            console.log(board.get());
        }
        
       /* if(board.isOccupied(position)){
            _moveComputer(player);
        } else {
            board.set(player.marker, position);
        }
        console.log(board.get());*/

        //Minimax algorithm auxiliary functions
        function _score(marker) {
            if(marker === "x"){return 10;}
            else if(marker === "o"){return -10;}
            else {
                return 0;
            }
        };

        function _gameWinner(gameState) {

            if (gameState[0]) {
                if (gameState[0] === gameState[1] && gameState[0] === gameState[2]) { return gameState[0] }
                if (gameState[0] === gameState[3] && gameState[0] === gameState[6]) { return gameState[0] }
                if (gameState[0] === gameState[4] && gameState[0] === gameState[8]) { return gameState[0] }
            }

            if (gameState[1]) {
                if (gameState[1] === gameState[4] && gameState[1] === gameState[7]) { return gameState[1] }
            }

            if (gameState[2]) {
                if (gameState[2] === gameState[5] && gameState[2] === gameState[8]) { return gameState[2] }
                if (gameState[2] === gameState[4] && gameState[2] === gameState[6]) { return gameState[2] }
            }

            if (gameState[3]) {
                if (gameState[3] === gameState[4] && gameState[3] === gameState[5]) { return gameState[3] }
            }

            if (gameState[6]) {
                if (gameState[6] === gameState[7] && gameState[6] === gameState[8]) { return gameState[6] }
            }

            //check for empty positions
            for (let i = 0; i < gameState.length; i++) {
                if (!gameState[i]) { return 0 }
            }

            //if none is found
            return "draw";

        };

        function _placeMarker(oldGameState, position, marker) {
            let newGameState = oldGameState.slice();
            newGameState[position] = marker;
            console.log(newGameState);
            return newGameState;
        }

        //Minimax algorithm
        function _minimax(isRecursive, isMaximizing, gameState) {
            console.log(`ENTERED MINIMAX: ${isMaximizing}`)
            if(_gameWinner(gameState)){
                console.log(`GAME SCORE: ${_score(_gameWinner(gameState))}`);
                return _score(_gameWinner(gameState))}

            let scoreValues = [];
            let scoreIndexes = [];

            if(isMaximizing){
                //Generates all possible game states with only one move
                gameState.forEach( (value, index) => {
                    if(value === 0){
                        //Calls minimax again to evaluate each possible game state and stores the scores
                        scoreValues.push(_minimax(true, false, _placeMarker(gameState, index, "x")));
                        scoreIndexes.push(index);
                    }
                })
                //Gets best score
                let best = -Infinity;
                scoreValues.forEach((value) => {
                    best = Math.max(best, value);
                })
                //Returns a array with the best score and its position
                console.log(`BEST: ${best}`);
                console.log(`SCORE VALUES: ${scoreValues}`);
                //Returns best score if call is recursive or best position if call is NOT recursive
                if (isRecursive) {
                    return best;
                } else {
                    console.log(`SCORE INDEXES: ${scoreIndexes}`);
                    return scoreIndexes[scoreValues.indexOf(best)];
                }

            } else {
                //Generates all possible game states with only one move
                gameState.forEach((value, index) => {
                    if (value === 0) {
                        //Calls minimax again to evaluate each possible game state and stores the scores
                        scoreValues.push(_minimax(true, true, _placeMarker(gameState, index, "o")));
                        scoreIndexes.push(index);

                    }
                })
                //Gets best score
                let best = +Infinity;
                scoreValues.forEach((value) => {
                    best = Math.min(best, value)
                })
                //Returns a array with the best score and its position
                console.log(`BEST: ${best}`);
                console.log(`SCORE VALUES: ${scoreValues}`);
                //Returns best score if call is recursive or best position if call is NOT recursive
                if (isRecursive) {
                    return best;
                } else {
                    console.log(`SCORE INDEXES: ${scoreIndexes}`);
                    return scoreIndexes[scoreValues.indexOf(best)]
                }
            }

        
        };

    };

    const _round = (player1, player2) => {

        for(let i = 0; i < 9; i++) {
            if(i%2 === 0){
                _moveHuman(player1);
                if(_checkScore(player1)){return player1};
            } else {
                if(player2.type === "human"){
                    _moveHuman(player2);
                    if(_checkScore(player2)){return player2};

                } else if(player2.type === "computer") {
                    _moveComputer(player2);
                    if(_checkScore(player2)){return player2};
                }
            }
        }
                
    }


    const _checkScore = (player) => {
        console.log(`CHECK SCORE: ${board.checkState()}`);
        if(player.marker === board.checkState()){
            console.log(`${player.name} wins a round!`);
            return ++player.score;
        }
    };

    return {
        start: () => {
            board.clear();
            const player1 = playerFactory(prompt("Player 1 name:", "Player 1"), "human", "x");
            const player2 = playerFactory(prompt("Player 2 name:", "Player 2"), "computer", "o", "unbeatable");
            const numberOfWins = Number(prompt("How much victories?", 1));
            console.log(player1);
            console.log(player2);

            for (let i = 0; i < 100; i++) {
                const winner = _round(player1, player2);
                if (winner) {
                    console.log(typeof winner.score);
                    console.log(typeof numberOfWins);
                    console.log(winner.score === numberOfWins);
                    if(winner.score === numberOfWins){
                        console.log(`${winner.name} HAS WON THE GAME!`);
                        return;
                    };
                }
                console.log(player1.score);
                console.log(player2.score);
                board.clear();
            }
            
        },
    };
})();

this.addEventListener("click", () => {game.start();})
