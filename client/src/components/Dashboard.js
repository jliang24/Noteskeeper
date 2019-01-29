import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import { fetchBoards } from '../actions'; 
import '../css/pulse.css'; 

class Dashboard extends Component {
  componentDidMount(){
    this.props.fetchBoards(); 
  }

  renderBoards() {
    if (!this.props.board) return <div></div>
    return this.props.board.map(({title,_id}) => {
      return (
        <Link to={`home/boards/${_id}`} className="card pt-0 pl-0 pb-4 boardcard" style={{textDecoration: 'none', height:'140px'}}>
          <div className="card-body">
            <h3>{title}</h3>
          </div>
        </Link>
        )
    })
  }

  render(){
    return (
      <React.Fragment>
        <h1 className="m-3 mt-5">My Boards</h1>
        <div className="card-columns">
          {this.renderBoards()}
        </div>
        <div className="pulse-container">
          <Link to="/home/new">
            <span className="fa fa-plus-circle fa-large">
              <button className="fa-pulse"></button>
            </span>
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    board: Object.values(state.board)
  }
}
export default connect(mapStateToProps, { fetchBoards })(Dashboard)