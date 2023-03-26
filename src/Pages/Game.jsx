import { useEffect } from 'react';

export default function Game(props) {
    // console.log(props.on)
    const incorrect = props.incorrect_answers;
    const correct = props.correct_answer;

    let options = [...incorrect, correct];

    function styles(onValue) {
        const style = { backgroundColor: onValue ? 'green' : '' }
        return style
    }

    // const stylesOne = {
    //     backgroundColor: props.onOne ? 'green' : ''
    // }
    // const stylesTwo = {
    //     backgroundColor: props.onTwo ? 'green' : ''
    // }
    // const stylesThree = {
    //     backgroundColor: props.onThree ? 'green' : ''
    // }
    // const stylesFour = {
    //     backgroundColor: props.onFour ? 'green' : ''
    // }

    useEffect(() => {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
    }, [])

    return (
        <div className="game">
            {/* <h2>Select Your Answers</h2> */}
            <div className="gameQuestion">
                <h3>{props.question}</h3>
                <ul>
                    <li style={styles(props.isOnOne)} onClick={() => props.toggle(props.idOne)} className="game-option">{options[0]}</li>
                    <li style={styles(props.isOnTwo)} onClick={() => props.toggle(props.idTwo)} className="game-option">{options[1]}</li>
                    <li style={styles(props.isOnThree)} onClick={() => props.toggle(props.idThree)} className="game-option">{options[2]}</li>
                    <li style={styles(props.isOnFour)} onClick={() => props.toggle(props.idFour)} className="game-option">{options[3]}</li>
                </ul>
            </div>
        </div>
    )
}

