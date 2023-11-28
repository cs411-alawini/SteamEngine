import React from 'react';
import SearchResultsItem from './SearchResultsItem';
import "./SearchResults.css";

const SearchResults = ({results}) => {
    return (
    <div className='results-list'>
        {results.map((result, id) => {
            return <SearchResultsItem result={result} key={id}/>
        })}
    </div>
    );
}

export default SearchResults;