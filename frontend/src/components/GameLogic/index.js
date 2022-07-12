import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
function GameLogic() {
  const [playing, setPlaying] = useState(false)
  const [homeDeckState, setHomeDeckState] = useState([])
  const [opponentDeckState, setOpponentDeckState] = useState([])
  const [homeWinngPile, setHomeWinningPile] = useState([])
  const [opponentWinningPile, setOpponentWinningPile] = useState([])
  const [currentHomeCard, setCurrentHomeCard] = useState()
  const [currentOpponentCard, setCurrentOpponentCard] = useState()



  const [message, setMessage] = useState("Ready")


  console.log(playing)

  const newGame = () => {
    setPlaying(false)
    setHomeDeckState([])
    setOpponentDeckState([])
    setCurrentHomeCard()
    setCurrentOpponentCard()
    setHomeWinningPile([])
    setOpponentWinningPile([])
  }

  const initialShuffle = () => {
    const cardSuit = ["♤", "♧", "♡", "♢"]
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {

        const random = Math.random()
        if (random < .5) {
          if (homeDeckState.length < 26) {
            // setHomeDeckState(homeDeckState.concat([cards[j], cardSuit[i]]))
            homeDeckState.push([cards[j], cardSuit[i]])
          } else opponentDeckState.push([cards[j], cardSuit[i]])

        } else {
          if (opponentDeckState.length < 26) {
            opponentDeckState.push([cards[j], cardSuit[i]])

          } else homeDeckState.push([cards[j], cardSuit[i]])
        }
      }
    }
    const temp1 = []
    const temp2 = []
    for (let i = 0; i < homeDeckState.length; i++) {
      if (i % 2 === 0) {
        temp1.push(homeDeckState[i])
        temp2.push(opponentDeckState[i])
      } else {
        temp1.unshift(homeDeckState[i])
        temp2.unshift(opponentDeckState[i])
      }
    }

    setHomeDeckState(temp1)
    setOpponentDeckState(temp2)
    setPlaying(true)

  }

  const shuffleHome = (deck) => {

    console.log(opponentDeckState)

    for (let i = 0; i < deck.length; i++) {
      if (i % 2 === 0) {
        let temp = deck[i]
        deck[i] = deck[i + 1]
        deck[i + 1] = temp
      }

    }
    setHomeWinningPile(deck)
  }

  const shuffleOpponent = () => {
    const deck = []

    for (let i = 0; i < opponentDeckState.length; i++) {
      if (i % 2 === 0) {
        deck.push(opponentDeckState[i])
      } else deck.unshift(opponentDeckState[i])
    }
    setOpponentWinningPile(deck)
  }

  const nextHand = () => {
    if (opponentDeckState.length === 0 && opponentWinningPile.length === 0) console.log('winning')
    if (homeDeckState.length === 0) {
      setHomeDeckState(homeWinngPile)
      setHomeWinningPile([])
      return
    }

    if (opponentDeckState.length === 0) {
      setOpponentDeckState(opponentWinningPile.reverse())
      setOpponentWinningPile([])
      return
    }

    const homeCard = homeDeckState[0]
    const opponentCard = opponentDeckState[0]

    setCurrentHomeCard(homeCard)
    setCurrentOpponentCard(opponentCard)

    setHomeDeckState(homeDeckState.splice(1, homeDeckState.length - 1))
    setOpponentDeckState(opponentDeckState.splice(1, opponentDeckState.length - 1))


    if (homeCard[0] > opponentCard[0]) {
      setHomeWinningPile(homeWinngPile.concat([homeCard, opponentCard]))
    } else if (opponentCard[0] > homeCard[0]) {
      setOpponentWinningPile(opponentWinningPile.concat([homeCard, opponentCard]))
    } else if (homeCard[0] === opponentCard[0]) {
      setHomeWinningPile(homeWinngPile.concat([homeCard, opponentCard]))

    }

  }

  return (
    <>
      <div className="buttons">
        {!playing && (<button onClick={() => initialShuffle()}>Shuffle and Start</button>)}

        {playing && (
          <>
            <button onClick={() => newGame()}>Reset</button>
            <button onClick={() => nextHand()}>Next Hand</button>
          </>


        )}
      </div>

      <div className="playingGameDiv">
        <div className="homeSide">
          <p>Home Deck : {homeDeckState.length}</p>
          <p>Winning Pile: {homeWinngPile.length}</p>
          <h1>{currentHomeCard}</h1>
        </div>

        <div className="opponentSide">
          <p>Opponent : {opponentDeckState.length}</p>
          <p>Winning Pile : {opponentWinningPile.length}</p>
          <h1>{currentOpponentCard}</h1>

        </div>


      </div>
    </>
  )
}


export default GameLogic;
