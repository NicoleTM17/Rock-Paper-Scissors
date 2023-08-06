import { useState } from 'react';

// CSS
import '../style/Game.css';


// Here we will be playing a simple game of rock, paper, scissors.
// The player will be playing against the computer (CPU). The computer will randomly choose rock, paper, or scissors from the array 'Moves'
// Whoever wins, the player or the CPU, will get 1 point.
// This game is the best of 3, so there will be 3 rounds, and 3 points to win. The winner at the end must score the most wins.
// If the player wins, they will get a 'You win the game' message. However, if they lose, they'll see a 'You lost!' message

// Rules of the game:
// Rock always beats scissors
// Scissors always beats paper
// Paper always beats rock
// They can tie

// const Moves = ["Rock", "Paper", "Scissors"];


// I'll need to do Math.random on the Moves array so that the CPU will always have a completely random move.
// I will create elements with rock, paper, scissors on it. I will add an eventListener so whichever is clicked will be stored as the players move.
// I'll need a counter variable to count every win
// Once either the player of cpu gets the 3 points, a message will come up "Winner!" and a play again button


function Game() {

  const [cpuMove, setCpuMove] = useState(''); // useState for the computer
  const [playerMove, setPlayerMove] = useState(''); // useState for the player
  const [gameResult, setGameResult] = useState(''); // useState for the game result
  const [cpuCounter, setCpuCounter] = useState(0); // useState for the cpu's point counter
  const [playerCounter, setPlayerCounter] = useState(0); // useState for the players point counter

  // created an array storing rock paper scissors
  const moves = ["Rock", "Paper", "Scissors"];

  // created a function getRandomMove so that the CPU's move is completely randomised
  function getRandomMove() {
    return moves[(Math.floor(Math.random() * moves.length))];
  };

  // created a click event on each playing card
  // Set store the value of the playerMove with the click answer
  // Next, stored the function getRandomMove for the cpuMove
  // Store the function roundResult by passing playerClick and randomCpuMove as arguments
  function handleClick(event){
    const playerClick = event.target.textContent;
    // console.log(playerClick);
    setPlayerMove(playerClick);

    const randomCpuMove = getRandomMove();
    setCpuMove(randomCpuMove);

    const result = roundResult(playerClick, randomCpuMove);
    setGameResult(result);
  };


  // create a function roundResult to store the results
  // pass the arguments playerMove and cpuMove
  // Condtional statement determining who wins or loses
  function roundResult(playerMove, cpuMove) {

    if (playerMove === cpuMove){
      return "It's a tie";
    } else if (playerMove === "Rock" && cpuMove === "Scissors"){
      return "You win! Rock beats Scissors!";
    } else if (playerMove === "Scissors" && cpuMove === "Paper"){
      return "You win! Scissors beats Paper!";
    } else if (playerMove === "Paper" && cpuMove === "Rock") {
      return "You win! Paper beats Rock!";
    } else {
      return `You lose! ${cpuMove} beats ${playerMove}!`;
    }
  };



  return(
    <div>
      <h1>CPU: {cpuMove}</h1>
      <h2>YOU: {playerMove}</h2>
      <h3>{gameResult}</h3>
      <div className='playing-cards-wrapper'>
        {/* Use the map method to iterate through the moves array */}
        {moves.map((move) =>
        <div onClick={handleClick} className='playing-card'>{move}</div>
        )}
      </div>
    </div>
  );
};

export default Game;
