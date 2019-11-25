import React from 'react'

const Filter = ({newFilter, handleInputChange}) => {
    return <p>Filter shown with <input name="filter" value={newFilter} onChange={handleInputChange} /></p>
}

export default Filter