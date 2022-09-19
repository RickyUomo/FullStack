import { useState } from "react";

const Button = ({ click, text }) => <button onClick={click}>{text}</button>;
const StatisticLine = ({ name, number }) => {
  const display = name === 'postive' ?
    <tr>
      <td>{name} {number * 100}%</td>
    </tr>
    :
    <tr>
      <td>{name} {number}</td>
    </tr>;
  return display;
}

const Statistics = ({ good, neutral, bad, all, average, postive }) => {
  const anyFeedback = good || neutral || bad;

  if (!anyFeedback) {
    return (
      <>
        <h1>Statistics</h1>
        <p> No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine name='good' number={good} />
            <StatisticLine name='neutral' number={neutral} />
            <StatisticLine name='bad' number={bad} />
            <StatisticLine name='all' number={all} />
            <StatisticLine name='average' number={average} />
            <StatisticLine name='postive' number={postive} />
          </tbody>
        </table>
      </>
    );
  }
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1) / all || 0;
  const postive = good / all || 0;

  const clickGood = () => setGood(good + 1);
  const clickNeutral = () => setNeutral(neutral + 1);
  const clickBad = () => setBad(bad + 1);

  return (
    <div className="App">
      <h1>Give Feedback</h1>
      <Button click={clickGood} text="good" />
      <Button click={clickNeutral} text="neutral" />
      <Button click={clickBad} text="bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        postive={postive}
      />
    </div>
  );
}

export default App;
