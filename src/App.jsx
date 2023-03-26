import { useState, useEffect } from 'react'
import Menu from './Pages/Menu'
import Game from './Pages/Game';
import { nanoid } from 'nanoid'


function App() {
  const [apiCall, setApiCall] = useState([]);
  const [isGameOn, setIsGameOn] = useState(false);

  useEffect(() => {
    async function fetchAPI() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await res.json();
      // setApiCall(data.results[randomNumber()])
      // console.log(data.results)
      setApiCall(data.results)
      setApiCall(prevApiCall => prevApiCall.map(item => {
        return (
          {
            ...item,
            isOnOne: false, isOnTwo: false, isOnThree: false, isOnFour: false,
            idOne: nanoid(), idTwo: nanoid(), idThree: nanoid(), idFour: nanoid()
          }
        )
      }))
    }
    fetchAPI()
  }, [])

  console.log(apiCall)

  const game = apiCall.map(item => {
    // console.log(item.id)
    return (
      <Game
        key={nanoid()}
        // id={item.id}
        // on={true}
        // toggle={() => toggleHandle(item.id)}
        toggle={toggleHandle}
        {...item}
      />
    )
  })


  function changeScreen() {
    setIsGameOn(prevIsGameOn => !prevIsGameOn)
    console.clear()

  }


  function toggleHandle(id) {
    console.clear()
    // console.log(id)
    setApiCall(prevApiCall => prevApiCall.map(item => {
      // console.log(item.idOne)
      // For each option we assign a id and check if that item id [item.id] matches the click element id [id]
      // if so return every other value in state as before but change the isON state for the item clicked 
      // and return every other element isON as false [so only one element can be selected]
      return (
        item.idOne === id ? { ...item, isOnOne: !item.isOnOne, isOnTwo: false, isOnThree: false, isOnFour: false } : item &&
          item.idTwo === id ? { ...item, isOnOne: false, isOnTwo: !item.isOnTwo, isOnThree: false, isOnFour: false } : item &&
            item.idThree === id ? { ...item, isOnOne: false, isOnTwo: false, isOnThree: !item.isOnThree, isOnFour: false } : item &&
              item.idFour === id ? { ...item, isOnOne: false, isOnTwo: false, isOnThree: false, isOnFour: !item.isOnFour } : item
      )
    }))
  }


  return (
    <div className="App">
      {isGameOn === false && <Menu onClick={() => changeScreen()} />}
      {isGameOn === true && game}
    </div>
  )
}

export default App


