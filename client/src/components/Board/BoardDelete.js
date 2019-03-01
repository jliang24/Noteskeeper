import React from 'react';
import { connect } from 'react-redux';
import { fetchBoard, deleteBoard } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class BoardDelete extends React.Component {
  componentDidMount() {
    this.props.fetchBoard(this.props.match.params.boardId);
  }

  renderContent() {
    if (!this.props.board) {
      return 'Are you sure you want to delete this board?';
    }
    return (
      <>
        <p>Are you sure you want to delete this board?</p>
        <p className="lead text-danger">
          {' '}
          {`Title: ${this.props.board.title}`}{' '}
        </p>
      </>
    );
  }

  onDelete() {
    this.props.deleteBoard(this.props.match.params.boardId);
    history.push('/home');
  }

  render() {
    return (
      <Modal
        title="DeleteBoard"
        content={this.renderContent()}
        onDismiss={() => history.push('/home')}
        onSave={() => this.onDelete()}
      />
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
  { fetchBoard, deleteBoard }
)(BoardDelete);
