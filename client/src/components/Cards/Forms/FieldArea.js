import React, {Component} from 'react'; 
import { Field, reduxForm, change } from 'redux-form'; 
import SaveButton from './SaveButton'; 
import _ from 'lodash'; 
import { connect } from 'react-redux'; 
import { updateCard } from '../../../actions'; 
import uniqueId from 'uniqid'; 

class fieldArea extends Component {
  state = {listItems: [uniqueId('listarea-')]}; 

  FieldComponent = ({input}) => {
    return <textarea {...input} className='form-control z-depth-1 mt-2 mb-1' rows="4"></textarea>
  }

  ListComponent = ({input}) => {
    return <input {...input} type="text" style={{borderWidth:'0 0 1.2px 0'}}  className="form-control pl-1"/>
  }

  renderList = () => {
    if (!this.props.card) return  
    return this.props.card.item.list.itemNames.map( name => {
      return (
        <React.Fragment key={name}>
          <div className="input-group mt-3 mb-0 border-0">
            <div className="input-group-prepend">
              <div className="input-group-text border-0 bg-white">
                <input className="cr-icon" style={{width:'18px', height:'18px'}} type="checkbox" />
              </div>
            </div> 
            <Field 
            name={this.props.form ? this.props.form : name}
            type="text"
            component= {this.ListComponent}
            /> 
           </div>
      </React.Fragment>
      )
    })
  }

  onSave = (card, form, value, type) => {
    this.props.updateCard(card, form, value, type);  
    this.props.onSave(this.props.field.values); 
  }

  renderSaveButton() {
    if (this.props.field){
      const initial = this.props.field.initial[this.props.form] 
      const value = this.props.field.values[this.props.form]
      const {card, form, type} = this.props
      if (initial !== value){
        return (
        <SaveButton 
        showText 
        onDismiss={() => this.props.onChange(card, form, initial)} 
        onSave={() => this.onSave(card, form, value, type)} />
        )
      }
    }
  }

  render() { 
    if (this.props.showText || this.props.type==="text"){
      return (
        <React.Fragment>
          <Field 
            name={this.props.form ? this.props.form : uniqueId('textarea-')}
            type="text"
            component= {this.FieldComponent} 
          />
          {this.renderSaveButton()}
        </React.Fragment>
      )} else if (this.props.showList || this.props.type==="list") {
          return (
          <React.Fragment> 
            {this.renderList()}
            <h5 
              onClick={() => this.setState({listItems: [...this.state.listItems, uniqueId('listarea-')]})} 
              className="ml-2 mt-2 createcard">+ Add List Item
            </h5>
          </React.Fragment>
        )
      }
    return null
  }
}

const mapStateToProps = (state,ownProps) => {
  return { 
    field: state.form[ownProps.card],
    card: state.cards[ownProps.card]
  }
}

export default connect(mapStateToProps, { updateCard })(fieldArea); 