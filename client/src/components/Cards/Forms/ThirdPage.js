import React, { Component } from 'react'; 
import {reduxForm} from 'redux-form'; 
import { connect } from 'react-redux'; 
import AddItem from './AddItem'; 
import FieldArea from './FieldArea'; 
import SaveButton from './SaveButton'; 
import {createCard} from '../../../actions/'; 


class ThirdPage extends Component {
  state = {itemClicked:false, showText: false, showList: false, failed: false}; 

  onAddItemClicked = () => {
    this.setState({itemClicked:true, showText: true}); 
  }; 

  onTextClicked = () => {
    this.setState({showText:true, showList:false}); 
  }; 

  onListClicked = () => {
    this.setState({showList:true, showText:false}); 
  }; 

  onSave = async values => { 
    
    const {registeredFields} = this.props.fields
    const newValue = {}; 
    for (let field in registeredFields){
      if (!values[field] && /checkarea/.test(field)){
        newValue[field] = false
      } else {
        newValue[field] = values[field]
      }
    }

    const formName = Object.keys(values).filter(value => value.includes('area'))[0]; 
    if (!formName) return this.setState({ failed: true }); 
    const location = window.location.href.split('/');
    const boardId = location[location.length-1];
    const type = this.state.showText ? 'text' : 'list';   

    if (type === 'text'){ 
      this.props.createCard(values.title, formName, values[formName], type, boardId); 
    } else if (type ==='list'){
      this.props.createCard(values.title, formName, newValue, type, boardId); 
    }
    this.props.onSubmit(); 
  }

  onDismiss = () => {
    this.setState({showText:false, showList:false}); 
  }

  render(){ 
    return (
      <div className="card border-dark mb-3 pl-3 pr-3 pt-4 pb-0 w-100" style={{ maxWidth: '18rem'}}>
        <button onClick={() => this.props.onDismiss()} style={{position:'absolute',top:'-1px', right:'3px'}} className="close">&times;</button>
        <div className="animated slideInRight" > 
          <h3 align="center"> {this.props.title} </h3>
          <AddItem 
            itemClicked={this.state.itemClicked} 
            onAddItemClicked={this.onAddItemClicked}
            onTextClicked={this.onTextClicked}
            onListClicked={this.onListClicked}
            />
          <form className="form-group shadow-textarea" onSubmit={this.props.handleSubmit(this.onSave)}>
            <FieldArea 
              showText={this.state.showText} 
              showList={this.state.showList} 
              name='creation' 
              initialize = {this.props.initialize}
              title= {this.props.title} 
              />
              { this.state.failed && <p className="text-danger">Please add something </p> }
            <SaveButton 
              showText={this.state.showText}
              showList={this.state.showList}
              onDismiss= {this.onDismiss}
              creation 
              />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    title:state.form.card.values.title,
    fields: state.form.card
  }
}

ThirdPage = connect(mapStateToProps, { createCard })(ThirdPage); 
 

export default reduxForm({
  form: 'card', 
  destroyOnUnmount: false,
  enableReinitialize: true 
})(ThirdPage)