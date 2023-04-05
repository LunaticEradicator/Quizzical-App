export default function Menu(props) {
    return (
        <div className="intro">
            <div className="intro-heading">
                <h1>Quizzical</h1>
                <p className="intro-paragraph">World of Quiz</p>
            </div>

            {
                !props.isGameOn
                    ?
                    <div className="intro-button-div">
                        <button onClick={props.selectionScreenUI} className="intro-button">Start Quiz</button>

                    </div>
                    :
                    <div className='selectionMenu'>
                        <div className='selectionMenu-numberOfQuestion'>
                            {/* <h2>Select Difficulty</h2> */}
                            <div className='selectionMenu-numberOfQuestion-buttons'>
                                <select onClick={props.onClickNumberOfQuestion} name="numberOfQuestion" id="numberOfQuestion">
                                    <option selected >Number of question</option>
                                    <option value="four">4</option>
                                    <option value="five">5</option>
                                    <option value="six">6</option>
                                    <option value="seven">7</option>
                                    <option value="eight">8</option>
                                    <option value="nine">9</option>
                                    <option value="ten">10</option>
                                </select>
                            </div>
                        </div>
                        <div className='selectionMenu-categories'>
                            {/* <h2>Select Categories</h2> */}
                            <div className="selectionMenu-categories-buttons">
                                <select onClick={props.onClickCategories} name="categories" id="categories">
                                    <option selected >Select Categories</option>
                                    <option value="General Knowledge">General Knowledge</option>
                                    <option value="Entertainment:Books">Entertainment:Books</option>
                                    <option value="Entertainment:Film">Entertainment:Film</option>
                                    <option value="Entertainment:Music">Entertainment:Music</option>
                                    <option value="Entertainment:Musicals & Theatres">Entertainment:Musicals & Theatres</option>
                                    <option value="Entertainment:Television">Entertainment:Television</option>
                                    <option value="Entertainment:Video Game">Entertainment:Video Game</option>
                                    <option value="Entertainment:Board Game">Entertainment:Board Game</option>
                                    <option value="Science & Nature">Science & Nature</option>
                                    <option value="Science: Computers">Science: Computers</option>
                                    <option value="Science: Mathematics">Science: Mathematics</option>
                                    <option value="Mythology">Mythology</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Geography">Geography</option>
                                    <option value="History">History</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Art">Art</option>
                                    <option value="Celebrities">Celebrities</option>
                                    <option value="Animals">Animals</option>
                                    <option value="Vehicles">Vehicles</option>
                                    <option value="Entertainment: Comics">Entertainment: Comics</option>
                                    <option value="Science: Gadgets">Science: Gadgets</option>
                                    <option value="Entertainment: Japanese Anime & Manga">Entertainment: Japanese Anime & Manga</option>
                                    <option value="Entertainment: Cartoons & Animations">Entertainment: Cartoons & Animations</option>
                                </select>
                            </div>
                        </div>
                        <div className='selectionMenu-difficulty'>
                            <div className='selectionMenu-difficulty-buttons'>
                                <select onClick={props.onClickDifficulty} name="difficulty" id="difficulty">
                                    <option selected >Select Difficulty</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                        </div>
                        <div className="selectionMenu-confirm-btn-div">
                            <button className='selectionMenu-confirm-btn' onClick={props.startGameUI}>Confirm</button>
                        </div>
                        <div className="selectionMenu-default-text-div">
                            <p className="selectionMenu-default-text">If no options are selected , random five question will be displayed</p>
                        </div>
                    </div>
            }
        </div>
    )

}