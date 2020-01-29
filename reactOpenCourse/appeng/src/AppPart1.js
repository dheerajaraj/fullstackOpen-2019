import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function AppPart1() {
  const [feedback, setFeedBack] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0
  });

  const handleGoodFeedBack = () => {
    setFeedBack({
      ...feedback,
      good: feedback.good + 1,
      all: feedback.all + 1
    });
  };

  const handleNeutralFeedBack = () => {
    setFeedBack({
      ...feedback,
      neutral: feedback.neutral + 1,
      all: feedback.all + 1
    });
  };

  const handleBadFeedBack = () => {
    setFeedBack({
      ...feedback,
      bad: feedback.bad + 1,
      all: feedback.all + 1
    });
  };

  const Button = props => (
    <button onClick={props.triggeredFeedBack}>{props.text}</button>
  );

  const Statistics = props => {
    if (
      (feedback.all === 0 && props.feedBackName === "average") ||
      (feedback.all === 0 && props.feedBackName === "positive")
    ) {
      return <p>"No feedback given"</p>;
    }
    return (
      <tr>
        <td>{props.feedBackName}</td>
        <td>{props.feedBackCount}</td>
      </tr>
    );
  };

  const average = (feedback.good - feedback.bad) / feedback.all;
  const positivePercentage = (feedback.good / feedback.all) * 100 + " %";
  return (
    <div>
      <h1> give feedback </h1>
      <Button triggeredFeedBack={handleGoodFeedBack} text="good" />
      <Button triggeredFeedBack={handleNeutralFeedBack} text="neutral" />
      <Button triggeredFeedBack={handleBadFeedBack} text="bad" />
      <h1> statistics </h1>
      <table>
        <Statistics feedBackName="good" feedBackCount={feedback.good} />
        <Statistics feedBackName="neutral" feedBackCount={feedback.neutral} />
        <Statistics feedBackName="bad" feedBackCount={feedback.bad} />
        <Statistics feedBackName="all" feedBackCount={feedback.all} />
        <Statistics feedBackName="average" feedBackCount={average} />
        <Statistics
          feedBackName="positive"
          feedBackCount={positivePercentage}
        />
      </table>
    </div>
  );
}
export default AppPart1;
