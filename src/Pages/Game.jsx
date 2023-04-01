import { useEffect, useState } from 'react';
import React from 'react'


export default function Game(props) {
    // console.clear()
    // console.log(props.selectedOption)
    const incorrect = props.incorrect_answers;
    const correct = props.correct_answer;
    let options = [correct, ...incorrect];
    const [option, setOption] = useState(options)

    // console.log(`------------------------------------------`)
    // console.log(props.randoms)
    // console.log(props.randoms[0])
    // console.log(option[props.randoms[0]])
    // console.log(props.correct_answer)
    // console.log(`------------------------------------------`)

    function selectStyle(onValue) {
        const styles = {
            backgroundColor: onValue ? "olive" : ''
        }
        return styles
    }

    function winStyle(onValue) {
        const styles = {
            backgroundColor: onValue ? "green" : ''
        }
        return styles
    }

    function loseStyle(onValue) {
        const styles = {
            backgroundColor: onValue ? "red" : ''
        }
        return styles
    }
    const allAnswers = {
        backgroundColor: 'green'
    }

    function condition(onValue, index) { //if onValue is true 
        if (option[index] === props.correct_answer && props.isCheck) {              // always show correct answer style 
            return allAnswers
        }
        else if (props.selectedOption === props.correct_answer && props.isCheck) { // if selected answer is correct show style for that 
            return winStyle(onValue)
        }
        else if (props.selectedOption !== props.correct_answer && props.isCheck) { // if selected answer is wrong show style for that 
            // console.log(props.selectedOption, props.correct_answer)
            return loseStyle(onValue)
        }
        else {
            return selectStyle(onValue) // normal selection
        }
    }
    return (
        <div className="game">
            <div className="gameQuestion">
                <h3>{props.question}</h3>
                <ul>
                    <li style={condition(props.isOptionOne, props.optionIndex[0])} onClick={() => props.toggle(props.optionOne, event, props.questionId)} className="game-option">{option[props.optionIndex[0]]}</li>
                    <li style={condition(props.isOptionTwo, props.optionIndex[1])} onClick={() => props.toggle(props.optionTwo, event, props.questionId)} className="game-option">{option[props.optionIndex[1]]}</li>
                    <li style={condition(props.isOptionThree, props.optionIndex[2])} onClick={() => props.toggle(props.optionThree, event, props.questionId)} className="game-option">{option[props.optionIndex[2]]}</li>
                    <li style={condition(props.isOptionFour, props.optionIndex[3])} onClick={() => props.toggle(props.optionFour, event, props.questionId)} className="game-option">{option[props.optionIndex[3]]}</li>
                </ul>
            </div>
            <hr />
        </div >
    )
}



    // useEffect(() => {
    //     function nice(array) {
    //         for (let i = array.length - 1; i > 0; i--) {
    //             const j = Math.floor(Math.random() * (i + 1));
    //             [array[i], array[j]] = [array[j], array[i]];
    //         }
    //     }
    //     nice(option)
    //     console.log(option)
    // }, [])


        // useEffect(() => {
    //      // function shuffled() {
    //     setOption(prevOptions => {
    //         const shuffled = prevOptions.map(value => ({ value, sort: Math.random() }))
    //             .sort((a, b) => a.sort - b.sort)
    //             .map(({ value }) => value)
    //         return shuffled
    //     })
    // shuffled()
    // }
    // }, [props.isCheck])

