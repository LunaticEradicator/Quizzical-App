import { useEffect } from 'react';
import React from 'react'

export default function Game(props) {
    // console.log(props.on)
    const incorrect = props.incorrect_answers;
    const correct = props.correct_answer;

    let options = [...incorrect, correct];

    function styles(onValue) {
        // apply condition if each of the props.onValue is equals to true 
        const style = {
            backgroundColor: onValue ? 'olive' : '',
            border: onValue ? 'red' : ''
        }
        return style
    }

    useEffect(() => {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
    }, [])

    return (
        <div className="game">
            {/* <h2>Select Your Answers</h2> */}
            <div className="gameQuestion">
                <h3>{props.question}</h3>
                <ul>
                    <li style={styles(props.isOptionOne)} onClick={() => props.toggle(props.optionOne, event, props.questionId)} className="game-option">{options[0]}</li>
                    <li style={styles(props.isOptionTwo)} onClick={() => props.toggle(props.optionTwo, event, props.questionId)} className="game-option">{options[1]}</li>
                    <li style={styles(props.isOptionThree)} onClick={() => props.toggle(props.optionThree, event, props.questionId)} className="game-option">{options[2]}</li>
                    <li style={styles(props.isOptionFour)} onClick={() => props.toggle(props.optionFour, event, props.questionId)} className="game-option">{options[3]}</li>
                </ul>
            </div>
            <hr />
        </div>
    )
}

