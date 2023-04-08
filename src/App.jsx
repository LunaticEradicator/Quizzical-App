import React from 'react'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Menu from './Pages/Menu'
import Confetti from 'react-confetti'
import Game from './Pages/Game';
import CheckAnswer from './Pages/CheckAnswer';


export default function App() {
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

  let score = 0  // Will only update if ApiLoading is true
  let categoriesHeadingCondition = '' // Will only update if ApiLoading is true

  let questionIdIncrement = 1;
  const [ApiLoading, setApiLoading] = useState(false);
  const [quiz, setQuiz] = useState([]);

  const [categories, setCategories] = useState('');
  const [difficulties, setDifficulty] = useState('');
  const [numberOfQuestion, setNumberOfQuestion] = useState(5);

  const [isSelectionScreenOn, setIsSelectionScreenOn] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)


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
      optionSix: '',
      optionSeven: '',
      optionEight: '',
      optionNine: '',
      optionTen: '',
    }
  ]);

  function restartGame() {
    setIsGameOver(false);
    questionIdIncrement = 1;
    score = 0
    setIsCheck(prevIsCheck => prevIsCheck.map(item => {
      return { isCheckAnswer: false }
    }))
  }

  useEffect(() => {
    restartGame()
    if (!isGameOver) { // to stop multiple api rendering when pressing 'try again'
      async function fetchAPI() {
        console.clear()
        console.log('Inside use Effect --')
        // https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple
        const response = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${categories}&difficulty=${difficulties}&type=multiple`);
        const data = await response.json();
        console.log(response)
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
      fetchAPI() // assign all this to a function since we use async await method
    }
  }, [isGameOver, categories, difficulties, numberOfQuestion]) // only call API when this changes


  useEffect(() => { //  always checking for a true condition [For Below Code]
    if (quiz.length !== 0) {
      setApiLoading(true);
    }
  }, [quiz])


  // at first the api calls will be empty which cause error,
  // to prevent this we only render checkScore, if we get the api data []
  if (ApiLoading === true) {
    checkScore(options[0].optionOne, 0)
    checkScore(options[0].optionTwo, 1)
    checkScore(options[0].optionThree, 2)
    checkScore(options[0].optionFour, 3)
    checkScore(options[0].optionFive, 4)

    // Will only check if the user select number of quiz more than 5
    if (quiz.length === 6) {
      checkScore(options[0].optionSix, 5)
    }
    if (quiz.length === 7) {
      checkScore(options[0].optionSix, 5)
      checkScore(options[0].optionSeven, 6)
    }
    if (quiz.length === 8) {
      checkScore(options[0].optionSix, 5)
      checkScore(options[0].optionSeven, 6)
      checkScore(options[0].optionEight, 7)

    }
    if (quiz.length === 9) {
      checkScore(options[0].optionSix, 5)
      checkScore(options[0].optionSeven, 6)
      checkScore(options[0].optionEight, 7)
      checkScore(options[0].optionNine, 8)
    }
    if (quiz.length === 10) {
      checkScore(options[0].optionSix, 5)
      checkScore(options[0].optionSeven, 6)
      checkScore(options[0].optionEight, 7)
      checkScore(options[0].optionNine, 8)
      checkScore(options[0].optionTen, 9)
    }
    categoriesHeadingCondition = (quiz[0].category === quiz[1].category && quiz[0].category === quiz[4].category) ? quiz[0].category : 'Random';
  }

  const randomUnique = (range, count) => { // create an array of 4 unique random Number[which does not includes duplicates]
    let num = new Set();
    while (num.size < count) {
      num.add(Math.floor(Math.random() * (range - 1 + 1)));
    }
    return [...num];
  }

  const game = quiz.map(item => {
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
    console.clear()

    if (isCheck[0].isCheckAnswer === false) {  //only select if the player haven't checked the answer
      let liTextContent = event.target.innerText;   //get the textContent of the clicked option

      setQuiz(prevArr => prevArr.map(question => { //  saving each question, [selectedOption]
        return (
          question.questionId === questionId ? { ...question, selectedOption: liTextContent } : question
        )
      }))

      setOptions(prevOptions => prevOptions.map(question => { // Saves each selected option [For Score Checking]
        return (
          questionId === 1 ? { ...question, optionOne: liTextContent } : question &&
            questionId === 2 ? { ...question, optionTwo: liTextContent } : question &&
              questionId === 3 ? { ...question, optionThree: liTextContent } : question &&
                questionId === 4 ? { ...question, optionFour: liTextContent } : question &&
                  questionId === 5 ? { ...question, optionFive: liTextContent } : question &&
                    questionId === 6 ? { ...question, optionSix: liTextContent } : question &&
                      questionId === 7 ? { ...question, optionSeven: liTextContent } : question &&
                        questionId === 8 ? { ...question, optionEight: liTextContent } : question &&
                          questionId === 9 ? { ...question, optionNine: liTextContent } : question &&
                            questionId === 10 ? { ...question, optionTen: liTextContent } : question
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

  function checkScore(optionNumber, index) { // each question has a score of one 
    if (optionNumber === decodeEntities(quiz[index].correct_answer)) {
      score++
    }
  }

  function isCheckAnswer(event) { // Only toggle, if options for each question are selected
    if (quiz.every(eachElement => eachElement.selectedOption !== '')) {
      setIsCheck(prevQuestionArray => prevQuestionArray.map(item => {
        return (
          { ...item, isCheckAnswer: true }
        )
      }))

      if (event.target.textContent === 'Try Again') {
        setApiLoading(false) // to show 'Fetching data'
        setIsGameOver(true); // when true, it will call a new API [useEffect Dependent Array]
      }
    }
    else {
      alert('Select Options for all the question')
    }
  }


  // User Selection ,Number of Questions, Difficulty, Categories ]

  function selectNumberOfQuestionsFNC(event, questionName, categoriesIndex) {
    if (event.target.value === questionName) {
      console.log(`${event.target.value} it is`)
      setNumberOfQuestion(prevNumberOfQuestion => prevNumberOfQuestion = categoriesIndex)
    }
  }

  function selectDifficultyFNC(event, difficultyName) {
    if (event.target.value === difficultyName) {
      console.log(`${event.target.value} it is`)
      setDifficulty(difficultyName)
    }
  }

  function selectCategoriesFNC(event, categoriesName, categoriesIndex) {
    if (event.target.value === categoriesName) {
      console.log(`${event.target.value} it is`)
      setCategories(prevCategories => prevCategories = categoriesIndex)
    }
  }

  function selectNumberOfQuestions(event) {
    selectNumberOfQuestionsFNC(event, 'five', 5)
    selectNumberOfQuestionsFNC(event, 'six', 6)
    selectNumberOfQuestionsFNC(event, 'seven', 7)
    selectNumberOfQuestionsFNC(event, 'eight', 8)
    selectNumberOfQuestionsFNC(event, 'nine', 9)
    selectNumberOfQuestionsFNC(event, 'ten', 10)
  }

  function selectDifficulty(event) {
    selectDifficultyFNC(event, 'easy')
    selectDifficultyFNC(event, 'medium')
    selectDifficultyFNC(event, 'hard')
  }

  function selectCategories(event) {
    selectCategoriesFNC(event, 'General Knowledge', 9)
    selectCategoriesFNC(event, 'Entertainment:Books', 10)
    selectCategoriesFNC(event, 'Entertainment:Film', 11)
    selectCategoriesFNC(event, 'Entertainment:Music', 12)
    selectCategoriesFNC(event, 'Entertainment:Musicals & Theatres', 13)
    selectCategoriesFNC(event, 'Entertainment:Television', 14)
    selectCategoriesFNC(event, 'Entertainment:Video Game', 15)
    selectCategoriesFNC(event, 'Entertainment:Board Game', 16)
    selectCategoriesFNC(event, 'Science & Nature', 17)
    selectCategoriesFNC(event, 'Science: Computers', 18)
    selectCategoriesFNC(event, 'Science: Mathematics', 19)
    selectCategoriesFNC(event, 'Mythology', 20)
    selectCategoriesFNC(event, 'Sports', 21)
    selectCategoriesFNC(event, 'Geography', 22)
    selectCategoriesFNC(event, 'History', 23)
    selectCategoriesFNC(event, 'Politics', 24)
    selectCategoriesFNC(event, 'Art', 25)
    selectCategoriesFNC(event, 'Celebrities', 26)
    selectCategoriesFNC(event, 'Animals', 27)
    selectCategoriesFNC(event, 'Vehicles', 28)
    selectCategoriesFNC(event, 'Entertainment: Comics', 29)
    selectCategoriesFNC(event, 'Science: Gadgets', 30)
    selectCategoriesFNC(event, 'Entertainment: Japanese Anime & Manga', 31)
    selectCategoriesFNC(event, 'Entertainment: Cartoons & Animations', 32)
  }

  // Changing Screens  
  function goMenuScreen() {
    setIsGameOver(true);
    setIsGameOn(false);
  }

  function selectionScreen() {
    console.clear()
    setIsSelectionScreenOn(prevIsGameOn => !prevIsGameOn)
  }

  function startGameScreen() {
    console.clear()
    setIsGameOn(true)
  }


  // console.log(`------------------------------------------`)
  // console.log(ApiLoading)
  console.log(quiz)
  // console.log(categories)
  // console.log(score)
  // console.log(options)
  // console.log(quiz.length)
  // console.log(isCheck)
  // console.log(isCheck[0].isCheckAnswer)
  // console.log(isGameOver)
  // console.log(`------------------------------------------`)


  return ApiLoading === false
    ?
    <div className='loadingApi'>
      Fetching data ....
      <br />
      Please Wait.
    </div >
    :
    <div className="App">
      {isGameOn && <div onClick={goMenuScreen} className='menu'>Menu</div>}
      {isGameOn &&
        <div className='userSelected-type'>
          <h2>Categories - {categoriesHeadingCondition} </h2>
          <hr />
        </div>
      }
      {!isGameOn &&
        <Menu
          selectionScreenUI={() => selectionScreen()}
          isGameOn={isSelectionScreenOn}
          startGameUI={() => startGameScreen()}
          onClickCategories={() => selectCategories(event)}
          onClickDifficulty={() => selectDifficulty(event)}
          onClickNumberOfQuestion={() => selectNumberOfQuestions(event)}
        />
      }
      {isGameOn && game}
      {isGameOn && checkAnswer}
      {score === quiz.length && isCheck[0].isCheckAnswer && <Confetti />}
      {isCheck[0].isCheckAnswer && <h2 className='scoreUI'>{ } You Scored {score} /  {quiz.length} </h2>}
      {/* {<h2 className='scoreUI'>You Scored {score} / {quiz.length} </h2>} */}
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
