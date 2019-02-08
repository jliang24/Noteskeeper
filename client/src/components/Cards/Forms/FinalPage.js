import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { reduxForm, change } from 'redux-form'; 
import AddItem from './AddItem'; 
import FieldArea from './FieldArea'; 
import { addField } from '../../../actions'; 
import uniqueId from 'uniqid'; 

class FinalPage extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      itemClicked:false, 
      showText: true, 
      showList: false
    }; 

    this.items = {}; 
  }

  componentDidMount(){
    if (!this.props.items) return 
    this.props.items.forEach(({type, name, text, list}) => {
      if (type==='list'){
        list.itemNames.forEach(( name, index) => {
            this.items[name] = list.items[index]
            this.items[list.checkedNames[index]] = list.checked[index]
        })} else if (type === 'text') {
          return this.items[name]=text; 
      }
    })
    this.props.initialize(this.items) 
  }

  onAddItemClicked = () => {
    this.setState({itemClicked:true, showText: true}); 
  }; 

  onTextClicked = () => {
    this.setState({itemClicked: false, showText:true, showList:false}); 
    const newItem = this.props.card.item.concat({
      _id: this.props.form,
      name: uniqueId('textarea-'),
      text: "",
      type: "text"
    })
    const copy = {...this.props.card, item: newItem}; 
    this.props.addField(copy); 
  }; 

  onListClicked = () => {
    this.setState({showList:true, showText:false}); 
    const newItem = this.props.card.item.concat({
      _id: this.props.form,
      type: "list",
      list: {
        itemNames: [uniqueId('listarea-')],
        items: [],
        checked: [false],
        checkedNames: [uniqueId('checkarea-')]
      }
    })
    const copy = {...this.props.card, item: newItem}; 
    this.props.addField(copy); 
  }; 

  onDismiss = () => {
    this.setState({showText:false, showList:false})
  }

  renderFields = () => {
    return this.props.items.map( (item) => {
      const name = item.name ? item.name : item.list.itemNames[0] //check for regressions here 
      return (
        <React.Fragment key={name}>
          <FieldArea 
            type = {item.type}
            form={name}
            key={name}
            item = {item.list}
            card = {this.props.form}
            onChange = {(form, field, value) => this.props.dispatch(change(form, field, value))}
            onSave = {this.props.initialize}
            itemId = {item._id}
          />
        </React.Fragment>
    )
      }
    )
  }

  render(){ 
    return (
        <React.Fragment>
          <div className="card border-dark mr-3 pb-0 pt-4 p-3 h-100" style={{ width: '280px'}}>
            <button onClick={() => this.props.onDismiss()} style={{position:'absolute',top:'-1px', right:'3px'}} className="close">&times;</button>
            <div className="animated fadeIn" > 
              <h3 align="center"> {this.props.title} </h3>
              <form className="form-group shadow-textarea">
                {this.renderFields()}
              </form>
              <AddItem 
                itemClicked={this.state.itemClicked} 
                onAddItemClicked={this.onAddItemClicked}
                onTextClicked={this.onTextClicked}
                onListClicked={this.onListClicked}
              />
            </div>
          </div>
        </React.Fragment>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    items: state.cards[ownProps.form].item,
    card: state.cards[ownProps.form]
  }
}

FinalPage = connect(mapStateToProps, { addField })(FinalPage);  

export default reduxForm({
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true 
})(FinalPage)