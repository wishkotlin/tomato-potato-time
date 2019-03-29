import React,{ PureComponent } from 'react'
// import {Link} from 'react-router-dom'
class NoMatch extends PureComponent {
    render(){
        return(
            <div className="container">
                <div className="post" style={{fontSize:"50px",textAlign:'center'}}>
                    No,页面飞走了！！！
                </div>
            </div>
        );
    }
}
export default NoMatch;
