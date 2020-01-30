import React, { useState } from "react";
import ReactDOM from "react-dom";
const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const AppPart1 = props => {
  const [selected, setSelected] = useState({
    selection: 0,
    votes: new Array(anecdotes.length).fill(0),
    maxIndex: 0
  });

  const generateRandom = () => {
    const newSelected = Math.round(Math.random() * (anecdotes.length - 1));
    setSelected({
      ...selected,
      selection: newSelected
    });
  };

  const updateVote = () => {
    let newVote = [...selected.votes];
    newVote[selected.selection] += 1;
    let maximumIndex = popularAnecdote(newVote);
    setSelected({
      ...selected,
      votes: newVote,
      maxIndex: maximumIndex
    });
  };

  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
  );

  let popularAnecdote = newVote => {
    let maxIndex = 0;
    let maxValue = newVote[0];
    for (let i = 0; i < newVote.length; i++) {
      if (newVote[i] > maxValue) {
        maxValue = newVote[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  };

  const ReportVotes = props => <p>has {props.totalVotes} votes</p>;
  return (
    <div>
      {anecdotes[selected.selection]}
      <ReportVotes totalVotes={selected.votes[selected.selection]} />
      <Button onClick={() => generateRandom()} text="next anecdote" />
      <Button onClick={() => updateVote()} text="vote" />
      <p>{anecdotes[selected.maxIndex]}</p>
      <ReportVotes totalVotes={selected.votes[selected.maxIndex]} />
    </div>
  );
};

export default AppPart1;
