import React from 'react';
import Categories from './Categories';
import { PostsWithDocs } from '../../../more-types';

import './searchandfilter.scss';


const SearchAndFilter: React.FC<{ cats: PostsWithDocs }> = ({ cats }) => {


    const catsData = cats?.Categories?.docs;

    return (
        <React.Fragment>
            <div className="searchandfilter">
                <Categories newCats={catsData} />
            </div>
        </React.Fragment>
    );
}

export default SearchAndFilter;