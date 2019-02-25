import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { reduxForm, change } from 'redux-form'; 
import AddItem from './AddItem'; 
import FieldArea from './FieldArea'; 
import { addField } from '../../../actions'; 
import uniqueId from 'uniqid'; 
import { Draggable } from 'react-beautiful-dnd'; 
import styled from 'styled-components'; 

const Container = styled.div`
  border: 1px 1px 1px 0px;
  padding: 10px 8px 8px 5px; 
  border-radius: 2px; 
  display: 'flex'; 
  flex-direction: 'column'; 
`; 

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

  updateItems() {
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

  componentDidMount(){
    this.updateItems(); 
  }

  componentDidUpdate(prevProps){
    if (prevProps.items.length !== this.props.items.length){
      this.updateItems(); 
    }
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
    this.setState({itemClicked: false, showList:true, showText:false}); 
    const newItem = this.props.card.item.concat({
      // _id: this.props.form,
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
    return this.props.items.map( (item, index) => {
      const name = item.name ? item.name : item.list.itemNames[0] //check for regressions here
      const lastItem = this.props.items[this.props.items.length-1]
      const isDragDisabled = !lastItem.hasOwnProperty('_id') || lastItem.text === ""; 
      return (
        <Draggable 
          draggableId={name} 
          index={index} 
          key={name}
          isDragDisabled= {isDragDisabled}
        >
          {(provided) => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <FieldArea 
                type = {item.type}
                form={name}
                // key={item._id}
                item = {item.list}
                card = {this.props.form}
                onChange = {(form, field, value) => this.props.dispatch(change(form, field, value))}
                onSave = {this.props.initialize}
                itemId = {item._id}
              />
            </Container>
          )}
        </Draggable>
    )
      }
    )
  }

  render(){ 
    return (
        <React.Fragment>
          <div className="card pb-0 pt-4 p-3 h-100" style={{ width: '280px', position:'static'}}>
            <div style={{position:'relative', zIndex:1}} >
              <button onClick={() => this.props.onDismiss()} style={{position:'absolute',top:'-15px', right:'-5px', zIndex:'5'}} className="close">&times;</button>
            </div>
            <div className="h-100" > 
              <h2
                className="mb-3" 
                align="center"> {this.props.title} 
              </h2>
              <form className="form-group shadow-textarea">
                {this.renderFields()}
              </form>
            </div>
              <AddItem 
                itemClicked={this.state.itemClicked} 
                onAddItemClicked={this.onAddItemClicked}
                onTextClicked={this.onTextClicked}
                onListClicked={this.onListClicked}
              />
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