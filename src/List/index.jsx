import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
  render() {
    const {users, isFirst, isLoading, err} = this.props
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
