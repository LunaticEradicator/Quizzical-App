import React from 'react'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Menu from './Pages/Menu'
// import SelectionMenu from './Pages/SelectionMenu'
import Game from './Pages/Game';
import CheckAnswer from './Pages/CheckAnswer';



export default function App() {
  // console.clear()
  let questionIdIncrement = 1;

  let score = 0  // Will only update if ApiLoading is true
  let categoriesHeadingCondition = '' // Will only update if ApiLoading is true

  const [ApiLoading, setApiLoading] = useState(false);
  const [quiz, setQuiz] = useState([]);

  const [isSelectionScreenOn, setIsSelectionScreenOn] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false)

  const [isCategories, setIsCategories] = useState(false);

  const [isCheck, setIsCheck] = useState([
    { isCheckAnswer: false },
  ]);
  const [options, setOptions] = useState([ //storing each selected option to an array to check score
    {
      optionOne: '',
      optionTwo: '',
      optionThree: '',
      optionFour: '',
      optionFive: '',
    }
  ]);
  const [isGameOver, setIsGameOver] = useState(false)

  function restartGame() {
    setIsGameOver(false);
    questionIdIncrement = 1;
    score = 0
    setIsCheck(prevIsCheck => prevIsCheck.map(item => {
      return { isCheckAnswer: false }
    }))
  }
  // const amount = 5;
  const [cate, setCate] = useState('');

  useEffect(() => {
    async function fetchAPI() {
      console.log('Inside use Effect --')
      console.log(cate)
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${cate}&type=multiple`);
      const data = await response.json();


      setQuiz(data.results) // [shows an array of five question]
      setQuiz(prevApiCall => prevApiCall.map(item => { // map through each of the quiz and add new data to it [isOptionOne,optionOne,questionId]
        return (
          {
            ...item,
            isOptionOne: false, isOptionTwo: false, isOptionThree: false, isOptionFour: false,
            optionOne: nanoid(), optionTwo: nanoid(), optionThree: nanoid(), optionFour: nanoid(),
            questionId: questionIdIncrement++,
            selectedOption: '',
            optionIndex: randomUnique(4, 4) // this gives a each question an array of four unique random number [which we give as the index for each option]
          }
        )
      }))
    }
    restartGame()
    fetchAPI() // assign all this to a function since we use async await method
    // }, [isGameOn])
  }, [isGameOver || cate])

  useEffect(() => {
    if (quiz.length !== 0) {
      setApiLoading(true);
    }
  }, [quiz]) // checking if quiz is not empty

  if (ApiLoading) {
    // at first the api calls an empty string which cause error,
    // to prevent this we only render checkScore, if we get the api data []
    checkScore(options[0].optionOne, 0)
    checkScore(options[0].optionTwo, 1)
    checkScore(options[0].optionThree, 2)
    checkScore(options[0].optionFour, 3)
    checkScore(options[0].optionFive, 4)
    categoriesHeadingCondition = quiz[0].category === quiz[1].category && quiz[0].category === quiz[4].category ? quiz[0].category : 'Random';
  }

  // console.log(ApiLoading)
  console.log(quiz)
  console.log(cate)
  // console.log(score)
  // console.log(options)
  // console.log(quiz.length)
  // console.log(isCheck)
  // console.log(isCheck[0].isCheckAnswer)
  // console.log(isGameOver)

  const randomUnique = (range, count) => { // create an array of 4 unique random Number[which does not includes duplicates]
    let num = new Set();
    while (num.size < count) {
      num.add(Math.floor(Math.random() * (range - 1 + 1)));
    }
    return [...num];
  }

  const gameMenu = quiz.map(item => {
    return (
      <Game
        {...item}
        key={nanoid()}
        toggle={toggleAndSaveOption}
        isCheck={isCheck[0].isCheckAnswer}
      />
    )
  })

  const checkAnswer =
    < CheckAnswer
      key={nanoid()}
      toggleCheckAnswer={() => isCheckAnswer(event)}
      isCheckValue={isCheck[0].isCheckAnswer}
      isGameOver={isGameOver}
    />

  function toggleAndSaveOption(optionId, event, questionId) {
    if (isCheck[0].isCheckAnswer === false) {  //only select if the player haven't checked the answer
      // console.clear()
      // console.log(questionId)
      let liTextContent = event.target.innerText;   //get the textContent of the clicked option

      setQuiz(prevArr => prevArr.map(question => {
        return (
          question.questionId === questionId ? { ...question, selectedOption: liTextContent } : question
        )
      }))

      setOptions(prevOptions => prevOptions.map(question => {
        return (
          questionId === 1 ? { ...question, optionOne: liTextContent } : question &&
            questionId === 2 ? { ...question, optionTwo: liTextContent } : question &&
              questionId === 3 ? { ...question, optionThree: liTextContent } : question &&
                questionId === 4 ? { ...question, optionFour: liTextContent } : question &&
                  questionId === 5 ? { ...question, optionFive: liTextContent } : question
        )
      }))

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
  }


  function checkScore(optionNumber, index) {
    if (optionNumber === quiz[index].correct_answer) {
      score++
    }
  }

  function isCheckAnswer(event) { // Only toggle, if options for each question are selected
    console.log(event.target.textContent)
    if (quiz.every(eachElement => eachElement.selectedOption !== '')) {
      setIsCheck(prevQuestionArray => prevQuestionArray.map(item => {
        return (
          { ...item, isCheckAnswer: true }
        )
      }))
      if (event.target.textContent === 'Try Again') {
        setIsGameOver(true);
      }
    }
    else {
      alert('Select Options for all the question')
    }

    // if (quiz[0].selectedOption !== '') {
    //   setQuestionsArray(prevQuestionArray => prevQuestionArray.map(item => {
    //     return (
    //       { ...item, isCheckAnswer: true }
    //     )
    //   }))
    // }
  }

  function selectionScreen() {
    console.clear()
    setIsSelectionScreenOn(prevIsGameOn => !prevIsGameOn)
  }

  function startGameScreen() {
    console.clear()
    setIsGameOn(prevSelection => !prevSelection)
    // alert(isSelection)
  }

  function selectCategories(event, categoriesName, categoriesIndex) {
    if (event.target.value === categoriesName) {
      console.log(`${event.target.value} it is`)
      setCate(prevCate => prevCate = categoriesIndex)
    }
  }

  function sectionScreenSelected(event) {
    selectCategories(event, 'History', 23)
    selectCategories(event, 'Video Game', 15)
  }

  return ApiLoading === false
    ?
    <div className='loadingApi'>
      Fetching data ....
      <br />
      Please Wait.
    </div >
    :
    <div className="App">
      {isGameOn && <h2>Categories - {categoriesHeadingCondition} </h2>}
      {
        !isGameOn &&
        <Menu
          selectionScreenUI={() => selectionScreen()}
          isGameOn={isSelectionScreenOn}
          startGameUI={() => startGameScreen()}
          onClickCategories={() => sectionScreenSelected(event)}
        />
      }
      {isGameOn && gameMenu}
      {isGameOn && checkAnswer}
      {isCheck[0].isCheckAnswer && <h2 className='scoreUI'>You Scored {score} / 5 </h2>}
    </div>
}


      // }

      // else if (questionId === 2) {
      // setIsCheck(prevArr => prevArr.map(question => {
      //   console.log(question.id)
      //   return (
      //     question.id === questionId ? { ...question, questionTwoSelectedOption: liTextContent } : question
      //   )
      // }))
      // }

      // else if (questionId === 3) {
      //   setIsCheck(prevArr => prevArr.map(question => {
      //     console.log(question.id)
      //     return (
      //       question.id === questionId ? { ...question, questionThreeSelectedOption: liTextContent } : question
      //     )
      //   }))
      // }

      // else if (questionId === 4) {
      //   setIsCheck(prevArr => prevArr.map(question => {
      //     console.log(question.id)
      //     return (
      //       question.id === questionId ? { ...question, questionFourSelectedOption: liTextContent } : question
      //     )
      //   }))
      // }

      // else if (questionId === 5) {
      //   setIsCheck(prevArr => prevArr.map(question => {
      //     console.log(question.id)
      //     return (
      //       question.id === questionId ? { ...question, questionFiveSelectedOption: liTextContent } : question
      //     )
      //   }))
      // }
