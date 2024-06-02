import React from 'react';
import Link from 'next/link';
import { getDocs } from '../../_api/getDocs';
import './header.scss';


export const Header: React.FC = async () => {

    const headerMenuData = await getDocs("headeritems", undefined, undefined, undefined);

    const newHeaderMenuData = headerMenuData?.Header?.columns[0].navItems;


    return (
        <header>

            <nav className='m-auto w-fit'>

                <ul className='flex flex-nowrap m-4'>
                    {newHeaderMenuData.map((link) => {
                        return (
                            <li key={link?.link.url} className='px-4 text-slate-50 bg-slate-700 hover:text-slate-800 hover:bg-slate-100 transition-all duration-75 rounded-md ml-4'>
                                <Link href={link?.link.url}>{link?.link.label}</Link>
                            </li>
                        );
                    })}
                </ul>


            </nav>
        </header>
    );
};

export default Header;