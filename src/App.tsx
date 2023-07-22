import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import SelectionMenu from "./Components/SelectionMenu";
import Confetti from "react-confetti";
import Questions from "./Components/Questions";
import CheckAnswerButton from "./Components/CheckAnswerButton";
import useDecodeEntities from "./hooks/useDecodeEntities";
import Menu from "./Components/Menu";
import Header from "./Components/Header";
import SkeltonLoader from "./Components/SkeltonLoader";
import Score from "./Components/Score";
import useRandomUnique from "./hooks/useRandomUnique";
import axios from "axios";

// import QuestionSelection from "./Components/QuestionSelection";

export default function App() {
  let score = 0; // Will only update if ApiLoading is true

  // For Showing the Selected Header
  const [userSelection, setUserSelection] = useState<any>([
    {
      selectedQuestion: "Random",
      selectedCategories: "Random",
      selectedDifficulty: "Random",
    },
  ]);

  const [ApiLoading, setApiLoading] = useState(false);
  const [quiz, setQuiz] = useState(Array());

  const [categories, setCategories] = useState<unknown>("");
  const [difficulties, setDifficulty] = useState<unknown>("");
  const [numberOfQuestion, setNumberOfQuestion] = useState<unknown>(5);
  const [options, setOptions] = useState([
    //storing each selected option to an array to check score
    {
      optionOne: "",
      optionTwo: "",
      optionThree: "",
      optionFour: "",
      optionFive: "",
      optionSix: "",
      optionSeven: "",
      optionEight: "",
      optionNine: "",
      optionTen: "",
    },
  ]);

  const [isSelectionScreenOn, setIsSelectionScreenOn] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCheck, setIsCheck] = useState([{ isCheckAnswer: false }]);

  function restartGame() {
    setIsGameOver(false);
    score = 0;
    setIsCheck((prevIsCheck) =>
      prevIsCheck.map((item) => {
        return { isCheckAnswer: false };
      })
    );
  }

  useEffect(() => {
    restartGame();
    if (!isGameOver) {
      // to stop multiple api rendering when pressing 'try again'
      // try {
      async function fetchAPI() {
        // https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple
        const response = await axios.get(
          // "https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple"
          `https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${categories}&difficulty=${difficulties}&type=multiple`
        );
        const data = await response.data;
        // console.clear();
        console.log("Inside use Effect --");
        console.log(data);
        setQuiz(data.results); // [shows an array of five question]
        setQuiz((prevApiCall) =>
          prevApiCall.map((item, index) => {
            // map through each of the quiz and add new data to it [isOptionOne,optionOne,questionId]
            return {
              ...item,
              isOptionOne: false,
              isOptionTwo: false,
              isOptionThree: false,
              isOptionFour: false,
              optionOne: nanoid(),
              optionTwo: nanoid(),
              optionThree: nanoid(),
              optionFour: nanoid(),
              questionId: index + 1,
              selectedOption: "",
              optionIndex: useRandomUnique(4, 4), // this gives a each question an array of four unique random number [randomize options]
            };
          })
        );
      }
      // return data;
      fetchAPI(); // assign all this to a function since we use async await method
      // } catch (error) {
      //   console.error(error);
      // }
    }
  }, [isGameOver, categories, difficulties, numberOfQuestion]); // only call API when this changes

  //  always checking for a true condition [For Below Code]
  useEffect(() => {
    if (quiz.length !== 0) {
      setApiLoading(true);
    }
  }, [quiz]);

  // at first the api calls will be empty which cause error,
  // to prevent this we only render checkScore, if we get the api data []
  if (ApiLoading === true) {
    checkScore(options[0].optionOne, 0);
    checkScore(options[0].optionTwo, 1);
    checkScore(options[0].optionThree, 2);
    checkScore(options[0].optionFour, 3);
    checkScore(options[0].optionFive, 4);

    // Will only check if the user select number of quiz more than 5
    if (quiz.length === 6) {
      checkScore(options[0].optionSix, 5);
    }
    if (quiz.length === 7) {
      checkScore(options[0].optionSix, 5);
      checkScore(options[0].optionSeven, 6);
    }
    if (quiz.length === 8) {
      checkScore(options[0].optionSix, 5);
      checkScore(options[0].optionSeven, 6);
      checkScore(options[0].optionEight, 7);
    }
    if (quiz.length === 9) {
      checkScore(options[0].optionSix, 5);
      checkScore(options[0].optionSeven, 6);
      checkScore(options[0].optionEight, 7);
      checkScore(options[0].optionNine, 8);
    }
    if (quiz.length === 10) {
      checkScore(options[0].optionSix, 5);
      checkScore(options[0].optionSeven, 6);
      checkScore(options[0].optionEight, 7);
      checkScore(options[0].optionNine, 8);
      checkScore(options[0].optionTen, 9);
    }
  }

  function toggleAndSaveOption(
    optionId: number,
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: number
  ) {
    // console.clear();

    if (isCheck[0].isCheckAnswer === false) {
      //only select if the player haven't checked the answer
      let liTextContent = event.target.innerText; //get the textContent of the clicked option

      setQuiz((prevArr) =>
        prevArr.map((question) => {
          //  saving each question, [selectedOption]
          return question.questionId === questionId
            ? { ...question, selectedOption: liTextContent }
            : question;
        })
      );

      setOptions((prevOptions) =>
        prevOptions.map((question) => {
          // Saves each selected option [For Score Checking]
          return questionId === 1
            ? { ...question, optionOne: liTextContent }
            : question && questionId === 2
            ? { ...question, optionTwo: liTextContent }
            : question && questionId === 3
            ? { ...question, optionThree: liTextContent }
            : question && questionId === 4
            ? { ...question, optionFour: liTextContent }
            : question && questionId === 5
            ? { ...question, optionFive: liTextContent }
            : question && questionId === 6
            ? { ...question, optionSix: liTextContent }
            : question && questionId === 7
            ? { ...question, optionSeven: liTextContent }
            : question && questionId === 8
            ? { ...question, optionEight: liTextContent }
            : question && questionId === 9
            ? { ...question, optionNine: liTextContent }
            : question && questionId === 10
            ? { ...question, optionTen: liTextContent }
            : question;
        })
      );

      setQuiz((prevApiCall) =>
        prevApiCall.map((option) => {
          // Toggle the OnValue when clicking through ID
          return option.optionOne === optionId
            ? {
                ...option,
                isOptionOne: !option.isOptionOne,
                isOptionTwo: false,
                isOptionThree: false,
                isOptionFour: false,
              }
            : option && option.optionTwo === optionId
            ? {
                ...option,
                isOptionOne: false,
                isOptionTwo: !option.isOptionTwo,
                isOptionThree: false,
                isOptionFour: false,
              }
            : option && option.optionThree === optionId
            ? {
                ...option,
                isOptionOne: false,
                isOptionTwo: false,
                isOptionThree: !option.isOptionThree,
                isOptionFour: false,
              }
            : option && option.optionFour === optionId
            ? {
                ...option,
                isOptionOne: false,
                isOptionTwo: false,
                isOptionThree: false,
                isOptionFour: !option.isOptionFour,
              }
            : option;
        })
      );
    }
  }

  function checkScore(optionNumber: string, index: number) {
    // each question has a score of one
    // console.log(options[0]);
    console.log(useDecodeEntities(quiz[index].correct_answer));
    if (optionNumber === useDecodeEntities(quiz[index].correct_answer)) {
      score++;
    }
  }
  // Only checkAnswer, if options for each question are selected
  function isCheckAnswer(event: React.ChangeEvent<HTMLInputElement>) {
    if (quiz.every((eachElement) => eachElement.selectedOption !== "")) {
      setIsCheck((prevQuestionArray) =>
        prevQuestionArray.map((item) => {
          return { ...item, isCheckAnswer: true };
        })
      );

      if (event.target.textContent === "Try Again") {
        setApiLoading(false); // to show 'Fetching data'
        setIsGameOver(true); // when true, it will call a new API [useEffect Dependent Array]
      }
    } else {
      alert("Select Options for all the question");
    }
  }

  // Changing Screens
  function goMenuScreen() {
    setIsGameOver(true);
    setIsGameOn(false);
  }

  function selectionScreen() {
    // console.clear();
    setIsSelectionScreenOn((prevIsGameOn) => !prevIsGameOn);
  }

  function startGameScreen() {
    // console.clear();
    setIsGameOn(true);
  }

  // console.log(`------------------------------------------`)
  // console.log(ApiLoading)
  console.log(quiz);
  // console.log(categories)
  // console.log(score)
  // console.log(options)
  // console.log(quiz.length)
  // console.log(isCheck)
  // console.log(isCheck[0].isCheckAnswer)
  // console.log(isGameOver)
  // console.log(`------------------------------------------`)

  const renderQuestions = quiz.map((item) => {
    return (
      <Questions
        {...item}
        key={nanoid()}
        toggle={toggleAndSaveOption}
        isCheck={isCheck[0].isCheckAnswer}
      />
    );
  });

  const renderCheckAnswer = (
    <CheckAnswerButton
      key={nanoid()}
      toggleCheckAnswer={() => isCheckAnswer(event)}
      isCheckValue={isCheck[0].isCheckAnswer}
      isGameOver={isGameOver}
    />
  );

  const renderConfetti = () => {
    return score === quiz.length && isCheck[0].isCheckAnswer && <Confetti />;
  };

  return ApiLoading === false ? (
    <SkeltonLoader />
  ) : (
    <div className="App">
      {!isGameOn && (
        <SelectionMenu
          selectionScreenUI={() => selectionScreen()}
          isGameOn={isSelectionScreenOn}
          startGameUI={() => startGameScreen()}
          setCategories={setCategories}
          setDifficulty={setDifficulty}
          setNumberOfQuestion={setNumberOfQuestion}
          setUserSelection={setUserSelection}
        />
      )}
      {isGameOn && (
        <div className="sike">
          <Menu goMenuScreen={() => goMenuScreen()} />
          <Header userSelection={userSelection} />
          {renderQuestions}
          {renderCheckAnswer}
          {renderConfetti()}
          {isCheck[0].isCheckAnswer && <Score score={score} quiz={quiz} />}
        </div>
      )}
      {/* {<h2 className='scoreUI'>You Scored {score} / {quiz.length} </h2>} */}
    </div>
  );
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
