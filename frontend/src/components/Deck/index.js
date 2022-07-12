import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Deck() {

  const [homeDeckState, setHomeDeckState] = useState([])
  const [opponentState, setOpponentDeckState] = useState([])


  const [winner, setWinner] = useState("Ready")
  const [currentCards, setCurrentCards] = useState()
  const [newHomeDeck, setNewHomeDeck] = useState([])
  const [newOpponentDeck, setNewOpponentDeck] = useState([])
  const [playing, setPlaying] = useState(false)


  var homeDeck = []
  var opponentDeck = []
  var cardSuit = ["Spades", "Clubs", "Hearts", "Diamonds"]
  var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  var count = 0

  const newGame = () => {
    setHomeDeckState([])
    setOpponentDeckState([])
    setNewHomeDeck([])
    setNewOpponentDeck([])
    setCurrentCards()
    setPlaying(false)
  }

  const shuffle = (deck1,deck2) => {
    if (!deck1) deck1=homeDeckState
    if (!deck2) deck2=opponentState

    for (let i = 0; i < cardSuit.length; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (count === 52) return homeDeck && opponentDeck
        count += 1
        if (deck1.length === 26 && deck2.length === 26) {
          return deck1 && deck2
        }
        const assignCard = Math.random()
        if (assignCard < .5) {
          if (deck1.length < 26) {
            deck1.push([cards[j], " of ", cardSuit[i]])
          } else deck2.push([cards[j], " of ", cardSuit[i]])

        }
        if (assignCard >= .5) {
          if (deck2.length < 26) {
            deck2.push([cards[j], " of ", cardSuit[i]])
          } else deck1.push([cards[j], " of ", cardSuit[i]])
        }

      }
    }

    const temp1 = []
    const temp2 = []
    for (let i = 0; i < deck1.length; i++) {
      if (i % 2 === 0) {
        temp1.push(deck1[i])
        temp2.push(deck2[i])
      } else {
        temp1.unshift(deck1[i])
        temp2.unshift(deck2[i])
      }
    }
    // deck1=temp1
    // deck2 = temp2
    setHomeDeckState(temp1)
    setOpponentDeckState(temp2)
  }


  const playButton = () => {
    setWinner("Shuffled")
    setPlaying(true)
    shuffle()
  }


      //const handleWin
      //concat of string to caqrd type
// console.log(homeDeckState[0][0])

const logic = () => {
  if (homeDeckState.length >= 1) {
    if (homeDeckState[0][0] > opponentState[0][0]) {
      const bothCards = homeDeckState.splice(0,1).concat(opponentState.splice(0,1))
      setNewHomeDeck(newHomeDeck.concat(bothCards))

    }
  } else {
    setHomeDeckState(newHomeDeck)
    setNewHomeDeck([])
  }

  if (opponentState.length >= 1) {
    if (opponentState[0][0] > homeDeckState[0][0]) {
      const bothCards = homeDeckState.splice(0,1).concat(opponentState.splice(0,1))
      setNewHomeDeck(newHomeDeck.concat(bothCards))

    }
  } else {
    setOpponentDeckState(newOpponentDeck.concat(newOpponentDeck))
    setNewOpponentDeck([])
  }
}
  const gameLogic = () => {
    if (homeDeckState.length === 3) {
      setHomeDeckState(homeDeckState.concat(newHomeDeck))
      setNewHomeDeck([])
      return
    }
    if (opponentState.length === 3) {
      setOpponentDeckState(opponentState.concat(newOpponentDeck))
      setNewOpponentDeck([])
      return
    }

    if (homeDeckState[0][0] > opponentState[0][0]) {
      const bothCards = homeDeckState.splice(0,1).concat(opponentState.splice(0,1))
      setNewHomeDeck(newHomeDeck.concat(bothCards))

    } else if (homeDeckState[0][0] < opponentState[0][0]) {
      const bothCards = homeDeckState.splice(0,1).concat(opponentState.splice(0,1))
      setNewOpponentDeck(newOpponentDeck.concat(bothCards))
    }
    else if (homeDeckState[0][0] === opponentState[0][0] && homeDeckState.length >=3 && opponentDeck.length >= 3) {
      const homeCard = homeDeckState[2][0]
      const opponentCard = opponentState[2][0]

    const sixCards = (homeDeckState.splice(0,3).concat(opponentState.splice(0,3)))
    console.log(sixCards,homeCard,opponentCard)
    if (homeCard > opponentCard) {
      setNewHomeDeck(newHomeDeck.concat(sixCards))
    } else if (homeCard < opponentCard) {
      setNewOpponentDeck(newOpponentDeck.concat(sixCards))
    } else if (homeCard === opponentCard) {
      setNewHomeDeck(newHomeDeck.concat(sixCards.splice(2,3)))
      setNewOpponentDeck(newOpponentDeck.concat(sixCards))
      setWinner("Stand-Off cards split")
    }
      } else if (homeDeckState[0][0] === opponentState[0][0] && homeDeckState.length < 3 && opponentDeck.length < 3) {
        if (homeDeckState.length >= opponentState.length) {
          setHomeDeckState(homeDeckState.concat(opponentState))
          setOpponentDeckState([])
          setWinner('Home Team Wins')
        } else if (homeDeckState.length < opponentState.length) {
          setOpponentDeckState(opponentState.concat(homeDeckState))
          setHomeDeckState([])
          setWinner("Opponent Wins")
        }
      }
  }

  const startGame = () => {
    if (homeDeckState.length === 1) {
      setHomeDeckState(homeDeckState.concat(newHomeDeck.reverse()) )
      setNewHomeDeck([])

    }
    if (opponentState.length === 1) {
      setOpponentDeckState(opponentState.concat(newOpponentDeck.reverse()) )
      setNewOpponentDeck([])
    }

    // const topHomeCard = homeDeckState[0]
    // const topOpponentCard = opponentState[0]

    const topHomeCard = homeDeckState.shift()
    const topOpponentCard = opponentState.shift()

    // const homeCard = homeDeckState.shift()

    // const opponentCard = opponentState.shift()

    setCurrentCards([topHomeCard, "  vs  ", topOpponentCard])

    if (topHomeCard[0] > topOpponentCard[0]) {
      newHomeDeck.push(topHomeCard,topOpponentCard)

      // setNewHomeDeck(newHomeDeck.concat(homeDeck))

    } else if (topHomeCard[0] < topOpponentCard[0]) {
      newOpponentDeck.push(topHomeCard,topOpponentCard)
      // setNewOpponentDeck(newOpponentDeck.concat(opponentDeck))



    }
    //  else if (topHomeCard[0] === topOpponentCard[0]) {
    //   console.log(homeDeckState, opponentState)
    //   newHomeDeck.push(topHomeCard,topOpponentCard)
    // }
    else if (homeDeckState[0][0] === opponentState[0][0]) {
      const homeCard = homeDeckState[2][0]
      const opponentCard = opponentState[2][0]

    const sixCards = (homeDeckState.splice(0,3).concat(opponentState.splice(0,3)))
    console.log(sixCards,homeCard,opponentCard)
    if (homeCard > opponentCard) {
      setNewHomeDeck(newHomeDeck.concat(sixCards))
    } else if (homeCard < opponentCard) {
      setNewOpponentDeck(newOpponentDeck.concat(sixCards))
    } else if (homeCard === opponentCard) {
      setNewHomeDeck(newHomeDeck.concat(sixCards.splice(2,3)))
      setNewOpponentDeck(newOpponentDeck.concat(sixCards))
      setWinner("Stand-Off cards split")
    }
      }


  }

  const simulation = () => {
    let idz = 0
    while (idz < 3000) {
      startGame()
      idz++
    }
  }

  const simulateEntireGame = () => {
    while (homeDeckState.length > 0 || opponentState.length > 0) {
      console.log(homeDeckState)
      if (homeDeckState.length === 0) setWinner("Opponent Wins!")
      if (opponentState.length === 0) setWinner("HomeTeam Wins!")

      const tempHomeCard = homeDeckState[0]
      const tempOpponentCard = opponentState[0]

      const homeCard = homeDeckState.shift()

      const opponentCard = opponentState.shift()

      setCurrentCards([tempHomeCard, tempOpponentCard])

      //const handleWin
      //concat of string to caqrd type

      if (homeCard[0] > opponentCard[0]) {
        homeDeckState.push(tempHomeCard)
        homeDeckState.push(tempOpponentCard)

        //
      } else if (homeCard[0] < opponentCard[0]) {
        opponentState.push(tempHomeCard)
        opponentState.push(tempOpponentCard)

      } else {
        return
      }
    }
  }

  return (
    <>

      {!playing && (

        <button onClick={() => playButton()}>Shuffle</button>
      )}
      {playing && (
        <>

          <button onClick={() => newGame()}>Reset</button>
          <button onClick={() => startGame()}>Next Hand</button>
          <button onClick={() => gameLogic()}>game logic</button>

          {/* <button onClick={() => simulateEntireGame()}>Next simulation</button> */}
          {/* <button onClick={() => simulation()}>Next simulation</button> */}

        </>
      )}


        <>
      <p>Home Team</p>{homeDeckState.length}
      <p>Winning Pile</p>{newHomeDeck.length}
        </>
        <>
      <p>Opponent</p>{opponentState.length}
      <p>Winning Pile</p>{newOpponentDeck.length}
        </>


      <h1>{currentCards}</h1>

      <h1>{winner}</h1>

    </>
  )
}


export default Deck;
