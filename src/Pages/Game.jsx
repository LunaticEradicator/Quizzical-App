export default function Game(props) {
    const incorrect = props.incorrect_answers;
    const correct = props.correct_answer;

    let options = [...incorrect, correct];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }
    shuffleArray(options);


    return (
        <div className="game">
            <h2>Select Your Answers</h2>
            <div className="gameQuestion">
                <h3>{props.question}</h3>
                <ul>
                    <li className="game-li">{options[0]}</li>
                    <li className="game-li">{options[1]}</li>
                    <li className="game-li">{options[2]}</li>
                    <li className="game-li">{options[3]}</li>
                </ul>
            </div>
        </div>
    )
}

