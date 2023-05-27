import React, { Component } from 'react'
import Search from './Searh'
import List from './List'

export default class App extends Component {

  // state = {
  //   users:[],
  //   isFirst: true,
  //   isLoading: false,
  //   err: ''
  // }

  // // saveUsers = (users)=>{
  // //   this.setState({users})
  // // }
  // updateAppState = (stateObj) =>{
  //     this.setState(stateObj)
  // }
  
  render() {
    return (
      <div className='container'>
        {/* <Search updateAppState = {this.updateAppState} />
        <List {...this.state} /> */}
        <Search />
        <List />
      </div>
    )
  }
}
