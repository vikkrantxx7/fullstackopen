import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1> {course.name} </h1>

const Content = ({parts}) => <>{parts.map((part, index) => <Part key={index} part={part.name} exercises={part.exercises} />)}</>

const Total = ({parts}) => <p> Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises} </p>

const Part = ({part, exercises}) =>   <p> {part} {exercises} </p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  }
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
