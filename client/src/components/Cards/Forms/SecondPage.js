import React, { Component } from 'react'; 
import {Field, reduxForm} from 'redux-form'; 
import renderField from './renderField'; 

class SecondPage extends Component {
  state= { shown: true}; 

  activateButton() {
    this.setState({shown:false})
    setTimeout(()=> {this.props.onSubmit(this.props.handleSubmit)}, 500);
  }

  render(){ 
    return (
      <div className="card border-dark mb-3 pb-0 p-3 w-100" style={{ maxWidth: '18rem'}}>
        <form onSubmit={this.props.handleSubmit}>
          <div className={`form-group animated fadeIn ${this.state.shown ? "" : 'fadeOutLeft'}`}>
            <Field 
              name="title"
              type="text"
              component={renderField}
              label="Pick a title!"
            />
            <div>
              <button onClick={() => this.activateButton()} className="btn btn-success float-right btn-sm mb-0" type="button">
                Next
              </button>
              <button onClick={()=> this.props.onDismiss()} className="btn btn-danger float-left btn-sm mb-0" type="button"> 
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'card', 
  destroyOnUnmount: false
})(SecondPage); 