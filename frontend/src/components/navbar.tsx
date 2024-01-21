import React from 'react';
import { ConnectKitButton } from "connectkit";

const Navbar: React.FC = () => {
    return (
        <nav style={{padding: '20px' }}>
            <ul style={{ display: 'flex', justifyContent: 'flex-end', gap:"20px", listStyle: 'none', alignItems:"center" }}>
                <li>
                    <a href="/agreements" style={{ textDecoration: 'none',fontWeight:"500", color: 'black', marginRight: '10px' }}>Agreement</a>
                </li>
                <li>
                    <a href="/register" style={{ textDecoration: 'none',fontWeight:"500", color: 'black', marginRight: '10px' }}>Register</a>
                </li>
                <li>
                    <ConnectKitButton />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
