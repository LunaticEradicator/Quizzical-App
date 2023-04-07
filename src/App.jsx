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

  const [categories, setCategories] = useState('');
  const [difficulties, setDifficulty] = useState('');
  const [numberOfQuestion, setNumberOfQuestion] = useState(5);

  const [isSelectionScreenOn, setIsSelectionScreenOn] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false)

  const [isRestart, setIsRestart] = useState(false)


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
  const [isGameOver, setIsGameOver] = useState(false)

  function restartGame() {
    setIsGameOver(false);
    questionIdIncrement = 1;
    score = 0
    // setRestart(false)
    setIsCheck(prevIsCheck => prevIsCheck.map(item => {
      return { isCheckAnswer: false }
    }))
    // setApiLoading(false)
  }

  console.log(numberOfQuestion)
  console.log(categories)
  console.log(difficulties)

  useEffect(() => {
    async function fetchAPI() {
      console.clear()
      console.log('Inside use Effect --')
      console.log(categories)
      // https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple
      const response = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${categories}&difficulty=${difficulties}&type=multiple`);
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
  }, [isGameOver || categories || difficulties || numberOfQuestion]) // only call API when this changes

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


    // will only checkScore from questions 5-10 if the player selects chooses it 

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

  // console.log(ApiLoading)
  console.log(quiz)
  // console.log(categories)
  // console.log(score)
  console.log(options)
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

      setQuiz(prevArr => prevArr.map(question => { //  saving each question, [selectedOption]
        return (
          question.questionId === questionId ? { ...question, selectedOption: liTextContent } : question
        )
      }))

      setOptions(prevOptions => prevOptions.map(question => { // saving each question [score]
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
      setCategories(prevCategories => prevCategories = categoriesIndex)
    }
  }

  function selectDifficulty(event, difficultyName) {
    if (event.target.value === difficultyName) {
      console.log(`${event.target.value} it is`)
      setDifficulty(difficultyName)
    }
  }

  function selectNumberOfQuestions(event, questionName, categoriesIndex) {
    if (event.target.value === questionName) {
      console.log(`${event.target.value} it is`)
      setNumberOfQuestion(prevNumberOfQuestion => prevNumberOfQuestion = categoriesIndex)
    }
  }


  function sectionScreenCategoriesSelected(event) {
    selectCategories(event, 'General Knowledge', 9)
    selectCategories(event, 'Entertainment:Books', 10)
    selectCategories(event, 'Entertainment:Film', 11)
    selectCategories(event, 'Entertainment:Music', 12)
    selectCategories(event, 'Entertainment:Musicals & Theatres', 13)
    selectCategories(event, 'Entertainment:Television', 14)
    selectCategories(event, 'Entertainment:Video Game', 15)
    selectCategories(event, 'Entertainment:Board Game', 16)
    selectCategories(event, 'Science & Nature', 17)
    selectCategories(event, 'Science: Computers', 18)
    selectCategories(event, 'Science: Mathematics', 19)
    selectCategories(event, 'Mythology', 20)
    selectCategories(event, 'Sports', 21)
    selectCategories(event, 'Geography', 22)
    selectCategories(event, 'History', 23)
    selectCategories(event, 'Politics', 24)
    selectCategories(event, 'Art', 25)
    selectCategories(event, 'Celebrities', 26)
    selectCategories(event, 'Animals', 27)
    selectCategories(event, 'Vehicles', 28)
    selectCategories(event, 'Entertainment: Comics', 29)
    selectCategories(event, 'Science: Gadgets', 30)
    selectCategories(event, 'Entertainment: Japanese Anime & Manga', 31)
    selectCategories(event, 'Entertainment: Cartoons & Animations', 32)
  }

  function sectionScreenDifficultySelected(event) {
    selectDifficulty(event, 'easy')
    selectDifficulty(event, 'medium')
    selectDifficulty(event, 'hard')
  }

  function sectionScreenNumberOfQuestionSelected(event) {
    selectNumberOfQuestions(event, 'five', 5)
    selectNumberOfQuestions(event, 'six', 6)
    selectNumberOfQuestions(event, 'seven', 7)
    selectNumberOfQuestions(event, 'eight', 8)
    selectNumberOfQuestions(event, 'nine', 9)
    selectNumberOfQuestions(event, 'ten', 10)
  }

  function goMenu() {
    setIsGameOver(true);
    setIsGameOn(false);
    setApiLoading(false);
  }

  console.log(`-----------------------------------!!!!!----`)
  console.log(isRestart)

  return ApiLoading === false
    ?
    <div className='loadingApi'>
      Fetching data ....
      <br />
      Please Wait.
    </div >
    :
    <div className="App">
      {isGameOn && <div onClick={goMenu} className='menu'>Menu</div>}
      {isGameOn &&
        <div className='h2-Name'>
          <h2 >Categories - {categoriesHeadingCondition} </h2>
          <hr />
        </div>
      }
      {
        !isGameOn &&
        <Menu
          selectionScreenUI={() => selectionScreen()}
          isGameOn={isSelectionScreenOn}
          startGameUI={() => startGameScreen()}
          onClickCategories={() => sectionScreenCategoriesSelected(event)}
          onClickDifficulty={() => sectionScreenDifficultySelected(event)}
          onClickNumberOfQuestion={() => sectionScreenNumberOfQuestionSelected(event)}
        />
      }
      {isGameOn && gameMenu}
      {isGameOn && checkAnswer}
      {/* {isCheck[0].isCheckAnswer && <h2 className='scoreUI'>You Scored {score} /  {quiz.length} </h2>} */}
      {<h2 className='scoreUI'>You Scored {score} / {quiz.length} </h2>}
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
