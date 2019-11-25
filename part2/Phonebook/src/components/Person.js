import React from 'react'

const Person = ({name, number, id, onDeleteContact}) => {
    return (
        <>
            <h4>{name} - {number} <button style={{cursor: "pointer"}} onClick={() => {onDeleteContact(id)}}>Delete</button></h4>
        </>
    )
}

export default Person