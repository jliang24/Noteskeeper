import React, { Component } from 'react'; 
import NewCard from './NewCard'; 
import { connect } from 'react-redux'; 
import { fetchCards } from '../../actions'; 
import FinalPage from './Forms/FinalPage'; 


class CardList extends Component { 
  componentDidMount() {
    this.props.fetchCards(this.props.boardId); 
  }; 

  renderCards() {
    const content = []; 
    this.props.cards.forEach((card,index) => {
      content.push(
        <FinalPage 
          title={card.title}
          form={card._id}
          key={`${card.title}_${index}`}
        />
      )
    })
    content.push(<NewCard key="createCard"/>); 
    return content; 
  }
  
  render() {
    return (
        <div className="container-fluid">
          <div style={{display:'inline-flex', flexWrap:'nowrap'}}>
            {this.renderCards()}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cards: Object.values(state.cards)
  }
}

export default connect(mapStateToProps, {fetchCards} )(CardList); 