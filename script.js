const playerFactory = (name, type) => {
    console.log(`Player ${name} created!`);
    return {name, type, score: 0}
}

const board = (function () {
    const boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    return {

        getBoard: () => {return boardArray},

        setBoard: (marker, position) => {boardArray[position] = marker},

        clearBoard: () => {
            for (let i = 0; i < boardArray.length; i++) {
                boardArray[i] = 0;
            }
            console.log("BOARD CLEAR");
        },
        
    };
})()
