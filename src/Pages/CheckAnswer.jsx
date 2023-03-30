export default function CheckAnswer(props) {
    return (
        <div className="checkAnswer-Div">
            <button onClick={props.isCheckAnswer} className='checkAnswer-Btn'>Check Answer</button>
        </div>
    )
}

// when pressed
// check if all answer are selected
// display score
// restart button