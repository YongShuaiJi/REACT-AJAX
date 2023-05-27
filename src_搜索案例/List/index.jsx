import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'

export default class index extends Component {
    state = {
        users:[],
        isFirst: true,
        isLoading: false,
        err: ''
      }

    componentDidMount(){
        // 初始化操作-订阅
        PubSub.subscribe("my_topic",(msg, data)=>{
            console.log(data)
        })

    }

    // saveUsers = (users)=>{
    //   this.setState({users})
    // }
    updateAppState = (stateObj) =>{
        this.setState(stateObj)
    }

    render() {
        const {users, isFirst, isLoading, err} = this.state
        return (
            <div className='row'>
                {
                    isFirst ? <h4>欢迎使用，请输入关键词搜索用户...</h4> : 
                    isLoading ? <h2>正在请求中，请等待...</h2>:
                    err ? <h2 style={{color: 'red'}}>{err}</h2>:
                    users.map((userObj)=>{
                        return (
                            <div  key={userObj.id}  className='card'>
                                <a href={userObj.html_url} rel="noreferrer" target="_blank">
                                    <img alt='img' src={userObj.avatar_url} style={{width: '100px'}}/>
                                </a>
                                <p className='card-text'>{userObj.login}</p>
                            </div>
                        )
                    })   
                }
            </div>
        )
    }
}
