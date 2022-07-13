# tic-tac-toe

This project consists in a tic tac toe browser game.

/////////////////////////////////////////

> User Interface

Game board
Start game button
Number of victories selector
Opponent type selector
AI difficult selector
Player name input
End game button

> Game Script

Game module: Has two players objects and controls the game flow.

OK! Board module: Has a array with 9 items representing the play space.

OK! Player objects: Every player has name, type (Human or Computer), marker and score.

Computer AI module: Has 4 levels (Easy, medium, hard and perfect).

Display module: Has all the DOM tied functions.

> Minimax algorithm

OK! Function that gives a score to the result when a game ends

OK! Function that checks if a game has ended and returns who won

OK! Function that reads a array and for each 0 it creates a new array with a marker in its place

OK! scoreState variable

> Display Module

Add event listeners to all buttons
OK! #start-game
OK! #return-main-menu
#op-selectbox
#vic-selectbox
#name-input1
#name-input2

Add event listeners to all game board cells

Function that displays board state

Function that displays game score

Function that displays round winner

Function that displays game winner

player1Name, player2Name, player2Type, player2Difficulty, numberOfWins