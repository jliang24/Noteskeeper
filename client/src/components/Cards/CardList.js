import React, { Component } from 'react'; 
import NewCard from './NewCard'; 
import { connect } from 'react-redux'; 
import { fetchCards, deleteCard } from '../../actions'; 
import FinalPage from './Forms/FinalPage'; 
import Modal from '../Modal'; 


class CardList extends Component { 
  state={ showModal : false, title: "", id: "" }; 

  componentDidMount() {
    this.props.fetchCards(this.props.boardId); 
  }; 

  renderModal () {
    const cardDelete = () => {
      return (
        <>
        <p>Are you sure you want to delete this card?</p>
        <p className="lead text-danger"> {`Title: ${this.state.title}`} </p>
      </>
      )
    } 

    const onDelete = () => {
      this.props.deleteCard(this.state.id);
      this.setState({ showModal: false})
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
    const content = []; 
    this.props.cards.forEach((card,index) => {
      content.push(
        <FinalPage 
          title={card.title}
          form={card._id}
          key={`${card.title}_${index}`}
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

const mapStateToProps = (state) => {
  return {
    cards: Object.values(state.cards)
  }
}

export default connect(mapStateToProps, { fetchCards, deleteCard } )(CardList); 