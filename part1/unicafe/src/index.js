import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ label, onClick }) => <button onClick={onClick}>{label}</button>

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good+neutral+bad} />
        <Statistic text="average" value={(good-bad)/3} />
        <Statistic text="positive" value={(good/(good+neutral+bad))*100} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setRating = (rating) => {
    switch (rating) {
      case 'good':
        return () => { setGood(good + 1) }
      case 'neutral':
        return () => { setNeutral(neutral + 1) }
      case 'bad':
        return () => { setBad(bad + 1) }
      default:
    }
  }

  return (
    <>
      <h2>give feedback</h2>
      <Button label="good" onClick={setRating('good')} />
      <Button label="neutral" onClick={setRating('neutral')} />
      <Button label="bad" onClick={setRating('bad')} />
      <h2>statistics</h2>
    {(good || neutral || bad) ?
      <Statistics good={good} neutral={neutral} bad={bad} /> : 
      <div>No feedback given</div>}
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)