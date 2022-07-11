import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Deck() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


  const [homeTeamCount,setHomeTeamCount] = useState(0)
  const [opponentTeamCount,setopponentTeamCount] = useState(0)
  const [homeDeckState, setHomeDeckStae] = useState([])
  const [opponentState, setopponentStae] = useState([])
  console.log("state",homeDeckState,opponentState)

  var homeDeck = []
  var opponentDeck = []
  var cardSuit = ["Spades", "Clubs", "Hearts", "Diamonds"]
  var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  var count = 0
  var newHomeDeck = []
  var newOpponentDeck = []

  const shuffle = () => {

    // for (let i = 0; i < cardSuit.length; i++) {
    //   for (let j = 0; j < cards.length; j++) {
    //     if (count === 52) return homeDeck && opponentDeck
    //     count += 1
    //     if (homeDeck.length === 26 && opponentDeck.length === 26) {
    //       return homeDeck && opponentDeck
    //     }
    //     const assignCard = Math.random()
    //     if (assignCard < .5) {
    //       if (homeDeck.length < 26) {
    //         homeDeck.push([cards[j], " of ", cardSuit[i]])
    //       } else opponentDeck.push([cards[j], " of ", cardSuit[i]])

    //     }
    //     if (assignCard >= .5) {
    //       if (opponentDeck.length < 26) {
    //         opponentDeck.push([cards[j], " of ", cardSuit[i]])
    //       } else homeDeck.push([cards[j], " of ", cardSuit[i]])
    //     }

    //   }
    // }
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
    console.log(homeDeck,opponentDeck)
  }

  const playButton = () => {
    setHomeTeamCount(26)
    setopponentTeamCount(26)
    shuffle()
    // console.log(homeDeck,opponentDeck)


  }
  // for (let i = 0; i < 100; i++) {
  //   if (homeDeck.length === 52) console.log("Home Team Wins")
  //   if (opponentDeck.length === 52) console.log("Opponent Wins")

  //   if (homeDeck[0] > opponentDeck[0]) {
  //    const winner = [homeDeck[0][0],opponentDeck[0][0]]
  //    homeDeck.splice(0,1)
  //    homeDeck.concat(winner)
  //   }
  //   console.log(homeDeck)


  // }


  const startGame = () => {
console.log("start game",homeDeck,opponentDeck)
      // while(homeTeamCount <= 52 || opponentTeamCount <=52) {

        // const homeCard = homeDeck.shift()
        // const opponentCard = opponentDeck.shift()
        if (homeDeckState[0][0] > opponentState[0][0]) {

          setHomeTeamCount(homeTeamCount + 2)
          setopponentTeamCount(opponentTeamCount - 2)
        } else {

          setHomeTeamCount(homeTeamCount - 2)
          setopponentTeamCount(opponentTeamCount + 2)
        }




      // }

  }





  return (
    <>
      {/* HomePlayer: {homeDeck}
      Oppenent: {opponentDeck} */}
      <button onClick={() => playButton()}>New Game</button>
      <button onClick={() => startGame()}>Start</button>
      <p>Home Team</p>{homeTeamCount}
      <p>Opponent</p>{opponentTeamCount}

    </>
  )
}


export default Deck;
