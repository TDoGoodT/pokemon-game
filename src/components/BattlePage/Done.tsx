import React from "react";

export interface DoneProps {
    nextRound: () => void;
    winner: boolean
}
export const Done: React.FC<DoneProps> = ({
    nextRound,
    winner
}) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {winner ? <p>You won!</p> : <p>You lost!</p>}
            <button onClick={nextRound}>Finish Battle</button>
        </div> 
    )

}