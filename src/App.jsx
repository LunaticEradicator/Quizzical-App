import { useState, useEffect } from 'react'
import Menu from './Pages/Menu'
import Game from './Pages/Game';


function App() {
  const [apiCall, setApiCall] = useState('');
  const [isGameOn, SetIsGameOn] = useState(false);


  function changeScreen() {
    SetIsGameOn(prevIsGameOn => !prevIsGameOn)
  }

  function randomNumber() {
    const rand = Math.floor(Math.random() * 5)
    console.log(rand)
    return rand;
  }

  useEffect(() => {
    async function fetchAPI() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await res.json();
      // console.log(data.results)
      setApiCall(data.results[randomNumber()])
      // setApiCall(data.results)
    }
    fetchAPI()
  }, [])

  // console.log(apiCall);
  console.log(typeof ([apiCall]));

  // const sike = apiCall.map(item => {
  //   return (<Game
  //     {...item}
  //   // question={item.question}
  //   />
  //   )
  // })

  const sike =
    <Game
      {...apiCall}
    // question={apiCall.question}
    />


  return (
    <div className="App">
      {isGameOn === false && <Menu onClick={() => changeScreen()} />}
      {isGameOn === true && sike}
    </div>
  )
}

export default App
