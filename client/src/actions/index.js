import { 
  FETCH_USER, 
  FETCH_BOARD,
  FETCH_CARDS,
  CREATE_CARD,
  CLEAR_CARDS,
  UPDATE_CARD,
  ADD_FIELD,
  FETCH_BOARDS
} from './types'; 
import axios from 'axios'; 

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user'); 

  dispatch({ type: FETCH_USER, payload: response.data })
}

export const fetchBoard = id => async dispatch => {
  const response = await axios.get(`/api/boards/${id}`); 

  dispatch({ type: FETCH_BOARD, payload: response.data})
}

export const fetchBoards = () => async dispatch => {
  const response = await axios.get(`/api/boards`); 

  dispatch({ type:FETCH_BOARDS, payload: response.data})
}

export const fetchCards = (boardId) => async dispatch => {
  const response = await axios.get(`/api/boards/${boardId}/cards`); 

  dispatch({type: FETCH_CARDS, payload: response.data})
}

export const createCard = (title, name, field, type, boardId) => async dispatch => {
  const response = await axios.post('/api/cards', {title, name, field, type, boardId}); 

  dispatch({type: CREATE_CARD, payload: response.data}); 
}

export const clearBoard = () => async dispatch => {
  dispatch({type: CLEAR_CARDS}); 
}

export const updateCard = (cardId, name, value, type, itemId="") => async dispatch => { 
  const response = await axios.patch(`/api/cards/${cardId}`, {cardId, name, value, type, itemId}); 
  
  dispatch({type: UPDATE_CARD, payload:response.data }); 
}

export const addField = (values) => async dispatch => {
  dispatch({
    type: ADD_FIELD, payload: values
  })
}