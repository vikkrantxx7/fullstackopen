import React, { useEffect, useState } from 'react'
import phonebookService from './services/phonebookService.js'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import Persons from './components/Persons.js'
import Notification from './components/Notification.js'

const App = () => {
    const [initialData, setInitialData] = useState([]),
        [persons, setPersons] = useState([]),
        [newName, setNewName] = useState(''),
        [newNum, setNewNum] = useState(''),
        [newFilter, setNewFilter] = useState(''),
        [message, setMessage] = useState({})

    useEffect(() => {
        phonebookService.getAll()
            .then(res => {
                setInitialData(res)
                setPersons(res)
            })
    }, [])

    const handleAdd = event => {
        event.preventDefault()
        if (isNamePresent()) {
            const contact = persons.find(person => person.name.trim().toLowerCase().includes(newName.trim().toLowerCase()))
            if (window.confirm(`${newName} is already added to phonebook, replace the old 
                number with a new one ?`)) {
                    return phonebookService.put(contact.id, {name: newName, number: newNum})
                        .then(res => {
                            const newPersons = [...persons]
                            newPersons.splice(persons.findIndex(person => person.id === res.id), 1, res)
                            setPersons(newPersons)
                            setInitialData(newPersons)
                            setNewName('')
                            setNewNum('')
                            setMessage({success: `${newName} updated successfully`})
                            dismissMessage()
                        })
            }
            setNewName('')
            return
        } else if (isNumPresent()) {
            window.alert(`${newNum} is already added to phonebook`)
            setNewNum('')
            return
        }
        phonebookService.post({name: newName, number: newNum})
            .then(res => {
                const newPersons = persons.concat(res)
                setPersons(newPersons)
                setInitialData(newPersons)
                setNewName('')
                setNewNum('')
                setMessage({success: `${newName} added successfully`})
                dismissMessage()
            })
    }

    const handleInputChange = event => {
        const value = event.target.value
        if (event.target.name === "name") {
            setNewName(value)
        } else if (event.target.name === "phone") {
            setNewNum(value)
        } else {
            setNewFilter(value)
            if (!value) {
                return setPersons(initialData)
            }
            setPersons(persons.filter(person => person.name.trim().toLowerCase().includes(value.trim().toLowerCase())))
        }
    }

    const handleDeleteContact = id => {
        const selected = persons.find(person => person.id === id)
        if (!window.confirm(`Delete ${selected.name} ?`)) {
            return
        }
        phonebookService.del(id)
            .then(() => {
                const newPersons = persons.filter(person => person.id !== id)
                setPersons(newPersons)
                setInitialData(newPersons)
                setMessage({success: `${selected.name} deleted successfully`})
                dismissMessage()
            })
            .catch(() => {
                setMessage({error: `${selected.name} is already deleted`})
                dismissMessage()
            })
    }

    const dismissMessage = () => {
        setTimeout(() => {
            setMessage({})
        }, 3000);
    }

    const isNamePresent = () => {
        return persons.some(person => person.name.trim().toLowerCase().includes(newName.trim().toLowerCase()))
    }

    const isNumPresent = () => {
        return persons.some(person => person.number.trim().toLowerCase().includes(newNum.trim().toLowerCase()))
    }

    return (
        <div className="phonebook">
            <Notification message={message} />
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleInputChange={handleInputChange} />
            <PersonForm newName={newName} newNum={newNum} handleAdd={handleAdd} handleInputChange={handleInputChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} onDeleteContact={handleDeleteContact} />
        </div>
    )
}

export default App