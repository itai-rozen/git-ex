'use stricrt';
console.log('Mine Sweeper - Here we go!');
var BEGINNER = {
    rows: 4,
    mines: 2
};
var MEDIUM = {
    rows: 6,
    mines: 5
};
var EXPERT = {
    rows: 8,
    mines: 15
};
var difficulties = [BEGINNER, MEDIUM, EXPERT];
var gSizeLevel;
var gMinesLevel;
var MINE = "💣";
var FLAG = "🏳️";
var EMPTY = ' ';
var gIsFirstClick = false
var gBoard = 0;
var gTimeInterval = 0;
var gTimeCount = 0;
var gIsOn = false;
var gIshint = false;
var gHintsCount = 3;

function chooseDifficulty(input) {
    init();
    gBoard = buildBoard(input)
    renderBoard(gBoard);
}

function init() {
    gIsFirstClick = false;
    gIsOn = true;
    gIshint = false;
    stopTimer();
    gSizeLevel = 0;
    gTimeCount = 0;
    gTimeInterval = 0;
    gHintsCount = 3;
    var elTimeClass = document.querySelector('.time');
    elTimeClass.innerText = gTimeCount.toFixed(0);
    //  add snmiley
    renderSmiley('<img src="img/smiley.png">');
}


function buildBoard(userInput) {
    var board = [];
    gMinesLevel = difficulties[userInput].mines;
    gSizeLevel = difficulties[userInput].rows;
    for (var i = 0; i < gSizeLevel; i++) {
        board.push([]);
        for (var j = 0; j < gSizeLevel; j++) {
            board[i][j] = " ";
        }
    }
    console.log('mines qt ', gMinesLevel);
    console.table(gBoard);
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var item = gBoard[i][j];
            strHTML +=
                `<td class = "cell s-${i}-${j}
                 unchecked hvr-bob" onclick="cellClicked(this)" oncontextmenu="flagCell(this)">
            
                 ${item}
            </td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    buildHints(gHintsCount);
}


function updateBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            gBoard[i][j] = checkNeighbors(i, j, MINE);
        }
    }
    console.table(gBoard)
}

function cellClicked(elCell) {
    var cellCoords = getCellCoords(elCell);
    var elCellI = +cellCoords[0];
    var elCellJ = +cellCoords[1];
    console.log('cell coords: ', cellCoords);
    if (!gIsOn) return;
    if (!gIsFirstClick) {
        //revealing the cell
        var cell = gBoard[elCellI][elCellJ];
        // only after first click
        fillMines(elCellI, elCellJ);
        updateBoard()
        cell = checkNeighbors(elCellI, elCellJ, MINE);
        cell = (cell === 0) ? EMPTY : cell;
        if (cell === EMPTY) {
            expandCells(elCellI, elCellJ);
        }
        renderCell(elCellI, elCellJ, cell);
        removeClass(elCellI, elCellJ, 'unchecked');
        // start timer
        if (!gTimeInterval) {
            gTimeInterval = setInterval(function () {
                gTimeCount += 1;
                var elTimeClass = document.querySelector('.time');
                elTimeClass.innerText = gTimeCount.toFixed(0);
                // if (!gIsOn) stopTimer();
            }, 1000)
        }
        gIsFirstClick = true;
    }
    if (!gIshint) {
        if (elCell.classList.contains('flagged')) return;
        else if (elCell.classList.contains('unchecked')) elCell.classList.remove('unchecked');
        else return;
        // check neighbors & update model
        cell = checkNeighbors(elCellI, elCellJ, MINE);
        cell = (cell === 0) ? EMPTY : cell;
        // stepped on a mine
        if (cell === MINE) {
            revealAllElements(MINE);
            setTimeout(endGame, 500);
        }
        // function for expanding
        else if (cell === EMPTY) {
            expandCells(elCellI, elCellJ);
        }
        console.log('cell after model updating:', gBoard[elCellI][elCellJ]);
        //update DOM
        renderCell(elCellI, elCellJ, cell);
        // did i win?
        checkGame();
        console.table(gBoard);
        // clicked hint!
    } else if (gIshint) {
        revealNeighbors(elCellI, elCellJ);
        gHintsCount--;
        buildHints(gHintsCount);
    } else return;
}



// fill board with  mines - called once a game
function fillMines(cellI, cellJ) {
    // var mineCount =gMinesLevel;
    console.log('mine count @ fillMines func ', gMinesLevel)
    var mineCount = gMinesLevel;
    for (var i = 0; i < mineCount; i++) {
        var rand1 = getRandomNumWithinRange(0, gSizeLevel - 1);
        var rand2 = getRandomNumWithinRange(0, gSizeLevel - 1);
        if  (
            ((rand1 !== cellI || rand2 !== cellJ) &&
            (gBoard[rand1][rand2] !== MINE))
            )
        {
            gBoard[rand1][rand2] = MINE;
        } else i--;
    }

    // for (var i = 0; i < gBoard.length; i++) {
    //     for (var j = 0; j < gBoard.length; j++) {
    //         while (mineCount > 0) {
    //             var rand1 = getRandomNumWithinRange(0, gSizeLevel - 1);
    //             var rand2 = getRandomNumWithinRange(0, gSizeLevel - 1);
    //             // dont put a mine on the first clicked cell!
    //             if (rand1 === cellI && rand2 === cellJ) continue;
    //             gBoard[rand1][rand2] = MINE;
    //             mineCount--;
    //         }
    //     }
    // }
    console.table(gBoard);
}

function flagCell(cell) {
    if (!gIsOn) return;
    console.log('right click pressed');
    if (cell.classList.contains('unchecked') === false) return;
    var cellCoords = getCellCoords(cell);
    var cellCoordI = +cellCoords[0];
    var cellCoordJ = +cellCoords[1];
    if (cell.classList.contains('flagged')) {
        cell.classList.remove('flagged');
        renderCell(cellCoordI, cellCoordJ, ' ');
    } else {
        cell.classList.add('flagged');
        renderCell(cellCoordI, cellCoordJ, FLAG);
    }
    console.log('cell coords et flagcell func:', cellCoords);
    checkGame();
}



function checkNeighbors(cellI, cellJ, item) {
    var itemCount = 0;
    // var clickedCell = gBoard[cellI][cellJ];
    //if clicked cell is on the edge, update loop 
    if (gBoard[cellI][cellJ] === item) return item;
    var startingCellI = (cellI === 0) ? cellI : (cellI - 1);
    var startingCellJ = (cellJ === 0) ? cellJ : (cellJ - 1);
    var endingCellI = (cellI === gBoard.length - 1) ? cellI : (cellI + 1);
    var endingCellJ = (cellJ === gBoard[0].length - 1) ? cellJ : (cellJ + 1);

    for (var i = startingCellI; i <= endingCellI; i++) {
        for (var j = startingCellJ; j <= endingCellJ; j++) {
            //counting neighbor mines
            if (gBoard[i][j] === item) itemCount++;
        }
    }
    // console.log('mine count in the checkNeighbors function:', itemCount);
    // console.log('for location:', cellI, cellJ);
    if (itemCount === 0) return EMPTY;
    else return itemCount;
    // function to expand empty cells

}
function expandCells(iCell, jCell) {
    console.log('entered expansion func');
    var startingCellI = (iCell === 0) ? iCell : (iCell - 1);
    var startingCellJ = (jCell === 0) ? jCell : (jCell - 1);
    var endingCellI = (iCell === gBoard.length - 1) ? iCell : (iCell + 1);
    var endingCellJ = (jCell === gBoard.length - 1) ? jCell : (jCell + 1);
    for (var i = startingCellI; i <= endingCellI; i++) {
        for (var j = startingCellJ; j <= endingCellJ; j++) {
            if (i === iCell && j === jCell) continue;
            var cellClass = document.querySelector(getClassName(i, j));
            if (cellClass.classList.contains('flagged') ||
                cellClass.classList.contains('unchecked') === false) continue;
            else {
                removeClass(i, j, 'unchecked');
                renderCell(i, j, gBoard[i][j]);
            }
            // if neighbor cells are empty, run the function again on those cells
            if (gBoard[i][j] === EMPTY) expandCells(i, j);
        }
    }

}
function revealAllElements() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] === MINE) {
                removeClass(i, j, "unchecked");
                removeClass(i, j, "flagged");
                console.log(document.querySelector(".s-" + i + "-" + j + "").classList);
                console.log('reveal all elements');
                renderCell(i, j, gBoard[i][j]);
            }
        }
    }
}

// add a function to end game and stop timer
// TODO add restart option

function endGame() {
    gIsOn = false;
    console.log('you lost!');
    stopTimer();
    renderSmiley('<img  src="img/dead-smiley.png">');
    //  add a dead smiley :(
}

function checkGame() {

    var flagCount = document.querySelectorAll('.flagged').length;
    var unchekedCount = document.querySelectorAll('.unchecked').length;
    if (flagCount === gMinesLevel && unchekedCount === gMinesLevel) {
        console.log('you win!');
        //  add smiley with sunglasses 8)
        renderSmiley('<img  src="img/smiley-sunglasses.jpg">');
        gIsOn = false;
    }
}

function stopTimer() {
    clearInterval(gTimeInterval);
}

function buildHints(numberOfhints) {
    var strHTML = '';
    var elHints = document.querySelector('.hints');
    console.log('hints class:', elHints);
    for (var i = 0; i < numberOfhints; i++) {
        strHTML += `<img onclick=useHint() src="img/hint.png">`
    }
    elHints.innerHTML = strHTML;
}
function useHint() {
    gIshint = true;
}

function revealNeighbors(iCell, jCell) {
    var startingCellI = (iCell === 0) ? iCell : (iCell - 1);
    var startingCellJ = (jCell === 0) ? jCell : (jCell - 1);
    var endingCellI = (iCell === gBoard.length - 1) ? iCell : (iCell + 1);
    var endingCellJ = (jCell === gBoard.length - 1) ? jCell : (jCell + 1);
    for (var i = startingCellI; i <= endingCellI; i++) {
        for (var j = startingCellJ; j <= endingCellJ; j++) {
            var elCellClass = getClassName(i, j);
            var elCell = document.querySelector(elCellClass)
            if (elCell.classList.contains('unchecked')) {
                elCell.classList.add('hinted');
                elCell.classList.remove('unchecked');
                renderCell(i, j, gBoard[i][j]);
            }
        }
    }
    setTimeout(unrevealCells, 1000);
}

function unrevealCells() {
    for (i = 0; i < gBoard.length; i++) {
        for (j = 0; j < gBoard.length; j++) {
            var elCellClass = getClassName(i, j);
            var elCell = document.querySelector(elCellClass)
            if (elCell.classList.contains('hinted')) {
                elCell.classList.add('unchecked');
                elCell.classList.remove('hinted');
                renderCell(i, j, " ");
            }
        }
    }
    gIshint = false;
}
function renderSmiley(face) {
    document.querySelector('.smiley').innerHTML = face;
}

