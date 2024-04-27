import React from 'react';
import './searchandfilter.scss';

interface Props {
    // Define your component's props here
}

const SearchAndFilter: React.FC<Props> = () => {
    // Implement your component logic here

    return (
        <React.Fragment>
            <div className="searchandfilter">
                <div className="">
                    <h2 className="">Search and Filter</h2>
                    <p className="">This is a search and filter component</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SearchAndFilter;