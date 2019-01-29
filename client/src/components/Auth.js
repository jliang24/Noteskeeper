import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { fetchUser } from '../actions';

class Auth extends Component { 
  componentDidMount() {
    if (!this.props.auth){
      this.props.fetchUser(); 
    }
  }

  renderAuthButton() {
    switch(this.props.auth) {
      case false: 
        return (
          <a className="btn text-white btn-outline-success my-2 my-sm-0" href="/auth/google">
            Sign in with Google
          </a>
        )
      case null: 
        return <div></div>
      default: 
      return (
        <a className="btn text-white btn-outline-success my-2 my-sm-0" href="/api/logout">
        Log out 
        </a>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return { 
    auth
  }
}

export default connect(mapStateToProps, { fetchUser })(Auth)