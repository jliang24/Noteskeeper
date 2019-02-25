import React, { Component } from 'react'; 
import NewCard from './NewCard'; 
import { connect } from 'react-redux'; 
import { fetchBoard,  fetchCards, deleteCard, dragCard } from '../../actions'; 
import FinalPage from './Forms/FinalPage'; 
import Modal from '../Modal'; 
import _ from 'lodash'; 
import { DragDropContext, Droppable } from 'react-beautiful-dnd'; 
import styled from 'styled-components'; 

const Container = styled.div`
  padding: 10px; 
  display: 'flex'; 
  min-height: 100px; 
  background-color: pink; 
`; 


class CardList extends Component { 
  state={ showModal : false, title: "", id: "" }; 

  componentDidMount() {
    this.props.fetchCards(this.props.boardId); 
  }; 

  renderModal () {
    window.scrollTo(-500,0); 
    const cardDelete = () => {
      return (
        <>
        <p>Are you sure you want to delete this card?</p>
        <p className="lead text-danger"> {`Title: ${this.state.title}`} </p>
      </>
      )
    } 

    const onDelete = () => {
      this.props.deleteCard(this.state.id, this.props.boardId );
      this.setState({ showModal: false }); 
    }

    return ( 
        <Modal 
          title="Card Delete"
          content={cardDelete()}
          onDismiss = {() => this.setState({ showModal: false})}
          onSave = {() => onDelete()} 
        />
    )
  }

  onDelete(id, title) {
    this.setState({
      title,
      id,
      showModal: true,
    })
  }

  renderCards() {
    if (_.isEmpty(this.props.cards)){
      return <NewCard key="createCard"/>
    }

    const content = this.props.order.map(cardId => {
      const card = this.props.cards[cardId]; 
      const lastItem = card.item.length>0 ? card.item[card.item.length-1] : {text: 'notEmpty'}; 
      const isDroppable = lastItem.text === "" || !lastItem.hasOwnProperty('_id'); 
      
      return (
        <Droppable 
          droppableId={card._id} 
          key={card._id}
          isDropDisabled = {isDroppable}
        >
          {(provided) => ( 
            <Container
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <FinalPage 
                title={card.title}
                form={card._id}
                key={`${card._id}`}
                onDismiss= {() => this.onDelete(card._id, card.title)}
              />
              {provided.placeholder}
             </Container>
          )}
        </Droppable>
      )
    })
    content.push(<NewCard key="createCard"/>); 
    return content; 
  }

  onDragEnd = result => {
    const { destination, source } = result; 
    if ( !destination ) return; 
    if (
      destination.droppableId === source.droppableId && 
      destination.index === source.index
      ) {
      return; 
    }
    const sourceCard = this.props.cards[source.droppableId]; 
    const destinationCard = this.props.cards[destination.droppableId]; 
    const start = sourceCard._id; 
    const finish = destinationCard._id;
    const newSourceItems = Array.from(sourceCard.item);  
    newSourceItems.splice(source.index,1); 
    if (start === finish) {
      newSourceItems.splice(destination.index,0,sourceCard.item[source.index]); 
      return this.props.dragCard(start, newSourceItems); 
    }
    const newDestinationItems = Array.from(destinationCard.item); 
    newDestinationItems.splice(destination.index, 0, sourceCard.item[source.index]);
    this.props.dragCard(finish, newDestinationItems); 
    this.props.dragCard(start, newSourceItems); 
  }
  
  render() {
    return (
      <>
        {this.state.showModal && this.renderModal()}
        <div className="container-fluid">
          <div style={{display:'inline-flex', flexWrap:'nowrap'}}>
            <DragDropContext
              onDragEnd={this.onDragEnd} 
            >
              {this.renderCards()}
            </DragDropContext>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    order: state.board[ownProps.boardId].cardOrder, 
    cards: state.cards
  }
}

export default connect(mapStateToProps, { fetchCards, deleteCard, fetchBoard, dragCard } )(CardList); 