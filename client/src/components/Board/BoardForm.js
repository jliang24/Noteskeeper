import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import axios from 'axios';
import { reduxForm, Field } from 'redux-form';

const formComponent = ({ input, meta: { error, touched } }) => {
  return (
    <div>
      <input autoComplete="off" className="form-control" {...input} />
      <div className="text-danger">{touched && error}</div>
    </div>
  );
};

class BoardForm extends Component {
  renderForm() {
    return (
      <div className="form-group">
        <form
          onSubmit={this.props.handleSubmit(values => {
            this.onSave(values);
          })}
        >
          <label className="col-form-label">
            What would you like to name this board?
          </label>
          <Field
            name="board"
            type="text"
            className="form-control"
            component={formComponent}
          />
        </form>
      </div>
    );
  }

  onSave = async ({ board }) => {
    const response = await axios.post('/api/boards', {
      title: board
    });

    history.push(`boards/${response.data}`);
  };

  onDismiss = () => {
    history.push('/home');
  };

  render() {
    return (
      <Modal
        title="Create a new board!"
        content={this.renderForm()}
        onDismiss={this.onDismiss}
        onSave={this.props.handleSubmit(values => {
          this.onSave(values);
        })}
      />
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values['board']) {
    errors.board = 'You must provide a title!';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'boardForm'
})(BoardForm);
