import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Deck() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


    var cardSuit = ["Spades", "Clubs", "Hearts", "Diamonds"]
    var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    var homeDeck = []
    var opponentDeck = []
    var count = 0
    var newHomeDeck = []
    var newOpponentDeck = []

    const shuffle = () => {

  for (let i = 0; i < cardSuit.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      if (count === 52) return homeDeck && opponentDeck
      count += 1
      if (homeDeck.length === 26 && opponentDeck.length === 26) {
        return homeDeck && opponentDeck
      }
      const assignCard = Math.random()
      if (assignCard < .5) {
        if (homeDeck.length < 26 ) {
          homeDeck.push([cards[j], " of ",cardSuit[i]])
        } else opponentDeck.push([cards[j]," of ", cardSuit[i]])

      }
      if (assignCard >= .5) {
        if (opponentDeck.length < 26) {
          opponentDeck.push([cards[j], " of ", cardSuit[i]])
        } else homeDeck.push([cards[j], " of ",cardSuit[i]])
      }

}
  }
}

const playButton = () => {
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
  console.log(homeDeck,opponentDeck)

}

  return (
    <>
      {/* HomePlayer: {homeDeck}
      Oppenent: {opponentDeck} */}
      <button onClick={() => playButton()}>New Game</button>
      <p>Home Team</p>
      <p>Opponent</p>
      <button onClick={() => startGame()}>Start</button>

    </>
  )
}


export default Deck;
