import React from 'react'
import Part from './Part.js'

const Content = ({parts}) => <>{parts.map((part, index) => <Part key={index} part={part.name} exercises={part.exercises} />)}</>

export default Content