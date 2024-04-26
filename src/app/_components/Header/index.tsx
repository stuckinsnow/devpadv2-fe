import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header>
            <nav>These are pages
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/home">Home Home</Link>
                    </li>
                    <li>
                        <Link href="/great-stuff">Great Stuff</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;