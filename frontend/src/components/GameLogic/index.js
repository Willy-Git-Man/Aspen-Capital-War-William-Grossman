import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWinsThunk } from '../../store/users';
import './index.css'
function GameLogic() {
  const dispatch = useDispatch()
  const [playing, setPlaying] = useState(false)
  const [homeDeckState, setHomeDeckState] = useState([])
  const [opponentDeckState, setOpponentDeckState] = useState([])
  const [currentHomeCard, setCurrentHomeCard] = useState()
  const [currentOpponentCard, setCurrentOpponentCard] = useState()
  const [message, setMessage] = useState("Ready")

  const sessionUser = useSelector((state) => state.session.user)
  // useEffect(() => {
  //   async function fetchData() {
  //     const userResponse = await fetch("http://localhost:5000/api/users/");
  //     const userResponseData = await userResponse.json();
  //   }
  //   fetchData();
  // }, [dispatch]);


// const handleWinUpdate = (e) => {
//   e.preventDefault();
//   const winPayload = {
//     id:sessionUser.id,
//     username: sessionUser.userName,
//     wins: sessionUser.id + 1
//   }

//     return dispatch(updateWinsThunk(winPayload))
// };

  const handleWin = () => {

    const winPayload = {

      wins: sessionUser.id + 1
    }

    dispatch(updateWinsThunk(winPayload))
  }


  const newGame = () => {
    setPlaying(false)
    setHomeDeckState([])
    setOpponentDeckState([])
    setCurrentHomeCard()
    setCurrentOpponentCard()
  }



  const initialShuffle = () => {
    setMessage('Shuffled')
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

  const nextHand = () => {
    setMessage("Playing")
    handleWin()

    const homeCard = homeDeckState.pop()
    const opponentCard = opponentDeckState.pop()
    setCurrentHomeCard(homeCard)
    setCurrentOpponentCard(opponentCard)

    if (homeCard[0] > opponentCard[0]) homeDeckState.push(homeCard, opponentCard)
    else if (homeCard[0] < opponentCard[0]) opponentDeckState.push(homeCard, opponentCard)
    else {
      const homeDown = homeDeckState.pop()
      const homeUp = homeDeckState.pop()
      const opponentDown = opponentDeckState.pop()
      const opponentUp = opponentDeckState.pop()

      if (homeUp[0] >= opponentUp[0]) homeDeckState.push(homeCard, opponentCard, homeDown, homeUp, opponentDown, opponentUp)
      else if (homeUp[0] < opponentUp[0]) homeDeckState.push(homeCard, opponentCard, homeDown, homeUp, opponentDown, opponentUp)
      else if (homeUp[0] === opponentUp[0]) {
        const nextHome = homeDeckState.pop()
        const nextOpponent = opponentDeckState.pop()

        if (nextHome[0] > nextOpponent[0]) homeDeckState.push(homeCard, opponentCard, homeDown, homeUp, opponentDown, opponentUp, nextHome, nextOpponent)
        else opponentDeckState.push(homeCard, opponentCard, homeDown, homeUp, opponentDown, opponentUp, nextHome, nextOpponent)
      }
    }
  }

  const simulatEntireGame = () => {
    const random = Math.random()
        if (random < .5) {
          setHomeDeckState(new Array(52))
          setOpponentDeckState(new Array(0))

        } else {

          setOpponentDeckState(new Array(52))
          setHomeDeckState(new Array(0))
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
            <button onClick={() => simulatEntireGame()}>Simulate Game</button>
            {/* <button onClick={() => simulatEntireGame()}>Update</button> */}


          </>

        )}
      </div>

      <div className="playingGameDiv">
        <div className="homeSide">
          <p>Home Deck : {homeDeckState.length}</p>
          {/* <p>Winning Pile: {homeWinngPile.length}</p> */}
          <h1>{currentHomeCard}</h1>
        </div>

        <div className="opponentSide">
          <p>Opponent : {opponentDeckState.length}</p>
          {/* <p>Winning Pile : {opponentWinningPile.length}</p> */}
          <h1>{currentOpponentCard}</h1>

        </div>

      </div>
      <div>
        {message}
      </div>
    </>
  )
}


export default GameLogic;
