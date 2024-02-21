import React from 'react';
import '../../App.css';

export interface HeaderProps {
    startOver(): void;
}
export const Header: React.FC<HeaderProps> = ({
    startOver,
}) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                <button onClick={startOver}>Start Over</button>
        </div>
    )
}