import { 
  FETCH_CARDS, 
  CREATE_CARD, 
  CLEAR_CARDS,
  UPDATE_CARD,
  ADD_FIELD
} from '../actions/types'; 
import _ from 'lodash'; 

export default (state={}, action) => {
  switch (action.type){
    case FETCH_CARDS: 
      return {...state, ..._.mapKeys(action.payload, "_id")}; 
    case CREATE_CARD: 
      return {...state, [action.payload._id]: action.payload}; 
    case CLEAR_CARDS: 
      return {}; 
    case UPDATE_CARD: 
      return {...state, [action.payload._id]: action.payload}; 
    case ADD_FIELD: 
      return {...state, [action.payload._id]: action.payload}; 
    default: 
      return state; 
  }
}