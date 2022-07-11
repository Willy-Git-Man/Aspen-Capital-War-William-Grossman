import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Deck() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const spades = [,2,3,4,5,6,7,8,9,10,11,12,13,14]
  const clubs = [,2,3,4,5,6,7,8,9,10,11,12,13,14]
  const hearts = [,2,3,4,5,6,7,8,9,10,11,12,13,14]
  const diamonds = [,2,3,4,5,6,7,8,9,10,11,12,13,14]

  const fullDeck = [...spades,...clubs,...hearts,...diamonds]
console.log(fullDeck)
  // const shuffle =


  return (
    <>
    <p>Deck</p>
    </>
  )
}


export default Deck;
