import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoard, clearBoard } from '../../actions/index';
import CardList from '../Cards/CardList';

class BoardDetails extends Component {
  componentDidMount() {
    this.props.fetchBoard(this.props.match.params.boardId);
  }

  componentWillUnmount() {
    this.props.clearBoard();
  }

  render() {
    if (!this.props.board) {
      return (
        <div
          style={{ marginTop: '300px' }}
          className="d-flex justify-content-center"
        >
          <div className="spinner-border">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="animated fadeIn mt-2">
          <div className="jumbotron jumbotron-fluid p-3 bg-dark text-white mt-1 mb-3">
            <h1 className="mb-0">{this.props.board.title}</h1>
          </div>
          <CardList boardId={this.props.match.params.boardId} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    board: state.board[ownProps.match.params.boardId]
  };
};

export default connect(
  mapStateToProps,
  { fetchBoard, clearBoard }
)(BoardDetails);
