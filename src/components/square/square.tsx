import {useState} from "react";
import {Figures as figs} from "../../assets/figures";
import {CSSProperties} from "react";


export function Square(props : any){

    const [symbol, setSymbol] = useState(0);
    let name: string = 'content-container'

    const setSymbolFunc = () =>{
        if(symbol === 0 && !props.isWon) {
            props.matrixMaker();
            setSymbol(props.symbolChanger);
        }
    }

    if(props.highlight === 1){
        name = name + ' highlight'
    }
    if(props.isWon){
        name = name + ' no-hover'
    }

    return (
        <div className={name}
             onClick={setSymbolFunc}>
            {figs[symbol]}
        </div>
    )
}