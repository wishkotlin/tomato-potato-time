import React from 'react'
// import { Spin,Button } from 'antd';
import { Menu, Dropdown, Icon, message,Layout,Skeleton,Tooltip } from "antd"
import { withRouter } from "react-router-dom";
import axios from "../../utils/Axios";
// import "../static/bg.mp4"
import "./index.scss";
import Todos from "../todos/Todos";
import Time from "../time/Time";
import { ownUser,signOut,TodoModel } from "../../utils/learnCloud"
import logo from '../../static/logo.svg';
// import Login from "./Login";
interface myprops{
  history:any,
}
interface mystate{
  test:boolean,
  username:any,
  loading: boolean,
  SyncSuccess: boolean,
  Sync: boolean,
  Syncing: boolean,
  SyncError: boolean,
  SyncTodo:any,
  SyncTomato: any
}

// const {
//   Header, Footer, Content,
// } = Layout;
const {
  Header, Content,
} = Layout;
// const onClick = ({ key }:any) => {
//   message.info(`Click on item ${key}`);
// };
// const menu = (
//   <Menu onClick={onClick}>
//     <Menu.Item key="1">账号</Menu.Item>
//     <Menu.Item key="2">偏好设置</Menu.Item>
//     <Menu.Item key="3">退出</Menu.Item>
//   </Menu>
// );
class Index extends React.Component<myprops,mystate> {


  private video: React.RefObject<HTMLVideoElement>;//视频节点
  // static getuser: any;
  showOpcity: any = null//存储 timeout 在 willumount 清除
  constructor(props:any) {
        super(props);
        this.video = React.createRef();
        this.state = {
          test: false,
          username: "",
          loading: true,
          SyncSuccess: false,
          Sync: false,
          Syncing: false,
          SyncError: false,
          SyncTodo: [],
          SyncTomato: []
        } as mystate
    }


  indexlogout = () => {
    // localStorage.removeItem("x-token")
    // localStorage.removeItem("userInfo")
    this.setState({
      username: ""
    })
    this.props.history.push("/login")
  }
  indexsignup = () => {
    this.props.history.push("/signup")
  }
  play = (e:any) => {
    // let video = document.querySelectorAll(".kv-vbg")
    let video = e
    // let play = document.querySelectorAll(".kv-vbg") as NodeListOf<VideoHTMLAttributes>
    if(video){
      // console.log(video.target);
      video.target.play()
    }
    
    // let video = this.refs("video")
    // video.play()
  }
  goPAGE = () => {                               
    
      if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) && window.innerWidth <= 500) {
      // window.location.href="移动端url";
          // alert("mobile")
          // document.getElementById()
          console.log("video",this.video.current)
          if(this.video.current && this.video.current.parentNode){
            this.video.current.parentNode.removeChild(this.video.current)
          }
          
      }
      else {
          // window.location.href="pc端url"; 
          // alert("pc")
      }
  }

  componentDidMount(){
    this.goPAGE()
    // console.log(localStorage.getItem("x-token"))
    // const userInfo = localStorage.getItem('userInfo')
    // if(localStorage.getItem("x-token") === null || ""){
    //   this.props.history.push("/login")
    // }else{
    //   if(userInfo !== null){
    // console.log("localstorage请求")
    //     this.setState({
    //       username: JSON.parse(userInfo).data.account//解析json字符串
    //     },() => {
    //       setTimeout(() => {
    //         const index = document.querySelector(".opsity")
    //       if(index){
    //         index.className = index.className.replace( new RegExp( "(\\s|^)" + 'opsity' + "(\\s|$)" )," " );
    //       }
    //       },500)
          
    //     })
    //   }else{
    //     this.getuser()
    //   }
    //   // this.getuser()
    // }

    //打印 控制台
    let Logo = `                                                                                                                                                      
                                                                                                                                                      
    :.     ::                     2r7sJjqbKdB  :7:LBQiriBBsiv:      PBu      .1vv7v7v7v7vL1                                        
   UBB     BB:                    5BB.SBL QBi  PBRBBBRBRBBBQBq      MB1      :BQZDZgDgZDZQB.                                       
   7BB     BB.   .5X7  .Lr    vi.BKBB2QBRXBBPQ   Sgi.   iI     r2sLiBBMrYs2r   YLU55X5S1vL                                         
   7BBKggZbBB.  BBUrBB: BBr  BB1   :PBbBUQEr.. dBBBQBB BBBBBB  BBBBBBBBBBBBB   BB.::::.:BB                                         
   rBBMBBQQBB  BBBiiRBB :BB .BB  BBBB:YB7.RBBBr  BB XB QB  BB       qBv        BB.ir7r:.BB                                         
   7BB     BB. BBR....:  ZBrBB   .BBirPBqriBB    Bd XB QB  BB       KBv        UBBKqqIMBBU                                         
   1BB     BB:  BBgs2B    BBBv    BBi:PB5:iBB   BB  BB QBviBB  ..   QBP  ...    1BK   QB:                                          
   .rr     7r    :UP5r    LBB     BBKKBBBXqBB  EBJbBBB BBBZBB BBBBBBBBBBBBBBgZBBBBBBBBBBBBBQ                                       
                       .QQBB      uY... ...JL   i .r:  :r  .:                 .     .    ...                                       
                       .Mgr                                                                                                        
`
    console.log(Logo)

    //判断用户是否登录
    let tempuser = ownUser();
    // console.log("登录凭证",tempuser);
    // console.log(JSON.stringify(tempuser))
    this.setState(() => ({
      username: tempuser.username
    }),
      () => {
        // console.log(this.state.username);
        // if (Object.keys(this.state.user).length !== 0) {
        //   this.setState({
        //     isLogin: true
        //   });
        // }
        //延迟视图加载
         this.showOpcity = setTimeout(() => {
            const index = document.querySelector(".opsity")
          if(index){
            index.className = index.className.replace( new RegExp( "(\\s|^)" + 'opsity' + "(\\s|$)" )," " );
          }
          },500)
      }
    );
    if(JSON.stringify(tempuser) === JSON.stringify({})){
      this.props.history.push("/login")
    }
    this.showOpcity = setTimeout(() => {
      this.setState( () => ({
        loading: false
      })
        );
    }, 1000);

    
    
  }


  static getDerivedStateFromProps = (nextProps:myprops, prevState:mystate):mystate => {
    let nextState = {} as mystate
    // console.log("props",nextProps)
    // console.log("state",prevState)
    nextState.test = true
    // console.log(nextState.test)
    // console.log(Index.toString())
    // Index.getuser()

    // let getuser =  async() => {
    //     try {
    //     const result:any = await axios.get("me")
    //     console.log(result)
    //     nextState.username = result.data.account
    //     console.log(nextState.username)
    //   } catch (error) {
    //     console.log(error,"获取用户失败")
    //   }
    //   // return nextState
    // }
    // getuser()
    
    return nextState
  }
  // 

  getuser = async() => {
    console.log("网络请求")
    try {
      const result:any = await axios.get("me")
      console.log(result)
      localStorage.setItem("userInfo",JSON.stringify(result))//转换json存储
      this.setState({
        username:result.data.account
      },()=>{
        this.showOpcity = setTimeout(() => {
          const index = document.querySelector(".opsity")
        if(index){
          index.className = index.className.replace( new RegExp( "(\\s|^)" + 'opsity' + "(\\s|$)" )," " );
        }
        },500)
        console.log(this.state.username)
      })
    } catch (error) {
      console.log(error,"获取用户失败")
    }
    
  }
  
  onClick = ({ key }:any) => {
    // message.info(`Click on item ${key}`);
    // console.log(key === '3')
    if(key === '3'){
      message.info("退出成功")
      signOut()
      this.indexlogout()
    }
  };
  menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item key="1">账号</Menu.Item>
      <Menu.Item key="2">偏好设置</Menu.Item>
      <Menu.Item key="3">退出</Menu.Item>
    </Menu>
  );


  componentWillUnmount(){
    // if(this.state.cutDownTime < 0){
      // localStorage.removeItem("Time")
      console.log("定时器已经销毁")
      clearTimeout(this.showOpcity)
    // }
}

showSuccessSync = () => {
  console.log('showSuccessSync')
  this.setState({
    SyncSuccess:true
  },() =>{
    setTimeout( () => {
      this.setState({
        SyncSuccess: false,
        Sync: false
      })
    },2000 )
  })
  
}

  Sync = () => {
    this.setState({
      Sync: true,
      Syncing: true
    })
    let user = ownUser();
    console.log('同步');
    TodoModel.getAll(user,
      (res:any) => {
      console.log('successFnTodo',res);
      // let tempTodoList = JSON.parse(JSON.stringify(this.state))//深拷贝
      // tempTodoList.Todolist = res
      // tempTodoList.Complete = res
      // tempTodoList.HasTodoList = true
      // this.setState(tempTodoList,() => {
      //   console.log("getByUserTodo",this.state)
      //   localStorage.setItem("Todolist",JSON.stringify(this.state.Todolist))
      //   localStorage.setItem("Complete",JSON.stringify(this.state.Complete))
      // })
      this.setState({
        SyncTodo: res,
        Syncing: false
      },() => {
        console.log(this.state.SyncTodo)
        localStorage.setItem("Todolist",JSON.stringify(this.state.SyncTodo))
        localStorage.setItem("Complete",JSON.stringify(this.state.SyncTodo))
        this.showSuccessSync()
      })
    },
    (error:any) => {
      this.setState({
        
      })
      console.log('errorFnTo',error)
    },
    (res:any) => {
      console.log('successTomato',res);
      // let tempTodoList = JSON.parse(JSON.stringify(this.state))//深拷贝
      // tempTodoList.Todolist = res
      // tempTodoList.Complete = res
      // tempTodoList.HasTodoList = true
      // this.setState(tempTodoList,() => {
      //   console.log("getByUserTodo",this.state)
      //   localStorage.setItem("Todolist",JSON.stringify(this.state.Todolist))
      //   localStorage.setItem("Complete",JSON.stringify(this.state.Complete))
      // })
      this.setState({
        SyncTomato: res
      },() => {
        console.log(this.state.SyncTomato)
        localStorage.setItem('Tomato',JSON.stringify(this.state.SyncTomato))
      })
    },
    (error:any) => {
      console.log('errorFnTomato',error)
    }

    )
   
  }


  render() {
    const SuccessSyncSvg = () => (
      <svg viewBox="0 0 32 32" id="icon-sync-succeed" width="1em" height="1em"><path d="M28.179 20.571h-5.321L26.287 24c-2.393 3.036-6.107 5.036-10.286 5.036-7.179 0-13.036-5.857-13.036-13.036 0-.786.071-1.536.214-2.286h-3C.072 14.464 0 15.214 0 16c0 8.821 7.179 16 16 16 5 0 9.429-2.321 12.357-5.929L32 29.714v-9.143h-3.821zM3.821 11.429h5.321L5.713 8c2.393-3.036 6.107-5.036 10.286-5.036 7.179 0 13.036 5.857 13.036 13.036 0 .786-.071 1.536-.214 2.286h3c.107-.75.179-1.5.179-2.286 0-8.821-7.179-16-16-16-5 0-9.429 2.321-12.357 5.929L0 2.286v9.143h3.821zm7.036 2.714l-2.5 2.5 6.25 6.25 10-11.25-2.5-2.5-7.5 8.75-3.75-3.75z"></path></svg>
    )

    const SuccessSyncIcon = (props:any) => (
      <Icon component={SuccessSyncSvg} {...props} />
    );

    const ErrorSyncSvg = () => (
      <svg viewBox="0 0 28 32" id="icon-sync-failed" width="1em" height="1em"><path d="M16 18h-4V8h4v10zm-4 6h4v-4h-4v4zm12.66-4H20l3 3c-2.1 2.66-5.34 4.4-9 4.4-6.28 0-11.4-5.12-11.4-11.4 0-.68.06-1.34.18-2H.16c-.1.66-.16 1.32-.16 2 0 7.72 6.28 14 14 14 4.38 0 8.26-2.04 10.82-5.18L28 28v-8h-3.34zM3.34 12H8L5 9c2.1-2.66 5.34-4.4 9-4.4 6.28 0 11.4 5.12 11.4 11.4 0 .68-.06 1.34-.18 2h2.62c.1-.66.16-1.32.16-2 0-7.72-6.28-14-14-14C9.62 2 5.74 4.04 3.18 7.18L0 4v8h3.34z"></path></svg>
    )
    const ErrorSyncIcon = (props:any) => (
      <Icon component={ErrorSyncSvg} {...props} />
    )

    // const LogoSvg = () => (
      
    // )

    // const LogoIcon = (props:any) => (
    //   <Icon component={LogoSvg} {...props} />
    // )


    // let showSync = "display: none;"

    return (
      <div className="index opsity">
      <Layout>
      <Header>

      <div className="logo">
      <img src={logo} alt=""/>
      <span>欢迎使用Hey番茄土豆</span>
      </div>
      <span>
      <Tooltip placement="top" title="同步成功" arrowPointAtCenter={true} getPopupContainer={() => document.body} autoAdjustOverflow>
      <SuccessSyncIcon className={ this.state.SyncSuccess ? `SuccessSyncIcon` : 'SuccessSyncIcon synchide' } />
      </Tooltip>
      <Tooltip placement="top" title="与服务器同步数据" arrowPointAtCenter={true} getPopupContainer={() => document.body} autoAdjustOverflow>      
      <Icon onClick={ this.Sync } type="sync" className={ this.state.Sync ? `sync synchide` : `sync` } />
      </Tooltip>
      <Tooltip placement="top" title="正在同步数据" arrowPointAtCenter={true} getPopupContainer={() => document.body} autoAdjustOverflow>      
      <Icon type="sync" className={ this.state.Syncing ? `syncing` : `syncing synchide` } />
      </Tooltip>
      <Tooltip placement="top" title="同步失败" arrowPointAtCenter={true} getPopupContainer={() => document.body} autoAdjustOverflow>
      <ErrorSyncIcon className={ this.state.SyncError ? `ErrorSyncIcon` : `ErrorSyncIcon synchide` } />
      </Tooltip>
              <Dropdown overlay={this.menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="javascript:;">
                <span>{ this.state.username || "请登录" } <Icon type="down" /></span>
                </a>
              </Dropdown>
      </span>
      
      </Header>
     
      <div className="index_main">
      <Skeleton loading={this.state.loading}>
      <Content>
        <Time SyncTomato={ this.state.SyncTomato } />
      </Content>
      </Skeleton>
      <Skeleton loading={this.state.loading}>
      <Content>
        <Todos SyncTodo={this.state.SyncTodo} />
      </Content>
      </Skeleton>
      </div>
      {/* <Footer>Footer</Footer> */}
    </Layout>
      {/* <header>
        
        
      </header> */}
      {/* <p>{ this.state.username }</p> */}
        
      
      {/* <Spin size="large" />
      <div>
        <Button onClick={this.indexlogout} type="primary" className="indexlogin">退出</Button>
       
      </div>
      <video ref={this.video} onTouchStart={this.play} onMouseLeave={this.play} muted autoPlay src={"https://raw.githubusercontent.com/liulinboyi/master/src/static/bg.mp4"} className="kv-vbg" preload="auto"></video>
       */}
        {/* <Login /> */}
        {/* <Button onClick={this.indexlogout} type="primary" className="indexlogin">退出</Button> */}
      </div>
    )
  }
}

export default withRouter<any>(Index)
