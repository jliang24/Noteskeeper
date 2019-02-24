import React, {Component} from 'react'; 
import { Field } from 'redux-form'; 
import SaveButton from './SaveButton'; 
import { connect } from 'react-redux'; 
import { updateCard } from '../../../actions'; 
import uniqueId from 'uniqid'; 
import TextareaAutosize from 'react-autosize-textarea'; 

class fieldArea extends Component {
  state = {listItems: [uniqueId('listarea-')], checkedItems:[uniqueId('checkarea-')], loading:false}; 

  componentDidMount(){
    if (this.props.item){
      this.setState(() => {
        return {listItems: [...this.props.item.itemNames] }
      }); 
      this.setState(() => {
        return {checkedItems: [...this.props.item.checkedNames]}
      }); 
    }
  }

  FieldComponent = ({input}) => {
    return <TextareaAutosize {...input} className='form-control mt-2 mb-1 z-depth-1-half' rows={4} ></TextareaAutosize>
  }

  ListComponent = ({input, meta}) => {
    return <TextareaAutosize {...input} onBlur={ () => this.onListChange(input, meta, 'list') } type="text" style={{borderWidth:'0 0 1.2px 0'}} className="form-control pl-1"/>
  }

  CheckComponent = ({input, meta}) => {
    return <input {...input} onClick={ () => this.timedOut(input, meta) } className="cr-icon" style={{width:'18px', height:'18px'}} type="checkbox"/>
  }

  timedOut= (input, meta) => {
    if (this.props.name==="creation") return 
    this.setState({ loading: true})
    setTimeout(() => this.onListChange(input, meta, 'checkbox'),1500)
  }
  onListChange = (input, meta, type) => {
    if (type==="checkbox" && this.props.card){
      console.log(input.name)
      this.props.onChange(this.props.card._id, input.name, input.value ? false: true)
      this.props.updateCard(this.props.card._id, input.name, input.value ? false:true, type, this.props.itemId)
      this.setState({ loading: false }) 
    }

    if (type==="list" && meta.dirty===true && this.props.card){
      this.props.updateCard(this.props.card._id, input.name, input.value, type, this.props.itemId)
      const checkedField = this.state.checkedItems[this.state.listItems.indexOf(input.name)]; 
      if (!this.props.field.values[checkedField]) {
        setTimeout( () => this.props.updateCard(this.props.card._id, checkedField, false, 'checkbox', this.props.itemId), 1000)
      }
    }
  }; 


  groupListComponent = (name, checkedName) => {
    return (
      <div className="input-group mt-3 mb-0 border-0">
        <div className="input-group-prepend">
          <div className="input-group-text border-0 bg-white">
            <Field 
              name={checkedName}
              type="checkbox"
              component={this.CheckComponent}
              normalize={(v) => !!v} 
            />
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
    return this.state.listItems.map( (name,index) => {
      return (
        <React.Fragment key={name}>
          {this.groupListComponent(name, this.state.checkedItems[index])}
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
      let initial = this.props.field.initial[this.props.form] 
      const value = this.props.field.values[this.props.form]
      const {card, form, type} = this.props
        if (initial !== value){
          if (!initial) initial = ""; 
          return (
          <SaveButton 
            showText 
            onDismiss={() => this.props.onChange(card._id, form, initial)} 
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
            <div className="z-depth-1-half pt-1 pb-1 mt-2 mb-2" style={{backgroundColor: 'white'}}> 
              {this.renderList()}
              { this.state.loading && 
                  <span className="spinner-border spinner-border-sm float-right mr-2 mt-4" role="status" aria-hidden="true"></span>
            }
              <h5 
                onMouseDown={() => setTimeout( () => this.setState({
                    listItems: [...this.state.listItems, uniqueId('listarea-')],
                    checkedItems: [...this.state.checkedItems, uniqueId('checkarea-')]
                }),100)}
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