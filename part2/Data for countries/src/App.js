import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import Country from './components/Country.js'

const App = () => {
    const [countries, setCountries] = useState([]),
        [filteredCountries, setFilteredCountries] = useState([]),
        [showCountry, setShowCountry] = useState([false, {}]),
        [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                setCountries(res.data)
            })
    }, [])

    let handleInputChange = event => {
        const value = event.target.value
        setShowCountry([false, {}])
        setNewFilter(value)
        if (!value) {
            return setFilteredCountries([])
        }
        setFilteredCountries(countries.filter(country => country.name.trim().toLowerCase().includes(value.trim().toLowerCase())))
    }

    const handleShowCountry = country => {
        setShowCountry([true, country])
    }

    const renderCountries = () => {
        if (!filteredCountries.length) {
            return null
        } else if (filteredCountries.length === 1) {
            return <Country country={filteredCountries[0]} />
        } else if(filteredCountries.length < 10) {
            return (
                filteredCountries.map((country, index) => <div key={index}>{country.name} <button style={{cursor: "pointer"}} onClick={() => handleShowCountry(country)}>Show</button></div>)
            )
        } else {
            return <div>Too many matches, specify another filter.</div>
        }
    }

    return (
        <div>
            <Filter newFilter={newFilter} handleInputChange={handleInputChange} />
            {renderCountries()}
            {showCountry[0] && <Country country={showCountry[1]} />}
        </div>
    )
}

export default App