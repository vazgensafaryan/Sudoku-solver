class Sudoku {
    constructor () {
        this.m_sudokuBoard = document.getElementById ("SudokuBoard");

        this.m_board = new Array (9);
        for (let i = 0; i < this.m_board.length; i++) {
            this.m_board[i] = new Array (9);
        }

        this.gameArr = new Array (9);
        for (let i = 0; i < this.gameArr.length; i++) {
            this.gameArr[i] = new Array (9);
        }
    }

    setupEmptyBoard () {
        let field;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                field = document.createElement ("INPUT");
                field.setAttribute ("type", "text");
                field.style.width = "23px";
                field.style.height = "20px";
                field.style.margin = "3px";
                field.style.textAlign = "center";

                this.m_board[i][j] = field;
            }
        }
    }

    createEmptyBoard () {
        let columnLine;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.m_sudokuBoard.appendChild (this.m_board[i][j]);
                if (j === 2 || j === 5) {
                    let columnLine = document.createElement ("DIV");
                    columnLine.style.display = "inline-block";
                    columnLine.style.padding = "10px";
                    this.m_sudokuBoard.appendChild (columnLine);
                }
            }
            this.m_sudokuBoard.appendChild (document.createElement ("BR"));

            if (i === 2 || i === 5) {
                let columnLine = document.createElement ("DIV");
                columnLine.style.padding = "10px";
                this.m_sudokuBoard.appendChild (columnLine);
            }
        }
    }

    clearBoard () {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                this.m_board[i][j].value = '';
            }
        }
    }

    passValues() {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                this.gameArr[i][j] = Number(this.m_board[i][j].value);
            }
        }
    }

    solveSudoku() {
        var emptySpot = this.nextEmtySpot();
        var r = emptySpot[0];
        var c = emptySpot[1];

        // if the game is unsolvable don't even try to solve it
        if (!this.isValidSudoku()) return this.gameArr;

        // if no vacant spot is left, board is solved
        if (r === -1) {
            return this.gameArr;
        }

        var possArr = this.possiblities(r, c);

        for (var k = 0; k < possArr.length && this.nextEmtySpot()[0] !== -1; k++) {
            this.gameArr[r][c] = possArr[k];
            this.solveSudoku();
        }

        // if no possible value leads to a solution reset this value
        if (this.nextEmtySpot()[0] !== -1) this.gameArr[r][c] = 0;

        return this.gameArr;
    }

    nextEmtySpot() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.gameArr[i][j] === 0) return [i, j];
            }
        }
        return [-1, -1];
    }

    possiblities(r, c) {
        var possArr = [];
        var row = [];
        var col = [];
        var quad = [];
        var k = 0;
        var l = 0;
        if (r <= 2) k = 0; else if (r <= 5) k = 3; else k = 6;
        if (c <= 2) l = 0; else if (c <= 5) l = 3; else l = 6;

        for (var i = 0; i < 9; i++) {
            row.push(this.gameArr[i][c]);
        }
        for (var j = 0; j < 9; j++) {
            col.push(this.gameArr[r][j]);
        }
        for (var i = k; i < k + 3; i++) {
            for (var j = l; j < l + 3; j++) {
                quad.push(this.gameArr[i][j]);
            }
        }

        for (var n = 1; n < 10; n++) {
            if (row.indexOf(n) === -1 && col.indexOf(n) === -1 && quad.indexOf(n) === -1) {
                possArr.push(n);
            }
        }
        return possArr;
    }

    checkQuadrant(r, c) {
        let qudarantArr = [];
        for (let i = r; i < r + 3; i++) {
            for (let j = c; j < c + 3; j++) {
                if (qudarantArr.indexOf(this.gameArr[i][j]) === -1 || this.gameArr[i][j] === 0) {
                    qudarantArr.push(this.gameArr[i][j]);
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    isValidSudoku() {
        if (!this.checkQuadrant(0, 0, this.gameArr)) return false;
        if (!this.checkQuadrant(0, 3, this.gameArr)) return false;
        if (!this.checkQuadrant(0, 6, this.gameArr)) return false;

        if (!this.checkQuadrant(3, 0, this.gameArr)) return false;
        if (!this.checkQuadrant(3, 3, this.gameArr)) return false;
        if (!this.checkQuadrant(3, 6, this.gameArr)) return false;

        if (!this.checkQuadrant(6, 0, this.gameArr)) return false;
        if (!this.checkQuadrant(6, 3, this.gameArr)) return false;
        if (!this.checkQuadrant(6, 6, this.gameArr)) return false;

        for (let i = 0; i < this.gameArr.length; i++) {
            let rowNumbers = [];
            for (let j = 0; j < this.gameArr.length; j++) {
                if (rowNumbers.indexOf(this.gameArr[i][j]) === -1 || this.gameArr[i][j] === 0) {
                    rowNumbers.push(this.gameArr[i][j]);
                } else {
                    return false;
                }
            }
        }

        for (let i = 0; i < this.gameArr.length; i++) {
            let colNumbers = [];
            for (let j = 0; j < this.gameArr.length; j++) {
                if (colNumbers.indexOf(this.gameArr[j][i]) === -1 || this.gameArr[j][i] === 0) {
                    colNumbers.push(this.gameArr[j][i]);
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    resultBoard() {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                this.m_board[i][j].value = this.gameArr[i][j];
            }
        }
    }
}


sudoku = new Sudoku();
sudoku.setupEmptyBoard();
sudoku.createEmptyBoard();


function solve () {
    sudoku.passValues ();
    sudoku.solveSudoku ();
    if (sudoku.isValidSudoku ()) {
        document.getElementById("errorContainer").style.display = "none";
        document.getElementById("solvedContainer").style.display = "block";
        sudoku.resultBoard();
        console.log (sudoku.gameArr);
    }
    else {
        document.getElementById("errorContainer").style.display = "block";
        document.getElementById("solvedContainer").style.display = "none";
    }
}

function clearAll () {
    document.getElementById("errorContainer").style.display = "none";
    document.getElementById("solvedContainer").style.display = "none";
    sudoku.clearBoard();
}