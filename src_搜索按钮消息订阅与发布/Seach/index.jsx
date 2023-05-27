import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  onKeyUpExce = (e) =>{
    if(e.keyCode === 13) {
        this.search()
    }
  }

  search =()=>{
    // console.log(this.keyWordText.value)
    // text = this.keyWordText.value
    // const {value} = this.keyWordText
    // const {keyWordText: {value}} = this
    const {keyWordText: {value: text}} = this
    // console.log(text)
    // this.props.updateAppState({isFirst: false, isLoading: true})  // 弃用以父组件传递消息的形式
    PubSub.publish('my_topic', {isFirst: false, isLoading: true}) 
    axios.get(`https://api.github.com/search/users?q=${text}`).then(
      response => {
        // console.log('成功了，结果是：', response.data);
        // this.props.updateAppState({isLoading: false, users: response.data.items})
        PubSub.publish('my_topic', {isLoading: false, users: response.data.items}) 
      },
      error => {
        console.log('失败了', error);
        // this.props.({isLoading: false, users:[], err: error.message })
        PubSub.publish('my_topic', {isLoading: false, users:[], err: error.message }) 
      }
    ) 
  }

  render() {
    return (
    <section className='jumbotron'>
        <h3 className='jumbotron-heading'>
            Search Github Users
        </h3>
        <div>
            <input onKeyUp={this.onKeyUpExce} ref={c => this.keyWordText = c} type='text' style={{width: '300px'}} placeholder='Enter the name you search' />&nbsp;
            <button onClick={this.search}>Search</button>
        </div>
    </section>
    )
  }
}
