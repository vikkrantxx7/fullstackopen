import React from 'react'

const Filter = ({newFilter, handleInputChange}) => {
    return <p>Find Countries <input name="filter" value={newFilter} onChange={handleInputChange} /></p>
}

export default Filter