// interface selectedOptionsType {
//   selectedQuestion: string;
//   selectedCategories: string;
//   selectedDifficulty: string;
// }

import React from "react";

interface SelectionProps {
  selectionScreenUI: () => void;
  isGameOn: boolean;
  startGameUI: () => void;
  setCategories?: (val: unknown) => void;
  setDifficulty?: (val: unknown) => void;
  setNumberOfQuestion: (val: unknown) => void;
  setUserSelection: (val: unknown) => void;
}

export default function SelectionMenu(props: SelectionProps) {
  function selectNumberOfQuestionsFNC(
    event: React.ChangeEvent<HTMLInputElement>,
    questionName: string,
    categoriesIndex: number
  ) {
    // User Selection ,Number of Questions, Difficulty, Categories ]
    if (event.target.value === questionName) {
      //  Display Header
      props.setUserSelection((prevSelectedOption: object[]) =>
        prevSelectedOption.map((sike) => {
          return { ...sike, selectedQuestion: questionName };
        })
      );
      console.log(`${event.target.value} it is`);
      props.setNumberOfQuestion(
        (prevNumberOfQuestion: string) =>
          (prevNumberOfQuestion = categoriesIndex)
      );
    }
  }
  function selectNumberOfQuestions(event: React.ChangeEvent<HTMLInputElement>) {
    selectNumberOfQuestionsFNC(event, "five", 5);
    selectNumberOfQuestionsFNC(event, "six", 6);
    selectNumberOfQuestionsFNC(event, "seven", 7);
    selectNumberOfQuestionsFNC(event, "eight", 8);
    selectNumberOfQuestionsFNC(event, "nine", 9);
    selectNumberOfQuestionsFNC(event, "ten", 10);
  }

  function selectCategoriesFNC(
    event: React.ChangeEvent<HTMLInputElement>,
    categoriesName: string,
    categoriesIndex: number
  ) {
    if (event.target.value === categoriesName) {
      //  Display Header
      props.setUserSelection((prevSelectedOption: object[]) =>
        prevSelectedOption.map((sike) => {
          return { ...sike, selectedCategories: categoriesName };
        })
      );
      console.log(`${event.target.value} it is`);
      props.setCategories?.(
        (prevCategories: string) => (prevCategories = categoriesIndex)
      );
    }
  }
  function selectCategories(event: React.ChangeEvent<HTMLInputElement>) {
    selectCategoriesFNC(event, "General Knowledge", 9);
    selectCategoriesFNC(event, "Entertainment:Books", 10);
    selectCategoriesFNC(event, "Entertainment:Film", 11);
    selectCategoriesFNC(event, "Entertainment:Music", 12);
    selectCategoriesFNC(event, "Entertainment:Musicals & Theatres", 13);
    selectCategoriesFNC(event, "Entertainment:Television", 14);
    selectCategoriesFNC(event, "Entertainment:Video Game", 15);
    selectCategoriesFNC(event, "Entertainment:Board Game", 16);
    selectCategoriesFNC(event, "Science & Nature", 17);
    selectCategoriesFNC(event, "Science: Computers", 18);
    selectCategoriesFNC(event, "Science: Mathematics", 19);
    selectCategoriesFNC(event, "Mythology", 20);
    selectCategoriesFNC(event, "Sports", 21);
    selectCategoriesFNC(event, "Geography", 22);
    selectCategoriesFNC(event, "History", 23);
    selectCategoriesFNC(event, "Politics", 24);
    selectCategoriesFNC(event, "Art", 25);
    selectCategoriesFNC(event, "Celebrities", 26);
    selectCategoriesFNC(event, "Animals", 27);
    selectCategoriesFNC(event, "Vehicles", 28);
    selectCategoriesFNC(event, "Entertainment: Comics", 29);
    selectCategoriesFNC(event, "Science: Gadgets", 30);
    selectCategoriesFNC(event, "Entertainment: Japanese Anime & Manga", 31);
    selectCategoriesFNC(event, "Entertainment: Cartoons & Animations", 32);
  }

  function selectDifficultyFNC(
    event: React.ChangeEvent<HTMLInputElement>,
    difficultyName: string
  ) {
    if (event.target.value === difficultyName) {
      console.log(`${event.target.value} it is`);
      //  Display Header
      props.setUserSelection((prevSelectedOption: object[]) =>
        prevSelectedOption.map((sike) => {
          return { ...sike, selectedDifficulty: difficultyName };
        })
      );
      props.setDifficulty?.(difficultyName);
    }
  }
  function selectDifficulty(event: React.ChangeEvent<HTMLInputElement>) {
    selectDifficultyFNC(event, "easy");
    selectDifficultyFNC(event, "medium");
    selectDifficultyFNC(event, "hard");
  }

  return (
    <div className="intro">
      <div className="intro-heading">
        <h1>Quizzical</h1>
        <p className="intro-paragraph">World of Quiz</p>
      </div>

      {
        //   if game is not started it will display 'Start quiz'
        //  else it will show selectionScreen

        !props.isGameOn ? (
          <div className="intro-button-div">
            <button onClick={props.selectionScreenUI} className="intro-button">
              Start Quiz
            </button>
          </div>
        ) : (
          <div className="selectionMenu">
            <div className="selectionMenu-numberOfQuestion">
              <div className="selectionMenu-numberOfQuestion-buttons">
                <select
                  className="select-style"
                  onChange={() => selectNumberOfQuestions(event)}
                  name="numberOfQuestion"
                  id="numberOfQuestion"
                >
                  <option selected disabled>
                    Number of question
                  </option>
                  <option className="option-style" value="five">
                    5
                  </option>
                  <option className="option-style" value="six">
                    6
                  </option>
                  <option className="option-style" value="seven">
                    7
                  </option>
                  <option className="option-style" value="eight">
                    8
                  </option>
                  <option className="option-style" value="nine">
                    9
                  </option>
                  <option className="option-style" value="ten">
                    10
                  </option>
                </select>
              </div>
            </div>
            <div className="selectionMenu-categories">
              <div className="selectionMenu-categories-buttons">
                <select
                  className="select-style"
                  onChange={() => selectCategories(event)}
                  name="categories"
                  id="categories"
                >
                  <option selected disabled>
                    Select Categories
                  </option>
                  <option className="option-style" value="General Knowledge">
                    General Knowledge
                  </option>
                  <option className="option-style" value="Entertainment:Books">
                    Entertainment:Books
                  </option>
                  <option className="option-style" value="Entertainment:Film">
                    Entertainment:Film
                  </option>
                  <option className="option-style" value="Entertainment:Music">
                    Entertainment:Music
                  </option>
                  <option
                    className="option-style"
                    value="Entertainment:Musicals & Theatres"
                  >
                    Entertainment:Musicals & Theatres
                  </option>
                  <option
                    className="option-style"
                    value="Entertainment:Television"
                  >
                    Entertainment:Television
                  </option>
                  <option
                    className="option-style"
                    value="Entertainment:Video Game"
                  >
                    Entertainment:Video Game
                  </option>
                  <option
                    className="option-style"
                    value="Entertainment:Board Game"
                  >
                    Entertainment:Board Game
                  </option>
                  <option className="option-style" value="Science & Nature">
                    Science & Nature
                  </option>
                  <option className="option-style" value="Science: Computers">
                    Science: Computers
                  </option>
                  <option className="option-style" value="Science: Mathematics">
                    Science: Mathematics
                  </option>
                  <option className="option-style" value="Mythology">
                    Mythology
                  </option>
                  <option className="option-style" value="Sports">
                    Sports
                  </option>
                  <option className="option-style" value="Geography">
                    Geography
                  </option>
                  <option className="option-style" value="History">
                    History
                  </option>
                  <option className="option-style" value="Politics">
                    Politics
                  </option>
                  {/* <option className="option-style" value="Art">
                    Art
                  </option> */}
                  <option className="option-style" value="Celebrities">
                    Celebrities
                  </option>
                  <option className="option-style" value="Animals">
                    Animals
                  </option>
                  <option className="option-style" value="Vehicles">
                    Vehicles
                  </option>
                  <option
                    className="option-style"
                    value="Entertainment: Comics"
                  >
                    Entertainment: Comics
                  </option>
                  <option className="option-style" value="Science: Gadgets">
                    Science: Gadgets
                  </option>
                  <option
                    className="option-style"
                    value="Entertainment: Japanese Anime & Manga"
                  >
                    Entertainment: Japanese Anime & Manga
                  </option>
                  <option
                    className="option-style"
                    value="Entertainment: Cartoons & Animations"
                  >
                    Entertainment: Cartoons & Animations
                  </option>
                </select>
              </div>
            </div>
            <div className="selectionMenu-difficulty">
              <div className="selectionMenu-difficulty-buttons">
                <select
                  className="select-style"
                  onChange={() => selectDifficulty(event)}
                  name="difficulty"
                  id="difficulty"
                >
                  <option selected disabled>
                    Select Difficulty
                  </option>
                  <option className="option-style" value="easy">
                    Easy
                  </option>
                  <option className="option-style" value="medium">
                    Medium
                  </option>
                  <option className="option-style" value="hard">
                    Hard
                  </option>
                </select>
              </div>
            </div>
            <div className="selectionMenu-confirm-btn-div">
              <button
                className="selectionMenu-confirm-btn"
                onClick={props.startGameUI}
              >
                Confirm
              </button>
            </div>
            <div className="selectionMenu-default-text-div">
              <p className="selectionMenu-default-text">
                <mark>
                  If no options are selected , a random five question will be
                  displayed !
                </mark>
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
}
