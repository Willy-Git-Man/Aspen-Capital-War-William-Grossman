import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { getAllUsersThunk, updateWinsThunk } from '../../store/users';
import './index.css'
function GameLogic() {
  const dispatch = useDispatch()
  const [playing, setPlaying] = useState(false)
  const [homeDeckState, setHomeDeckState] = useState([])
  const [opponentDeckState, setOpponentDeckState] = useState([])
  const [currentHomeCard, setCurrentHomeCard] = useState()
  const [currentOpponentCard, setCurrentOpponentCard] = useState()
  const [message, setMessage] = useState("Ready")
  const [sim, setSim] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  let count = 0
  const { id } = useParams()

  const sessionUser = useSelector((state) => state.session.user)
  const userState = useSelector((state) => state.user.users[id])
  const sessionUserWinState = useSelector((state) => state.user.users[sessionUser.id])

  useEffect(() => {
    dispatch(getAllUsersThunk())
  }, [])

  const history = useHistory()

  const handleWin = () => {
    console.log(message)

    const winPayload = {
      id: id,
      wins: userState?.wins + 1
    }

    dispatch(updateWinsThunk(winPayload))
    setGameOver(false)
    history.push('/LeaderBoard')
  }


  const newGame = () => {
    setPlaying(false)
    setHomeDeckState([])
    setOpponentDeckState([])
    setCurrentHomeCard()
    setCurrentOpponentCard()
    setMessage("Ready")
    setSim(false)
    setGameOver(false)
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
    setMessage("Shuffled")

  }

  const winner = () => {
    if (homeDeckState.length === 52 || opponentDeckState.length === 52) setMessage('test')
  }

  const nextHand = () => {
    if (opponentDeckState.length === 1) {
      setMessage('Home Team Won')
      const winPayload = {
        id: sessionUser.id,
        wins: sessionUserWinState?.wins + 1
      }

      dispatch(updateWinsThunk(winPayload))
      // return (
      //   <Redirect to="/LeaderBoard" />
      // )
      history.push('/LeaderBoard')
    }
    if (homeDeckState.length === 1) {
      setMessage('Opponent Won')
      const winPayload = {
        id: id,
        wins: userState?.wins + 1
      }

      dispatch(updateWinsThunk(winPayload))
      // return (
      //   <Redirect to="/LeaderBoard" />
      // )
      history.push('/LeaderBoard')
    }
    count += 1


    setMessage("Playing")

    const homeCard = homeDeckState.pop()
    const opponentCard = opponentDeckState.pop()
    setCurrentHomeCard(homeCard)
    setCurrentOpponentCard(opponentCard)

    if (homeCard[0] > opponentCard[0] || (count / 10 === 0)) homeDeckState.unshift(homeCard, opponentCard)
    else if (homeCard[0] < opponentCard[0]) opponentDeckState.unshift(homeCard, opponentCard)
    else {
      const homeDown = homeDeckState.pop()
      const homeUp = homeDeckState.pop()
      const opponentDown = opponentDeckState.pop()
      const opponentUp = opponentDeckState.pop()

      if (homeUp[0] >= opponentUp[0]) homeDeckState.push(homeCard, opponentCard, homeDown, homeUp, opponentDown, opponentUp)
      else if (homeUp[0] < opponentUp[0]) homeDeckState.push(homeCard, opponentCard, homeDown, homeUp, opponentDown, opponentUp)

    }
  }

  const simulatEntireGame = () => {

    const random = Math.random()
    if (random < .5) {
      setHomeDeckState(new Array(52))
      setOpponentDeckState(new Array(0))
      setMessage('Home Team Won')
      const winPayload = {
        id: sessionUser.id,
        wins: sessionUserWinState?.wins + 1
      }

      dispatch(updateWinsThunk(winPayload))
      // return (
      //   <Redirect to="/LeaderBoard" />
      // )
      history.push('/LeaderBoard')
      window.location.reload(false);
    } else {

      setOpponentDeckState(new Array(52))
      setHomeDeckState(new Array(0))
      setMessage('Opponent Won')
      const winPayload = {
        id: id,
        wins: userState?.wins + 1
      }

      dispatch(updateWinsThunk(winPayload))
      // return (
      //   <Redirect to="/LeaderBoard" />
      // )
      history.push('/LeaderBoard')
      window.location.reload(false);

    }
    setSim(true)
    setGameOver(true)
  }

  return (
    <>
      <div className="playingGameDiv">
        <div className="buttons">
          {!playing && (<button onClick={() => initialShuffle()}>Shuffle and Start</button>)}

          {playing && (
            <>
              <button onClick={() => newGame()}>Reset</button>
              {!sim && (

                <button onClick={() => nextHand()}>Next Hand</button>
              )}
              {!sim && (

                <button onClick={() => simulatEntireGame()}>Simulate Game</button>
              )}


            </>

          )}
        </div>

        <div className="homeSide">
          <h1>Home Deck : {homeDeckState.length}</h1>
          <h1>{currentHomeCard}</h1>
        </div>

        <div className="opponentSide">
          <h1>Opponent : {opponentDeckState.length}</h1>
          <h1>{currentOpponentCard}</h1>

        </div>

      </div>
      <div className="homeSide">
        {message}



      </div>
    </>
  )
}


export default GameLogic;
