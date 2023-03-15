import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className='header'>
            <h2 className='header-text' onClick={()=>navigate('/')}>Github View App</h2>
        </div>
    )
}

export default Header