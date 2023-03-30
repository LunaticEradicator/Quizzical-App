import { useEffect } from 'react';
import React from 'react'

// questionOneSelectedOption
export default function Game(props) {
    // console.clear()
    // const cs = (props.questionsArray)
    // const asd =  ...questionsArray
    // const sad = { ...props.questionsArray }
    console.log(props)
    console.log(props.correct_answer)
    console.log(props.questionsArray)

    // console.log(props.questionsArray[0].questionOneSelectedOption);
    // console.log(props.temp[0].correct_answer)
    // console.log(props.isCheck)



    // console.log(temp)
    // props.isCheck &&
    const incorrect = props.incorrect_answers;
    const correct = props.correct_answer;
    let options = [...incorrect, correct];

    function styles(onValue) {
        // console.log("Selection Color")
        const style = {
            backgroundColor: onValue ? 'olive' : '',
            border: onValue ? '1px solid white' : ''
            // && props.check === true ? 'green' : 'red',
        }
        return style
    }

    function stylesOne(onValue) {
        // console.log("Winning Color")
        const style = {
            backgroundColor: onValue ? 'green' : '',
            border: onValue ? '1px solid white' : ''
            // && props.check === true ? 'green' : 'red',
        }
        return style
    }

    useEffect(() => {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
    }, [])

    // function condition(optionNumber) { //add question Number
    //     if (props.questionsArray[0].questionOneSelectedOption === props.temp[0].correct_answer || props.questionsArray[0].questionTwoSelectedOption === props.temp[1].correct_answer && props.isCheck) {
    //         return stylesOne(optionNumber)
    //     }
    //     else {
    //         return styles(optionNumber)
    //     }
    // }

    return (
        <div className="game">
            {/* <h2>Select Your Answers</h2> */}
            <div className="gameQuestion">
                <h3>{props.question}</h3>
                <ul>
                    <li onClick={() => props.toggle(props.optionOne, event, props.questionId)} className="game-option">{options[0]}</li>
                    <li onClick={() => props.toggle(props.optionTwo, event, props.questionId)} className="game-option">{options[1]}</li>
                    <li onClick={() => props.toggle(props.optionThree, event, props.questionId)} className="game-option">{options[2]}</li>
                    <li onClick={() => props.toggle(props.optionFour, event, props.questionId)} className="game-option">{options[3]}</li>
                </ul>
            </div>
            <hr />
        </div >
    )
}

