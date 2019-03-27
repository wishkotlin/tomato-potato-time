import React, { Component } from 'react'
import { Button,Icon } from 'antd';

export class Time extends Component {
  render() {
    return (
      <div className="time">
        <Button type="primary" >开始番茄</Button>
        <div className="clock-circle">
            <Icon type="clock-circle" />
            <p>没有记录</p>
        </div>
        
      </div>
    )
  }
}

export default Time
