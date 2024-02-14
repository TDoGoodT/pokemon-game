import React from 'react';
import '../../App.css';

export interface NavbarProps {
    startOver(): void;
}
export const Navbar: React.FC<NavbarProps> = ({
    startOver,
}) => {
    
    return (
        <div className='nav-tab'>
                <button key='start over' className='nav-button' onClick={startOver}>
                   start over
                </button>
        </div>
    )
}