export default function CheckAnswer(props) {
    return (
        <div className="checkAnswer-Div">
            <button onClick={props.toggleCheckAnswer} className='checkAnswer-Btn'>{props.isCheckValue ? 'Try Again' : 'Check Answers'}</button>
        </div>
    )
}

