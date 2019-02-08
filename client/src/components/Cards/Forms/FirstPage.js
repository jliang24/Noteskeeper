import React from 'react'; 
import {reduxForm} from 'redux-form'; 

const FirstPage = (props) => {
  return (
    <div onClick={props.onSubmit} className="card border-dark mb-3 createcard w-100" style={{height:'100px'}}>
      <h5 style={{ marginTop:'35px'}} className="card-title" align="center">Create a card!</h5>
    </div>
  )
}

export default reduxForm({
  form: 'card'
})(FirstPage); 