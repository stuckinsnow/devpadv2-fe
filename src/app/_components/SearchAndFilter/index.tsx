import React from 'react';
import Categories from './Categories';
import { PostsWithDocs } from '../../../more-types';

import './searchandfilter.scss';


const SearchAndFilter: React.FC<{ cats: PostsWithDocs }> = ({ cats }) => {


    const catsData = cats?.Categories?.docs;

    return (
        <React.Fragment>
            <div className="flex searchandfilter font-bold px-1 p-2 my-2 bg-light-dark border-top border-bottom bg-slate-100">
                <Categories newCats={catsData} />
            </div>
        </React.Fragment>
    );
}

export default SearchAndFilter;