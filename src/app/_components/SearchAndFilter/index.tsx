import React from 'react';
import Categories from './Categories';
import { PostsWithDocs } from '../../../more-types';

import './searchandfilter.scss';


const SearchAndFilter: React.FC<{ cats: PostsWithDocs }> = ({ cats }) => {


    const catsData = cats?.Categories?.docs;

    return (
        <div className="searchandfilter px-32 mt-4 flex flex-row font-semibold bg-light-dark border-top border-bottom w-fit justify-center m-auto text-sm capitalize">
            <Categories newCats={catsData} />
        </div>
    );
}

export default SearchAndFilter;