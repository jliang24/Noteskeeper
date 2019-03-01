import React, { Component } from 'react';
import '../../css/card.css';
import FirstPage from './Forms/FirstPage';
import SecondPage from './Forms/SecondPage';
import ThirdPage from './Forms/ThirdPage';

class Card extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.originalPage = this.originalPage.bind(this);
    this.state = { page: 1 };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  originalPage() {
    this.setState({ page: 1 });
  }

  render() {
    const { page } = this.state;
    return (
      <div className="mr-3" style={{ width: '300px' }}>
        {page === 1 && <FirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <SecondPage onDismiss={this.previousPage} onSubmit={this.nextPage} />
        )}
        {page === 3 && (
          <ThirdPage
            onDismiss={this.previousPage}
            onSubmit={this.originalPage}
          />
        )}
      </div>
    );
  }
}

export default Card;
