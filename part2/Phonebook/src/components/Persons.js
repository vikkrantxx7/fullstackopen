import React from 'react'
import Person from './Person.js'

const Persons = ({persons, onDeleteContact}) => {
    return (
        <>
            {persons.map(({id, name, number}) => <Person key={id} id={id} name={name} number={number} onDeleteContact={onDeleteContact} />)}
        </>
    )
}

export default Persons