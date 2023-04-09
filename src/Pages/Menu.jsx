export default function Menu(props) {
    return (
        <div className="intro">
            <div className="intro-heading">
                <h1>Quizzical</h1>
                <p className="intro-paragraph">World of Quiz</p>
            </div>

            {
                //   if game is not started it will display 'Start quiz'
                //  else it will show selectionScreen  

                !props.isGameOn
                    ?
                    <div className="intro-button-div">
                        <button onClick={props.selectionScreenUI} className="intro-button">Start Quiz</button>
                    </div>
                    :
                    <div className='selectionMenu'>
                        <div className='selectionMenu-numberOfQuestion'>
                            <div className='selectionMenu-numberOfQuestion-buttons'>
                                <select className="select-style" onChange={props.onClickNumberOfQuestion} name="numberOfQuestion" id="numberOfQuestion">
                                    <option selected disabled>Number of question</option>
                                    <option className="option-style" value="five">5</option>
                                    <option className="option-style" value="six">6</option>
                                    <option className="option-style" value="seven">7</option>
                                    <option className="option-style" value="eight">8</option>
                                    <option className="option-style" value="nine">9</option>
                                    <option className="option-style" value="ten">10</option>
                                </select>
                            </div>
                        </div>
                        <div className='selectionMenu-categories'>
                            <div className="selectionMenu-categories-buttons">
                                <select className="select-style" onChange={props.onClickCategories} name="categories" id="categories">
                                    <option selected disabled>Select Categories</option>
                                    <option className="option-style" value="General Knowledge">General Knowledge</option>
                                    <option className="option-style" value="Entertainment:Books">Entertainment:Books</option>
                                    <option className="option-style" value="Entertainment:Film">Entertainment:Film</option>
                                    <option className="option-style" value="Entertainment:Music">Entertainment:Music</option>
                                    <option className="option-style" value="Entertainment:Musicals & Theatres">Entertainment:Musicals & Theatres</option>
                                    <option className="option-style" value="Entertainment:Television">Entertainment:Television</option>
                                    <option className="option-style" value="Entertainment:Video Game">Entertainment:Video Game</option>
                                    <option className="option-style" value="Entertainment:Board Game">Entertainment:Board Game</option>
                                    <option className="option-style" value="Science & Nature">Science & Nature</option>
                                    <option className="option-style" value="Science: Computers">Science: Computers</option>
                                    <option className="option-style" value="Science: Mathematics">Science: Mathematics</option>
                                    <option className="option-style" value="Mythology">Mythology</option>
                                    <option className="option-style" value="Sports">Sports</option>
                                    <option className="option-style" value="Geography">Geography</option>
                                    <option className="option-style" value="History">History</option>
                                    <option className="option-style" value="Politics">Politics</option>
                                    <option className="option-style" value="Art">Art</option>
                                    <option className="option-style" value="Celebrities">Celebrities</option>
                                    <option className="option-style" value="Animals">Animals</option>
                                    <option className="option-style" value="Vehicles">Vehicles</option>
                                    <option className="option-style" value="Entertainment: Comics">Entertainment: Comics</option>
                                    <option className="option-style" value="Science: Gadgets">Science: Gadgets</option>
                                    <option className="option-style" value="Entertainment: Japanese Anime & Manga">Entertainment: Japanese Anime & Manga</option>
                                    <option className="option-style" value="Entertainment: Cartoons & Animations">Entertainment: Cartoons & Animations</option>
                                </select>
                            </div>
                        </div>
                        <div className='selectionMenu-difficulty'>
                            <div className='selectionMenu-difficulty-buttons'>
                                <select className="select-style" onChange={props.onClickDifficulty} name="difficulty" id="difficulty">
                                    <option selected disabled >Select Difficulty</option>
                                    <option className="option-style" value="easy">Easy</option>
                                    <option className="option-style" value="medium">Medium</option>
                                    <option className="option-style" value="hard">Hard</option>
                                </select>
                            </div>
                        </div>
                        <div className="selectionMenu-confirm-btn-div">
                            <button className='selectionMenu-confirm-btn' onClick={props.startGameUI}>Confirm</button>
                        </div>
                        <div className="selectionMenu-default-text-div">
                            <p className="selectionMenu-default-text"><mark>If no options are selected , a random five question will be displayed !</mark></p>
                        </div>
                    </div>
            }
        </div>
    )

}