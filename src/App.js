import { useState } from "react";

// function Square(){
//   const [value,setValue] = useState(null)
//   function handleClick(){
//     setValue('X')
//   }
//   return (
//     <button className="square" onClick={handleClick}>{value}</button>
//   );
// }

function Square({value,onSquareClick}){
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
      return squares[a]
    }
  }
  return null
}

function Board({next,squares,onPlay}) {
  // const [squares,setSquares] = useState(Array(9).fill(null))
  // const [next,setNext] = useState(true)
  const winner = calculateWinner(squares)
  let status
  if(winner){
    status = "winner: "+ winner
  }else{
    status = "next player is: " + (next ? "X":"O")
  }

  function hanleClick(i){
    if(calculateWinner(squares)  || squares[i]){
      return
    }
    const nextSquare = squares.slice()
    if (next){
      nextSquare[i] = 'X'
    }else{
      nextSquare[i] = 'O'
    }

    onPlay(nextSquare)
  }
  return (
      <>
          <div className="status">{status}</div>
          <div className="board-row">
              <Square value={squares[0]} onSquareClick={()=>hanleClick(0)} />
              <Square value={squares[1]} onSquareClick={()=>hanleClick(1)}/>
              <Square value={squares[2]} onSquareClick={()=>hanleClick(2)}/>
          </div>
          <div className="board-row">
              <Square value={squares[3]} onSquareClick={()=>hanleClick(3)}/>
              <Square value={squares[4]} onSquareClick={()=>hanleClick(4)}/>
              <Square value={squares[5]} onSquareClick={()=>hanleClick(5)}/>
          </div>
          <div className="board-row">
              <Square value={squares[6]} onSquareClick={()=>hanleClick(6)}/>
              <Square value={squares[7]} onSquareClick={()=>hanleClick(7)}/>
              <Square value={squares[8]} onSquareClick={()=>hanleClick(8)}/>
          </div>
      </>
  );
}

export default function Game(){
  // const [next,setNext] = useState(true)

  const [history,setHistory] = useState([Array(9).fill(null)])
  const [currentMove,setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  const next = currentMove % 2 === 0

  function handlePlay(nextSquare){
    const nextHistory = [...history.slice(0,currentMove + 1),nextSquare]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    // setNext(!next)
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
    // setNext(nextMove % 2 === 0)
  }

  const move = history.map((squares,move) =>{
    let description
    if (move > 0){
      description = "Go to move #" + move
    }else{
      description = "Go to game start"
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    )
  })

  return(
    <div className="game">
      <div className="game-board">
        <Board next={next} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{move}</ol>
      </div>
    </div>
  )
}