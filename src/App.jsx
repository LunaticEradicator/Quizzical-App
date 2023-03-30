import React from 'react'
import { useState, useEffect } from 'react'

import { nanoid } from 'nanoid'

import Menu from './Pages/Menu'
import Game from './Pages/Game';
import CheckAnswer from './Pages/CheckAnswer';


export default function App() {
  console.clear()
  const [quiz, setQuiz] = useState([]);
  const [isGameOn, setIsGameOn] = useState(false);
  const [score, setScore] = useState(0)
  console.log(`Score = ${score}`);

  let questionIdIncrement = 1;
  let arrayIdIncrement = 1;

  const [questionsArray, setQuestionsArray] = useState([
    { questionOneSelectedOption: '' },
    { questionTwoSelectedOption: '' },
    { questionThreeSelectedOption: '' },
    { questionFourSelectedOption: '' },
    { questionFiveSelectedOption: '' },
  ]);


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
            questionId: questionIdIncrement++,
            // selectedOption: ''
          }
        )
      }))
    }

    fetchAPI() // assign all this to a function since we use async await method
  }, [])
  console.log(quiz)


  useEffect(() => {
    setQuestionsArray(prevArr => prevArr.map(question => {
      return (
        {
          ...question,
          id: arrayIdIncrement++,
          isCheckAnswer: false,
        }
      )
    }))
  }, [])

  console.log(questionsArray)



  const gameMenu = quiz.map(item => {
    return (
      <Game
        key={nanoid()}
        toggle={toggleAndSaveOption}
        {...item}
        temp={quiz}
      // questionsArray={mappedArray}
      // isCheck={questionsArray[0].isCheckAnswer}
      />
    )
  })


  function toggleAndSaveOption(optionId, event, questionId) {
    console.clear()
    let liTextContent = event.target.innerText; //get the textContent of the clicked item[option]


    // console.log(questionId)
    setQuestionsArray(prevArr => prevArr.map(question => {
      // console.log(question.id)
      return (
        question.id === questionId ? { ...question, questionOneSelectedOption: liTextContent } : question
      )
    }))


    // else if (questionId === 1) {
    // setQuestionsArray(prevArr => prevArr.map(question => {
    //   console.log(question.id)
    //   return (
    //     question.id === questionId ? { ...question, questionOneSelectedOption: liTextContent } : question
    //   )
    // }))
    // }

    // else if (questionId === 2) {
    // setQuestionsArray(prevArr => prevArr.map(question => {
    //   console.log(question.id)
    //   return (
    //     question.id === questionId ? { ...question, questionTwoSelectedOption: liTextContent } : question
    //   )
    // }))
    // }

    // else if (questionId === 3) {
    //   setQuestionsArray(prevArr => prevArr.map(question => {
    //     console.log(question.id)
    //     return (
    //       question.id === questionId ? { ...question, questionThreeSelectedOption: liTextContent } : question
    //     )
    //   }))
    // }

    // else if (questionId === 4) {
    //   setQuestionsArray(prevArr => prevArr.map(question => {
    //     console.log(question.id)
    //     return (
    //       question.id === questionId ? { ...question, questionFourSelectedOption: liTextContent } : question
    //     )
    //   }))
    // }

    // else if (questionId === 5) {
    //   setQuestionsArray(prevArr => prevArr.map(question => {
    //     console.log(question.id)
    //     return (
    //       question.id === questionId ? { ...question, questionFiveSelectedOption: liTextContent } : question
    //     )
    //   }))
    // }


    setQuiz(prevApiCall => prevApiCall.map(option => {
      // Toggle the OnValue when clicking through ID
      return (
        option.optionOne === optionId ? { ...option, isOptionOne: !option.isOptionOne, isOptionTwo: false, isOptionThree: false, isOptionFour: false } : option &&
          option.optionTwo === optionId ? { ...option, isOptionOne: false, isOptionTwo: !option.isOptionTwo, isOptionThree: false, isOptionFour: false } : option &&
            option.optionThree === optionId ? { ...option, isOptionOne: false, isOptionTwo: false, isOptionThree: !option.isOptionThree, isOptionFour: false } : option &&
              option.optionFour === optionId ? { ...option, isOptionOne: false, isOptionTwo: false, isOptionThree: false, isOptionFour: !option.isOptionFour } : option
      )
    }))
  }


  function isCheckAnswer() {
    setQuestionsArray(prevQuestionArray => prevQuestionArray.map(item => {
      // alert(item.isCheckAnswer)
      return (
        { ...item, isCheckAnswer: true }
      )
    }))
    console.log(questionsArray)
  }

  function changeScreen() {
    console.clear()
    setIsGameOn(prevIsGameOn => !prevIsGameOn)
  }

  return (
    <div className="App">
      {!isGameOn && <Menu onClick={() => changeScreen()} />}
      {isGameOn && gameMenu}
      {isGameOn &&
        < CheckAnswer
          key={nanoid()}
          isCheckAnswer={() => isCheckAnswer()}
        // checkAnswer={() => checkAnswer()}
        />}
    </div>
  )
}


  // function checkForCorrectAnswer(index, questionNumber) {
  //   if (quiz[index].correct_answer === questionNumber) {
  //     console.log(` ${questionNumber} = ${quiz[index].correct_answer} `);
  //     console.log('Correct Answer');
  //     setScore(prevScore => prevScore + 1)
  //     console.log(`---------------------------`);
  //   }
  //   else {
  //     console.log(` ${questionNumber} != ${quiz[index].correct_answer} `);
  //     console.log('Wrong Answer');
  //     console.log(`---------------------------`);
  //   }
  // }


  // function checkAnswer() {
  //   console.clear()
  //   console.log('Checking for answer')
  //   checkForCorrectAnswer(0, questionsArray[0].questionOneSelectedOption)
  //   checkForCorrectAnswer(1, questionsArray[0].questionTwoSelectedOption)
  //   checkForCorrectAnswer(2, questionsArray[0].questionThreeSelectedOption)
  //   checkForCorrectAnswer(3, questionsArray[0].questionFourSelectedOption)
  //   checkForCorrectAnswer(4, questionsArray[0].questionFiveSelectedOption)
  // }


