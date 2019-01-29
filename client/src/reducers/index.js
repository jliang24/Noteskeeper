import { combineReducers } from 'redux';  
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form' 
import boardReducer from './boardReducer'; 
import cardReducer from './cardReducer'; 


export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  board: boardReducer,
  cards: cardReducer
})