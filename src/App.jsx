import { useState, useEffect } from 'react'
import Menu from './Pages/Menu'
import Game from './Pages/Game';
import { nanoid } from 'nanoid'


function App() {
  const [apiCall, setApiCall] = useState([]);
  const [isGameOn, setIsGameOn] = useState(false);
  const [holdOption, setHoldOption] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await res.json();
      // setApiCall(data.results[randomNumber()])
      console.log('API CALLING')
      setApiCall(data.results)
    }
    fetchAPI()
  }, [])


  function changeScreen() {
    setIsGameOn(prevIsGameOn => !prevIsGameOn)
  }
  console.log(holdOption)

  function HandleHoldOption() {
    setHoldOption(prevHoldOption => {
      return (!prevHoldOption)
    })
  }

  // function HandleHoldOption(id) {
  //   console.log(id)
  // }


  console.log(apiCall)

  const game = apiCall.map(item => {
    return (
      <Game
        key={nanoid()}
        holdOption={holdOption}
        id={nanoid()}
        handleHoldOption={() => HandleHoldOption()}
        {...item}
      />
    )
  })


  return (
    <div className="App">
      {isGameOn === false && <Menu onClick={() => changeScreen()} />}
      {isGameOn === true && game}
      {isGameOn === true && game}
    </div>
  )
}

export default App


