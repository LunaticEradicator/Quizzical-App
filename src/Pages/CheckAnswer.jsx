export default function CheckAnswer(props) {
    // console.log(props)
    return (
        <div className="checkAnswer-Div">
            <button onClick={props.toggleCheckAnswer} className='checkAnswer-Btn'>{props.isCheckValue ? 'Try Again' : 'Check Answers'}</button>
        </div>
    )
}

// restart functionality
