import React from 'react';
import Categories from './Categories';

import './searchandfilter.scss';

const SearchAndFilter: React.FC<{ newCats: string[] }> = ({ newCats }) => {

    return (
        <React.Fragment>
            <div className="searchandfilter">
                <Categories newCats={newCats} />
            </div>
        </React.Fragment>
    );
}

export default SearchAndFilter;