import {useState} from "react";

function Square({value, onSquareClick: onSquareClick}) {
    return (
        <>
            <button className="square" onClick={onSquareClick}>{value}</button>
        </>
    )
}

function Board({squares, onGamePlay}) {
    let status
    const winner = CalculateWinner(squares)
    if (winner) {
        status = "Winner is :" + winner
    } else {
        status = "Go to start"
    }

    function handleClick(i) {
        if (CalculateWinner(squares) || squares[i]) {
            return
        }

        const currentSquares = squares.slice()
        if (i % 2 === 0) {
            currentSquares[i] = 'X'
        } else {
            currentSquares[i] = 'O'
        }
        onGamePlay(currentSquares)
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

function CalculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default function Game() {
    // 用于保存历史数据
    const [history, setHistory] = useState([Array(9).fill(null)])
    // 用于保存移动状态
    const [move, setMove] = useState(0)
    // 用于保存当前状态
    const currentSquare = history[move]

    // 这里传的相当于是函数，然后调用的时候传参数和调用
    function onGamePlay(nextSquares) {
        // 更新状态
        const nextHistory = [...history.slice(0, move + 1), nextSquares];
        setHistory(nextHistory)
        setMove(nextHistory.length - 1)
    }

    function jumpTo({nextMove}) {
        setMove(nextMove)
    }

    const moves = history.map((squares, move) => {
        let description
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}> {description}</button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={currentSquare} onGamePlay={onGamePlay}/>
            </div>
            <div className="game-info">
                <ul>
                    {moves}
                </ul>

            </div>
        </div>
    )
}