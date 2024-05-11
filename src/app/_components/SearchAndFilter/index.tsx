import React from 'react';
import Categories from './Categories';
import { PostsWithDocs } from '../../../more-types';

import './searchandfilter.scss';


const SearchAndFilter: React.FC<{ cats: PostsWithDocs }> = ({ cats }) => {


    const catsData = cats?.Categories?.docs;

    return (
        <React.Fragment>
            <div className="searchandfilter px-32 py-4 flex flex-row font-bold bg-light-dark border-top border-bottom w-fit m-auto text-sm">
                <Categories newCats={catsData} />
            </div>
        </React.Fragment>
    );
}

export default SearchAndFilter;