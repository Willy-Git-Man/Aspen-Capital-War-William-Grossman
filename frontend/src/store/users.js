import { csrfFetch } from './csrf';

const UPDATE_WINS = "albums/UPDATE_WINS";


const updateWin = (userToUpdate) => {
  return {
    type: UPDATE_WINS,
    payload: userToUpdate
  };
};

export const updateWinsThunk = (userToUpdate) => async (dispatch) => {
  const updatedWinsResponse = await csrfFetch(
    `http://localhost:5000/api/users/1`,
    {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userToUpdate),
    }
  );
  if (updatedWinsResponse.ok) {
    const updatedUserRequest = await updatedWinsResponse.json();
    dispatch(updateWin(updatedUserRequest));
    return updatedUserRequest;
  }
};

const initialState = { users: {} };

const userReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_WINS:
      newState = { ...state, users: { ...state.users } };
      newState.users[action.payload.id] = { ...action.payload };
      return newState;

    default:
      return state;
  }
};



export default userReducer;
