import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({country}) => {

    const { name, capital, population, languages, flag } = country,
        [weatherData, setWeatherData] = useState(),
        API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
        .then(res => {
            setWeatherData(res.data.current)
        })
    }, [API_KEY, capital])

    return (
        <>
            <h2>{name}</h2>
            <p>Capital- {capital}</p>
            <p>Population- {population}</p>
            <h3>Languages</h3>
            <ul>
                {languages.map((language, index) => <li key={index}>{language.name}</li>)}
            </ul>
            <div>
                <img src={flag} alt="Flag" width="150px"/>
            </div>
            <h2>Weather in {capital}</h2>
            {weatherData ? (
                <>
                    <p><strong>Temperature: </strong>{weatherData.temperature} Celcius</p>
                    <img src={weatherData.weather_icons[0]} alt="weather icon" />
                    <p><strong>wind: </strong>{weatherData.wind_speed} KMPH <strong>direction:</strong> {weatherData.wind_dir}</p>
                </>
            ) : null}
        </>
    )
}

export default Country