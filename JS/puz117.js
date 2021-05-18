// 21/04/21 Aiden - Added 6x6 grid templates
// List of possible games ** GT is used in testing **
const G01 = [1, null, 0, null, 0, 0, null, 1, null, 0, 0, null, null, null, null, null, null, 0, 0, null, null, 1, null, null, 1, 0, null, 1, 1, null, null, 0, null, null, 1, 1];
const G02 = [null, null, null, null, null, null, null, 1, null, null, null, 1, null, 1, null, 1, null, null, null, null, 0, null, null, 1, null, 1, null, null, null, null, null, null, null, 0, 0, null];
const G03 = [null, 1, null, null, null, null, null, null, null, 0, null, 0, null, 0, null, 0, null, null, 1, null, null, null, 1, null, null, null, null, null, 0, null, 0, null, null, null, null, null];
const G04 = [0, null, null, 1, null, null, null, 0, null, null, null, 1, null, null, 1, 1, null, null, null, null, null, null, 1, 1, null, null, null, null, null, 0, 0, null, 1, null, 1, null];
const G05 = [null, null, null, null, null, null, null, 1, null, 1, null, 1, null, null, 0, 0, null, null, 0, null, null, null, null, null, null, null, null, null, 1, 1, null, null, 0, null, 0, null];
const G06 = [null, null, null, null, null, 0, null, 1, null, null, 1, null, null, null, null, 0, null, null, null, null, 1, null, null, null, null, null, 1, null, null, null, null, 0, null, null, 1, null];
const G07 = [1, null, 1, null, null, 1, null, null, null, 1, null, null, 0, null, null, 1, 0, null, null, null, 1, null, null, null, null, 1, null, null, null, null, 1, null, null, 1, 1, null];
const G08 = [1, 1, null, null, null, null, 1, null, null, 1, null, null, null, null, null, null, 0, null, 0, null, 0, null, null, null, null, null, null, null, null, null, null, null, 0, null, 0, null];
const G09 = [null, null, 0, 0, null, 0, null, null, null, null, null, null, null, 1, 1, null, null, null, null, null, null, null, 0, 0, null, null, 1, null, 0, null, null, null, null, null, null, null];
const G10 = [null, null, null, null, null, null, null, 1, null, null, null, null, null, null, 0, null, 1, 1, null, null, 0, null, null, null, null, 0, null, null, 1, null, null, null, null, null, null, null];
const G11 = [null, 1, null, 1, null, 1, null, null, null, null, null, null, 0, 0, null, null, null, null, null, null, null, null, 1, null, 0, null, 1, 0, null, null, null, 1, null, null, null, null];
const G12 = [0, null, null, null, null, null, null, 1, 1, null, null, null, null, null, 1, null, null, null, null, null, null, 0, null, null, 0, null, null, 1, null, null, null, null, null, null, null, null];
const G13 = [null, null, null, 1, null, null, null, null, null, null, null, 0, null, null, null, null, 0, 0, null, null, null, null, 1, null, 1, null, null, null, null, null, null, 0, null, 0, null, 0];
const GT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

var row, col, GridSize, n_a, gridchoice, clicked, t_grid, null_avail;
row = col = GridSize = 6;
var grid = [];

function loadGrid(g) { // 21/4/21 Aiden - Fills in the grid from a template
    // Used in BinaryPuzzleSolver();
    if (clicked != true) {
        clicked = false;
        n_a = false;
    }

    null_avail = false;

    grid = []; // Restart array when switching game
    var gridCol = []; 

    // 30/4/21 Aiden - Convert 1D array to 2D
    for (let j = 0; j < row; j++) {
        for (let i = 0; i < col; i++) {
            gridCol.push(g[j * col + i]);
        }
        grid.push(gridCol);
        gridCol = []; // Clear this array ready for the next row
    }
    // 10/5/21 Aiden - Update grid and debug textarea
    DisplayGrid(grid)
}

// Get current game after dropdown maneuverer
function gridrecall(a) {
    clicked = true;
    n_a = false;
    if (a == GT) {
        t_grid = true; // Marking test mode
    }
    else {
        t_grid = false;
    }
    gridchoice = a;
    loadGrid(gridchoice);
}

// Reset button, requested by feedback
function ResetPuz() {
    // Alert if current game is in test mode
    if (TestCheck() == false) {
        return false;
    }

    if (clicked == true) {
        loadGrid(gridchoice);
    }
    else {
        loadGrid(G01);
    }
}

// Check if current game is in test mode
function TestCheck() {
    if (t_grid == true) {
        alert("This is not a game! Please choose another game.");
        return false;
    }
}

// Check if current game is filled (Only in the "--Solve Repeat--" button)
function CheckForNull() {
    for (let Row = 0; Row < GridSize; Row++) { 
        for (let Col = 0; Col < GridSize; Col++) {
            if (grid[Row][Col] == null) {
                null_avail = true;
                break;
            }
        }
    }
    if (null_avail == false) {
        alert("Game is solved! Reset or choose another game.");
        return false;
    }
}

function DisplayGrid(G2D) {
    var concatenation = "";

    // 30/4/21 Aiden - Concatenate
    for (i = 0; i < row; i++) {
        concatenation += `[${grid[i]}]\n`;
    }

    document.getElementById("arrayView1D").value = `[${grid}]`;
    document.getElementById("arrayView2D").value = concatenation.trim();
    document.getElementById("arrayViewCell").value = String(grid[3][2]); // Row 4, Column 3

    for (let o = 0; o < row; o++) { // 'o' looping through row (min := 1, max :=6)
        for (let i = 0; i < col; i++) { // 'i' looping through column (min := 1, max := 6)
            document.getElementById("B" + (o + 1) + "_" + (i + 1)).value = G2D[o][i]; 
        }
    }
}

// Loop exit and "Couldn't Solve the Puzzle" pop up inspired by Baxter Kemp
function BinaryPuzzleSolver() {
    // Alert if current game is in test mode or game is solved
    if (TestCheck() == false || CheckForNull() == false) {
        return false;
    }

    let i_count = 0; // Iteration count

    for (let i = 0; i < 8; i++) {
        SolvePuzzle();
    }
    
    // Check if all the cell if filled with 1 or 0
    for (let Row = 0; Row < GridSize; Row++) { 
        for (let Col = 0; Col < GridSize; Col++) {
            if (grid[Row][Col] == null) {
                n_a = true;
                break;
            }
        }
    }

    // Get iteration count if possible. 
    // Case: Dropdown options has been modified
    if (clicked == true && n_a == false) {
        loadGrid(gridchoice);
        for (let Row = 0; Row < GridSize; Row++) {
            for (let Col = 0; Col < GridSize; Col++) {
                if (grid[Row][Col] == null) {
                    SolvePuzzle();
                    i_count++;
                }
            }
        }
    }

    // Case: Dropdown options has NOT been modified
    if (clicked == false && n_a == false) {
        loadGrid(G01);
        for (let Row = 0; Row < GridSize; Row++) {
            for (let Col = 0; Col < GridSize; Col++) {
                if (grid[Row][Col] == null) {
                    SolvePuzzle();
                    i_count++;
                }
            }
        }
    }

    // Alert information after choosing "--Solve Repeat--" + A bit intentional delay
    if (n_a == true) {
        setTimeout(function(){ alert("Couldn't Solve the Puzzle"); }, 250);
    }
    // Iteration or iterations
    else if (n_a == false && i_count == 1) {
        setTimeout(function(){ alert("Puzzle solved after 1 iteration of SolvePuzzle()"); }, 250);
    }
    else {
        setTimeout(function(){ alert("Puzzle solved after " + i_count + " iterations of SolvePuzzle()"); }, 250);
    }
}

function SolvePuzzle() {
    // Alert if current game is in test mode
    if (TestCheck() == false) {
        return false;
    }

    SolveNumberPairs();
    SolveNumberTrios();
    CompleteRowsCols();
}

function SolveNumberPairs() {
    // Alert if current game is in test mode
    if (TestCheck() == false) {
        return false;
    }

    SolveRowPairs();
    SolveColPairs();
}

function SolveRowPairs() {
    // Alert if current game is in test mode
    if (TestCheck() == false) {
        return false;
    }

    for (let Row = 0; Row < GridSize; Row++) {
        for (let Col = 0; Col < GridSize - 1; Col++) {
            if (grid[Row][Col] !== null && grid[Row][Col] == grid[Row][Col + 1]) {
                if (Col > 0) { // Left side
                    grid[Row][Col - 1] = 1 - grid[Row][Col];
                }
                if (Col < GridSize - 2) { // Right side
                    grid[Row][Col + 2] = 1 - grid[Row][Col];
                }
            }
        }
    }
    // 10/5/21 Aiden - Update grid and debug textarea
    DisplayGrid(grid);
}

function SolveColPairs() {
    // Alert if current game is in test mode
    if (TestCheck() == false) {
        return false;
    }

    for (let Row = 0; Row < GridSize - 1; Row++) {
        for (let Col = 0; Col < GridSize; Col++) {
            if (grid[Row][Col] !== null && grid[Row][Col] == grid[Row + 1][Col]) {
                if (Row > 0) { // Above
                    grid[Row - 1][Col] = 1 - grid[Row][Col];
                }
                if (Row < GridSize - 2) { // Below
                    grid[Row + 2][Col] = 1 - grid[Row][Col];
                }
            }
        }
    }
    DisplayGrid(grid);
}

function SolveNumberTrios() {
    // Alert if current game is in test mode
    if (TestCheck() == false) {
        return false;
    }

    // Horizontal
    for (let Row = 0; Row < GridSize; Row++) {
        for (let Col = 0; Col < GridSize - 2; Col++) {
            if (grid[Row][Col] !== null && grid[Row][Col] == grid[Row][Col + 2]) {
                grid[Row][Col + 1] = 1 - grid[Row][Col];
            }
        }
    }

    // Vertical
    for (let Row = 0; Row < GridSize - 2; Row++) {
        for (let Col = 0; Col < GridSize; Col++) {
            if (grid[Row][Col] !== null && grid[Row][Col] == grid[Row + 2][Col]) {
                grid[Row + 1][Col] = 1 - grid[Row][Col];
            }
        }
    }
    DisplayGrid(grid);
}

function CompleteRowsCols() {
    // Alert if current game is in test mode
    if (TestCheck() == false) {
        return false;
    }

    let row_0_count, row_1_count, col_0_count, col_1_count;
    row_0_count = row_1_count = col_0_count = col_1_count = 0;

    // Horizontal
    for (let Row = 0; Row < GridSize; Row++) {
        for (let Col = 0; Col < GridSize; Col++) {
            switch(grid[Row][Col]) {
                case 0: 
                    row_0_count++;
                    break;
                case 1:
                    row_1_count++;
                    break;
            }
        }
        for (let Col = 0; Col < GridSize; Col++) {
            if (grid[Row][Col] == null && row_0_count == 3) {
                grid[Row][Col] = 1;
            }
            if (grid[Row][Col] == null && row_1_count == 3) {
                grid[Row][Col] = 0;
            }
        }
        row_0_count = row_1_count = 0;
    }

    // Vertical
    for (let Col = 0; Col < GridSize; Col++) {
        for (let Row = 0; Row < GridSize; Row++) {
            switch(grid[Row][Col]) {
                case 0: 
                    col_0_count++;
                    break;
                case 1:
                    col_1_count++;
                    break;
            }
        }
        for (let Row = 0; Row < GridSize; Row++) {
            if (grid[Row][Col] == null && col_0_count == 3) {
                grid[Row][Col] = 1;
            }
            if (grid[Row][Col] == null && col_1_count == 3) {
                grid[Row][Col] = 0;
            }
        }
        col_0_count = col_1_count = 0;
    }
    DisplayGrid(grid);
}