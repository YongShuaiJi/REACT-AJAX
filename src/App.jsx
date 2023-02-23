import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Component } from 'react';

export default class App extends Component{

  getStudentData =()=>{
    axios.get('http://localhost:3000/api/user/students').then(
      response => {console.log('成功了，结果是：', response.data);},
      error => {console.log('失败了', error);}
    )
  }

  render(){
    return(
      <div>
        <button onClick={this.getStudentData}>点我获取学生数据</button>
      </div>
    )
  }
}
