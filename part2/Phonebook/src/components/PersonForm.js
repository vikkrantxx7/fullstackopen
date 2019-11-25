import React from 'react'

const PersonForm = ({newName, newNum, handleAdd, handleInputChange}) => {
    return (
        <form onSubmit={handleAdd}>
            <div>
                name: <input name="name" value={newName} onChange={handleInputChange} />
            </div>
            <div>
                number: <input name="phone" value={newNum} onChange={handleInputChange} />
            </div>
            <div>
                <button style={{cursor: "pointer"}} type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm