import { useEffect, useState } from 'react';
import React from 'react'

import correctAnswerIcon from '../assets/correct.png'
import wrongAnswerIcon from '../assets/wrong.png'


export default function Game(props) {
    // console.clear()

    const OptionImg = props.selectedOption === props.correct_answer ? correctAnswerIcon : wrongAnswerIcon // display icon for wrong or correct answer 
    var decodeEntities = (function () {
        // this prevents any overhead from creating the object each time
        var element = document.createElement('div');

        function decodeHTMLEntities(str) {
            if (str && typeof str === 'string') {
                // strip script/html tags
                str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
                str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
                element.innerHTML = str;
                str = element.textContent;
                element.textContent = '';
            }

            return str;
        }

        return decodeHTMLEntities;
    })(); // used to escape HTML entities [' "" ]

    const incorrectAnswer = props.incorrect_answers; // decodeEntities won't work on object
    const correctAnswer = decodeEntities(props.correct_answer);
    const selectedOption = decodeEntities(props.selectedOption);

    // to convert incorrect into string [decodeEntities Function will only work on strings]
    const incorrectOptionOne = decodeEntities(incorrectAnswer[0]);
    const incorrectOptionTwo = decodeEntities(incorrectAnswer[1]);
    const incorrectOptionThree = decodeEntities(incorrectAnswer[2]);

    let allOptions = [correctAnswer, incorrectOptionOne, incorrectOptionTwo, incorrectOptionThree];
    const [option, setOption] = useState(allOptions)

    console.log(`------------------------------------------`)
    console.log(props.correct_answer)
    console.log(decodeEntities(props.correct_answer))
    console.log(props.selectedOption)
    // console.log(correctAnswer)
    // console.log(props.selectedOption)
    // console.log(selectedOption)
    // // console.log(props.incorrect_answers)
    // // console.log(typeof (incorrectOne))
    console.log(`------------------------------------------`)

    function selectionStyle(onValue) {
        const styles = {
            backgroundColor: onValue ? "#137262" : '',
            border: onValue ? 'none' : '1px solid aquamarine'
        }
        return styles
    }

    function correctAnswerStyle(onValue) {
        const styles = {
            backgroundColor: onValue ? "rgb(80, 146, 80)" : ''
        }
        return styles
    }

    function wrongAnswerStyle(onValue) {
        const styles = {
            backgroundColor: onValue ? "rgb(145, 57, 57)" : '',
            opacity: 0.6
        }
        return styles
    }
    const showAllAnswersStyle = {
        backgroundColor: 'rgb(80, 146, 80)'
    }

    function styleConditions(onValue, index) { //if onValue is true 
        if (option[index] === correctAnswer && props.isCheck && selectedOption !== "") { // always show the correct option
            return showAllAnswersStyle
        }
        else if (decodeEntities(props.selectedOption) === decodeEntities(props.correct_answer) && props.isCheck) { // if selected option is correct
            console.log('Correct Answer')
            return correctAnswerStyle(onValue)
        }
        else if (selectedOption !== correctAnswer && props.isCheck) { // if selected option is wrong 
            return wrongAnswerStyle(onValue)
        }
        else {
            return selectionStyle(onValue) // normal selection
        }
    }

    return (
        <div className="game">
            <div className="gameQuestion">
                <h3>{decodeEntities(props.question)}</h3>
                {props.isCheck && <div className='gameImage'><img src={OptionImg} alt="correct" /></div>}
            </div>
            <div className='gameOptionCheck'>
                <ul>

                    {/* dynamic styles according to the answer selection */}
                    {/* onClick Functionality of each option [Unified state] */}
                    {/* option display [random number] */}

                    <li style={styleConditions(props.isOptionOne, props.optionIndex[0])}
                        onClick={() => props.toggle(props.optionOne, event, props.questionId)} className="game-option">
                        {option[props.optionIndex[0]]}
                    </li>

                    <li style={styleConditions(props.isOptionTwo, props.optionIndex[1])}
                        onClick={() => props.toggle(props.optionTwo, event, props.questionId)} className="game-option">
                        {option[props.optionIndex[1]]}
                    </li>

                    <li style={styleConditions(props.isOptionThree, props.optionIndex[2])}
                        onClick={() => props.toggle(props.optionThree, event, props.questionId)} className="game-option">
                        {option[props.optionIndex[2]]}
                    </li>

                    <li style={styleConditions(props.isOptionFour, props.optionIndex[3])}
                        onClick={() => props.toggle(props.optionFour, event, props.questionId)} className="game-option">
                        {option[props.optionIndex[3]]}
                    </li>

                </ul>
            </div>
            <hr />
        </div >
    )
}


// shuffle
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

