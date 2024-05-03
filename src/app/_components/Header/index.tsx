import React from 'react';
import Link from 'next/link';
import './header.scss';

const Header: React.FC = () => {
    return (
        <header>
            <nav className='zubby'>These are pages
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/posts">Home Home</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;