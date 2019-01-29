import { FETCH_BOARD, FETCH_BOARDS } from '../actions/types';
import _ from 'lodash';  

const boardReducer =  (state={}, action) => {
  switch (action.type){
    case FETCH_BOARD:
      return {...state, [action.payload._id]: action.payload}; 
    case FETCH_BOARDS: 
      return {...state, ..._.mapKeys(action.payload, "_id")}
    default: 
      return state; 
  }
}

export default boardReducer; 