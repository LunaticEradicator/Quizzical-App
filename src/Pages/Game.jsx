import { useEffect } from 'react';

export { useEffect } from 'react'

export default function Game(props) {
    const incorrect = props.incorrect_answers;
    const correct = props.correct_answer;

    let options = [...incorrect, correct];
    let styles = { backgroundColor: props.holdOption ? 'green' : '' }


    // function shuffleArray(array) {
    useEffect(() => {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
    }, [])
    // return array
    // }
    // shuffleArray(options);


    return (
        <div className="game">
            <h2>Select Your Answers</h2>
            <div className="gameQuestion">
                <h3>{props.question}</h3>
                <ul>
                    <li style={styles} onClick={props.handleHoldOption} className="game-option">{options[0]}</li>
                    <li className="game-option">{options[1]}</li>
                    <li className="game-option">{options[2]}</li>
                    <li className="game-option">{options[3]}</li>
                </ul>
            </div>
        </div>
    )
}

