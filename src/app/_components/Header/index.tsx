import React from 'react';
import Link from 'next/link';
import './header.scss';

const Header: React.FC = () => {
    return (
        <header>

            <nav className='m-auto w-fit'>

                <ul className='flex flex-nowrap m-4'>
                    <li className='px-4 text-slate-50 bg-slate-700 hover:text-slate-800 hover:bg-slate-100 transition-all duration-75 rounded-md'>
                        <Link href="/">Home</Link>
                    </li>
                    <li className='px-4 text-slate-50 bg-slate-700 hover:text-slate-800 hover:bg-slate-100 transition-all duration-75 rounded-md ml-4'>
                        <Link href="/help">Help</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;