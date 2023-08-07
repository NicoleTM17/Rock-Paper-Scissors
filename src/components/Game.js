import { useState } from 'react';

// CSS
import '../style/Game.css';


// Here we will be playing a simple game of rock, paper, scissors.
// The player will be playing against the computer (CPU). The computer will randomly choose rock, paper, or scissors from the array 'Moves'
// Whoever wins, the player or the CPU, will get 1 point.
// This game is the best of 3, so there will be 3 rounds, and 3 points to win. The winner at the end must score the most wins.
// If the player wins, they will get a 'You win the game' message. However, if they lose, they'll see a 'You lost!' message
// There will be a 'Play again' button that pops up once either reaches the end and the game will reset

// Rules of the game:
// Rock always beats scissors
// Scissors always beats paper
// Paper always beats rock
// They can tie

// const Moves = ["Rock", "Paper", "Scissors"];


// I'll need to do Math.random on the Moves array so that the CPU will always have a completely random move. (DONE)
// I will create elements with rock, paper, scissors on it. I will add an eventListener so whichever is clicked will be stored as the players move. (DONE)
// I'll need a counter variable to count every win (DONE)
// Once either the player oR cpu gets the 3 points, a message will come up "Winner!" and a play again button (TODO)


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
  // Pass playerMove as an argument
  // Next, stored the function getRandomMove for the cpuMove
  // Store the function roundResult by passing playerMove and generatedMove as arguments
  function handleClick(playerMove){

    // console.log(playerClick);
    setPlayerMove(playerMove);

    const generatedMove = getRandomMove();
    setCpuMove(generatedMove);

    roundResult(playerMove, generatedMove);

  };


  // create a function roundResult to store the results
  // pass the arguments playerMove and cpuMove
  // Condtional statement determining who wins or loses - set to game result
  // set the counter to add a point for either player or computer
  function roundResult(playerMove, cpuMove) {

    if (playerMove === cpuMove){
      setGameResult(<span>It's a <span style={{ textDecoration: 'underline' }}>tie!</span></span>);
      setPlayerCounter(playerCounter + 0);
      setCpuCounter(cpuCounter + 0);
    } else if (playerMove === "Rock" && cpuMove === "Scissors"){
      setGameResult(<span><span style={{ color: 'green' }}>You win!</span> Rock beats Scissors!</span>);
      setPlayerCounter(playerCounter + 1);
      setCpuCounter(cpuCounter + 0);
    } else if (playerMove === "Scissors" && cpuMove === "Paper"){
      setGameResult(<span><span style={{ color: 'green' }}>You win!</span> Scissors beats Paper!</span>);
      setPlayerCounter(playerCounter + 1);
      setCpuCounter(cpuCounter + 0);
    } else if (playerMove === "Paper" && cpuMove === "Rock") {
      setGameResult(<span><span style={{ color: 'green' }}>You win!</span> Paper beats Rock!</span>);
      setPlayerCounter(playerCounter + 1);
      setCpuCounter(cpuCounter + 0);
    } else {
      setGameResult(<span><span style={{ color: 'red' }}>You Lose!</span> {cpuMove} beats {playerMove}!</span>);
      setCpuCounter(cpuCounter + 1);
      setPlayerCounter(playerCounter + 0);
    }
  };







  return(
    <div className='game-wrapper'>

      <img className="rps-logo" src='images/rps logo.png' alt='logo'/>

      <div className='rotate'>
        <h4 className='cpu-title'>CPU</h4>
        <div className='cpu-cards-wrapper'>
          <span>
            <img className='cpu-card' src='images/Rock.png' alt='rock-img'/>
            <p className='cpu-text'>Rock</p>
          </span>

          <span>
            <img className='cpu-card' src='images/Paper.png' alt='paper-img'/>
            <p className='cpu-text'>Paper</p>
          </span>

          <span>
            <img className='cpu-card' src='images/Scissors.png' alt='scissors-img'/>
            <p className='cpu-text'>Scissors</p>
          </span>

        </div>
      </div>


    <div className='game-stats'>

      <div className='moves-row'>
        <h1><span className='you-green'>YOU:</span> {playerMove}</h1>
        <h1><span className='cpu-red'>CPU:</span> {cpuMove}</h1>
      </div>

      <h1 className='counters'>YOU: {playerCounter} - CPU: {cpuCounter}</h1>
      <h2 className='game-result'>{gameResult}</h2>
      <div className='overall-winner'>WINNER: </div>
      <div className='play-btn'>Play again?</div>
    </div>


      {/* Use the map method to iterate through the moves array */}
      {/* I have added a key to identify each card individually */}
      {/* I am calling the handleClick function and passing move as an argument so it knows which playing card is being referenced */}

      <h2 className='player-title'>YOU</h2>
      <div className='playing-cards-wrapper'>
        {moves.map((move) => (
          <div key={move}>
            <img
              onClick={() => handleClick(move)}
              src={`/images/${move}.png`}
              className='playing-card'
              alt={move}
            />
            <p className='move-text'>{move}</p>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Game;
