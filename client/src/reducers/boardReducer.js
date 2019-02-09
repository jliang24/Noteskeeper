import { FETCH_BOARD, FETCH_BOARDS, DELETE_BOARD, DELETE_CARD } from '../actions/types';
import _ from 'lodash';  

const boardReducer =  (state={}, action) => {
  switch (action.type){
    case FETCH_BOARD:
      return {...state, [action.payload._id]: action.payload}; 
    case FETCH_BOARDS: 
      return {...state, ..._.mapKeys(action.payload, "_id")}
    case DELETE_BOARD: 
      return  _.omit(state, action.payload)
    case DELETE_CARD:
       _.pull(state[action.payload.boardId].cardOrder, action.payload.id); 
      return state; 
    default: 
      return state; 
  }
}

export default boardReducer; 