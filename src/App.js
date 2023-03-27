import { useEffect, useState } from 'react';
import Card from './components/Cards.js';
import one from './components/icons/one.png';
import two from './components/icons/two.png';
import three from './components/icons/three.png';
import four from './components/icons/four.png';
import five from './components/icons/five.png';
import six from './components/icons/six.png';
import './App.css';

const cardData = [{img: one, state:false},
  {img: two, state:false},
  {img: three, state:false},
  {img: four, state:false},
  {img: five, state:false},
  {img: six, state:false}
]
function App() {
  
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  //Two variables that store user's choices
  const [choice1, setChoice1] = useState(null)
  const [choice2, setChoice2] = useState(null)

  const shuffle = () => {
    const mixedCards = [...cardData, ...cardData].sort(() => Math.random()-0.5)
    .map((card) => ({ ...card, id: Math.random()}))
    setChoice1(null)
    setChoice2(null)
    setCards(mixedCards)
    setTurns(0)
  }
  const [disabled, setDisabled] = useState(false)
  
  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card)
  }
  // check if the game is completed
  const checkClear = () => {
    let clear = true;
    for(const card of cards) {
      if(card.state === false) {
        clear = false;
        return;
      }
    }
    return clear;
  }

//Compare two selected cards
  useEffect(() => {
    if (choice1 && choice2) {
      setDisabled(true)
      if(choice1.img === choice2.img) {
        setCards(prev => {
          return prev.map(card => {
            if(card.img === choice1.img) {
              return {...card, state: true}
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {
        setTimeout(() => {
          resetTurn()
        }, 1000);
      }
    }
  }, [choice1, choice2])

  const resetTurn = ()  => {
    setChoice1(null)
    setChoice2(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffle()
  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffle}>New Game</button>
      <p>Counts: {turns}</p>
      <div className="grid"> 
      {cards.map(card => (
          <Card key={card.id} card={card} handleChoice={handleChoice} checkClear={checkClear}
          flipped={card === choice1 || card === choice2 || card.state}
          disabled={disabled}/>
        ))}
    </div>
    <a href="https://www.flaticon.com/free-icons/number" title="number icons">Number icons created by smalllikeart - Flaticon</a>
  </div>
  );

}

export default App;

