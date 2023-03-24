export default function Menu(props) {
    return (
        <div className="intro">
            <h1>Quizzical</h1>
            <p className="intro-paragraph">World of Quiz</p>
            <button onClick={props.onClick} className="intro-button">Start Quiz</button>
        </div>
    )

}