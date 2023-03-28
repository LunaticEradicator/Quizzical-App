import React from 'react'
import { useState, useEffect } from 'react'

import { nanoid } from 'nanoid'

import Menu from './Pages/Menu'
import Game from './Pages/Game';
import CheckAnswer from './Pages/CheckAnswer';


export default function App() {
  const [quiz, setQuiz] = useState([]);
  const [isGameOn, setIsGameOn] = useState(false);
  let questionIdIncrement = 1;

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await response.json();

      setQuiz(data.results) // [shows an array of five question]
      setQuiz(prevApiCall => prevApiCall.map(item => { // map through each of the quiz and add new data to it [isOptionOne,optionOne,questionId]
        return (
          {
            ...item,
            isOptionOne: false, isOptionTwo: false, isOptionThree: false, isOptionFour: false,
            optionOne: nanoid(), optionTwo: nanoid(), optionThree: nanoid(), optionFour: nanoid(),
            questionId: questionIdIncrement++
          }
        )
      }))
    }

    fetchAPI() // assign all this to a function since we use async await method
  }, [])
  console.log(quiz)

  const gameMenu = quiz.map(item => {
    return (
      <Game
        key={nanoid()}
        toggle={toggleAndSaveOption}
        {...item}
      />
    )
  })

  const [questionsArray, setQuestionsArr] = useState([
    {
      questionOne: '',
      questionTwo: '',
      questionThree: '',
      questionFour: ''
    }
  ]);
  console.log(questionsArray)


  function toggleAndSaveOption(optionId, event, questionId) {
    console.clear()
    console.log(questionId)


    let liTextContent = event.target.innerText; //get the textContent of the clicked item[option]
    if (questionId === 1) {                     // Assign each question an ID to store each option separately
      setQuestionsArr(prevArr => prevArr.map(question => {
        return { ...question, questionOne: liTextContent }
      }))
    }
    else if (questionId === 2) {
      setQuestionsArr(prevArr => prevArr.map(question => {
        return { ...question, questionTwo: liTextContent }
      }))
    }
    else if (questionId === 3) {
      setQuestionsArr(prevArr => prevArr.map(question => {
        return { ...question, questionThree: liTextContent }
      }))
    }
    else if (questionId === 4) {
      setQuestionsArr(prevArr => prevArr.map(question => {
        return { ...question, questionFour: liTextContent }
      }))
    }
    else if (questionId === 5) {
      setQuestionsArr(prevArr => prevArr.map(question => {
        return { ...question, questionFive: liTextContent }
      }))
    }

    setQuiz(prevApiCall => prevApiCall.map(option => {
      // Toggle the option we selected through ID
      return (
        option.optionOne === optionId ? { ...option, isOptionOne: !option.isOptionOne, isOptionTwo: false, isOptionThree: false, isOptionFour: false } : option &&
          option.optionTwo === optionId ? { ...option, isOptionOne: false, isOptionTwo: !option.isOptionTwo, isOptionThree: false, isOptionFour: false } : option &&
            option.optionThree === optionId ? { ...option, isOptionOne: false, isOptionTwo: false, isOptionThree: !option.isOptionThree, isOptionFour: false } : option &&
              option.optionFour === optionId ? { ...option, isOptionOne: false, isOptionTwo: false, isOptionThree: false, isOptionFour: !option.isOptionFour } : option
      )
    }))
  }


  function changeScreen() {
    setIsGameOn(prevIsGameOn => !prevIsGameOn)
    console.clear()
  }


  // function checkAnswer(selectedOption) {
  //   console.log(selectedOption)
  //   // setApiCall(prevApiCall => prevApiCall.map(item => {
  //   //   return (

  //   //   )
  //   // }))
  // }


  return (
    <div className="App">
      {!isGameOn && <Menu onClick={() => changeScreen()} />}
      {isGameOn && gameMenu}
      {isGameOn && <CheckAnswer />}
    </div>
  )
}



