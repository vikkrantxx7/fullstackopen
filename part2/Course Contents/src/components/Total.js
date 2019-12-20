import React from 'react'

const Total = ({parts}) => <p> Number of exercises {parts.reduce((acc, part) => acc+=part.exercises, 0)} </p>

export default Total