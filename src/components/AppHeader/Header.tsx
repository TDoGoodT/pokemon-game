import React from 'react';
import '../../App.css';
import { Navbar } from './Navbar';

export interface HeaderProps {
   loading: boolean;
   startOver(): void;
}
export const Header: React.FC<HeaderProps> = ({
    loading,
    startOver,
}) => {
    if (loading) {
        return null
    }
    return (
        <div className='header-container'>
            <Navbar startOver={startOver}/>
        </div>
    )
}