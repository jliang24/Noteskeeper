import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions';
import '../css/pulse.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchBoards();
  }

  renderBoards() {
    if (!this.props.board) return <div />;
    return this.props.board.map(({ title, _id }) => {
      return (
        <div key={_id}>
          <Link
            to={`home/boards/${_id}`}
            className="card pt-0 pl-0 pb-4 boardcard"
            style={{
              position: 'relative',
              textDecoration: 'none',
              height: '140px'
            }}
          >
            <div className="card-body">
              <h3>{title}</h3>
            </div>
          </Link>
          <div
            style={{
              position: 'relative',
              zIndex: 5,
              left: 0,
              top: -150,
              right: 0
            }}
          >
            <Link
              to={`/home/boards/delete/${_id}`}
              style={{ position: 'absolute', top: '-1px', right: '3px' }}
              className="close"
            >
              &#10799;
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="m-3 mt-5">My Boards</h1>
        <div className="card-columns">{this.renderBoards()}</div>
        <div className="pulse-container">
          <Link to="/home/new">
            <span className="fa fa-plus-circle fa-large">
              <button className="fa-pulse" />
            </span>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: Object.values(state.board)
  };
};
export default connect(
  mapStateToProps,
  { fetchBoards }
)(Dashboard);
