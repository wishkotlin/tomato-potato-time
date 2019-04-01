import React from 'react'
import { Input, Icon,Checkbox,Collapse,Tooltip } from 'antd';
interface myprops{

}
interface mystate{
    description: any,
    HasTodoList: boolean,
    Todolist:any,
    Complete:any,
    activeKey: any
}
class Todos extends React.Component<myprops,mystate> {

private todoinput: React.RefObject<any>;//视频节点
private checkbox: React.RefObject<any>

  constructor(props:any) {
    super(props);
    this.todoinput = React.createRef();
    this.checkbox = React.createRef()
    this.state = {
      description: "",
      HasTodoList: false,
      Todolist: [],
      Complete:[],
      activeKey: [""]
    };
  }

  enter = () => {
    // this.userNameInput.focus();
    let value = this.todoinput.current.input.value
    if(value !== ""){
        console.log(value)
        let newvalue = {
          value: value,
          checked: false
        }
      this.todoinput.current.focus()
      let tempenter = this.state.Todolist
      tempenter.push(newvalue)
      this.setState({ 
        // description: value,
        HasTodoList: true,
        Todolist: tempenter,
        description: ""
       },() => {
          this.todoinput.current.input.value = ""
          console.log(this.state.Todolist)
          localStorage.setItem("Todolist",JSON.stringify(this.state.Todolist))
      });
    }
    
  }

  onKeyPressed = (e:any) => {
    e.persist()
    let value = this.todoinput.current.input.value
    if(value !== ""){
      if(e.keyCode === 13){
            console.log(value)
            let newvalue = {
              value: value,
              checked: false
            }
        this.todoinput.current.focus()
        let tempenter = this.state.Todolist
        tempenter.push(newvalue)
        this.setState({ 
          // description: value,
          HasTodoList: true,
          Todolist: tempenter,
          description: ""
        },() => {
            this.todoinput.current.input.value = ""
            console.log(this.state.Todolist)
            localStorage.setItem("Todolist",JSON.stringify(this.state.Todolist))
        });
      }
      
    }
    
  }

  onChangeUserName = (e:any) => {
    this.setState({ description: e.target.value });
  }

  Change = (e:any,key:any) => {
    console.log('checked = ', e.target.checked);

    console.log("之前",this.state.description)
    // console.log("key",e)
    let check = this.checkbox.current
    console.log(check)
    console.log(key)
    let tempchange = this.state.Todolist
    let tempcom = this.state.Complete
    tempchange[key].checked = !tempchange[key].checked
    tempcom.push(tempchange[key])//已完成数组添加到已完成
    tempchange.splice(key,1)//删除已完成数组元素
    this.setState({
      Todolist: tempchange,
      description: this.todoinput.current.input.value,
      Complete: tempcom
    },() => {
      console.log("之后",this.state.description)
      console.log(this.state.Todolist)
      console.log(this.state.Complete)
      localStorage.setItem("Todolist",JSON.stringify(this.state.Todolist))
      localStorage.setItem("Complete",JSON.stringify(this.state.Complete))
    })
    if( this.state.Todolist.length === 0 ){
      this.setState( () => ({
        HasTodoList: false
      }) ,() => {
        console.log("没有待办事项了",this.state.HasTodoList)
      })
    }
  }

  Changecom = (e:any,key:any) => {
    console.log(key)
    let tempchange = this.state.Todolist
    let tempcom = this.state.Complete
    tempcom[key].checked = !tempcom[key].checked
    tempchange.push(tempcom[key])//已完成数组添加到已完成
    tempcom.splice(key,1)//删除已完成数组元素
    this.setState( () => ({
      Todolist: tempchange,
      description: this.todoinput.current.input.value,
      Complete: tempcom
    }),() => {
      console.log(this.state.Todolist)
      console.log(this.state.Complete)
      localStorage.setItem("Todolist",JSON.stringify(this.state.Todolist))
      localStorage.setItem("Complete",JSON.stringify(this.state.Complete))
    } )
    console.log(this.state.Todolist.length)
    if( this.state.Todolist.length !== 0 ){
      this.setState( () => ({
        HasTodoList: true
      }) ,() => {
        console.log("没有待办事项了",this.state.HasTodoList)
      })
    }
  }

  collapase = (e:any) => {
    console.log("activekey",this.state.activeKey)
    if(this.state.activeKey[0] === ""){
        this.setState( () => ({
        activeKey: ["1"],
        description: this.state.description
      }),() => {
        console.log(this.state.activeKey)
        localStorage.setItem("activeKey",JSON.stringify(this.state.activeKey))
      } )
    }else{
      this.setState( () => ({
        activeKey: [""],
        description: this.state.description
      }),() => {
        console.log(this.state.activeKey)
        localStorage.setItem("activeKey",JSON.stringify(this.state.activeKey))
      } )
    }
    
  }


  componentDidMount(){
    let tempTodolist = localStorage.getItem("Todolist")
    if(tempTodolist !== null){
      tempTodolist = JSON.parse(tempTodolist)
      console.log("非null tempTodolist",tempTodolist)
      if(tempTodolist !== null && tempTodolist.length === 0){
        this.setState( () => ({
          HasTodoList: false,
          Todolist: tempTodolist
        }),() => {
          console.log("没有TodoList",this.state.HasTodoList)
        } )
      }else{
        this.setState( () => ({
          HasTodoList: true,
          Todolist: tempTodolist
        }),() => {
          console.log("有TodoList",this.state.HasTodoList)
        } )
      }
        
     
    }
    let tempcom = localStorage.getItem("Complete")
      if(tempcom !== null){
        tempcom = JSON.parse(tempcom)
        
          this.setState( () => ({
            // HasTodoList: true,
            Complete: tempcom
          }) )
      
      }
    let tempactiveKey = localStorage.getItem("activeKey")
    if(tempactiveKey !== null){
      tempactiveKey = JSON.parse(tempactiveKey)//JSON获取后一定要 解析
      this.setState( () => ({
        activeKey: tempactiveKey
      }),() =>{
        console.log(this.state.activeKey)
      } )
    }
  }

  render() {
    // const CheckboxGroup = Checkbox.Group;
    const { description,HasTodoList,Complete } = this.state;
    // const plainOptions = Todolist;
    const suffix = description ? <Icon type="enter" onClick={this.enter} /> : null;
    const Todo = HasTodoList === false ? (<div className="check-circle">
    <Icon type="check-circle" />
    <p>没有记录</p>
  </div>) : ( this.state.Todolist.map((item:any,key:any) => {
   return <span key={key}><Checkbox ref={this.checkbox}  checked={item.checked} onChange={(e) => {this.Change(e,key)}} /><span>{ item.value }</span></span>
  }))
  const complate = Complete.length === 0 ? null : ( this.state.Complete.map((item:any,key:any) => {
    return <span key={key}><Checkbox checked={item.checked} onChange={(e) => {this.Changecom(e,key)}} /><span>{ item.value }</span></span>
   }))
   const Panel = Collapse.Panel;
   const CleanSvg = () => (
    <svg fill="#ccc" width="1em" height="1em" viewBox="0 0 32 32" id="icon-broom" >
    <path d="M13.12 13.024c-1.536.608-2.72 1.504-2.944 2.144-.32.896.064 1.76.8 1.824a6.65 6.65 0 0 1 1.536.512c.48.256 1.248.448 1.76.48.512.064 1.216.32 1.504.64.672.704 2.528 1.408 3.296 1.312.672-.096 1.184-1.12 1.024-2.08-.064-.416-.672-1.6-1.408-2.592l-1.248-1.792 1.248-3.52C20.704 4.16 21.184.8 20 .448c-.224-.032-.416-.096-.448-.064l-.384.256c-1.088.704-2.528 4.096-3.808 8.896l-.736 2.816-1.504.672zm7.008 18.24l1.6-.032-.8-4.896-.768-4.864-.832.128c-.512.064-1.728-.224-2.88-.704-1.088-.448-2.368-.864-2.784-.896-.48 0-1.088-.288-1.408-.608-.512-.512-2.656-1.44-3.072-1.344-.096.032-1.216 1.76-2.496 3.84l-2.336 3.808.928.992c2.528 2.784 8.832 4.736 14.848 4.576z"></path>
    </svg>
   )
   const CleanIcon = (props:any) => (
    <Icon component={CleanSvg} {...props} />
  );
    return (
      <div className="todo">
        <Input
        ref={this.todoinput}
        placeholder="待办事项"
        prefix={<Icon type="highlight" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
        value={description}
        onChange={this.onChangeUserName}
        onKeyDown={this.onKeyPressed}
        // ref={node => this.userNameInput = node}
      />

        {/* <div className="check-circle">
        <Icon type="check-circle" />
        <p>没有记录</p>
        </div> */}
        <div className="todo-list">
          { Todo }
        </div>
        <div className="complate">
          {/* { this.state.Complete.length === 0 ? null : <Tooltip placement="top" title={"收起最近的完成的任务"}><Button></Button></Tooltip>} */}
          
          { this.state.Complete.length === 0 ? null : (<div><Tooltip placement="topRight" title="清理最近完成的任务列表" arrowPointAtCenter={true} getPopupContainer={() => document.body} autoAdjustOverflow><CleanIcon className="CleanIcon" /></Tooltip>
          <Collapse onChange={this.collapase} bordered={false} defaultActiveKey={this.state.activeKey} activeKey={this.state.activeKey}>
          <Panel className="noselect" header="最近完成的任务" key="1">
          { complate }
            {/* {text} */}
          </Panel>
          </Collapse></div>)}
          
        </div>
      
      {/* { this.state.Todolist.map((item:any,key:any) => {
        console.log(item)
        return <label key={key}><input type="checkbox" value={item} /></label> 
      }) } */}
   
      </div>
      
    );
  }
}
export default Todos
