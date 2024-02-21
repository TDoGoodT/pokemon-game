import React from "react";

export interface PlayerSummaryProps {
    wins: number;
    rounds: number;
}

export const PlayerSummary: React.FC<PlayerSummaryProps> = ({ 
    wins,
    rounds
 }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <p> You won {wins} out of {rounds} rounds</p>
        </div>
    );
}