import React, {Component} from 'react'; 
import { Field, reduxForm, change } from 'redux-form'; 
import SaveButton from './SaveButton'; 
import _ from 'lodash'; 
import { connect } from 'react-redux'; 
import { updateCard } from '../../../actions'; 
import uniqueId from 'uniqid'; 

class fieldArea extends Component {
  state = {listItems: [uniqueId('listarea-')]}; 

  componentDidMount(){
    if (this.props.item){
      this.setState({ listItems: [...this.props.item.itemNames]})
    }
  }

  FieldComponent = ({input}) => {
    return <textarea {...input} className='form-control mt-2 mb-1 z-depth-1-half' rows="4"></textarea>
  }

  onListChange = (input, meta) => {
    if (meta.dirty===true && this.props.card){
      this.props.updateCard(this.props.card._id, input.name, input.value, 'list', this.props.itemId)
    }
  }; 

  ListComponent = ({input, meta}) => {
    return <input {...input} onBlur={() => this.onListChange(input, meta)} type="text" style={{borderWidth:'0 0 1.2px 0'}} className="form-control pl-1"/>
  }

  groupListComponent = (name) => {
    return (
      <div className="input-group mt-3 mb-0 border-0">
        <div className="input-group-prepend">
          <div className="input-group-text border-0 bg-white">
            <input className="cr-icon" style={{width:'18px', height:'18px'}} type="checkbox" />
          </div>
        </div> 
        <Field 
          name={name}
          type="text"
          component= {this.ListComponent}
        /> 
      </div>
    )
  }

  renderList = () => {
    return this.state.listItems.map( name => {
      return (
        <React.Fragment key={name}>
          {this.groupListComponent(name)}
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
      if (!this.props.list){  
      const initial = this.props.field.initial[this.props.form] 
      const value = this.props.field.values[this.props.form]
      const {card, form, type} = this.props
        if (initial !== value){
          return (
          <SaveButton 
            showText 
            onDismiss={() =>this.props.onChange(card._id, form, initial)} 
            onSave={() => this.onSave(card, form, value, type)} 
          />
          )
        }
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
            <div className="z-depth-1-half pt-1 pb-1 mt-2 mb-2"> 
              {this.renderList()}
              <h5 
                onClick={() => this.setState({listItems: [...this.state.listItems, uniqueId('listarea-')]})} 
                className="ml-2 mt-3 createcard text-primary">+ Add List Item
              </h5>
            </div>
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