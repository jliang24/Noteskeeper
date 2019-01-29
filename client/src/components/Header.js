import React, { Component } from 'react';
import Auth from './Auth'; 
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux'; 

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <Link className="navbar-brand" to={this.props.auth ? "/home" : "/" }>Noteskeeper</Link>
        <Auth />
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }; 
}

export default connect(mapStateToProps)(Header); 