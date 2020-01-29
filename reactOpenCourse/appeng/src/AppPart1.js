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

  const DisplayState = props => (
    <p>
      {props.feedBackName} {props.feedBackCount}
    </p>
  );
  const Statistics = props => {
    if (feedback.all === 0) {
      return (
        <div>
          <p>"No feedback given"</p>
        </div>
      );
    }
    return (
      <div>
        <p>{props.feedBackAveragePoints}</p>
        <p>{props.positiveFeedBackPercentage}</p>
      </div>
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
      <DisplayState feedBackName="good" feedBackCount={feedback.good} />
      <DisplayState feedBackName="neutral" feedBackCount={feedback.neutral} />
      <DisplayState feedBackName="bad" feedBackCount={feedback.bad} />
      <DisplayState feedBackName="all" feedBackCount={feedback.all} />
      <Statistics
        feedBackAveragePoints={average}
        positiveFeedBackPercentage={positivePercentage}
      />
    </div>
  );
}
export default AppPart1;
