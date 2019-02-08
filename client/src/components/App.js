import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import Header from './Header'; 
import Dashboard from './Dashboard'; 
import BoardForm from './Board/BoardForm'; 
import history from '../history'; 
import BoardDetails from './Board/BoardDetails';
import Landing from './Landing';  
import BoardDelete from './Board/BoardDelete'; 

class App extends Component {
  render(){
    return (
      <Router history={history} >
      <div className='container-fluid' style={{maxWidth:'90%'}}>
        <Header /> 
        <Route path="/" exact component={Landing} ></Route>
        <Route path="/home" exact component = {Dashboard}></Route>
        <Route path="/home/new" exact component={BoardForm}></Route>
        <Route path="/home/boards/delete/:boardId" exact component={BoardDelete}></Route>
        <Route path="/home/boards/:boardId" exact component={BoardDetails}></Route>
      </div>
      </Router>
    )
  }
}; 

export default App; 