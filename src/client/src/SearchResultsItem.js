import React from 'react';
import "./SearchResultsItem.css";

const SearchResultsItem = ({result}) => {
    return (
        <div className='search-results-item' onClick={(e) => alert(`You clicked on ${result.name}`)}>{result.name}</div>
    );
}

export default SearchResultsItem;