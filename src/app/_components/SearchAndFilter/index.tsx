import React from 'react';
import Categories from './Categories';
import { PostsWithDocs } from '../../../more-types';

import './searchandfilter.scss';


const SearchAndFilter: React.FC<{ cats: PostsWithDocs }> = ({ cats }) => {


    const catsData = cats?.Categories?.docs;

    return (
        <React.Fragment>
            <div className="searchandfilter nice-shadow px-32 py-4 mt-4 flex flex-row font-bold bg-light-dark border-top border-bottom w-full m-auto text-sm capitalize">
                <Categories newCats={catsData} />
            </div>
        </React.Fragment>
    );
}

export default SearchAndFilter;