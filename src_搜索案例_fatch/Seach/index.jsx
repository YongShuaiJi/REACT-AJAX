import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  onKeyUpExce = (e) =>{
    if(e.keyCode === 13) {
        this.search()
    }
  }

  search = async()=>{
    // console.log(this.keyWordText.value)
    // text = this.keyWordText.value
    // const {value} = this.keyWordText
    // const {keyWordText: {value}} = this
    const {keyWordText: {value: text}} = this
    // console.log(text)
    // this.props.updateAppState({isFirst: false, isLoading: true})  // 弃用以父组件传递消息的形式
    PubSub.publish('my_topic', {isFirst: false, isLoading: true}) 

    // 测试fetch
    /*
    fetch(`https://api.github.com/search/users?q=${text}`).then(
      response=>{
        return response.json()
      },
      // 可以统一在catch中处理
      error=>{
        // 失败则停止一个空的Promise返回会停止链式调用
        console.log('服务器通信异常请检查')
        return new Promise(()=>{})
      }
    ).then(
      response=>{
        console.log('获取数据成功',response)
      }
    ).catch(
      error => {console.log('请求出错',error)}
    )
    */
    
    /**
     * 这种写法处理
    */
    try{
      const response = await fetch(`https://api.github.com/search/users?q=${text}`)
      const data = await response.json()
      console.log(data)
      // 发布消息....
    }catch(error){
      console.log('请求出错请检查：',error)
      // 发布消息....
    }

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
