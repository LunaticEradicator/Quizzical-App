import { useEffect, useState } from 'react';
import React from 'react'


export default function Game(props) {
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

    // console.clear()
    const incorrect = decodeEntities(props.incorrect_answers);
    const correct = decodeEntities(props.correct_answer);
    let allOptions = [correct, ...incorrect];
    const [option, setOption] = useState(allOptions)

    // console.log(`------------------------------------------`)
    console.log(props.correct_answer)
    console.log(incorrect.toString())
    // console.log(allOptions)
    // console.log(`------------------------------------------`)

    function selectionStyle(onValue) {
        const styles = {
            backgroundColor: onValue ? "olive" : ''
        }
        return styles
    }

    function correctAnswerStyle(onValue) {
        const styles = {
            backgroundColor: onValue ? "green" : ''
        }
        return styles
    }

    function wrongAnswerStyle(onValue) {
        const styles = {
            backgroundColor: onValue ? "red" : ''
        }
        return styles
    }
    const showAllAnswers = {
        backgroundColor: 'green'
    }

    function styleConditions(onValue, index) { //if onValue is true 

        if (option[index] === props.correct_answer && props.isCheck && props.selectedOption !== "") { // always show the correct option
            return showAllAnswers
        }
        else if (props.selectedOption === props.correct_answer && props.isCheck) { // if selected option is correct
            return correctAnswerStyle(onValue)

        }
        else if (props.selectedOption !== props.correct_answer && props.isCheck) { // if selected option is wrong 
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
                <ul>
                    <li style={styleConditions(props.isOptionOne, props.optionIndex[0])} onClick={() => props.toggle(props.optionOne, event, props.questionId)} className="game-option">{option[props.optionIndex[0]]}</li>
                    <li style={styleConditions(props.isOptionTwo, props.optionIndex[1])} onClick={() => props.toggle(props.optionTwo, event, props.questionId)} className="game-option">{option[props.optionIndex[1]]}</li>
                    <li style={styleConditions(props.isOptionThree, props.optionIndex[2])} onClick={() => props.toggle(props.optionThree, event, props.questionId)} className="game-option">{option[props.optionIndex[2]]}</li>
                    <li style={styleConditions(props.isOptionFour, props.optionIndex[3])} onClick={() => props.toggle(props.optionFour, event, props.questionId)} className="game-option">{option[props.optionIndex[3]]}</li>
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

