import { useState, useEffect } from 'react';

// CSS
import '../style/Game.css';
import '../style/responsive.css';

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
// Once either the player oR cpu gets the 3 points, a message will come up "Winner!" and a play again button (DONE)


function Game() {

  const [cpuMove, setCpuMove] = useState(''); // useState for the computer
  const [playerMove, setPlayerMove] = useState(''); // useState for the player
  const [gameResult, setGameResult] = useState(''); // useState for the game result
  const [cpuCounter, setCpuCounter] = useState(0); // useState for the cpu's point counter
  const [playerCounter, setPlayerCounter] = useState(0); // useState for the players point counter
  const [finalGameResult, setFinalGameResult] = useState(''); // useState for the final result after 3 points win
  const [playAgain, setPlayAgain] = useState(false); // UseState for 'play again' button

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


  // The useEffect hook is used to call the gameWin function whenever the values of playerCounter or cpuCounter change.
  // playerCounter and cpuCounter are therefore dependencies in this effect
  // This is helpful to update the game result whenever the scores change.
  useEffect(() => {

    // Here I am checking if either player or cpu has reached 3 points.
    // If they have, the game is finished and the play again button will pop up
    function gameWin(){

      if(playerCounter === 3){
        setFinalGameResult(`You won! ${playerCounter} - ${cpuCounter}`);
        setPlayAgain(true);
      } else if (cpuCounter === 3){
        setFinalGameResult(`You lost! ${playerCounter} - ${cpuCounter}`);
        setPlayAgain(true);
      };
    };

    gameWin();
  }, [playerCounter, cpuCounter]);

  // create a function roundResult to store the results
  // pass the arguments playerMove and cpuMove
  // Condtional statement determining who wins or loses - set to game result
  // playerCounter / cpuCounter are incremented by 1 depending on which wins the orund
  // the current counter value is stored in prevCounter and 1 is added to it.
  // Then this updated value is stored back in setPlayerCounter
  function roundResult(playerMove, cpuMove) {

    if (playerMove === cpuMove){
      setGameResult(<span>It's a <span style={{ textDecoration: 'underline' }}>tie!</span></span>);

    } else if (playerMove === "Rock" && cpuMove === "Scissors"){
      setGameResult(<span><span style={{ color: 'green' }}>You win!</span> Rock beats Scissors!</span>);
      setPlayerCounter((prevCounter) => prevCounter + 1);

    } else if (playerMove === "Scissors" && cpuMove === "Paper"){
      setGameResult(<span><span style={{ color: 'green' }}>You win!</span> Scissors beats Paper!</span>);
      setPlayerCounter((prevCounter) => prevCounter + 1);

    } else if (playerMove === "Paper" && cpuMove === "Rock") {
      setGameResult(<span><span style={{ color: 'green' }}>You win!</span> Paper beats Rock!</span>);
      setPlayerCounter((prevCounter) => prevCounter + 1);

    } else {
      setGameResult(<span><span style={{ color: 'red' }}>You Lose!</span> {cpuMove} beats {playerMove}!</span>);
      setCpuCounter((prevCounter) => prevCounter + 1);

    }
  };

  // TO RESET THE GAME SO A FRESH GAME BEGINS
  function resetGame() {
    setCpuMove('');
    setPlayerMove('');
    setGameResult('');
    setCpuCounter(0);
    setPlayerCounter(0);
    setFinalGameResult('');
    setPlayAgain(false);
  }

  // created a click event on play again button
  // When this button is clicked, the entire game is reset by calling the resetGame function
  function handleClickReset(event){
    // console.log(event);
    resetGame();
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
      <div className='overall-winner'>{finalGameResult}</div>
      {/* ternary operator - when playAgain is true show the play button otherwise keep it hidden */}
      <div onClick={handleClickReset}
       className={playAgain === true ? 'play-btn' : 'play-btn-hidden'}
       >Play again?
       </div>
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
