import React, { Component } from 'react'; 
import NewCard from './NewCard'; 
import { connect } from 'react-redux'; 
import { fetchBoard,  fetchCards, deleteCard } from '../../actions'; 
import FinalPage from './Forms/FinalPage'; 
import Modal from '../Modal'; 
import _ from 'lodash'; 


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
      return (
        <FinalPage 
          title={card.title}
          form={card._id}
          key={`${card._id}`}
          onDismiss= {() => this.onDelete(card._id, card.title)}
        />
      )
    })
    content.push(<NewCard key="createCard"/>); 
    return content; 
  }
  
  render() {
    return (
      <>
        {this.state.showModal && this.renderModal()}
        <div className="container-fluid">
          <div style={{display:'inline-flex', flexWrap:'nowrap'}}>
            {this.renderCards()}
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

export default connect(mapStateToProps, { fetchCards, deleteCard, fetchBoard } )(CardList); 