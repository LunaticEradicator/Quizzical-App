import { useState, useEffect } from 'react'
import Menu from './Pages/Menu'
import Game from './Pages/Game';
import { nanoid } from 'nanoid'


function App() {
  const [apiCall, setApiCall] = useState([]);
  const [isGameOn, SetIsGameOn] = useState(false);

  useEffect(() => {
    async function fetchAPI() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await res.json();
      // setApiCall(data.results[randomNumber()])
      setApiCall(data.results)
    }
    fetchAPI()
  }, [])


  function changeScreen() {
    SetIsGameOn(prevIsGameOn => !prevIsGameOn)
  }
  console.log(apiCall)

  const sike = apiCall.map(item => {
    return (
      <Game
        key={nanoid()}
        {...item}
      />
    )
  })


  return (
    <div className="App">
      {isGameOn === false && <Menu onClick={() => changeScreen()} />}
      {isGameOn === true && sike}
    </div>
  )
}

export default App



  // function randomNumber() {
  //   const rand = Math.floor(Math.random() * 5)
  //   console.log(rand)
  //   return rand;
  // }
