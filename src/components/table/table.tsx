import {Square} from '../square/square'
import {useState} from "react";
import {Figures} from "../../assets/figures";


export function Table (props : any){

    const turnPick = () =>{
        if(turn === 1){
            turn = 2;
        }
        else{
            turn = 1;
        }
        return turn;
    }
    const changeMatrix = (cellNumber: number) =>{
        const column = cellNumber % 3;
        const row = setRow(cellNumber);

        tableMatrix[row][column] = turn;

        if(row === column){
            diagonalsMatrix[0][column] = turn;
        }
        if(row + column === 2){
            diagonalsMatrix[1][row] = turn;
        }

        return checkWin();
    }
    const checkWin = () =>{
        for(let i = 0; i < 3; i++){
            if(tableMatrix[i].includes(0)){
                continue;
            }
            if(tableMatrix[i].every(v => v === tableMatrix[i][0])){
                console.log("someone won on line " + i)
                setRowHighlights(i);
                setWon(true);
            }
        }

        if(tableMatrix[0][0] !== 0 && [tableMatrix[1][0], tableMatrix[2][0]].every(v => v === tableMatrix[0][0])){
            console.log("someone won on column 0");
            setColumnHighlights(0);
            setWon(true);
        }

        if(tableMatrix[0][1] !== 0 &&[tableMatrix[1][1], tableMatrix[2][1]].every(v => v === tableMatrix[0][1])){
            console.log("someone won on column 1");
            setColumnHighlights(1);
            setWon(true);
        }

        if(tableMatrix[0][2] !== 0 &&[tableMatrix[1][2], tableMatrix[2][2]].every(v => v === tableMatrix[0][2])){
            console.log("someone won on column 2");
            setColumnHighlights(2);
            setWon(true);
        }

        for(let i = 0; i < 2; i++){
            if(tableMatrix[i][0] !== 0 && diagonalsMatrix[i].every(v => v === tableMatrix[i][0])){
                console.log("someone won on diagonal " + i)
                setDiagonalHighlights(i);
                setWon(true);
            }
        }
    }
    const setRow = (cellNumber: number) => {
        if(cellNumber < 3){
            return 0;
        }
        else if(cellNumber < 6){
            return 1;
        }
        return 2;
    }
    const setRowHighlights = (row: number) => {
        if(row === 0){
            setIndicator([1, 1, 1, 0, 0, 0, 0, 0, 0]);
            return;
        }
        else if(row === 1) {
            setIndicator([0, 0, 0, 1, 1, 1, 0, 0, 0]);
            return;
        }
        setIndicator([0, 0, 0, 0, 0, 0, 1, 1, 1]);
        return
    }
    const setColumnHighlights = (column: number) => {
        if(column === 0){
            setIndicator([1, 0, 0, 1, 0, 0, 1, 0, 0]);
            return;
        }
        else if(column === 1){
            setIndicator([0, 1, 0, 0, 1, 0, 0, 1, 0]);
            return;
        }
        setIndicator([0, 0, 1, 0, 0, 1, 0, 0, 1]);
    }
    const setDiagonalHighlights = (diagonal: number) => {
        if(diagonal === 0){
            setIndicator([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            return;
        }
        setIndicator([0, 0, 1, 0, 0, 1, 0, 0, 1]);
        return;

    }

    let tableMatrix= [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    let diagonalsMatrix = [
        [0, 0, 0],
        [0, 0, 0]
    ]

    const [highlightIndicator, setIndicator] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [won, setWon] = useState(false);

    let turn: number = 1;
    let cells : any = [];
    for(let i = 0; i < 9; i++){
        cells.push(

        )
    }
    return(
        <div className={'table-container'}>
            {[...Array(9)].map((e, i) =>

                <div className={'square'} id={'s'+(i+1)} key={i}>
                    <Square symbolChanger={turnPick}
                            matrixMaker={() => changeMatrix(i)}
                            highlight={highlightIndicator[i]}
                            isWon = {won}>
                    </Square>
                </div>
            )}
        </div>
    )
}