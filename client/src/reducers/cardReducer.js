import { 
  FETCH_CARDS, 
  CREATE_CARD, 
  CLEAR_CARDS,
  UPDATE_CARD,
  ADD_FIELD,
  ADD_ITEM,
  DELETE_CARD,
  DRAG_CARD
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
      return {...state, [action.payload._id]: action.payload }; 
    case DRAG_CARD: 
      return {...state, [action.payload.cardId]: {...state[action.payload.cardId], item:action.payload.items}}
    case DELETE_CARD: 
      return _.omit(state, action.payload.id)
    case ADD_FIELD: 
      return {...state, [action.payload._id]: action.payload}; 
    case ADD_ITEM:
      return {}
    default: 
      return state; 
  }
}