const Player = (name, marker) => {
    return { name, marker };
};

const Scoreboard = () => {
    let scores = { X: 0, O: 0 };

    const getScores = () => scores;

    const updateScore = (marker) => {
            scores[marker]++;
    };

    const resetScores = () => {
        scores = { X: 0, O: 0 };
    };

    return { getScores, updateScore, resetScores };
};

const Game = (player1, player2, scoreboard) => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = player1;
    const cells = document.querySelectorAll('.cell');
    const scoreX = document.getElementById('score-x');
    const scoreO = document.getElementById('score-o');

    const displayBoard = () => {
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const makeMove = (position) => {
        if (board[position] === '') {
            board[position] = currentPlayer.marker;
            displayBoard();
            return true;
        } else {
            alert('This position is already taken. Try another one.');
            return false;
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes('') ? null : 'Tie';
    };

    const handleCellClick = (event) => {
        const position = event.target.getAttribute('data-index');
        if (makeMove(position)) {
            const winner = checkWin();
            if (winner) {
                if (winner !== 'Tie') {
                    alert(`${currentPlayer.name} (${currentPlayer.marker}) wins!`);
                    scoreboard.updateScore(currentPlayer.marker);
                } else {
                    alert("It's a tie!");
                }
                updateScores();
                resetBoard();
            } else {
                switchPlayer();
            }
        }
    };

    const updateScores = () => {
        const scores = scoreboard.getScores();
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        displayBoard();
    };

    const startGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = player1;
        displayBoard();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    document.getElementById('restart').addEventListener('click', startGame);

    return { startGame };
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');
const scoreboard = Scoreboard();
const game = Game(player1, player2, scoreboard);

game.startGame();