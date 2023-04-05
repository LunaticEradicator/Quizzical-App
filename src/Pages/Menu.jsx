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
                        <div className='selectionMenu-categories'>
                            {/* <h2>Select Categories</h2> */}
                            <div className="selectionMenu-categories-buttons">
                                <select onClick={props.onClickCategories} name="categories" id="categories">
                                    <option selected >Select Categories</option>
                                    <option value="Video Game">Video Game</option>
                                    <option value="History">History</option>
                                </select>
                                {/* <button onClick={props.onClickCategories} >Video Game</button>
                                <button onClick={props.onClickCategories}>Football</button>
                                <button onClick={props.onClickCategories}>History</button>
                                <button onClick={props.onClickCategories}>Film</button>
                                <button onClick={props.onClickCategories}>Mythology</button>
                                <button onClick={props.onClickCategories}>Sports</button> */}
                            </div>
                        </div>
                        <div className='selectionMenu-difficulty'>
                            {/* <h2>Select Difficulty</h2> */}
                            <div className='selectionMenu-difficulty-buttons'>
                                {/* <button>Easy</button>
                                <button>Medium</button>
                                <button>Hard</button> */}
                                <select onClick={props.onClickCategories} name="categories" id="categories">
                                    <option selected >Select Difficulty</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Film">Film</option>
                                    {/* <option value=""></option>
                                    <option value=""></option> */}
                                </select>
                            </div>
                        </div>
                        <div className="selectionMenu-confirm-btn-div">
                            <button className='selectionMenu-confirm-btn' onClick={props.startGameUI}>Confirm</button>
                        </div>
                    </div>
            }
        </div>
    )

}