interface propCheckAnswer {
  toggleCheckAnswer: () => void;
  isCheckValue: boolean;
}

export default function CheckAnswerButton(props: propCheckAnswer) {
  return (
    <div className="checkAnswer-Div">
      <button onClick={props.toggleCheckAnswer} className="checkAnswer-Btn">
        {props.isCheckValue ? "Try Again" : "Check Answers"}
      </button>
    </div>
  );
}
