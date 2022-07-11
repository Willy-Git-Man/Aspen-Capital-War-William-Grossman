import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Deck() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


  const [homeTeamCount, setHomeTeamCount] = useState(0)
  const [opponentTeamCount, setopponentTeamCount] = useState(0)
  const [homeDeckState, setHomeDeckStae] = useState([])
  const [opponentState, setopponentStae] = useState([])
  const [winner, setWinner] = useState("Playing")
  const [currentCards, setCurrentCards] = useState()

  var homeDeck = []
  var opponentDeck = []
  var cardSuit = ["Spades", "Clubs", "Hearts", "Diamonds"]
  var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  var count = 0
  var newHomeDeck = []
  var newOpponentDeck = []

  const newGame = () => {
    setHomeDeckStae([])
    setopponentStae([])
    setHomeTeamCount(0)
    setopponentTeamCount(0)
    setCurrentCards()
  }

  const shuffle = () => {

    for (let i = 0; i < cardSuit.length; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (count === 52) return homeDeck && opponentDeck
        count += 1
        if (homeDeckState.length === 26 && opponentState.length === 26) {
          return homeDeckState && opponentState
        }
        const assignCard = Math.random()
        if (assignCard < .5) {
          if (homeDeckState.length < 26) {
            homeDeckState.push([cards[j], " of ", cardSuit[i]])
          } else opponentState.push([cards[j], " of ", cardSuit[i]])

        }
        if (assignCard >= .5) {
          if (opponentState.length < 26) {
            opponentState.push([cards[j], " of ", cardSuit[i]])
          } else homeDeckState.push([cards[j], " of ", cardSuit[i]])
        }

      }
    }
  }
  const playButton = () => {
    setHomeTeamCount(26)
    setopponentTeamCount(26)
    shuffle()
  }



  const startGame = () => {
    const homeCard = homeDeckState.shift()

    const opponentCard = opponentState.shift()

    setCurrentCards([homeCard, opponentCard])

//const handleWin
//concat of string to caqrd type
    if (homeTeamCount === 52) {
      setWinner("HomeTeam Wins!")
    }

    if (opponentTeamCount === 52) setWinner("opponent Wins!")

    if (homeCard[0] > opponentCard[0]) {
      homeDeckState.push(homeCard)
      homeDeckState.push(opponentCard)
//
    } else {
      opponentState.push(homeDeckState[0])
      opponentState.push(opponentState[0])

    }
  }

  const simulateEntireGame = () => {
    while(homeDeckState.length <= 52 || opponentState.length <= 52) {
      const homeCard = homeDeckState.shift()

      const opponentCard = opponentState.shift()

      setCurrentCards([homeCard, opponentCard])

  //const handleWin
  //concat of string to caqrd type
      if (homeTeamCount === 52) {
        setWinner("HomeTeam Wins!")
      }

      if (opponentTeamCount === 52) setWinner("opponent Wins!")

      if (homeCard[0] > opponentCard[0]) {
        homeDeckState.push(homeCard)
        homeDeckState.push(opponentCard)
  //
      } else {
        opponentState.push(homeDeckState[0])
        opponentState.push(opponentState[0])

      }
    }
  }

  return (
    <>


      <button onClick={() => newGame()}>Reset</button>
      <button onClick={() => playButton()}>Shuffle</button>
      <button onClick={() => startGame()}>Next Hand</button>
      <button onClick={() => simulateEntireGame()}>Next simulation</button>


      <p>Home Team</p>{homeDeckState.length}
      <p>Opponent</p>{opponentState.length}

      <h1>{currentCards}</h1>

      <h1>{winner}</h1>

    </>
  )
}


export default Deck;

/*
    for (let i = 0; i < cardSuit.length; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (count === 52) return homeDeck && opponentDeck
        count += 1
        if (homeDeck.length === 26 && opponentDeck.length === 26) {
          return homeDeck && opponentDeck
        }
        const assignCard = Math.random()
        if (assignCard < .5) {
          if (homeDeck.length < 26) {
            homeDeck.push([cards[j], " of ", cardSuit[i]])
          } else opponentDeck.push([cards[j], " of ", cardSuit[i]])

        }
        if (assignCard >= .5) {
          if (opponentDeck.length < 26) {
            opponentDeck.push([cards[j], " of ", cardSuit[i]])
          } else homeDeck.push([cards[j], " of ", cardSuit[i]])
        }

      }
    }
    */
