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

    let player1;
    let player2;
    let numberOfWins;
    let isPlayer1Turn;
    let isWon;

    const _flipTurn = () => {
        if(isPlayer1Turn === true){
            isPlayer1Turn = false;
        } else {
            isPlayer1Turn = true;
        }
    };

    const _moveHuman = (player, position) => {
        //const position = prompt(`${player.name}, what is your move?`);
        if (board.checkState() === 0) {
            if(board.isOccupied(position)){
                //_moveHuman(player, position);
                return
            } else {
                board.set(player.marker, position);
                _flipTurn();
            }
            console.log(board.get());
            display.update();
        }
    };

    const _getRandomPosition = () => {
        min = Math.ceil(0); //Inclusive
        max = Math.floor(8); //Inclusive
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const _moveComputer = (player) => {
        console.log('CONDITION 3 SATISFIED!');
        console.log(player.difficulty);

        function easyPlay() {
            const position = _getRandomPosition();
    
                if(board.isOccupied(position)){
                    _moveComputer(player);
                } else {
                    board.set(player.marker, position);
                    _flipTurn();
                    
                }
                console.log(board.get());
                display.update();
        };

        function unbeatablePlay() {
            let position = _minimax(false, false, board.get());
                console.log(`POSITION: ${position}`);
                board.set(player.marker, position);
                _flipTurn();
                console.log(board.get());
                display.update();
        };

        function mediumPlay() {
            const aux = Math.floor(Math.random() * (3)) + 1; // Returns a random integer between 1 and 3 (both included)
            if(aux === 3) {
                unbeatablePlay();
            } else {
                easyPlay();
            }
        };

        function hardPlay() {
            const random = Math.floor(Math.random() * (3)) + 1; // Returns a random integer between 1 and 3 (both included)
            if(random >= 2) {
                unbeatablePlay();
            } else {
                easyPlay();
            }
        };
        if (board.checkState() === 0) {
            switch (player.difficulty) {
                case "easy":
                    easyPlay();
                    break;

                case "unbeatable":
                    unbeatablePlay();
                    break;
                    
                case "medium":
                    mediumPlay();
                    break;

                case "hard":
                    hardPlay();
                    break;

                default:
                    break;
            }/*
            if(player.difficulty === "easy"){
                console.log('CONDITION 4 SATISFIED!');
                easyPlay();
                    
            } else if(player.difficulty === "unbeatable"){
                unbeatablePlay();
            }*/
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
            //console.log(newGameState);
            return newGameState;
        }

        //Minimax algorithm
        function _minimax(isRecursive, isMaximizing, gameState) {
            //console.log(`ENTERED MINIMAX: ${isMaximizing}`)
            if(_gameWinner(gameState)){
                //console.log(`GAME SCORE: ${_score(_gameWinner(gameState))}`);
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
                //console.log(`BEST: ${best}`);
                //console.log(`SCORE VALUES: ${scoreValues}`);
                //Returns best score if call is recursive or best position if call is NOT recursive
                if (isRecursive) {
                    return best;
                } else {
                    //console.log(`SCORE INDEXES: ${scoreIndexes}`);
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
                //console.log(`BEST: ${best}`);
                //console.log(`SCORE VALUES: ${scoreValues}`);
                //Returns best score if call is recursive or best position if call is NOT recursive
                if (isRecursive) {
                    return best;
                } else {
                    //console.log(`SCORE INDEXES: ${scoreIndexes}`);
                    return scoreIndexes[scoreValues.indexOf(best)]
                }
            }

        
        };

    };

    const _checkScore = (player) => {
        console.log(`CHECK SCORE: ${board.checkState()}`);
        if(player.marker === board.checkState()){
            ++player.score;
            console.log(`${player.name} wins a round!`);
            console.log(player1.score);
            console.log(player2.score);
            board.clear();
            display.update();
            _checkWinner(player);
            isPlayer1Turn = true;
            isWon = true;
        }
    };

    const _checkWinner = (player) => {
        if(player.score === numberOfWins){
            console.log(`${player.name} HAS WON THE GAME!`);
            display.showModal(player.name);
        };
    }

    const _turnControl = (position) => {
        if(isPlayer1Turn){
            isWon = false;
            //isPlayer1Turn = false;
            _moveHuman(player1, position);
            _checkScore(player1);
            console.log(board.checkState())
            if(player2.type !== 'human' && !isWon){
                console.log('CONDITION 1 SATISFIED!');
                _turnControl();
            }
        } else {
            //isPlayer1Turn = true;
            if (player2.type === "human") {
                _moveHuman(player2, position);
            } else {
                console.log('CONDITION 2 SATISFIED!');
                _moveComputer(player2);
            }
            _checkScore(player2);
        }
    };


    return {
        start: (player1Name, player2Name, player2Type, victories) => {
            board.clear();
            player1 = playerFactory(player1Name, "human", "x");
            if (player2Type === 'human') {
                player2 = playerFactory(player2Name, player2Type, "o");
            } else {
                player2 = playerFactory(player2Name, "computer", "o", player2Type);
            }
            numberOfWins = Number(victories);
            isPlayer1Turn = true;
            isWon = false;
            turnCounter = 1;
            console.log(player1);
            console.log(player2);
            display.update();

            /*for (let i = 0; i < 100; i++) {
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
            }*/
            
        },

        turn: (position) => {
            _turnControl(position);

        },

        getScore: () => {
            return `${player1.score} - ${player2.score}`
        },

        getPlayerNames: (number) => {
            if (number === 1) {
                return player1.name;
            } else {
                return player2.name;
            }
        }
    };
})();

const display = (function () {

    //Input elements
    const opSelectbox = document.getElementById('op-selectbox');
    const vicSelectbox = document.getElementById('vic-selectbox');
    const nameInput1 = document.getElementById('name-input1');
    const nameInput2 = document.getElementById('name-input2');

    //Label elements
    const player1Label = document.querySelector(".player-one-label");
    const player2Label = document.querySelector(".player-two-label");
    const scoreLabel = document.querySelector(".score-label");

    const startButton = document.getElementById("start-game");
    startButton.addEventListener("click", () => {
        game.start(nameInput1.value, nameInput2.value, opSelectbox.value, vicSelectbox.value);

        //Screen transition
        const mainContainer = document.querySelector(".main-menu-container");
        mainContainer.classList.add("inactive");
        const gameContainer = document.querySelector(".game-container");
        gameContainer.classList.remove("inactive");
    })

    const returnButton = document.getElementById("return-main-menu");
    returnButton.addEventListener("click", () => {

        //Screen transition
        const mainContainer = document.querySelector(".main-menu-container");
        mainContainer.classList.remove("inactive");
        const gameContainer = document.querySelector(".game-container");
        gameContainer.classList.add("inactive");
    })

    const boardCells = document.getElementsByClassName("grid-cell");
    for (const cell of boardCells) {
       cell.addEventListener("click", (e) => {
        console.log(`${e.target.id} CLICKED!`);
        game.turn(e.target.dataset.index);
    }) 
    }

    //MODAL SCRIPT

    let modal = document.getElementById("myModal");
    let modalContent = document.querySelector(".modal-content");

    // When the user clicks on <span> (x), close the modal
    modal.onclick = function () {
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.visibility = "hidden";
            modal.style.opacity = "0";
        }
    }

    return {
        update: () => {
            console.log("DISPLAY UPDATED");
            player1Label.innerHTML = game.getPlayerNames(1);
            player2Label.innerHTML = game.getPlayerNames(2);
            scoreLabel.innerHTML = game.getScore();
            const boardState = board.get();
            for(let i = 0; i < boardCells.length; i++){
                if (boardState[i] !== 0) {
                    boardCells[i].innerHTML = "";
                    boardCells[i].innerHTML = boardState[i];
                } else {
                    boardCells[i].innerHTML = "";
                }
            }
        },

        showModal: (winner, type) => {
            modal.style.visibility = "visible";
            modal.style.opacity = "1";
            modalContent.innerHTML = `${winner} WON THE GAME!`;
        }

    }

})();
