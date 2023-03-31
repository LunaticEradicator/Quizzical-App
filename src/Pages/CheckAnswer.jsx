export default function CheckAnswer(props) {
    return (
        <div className="checkAnswer-Div">
            <button onClick={props.isCheckAnswer} className='checkAnswer-Btn'>Check Answer</button>
        </div>
    )
}

// disable selecting option after game over
// only press checkAnswer after all option are selecting