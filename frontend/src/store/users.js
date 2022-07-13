import { csrfFetch } from './csrf';

const UPDATE_WINS = "albums/UPDATE_WINS";
const GET_ALL_USERS = "songs/GET_ALL_USERS";

const updateWin = (userToUpdate) => {
  return {
    type: UPDATE_WINS,
    payload: userToUpdate
  };
};
const getAllUsers = (allUsers) => ({
  type: GET_ALL_USERS,
  payload: allUsers,
});

export const getAllUsersThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/users");

  if (response.ok) {
    const users = await response.json();
    dispatch(getAllUsers(users));
  }
  return response;
};

export const updateWinsThunk = (userToUpdate) => async (dispatch) => {
  console.log(userToUpdate)
  const updatedWinsResponse = await csrfFetch(
    `/api/users/${userToUpdate.id}`,

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
    case GET_ALL_USERS:
      newState = {...state, users: {}}
      action.payload.forEach((user) => newState.users[user.id] = user)
      return newState;
    case UPDATE_WINS:
      newState = { ...state, users: { ...state.users } };
      newState.users[action.payload.id] = { ...action.payload };
      return newState;

    default:
      return state;
  }
};



export default userReducer;
