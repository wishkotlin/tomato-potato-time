import * as React from 'react';
import { Icon } from 'antd';
// import { connect } from 'react-redux';
// import {editTodo, updateTodo} from '../../redux/actions/todos'
import classNames from 'classnames';
import './TodoItem.scss'
// import axios from "../../config/axios";
// import { TodoModel } from "../../utils/learnCloud"
interface ITodoItemProps {
	id: number;
	description: string;
	completed: boolean;
	editing: boolean;
	editTodo: (id:number)=>any;
	updateTodo: (payload:any)=> any;
	value: any,
	Tkey:any,
	edit:any,
	editback:any,
	checked: boolean,
	del: boolean,
	editChange: (value:any) =>any;
}

interface ITodoItemState {
	editText: string,
	editing:any
}

class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
	constructor(props:any){
		super(props)
		this.state = {
			editText: this.props.value,
			editing: this.props.editing
		}
	}

	updateTodo = async (params:any) => {
		if(params.completed){
			params.completed_at = new Date()
		}
		try {
			// const response = await axios.put(`todos/${this.props.id}`,params)
			// this.props.updateTodo(response.data.resource)
		}catch (e) {
			throw new Error(e)
		}
	}

	editTodo = (e:any) => {
		// this.props.editTodo(this.props.id)
		console.log('双击了')
		this.setState({
			editing: true
		})
		console.log("this.props.id",this.props.id)
		this.props.edit(this.props.id)
		// console.log(e.target)
		let textarea = e.target.previousSibling.firstChild
		console.log(textarea)
		// let textarea:HTMLTextAreaElement | null = document.querySelector('#textarea');
		if(textarea !== null){
			console.log(e.target.clientHeight)
			textarea.style.height = e.target.clientHeight + 'px';
		}
		
	}

	onKeyUp = (e:any)=>{
		if(e.keyCode === 13 && this.state.editText !== ''){
			// this.updateTodo({description: this.state.editText})
			interface temp{
				id:any,
				value:any,
				checked:any,
				del: any,
				editing?:any
			}
			let tempchange:temp = {
				id: this.props.id,
				value: this.state.editText,
				checked: this.props.checked,
				del: this.props.del
			}
			tempchange = {...tempchange,editing:false}
			this.props.editChange(tempchange)
			// TodoModel.update(
			// 	tempchange,
			// 	() => {//修改成功
			// 	this.props.editChange(tempchange)
			// 	},
			// 	(error:any) => {//修改失败
			// 	  console.log("修改错误",error);
				 
			// 	}
			//   );
		}
	}
	
	back = () => {
		this.props.editback()
	}

	Onchange = (e:any) => {
		this.setState({editText: e.target.value.replace(/[\r\n]/g,"")})
		// console.log(e.target)
		// console.log(e)
		this.makeExpandingArea(e.target)
	}

	makeExpandingArea = (el:any) => {
		// console.log("执行了 textarea 重新设置高度")
			var timer:any = null;
		//由于ie8有溢出堆栈问题，故调整了这里
		var setStyle = function(el:any, auto?:any) {
			if (auto) el.style.height = 'auto';
			el.style.height = el.scrollHeight + 'px';
		}
		var delayedResize = function(el:any) {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(function() {
				setStyle(el)
			}, 200);
		}
		if (el.addEventListener) {
			el.addEventListener('input', function() {
				// console.log('input')
				// console.log(el.value)
				if(el.value.endsWith("\n") === true){
					// console.log("回车")
					el.style.height = el.scrollHeight -21 + 'px';
				}else{
					// setStyle(el, 1);
					// setStyle(el,1)
					el.style.height = 'auto'
					el.style.height = el.scrollHeight + 'px';
					// console.log(el.scrollHeight)
				}
				
			}, false);
			
		} else if (el.attachEvent) {
			el.attachEvent('onpropertychange', function() {
				// console.log("onpropertychange")
				el.style.height = el.scrollHeight + 'px';
			})
			el.style.height = el.scrollHeight + 'px';
		}
		let win:any = window;
		if (win.VBArray && window.addEventListener) { //IE9
			el.attachEvent("onkeydown", function() {
				var key = win.event.keyCode;
				if (key == 8 || key == 46) delayedResize(el);
				if(key == 13){
					// console.log('按下了回车')
				}
			});
			el.attachEvent("oncut", function() {
				delayedResize(el);
			}); //处理粘贴
		}
	}

	componentDidMount(){
		
		
		

	}

	public render() {
		const Edting = classNames({
			editing: this.props.editing
		})
		const text = classNames({
			text: !this.props.editing
		})
		const Editing = (
			<div className={Edting} style={{display: 'none'}}>
				<textarea rows={1} id="textarea" value={this.state.editText}
				       onChange={this.Onchange}
				       onKeyUp={this.onKeyUp}
				/>
				<div className="iconWrapper">
					<Icon type="rollback" onClick={ this.back } />
					<Icon type="enter" />
					<Icon type="delete" theme="filled"
					      onClick={e => this.updateTodo({deleted: true})}/>
				</div>
			</div>
		)
		const Text = <div style={{display:'none'}} className={text} onDoubleClick={this.editTodo}>{this.props.value}</div>
		const todoItemClass = classNames({
			TodoItem: true,
			editing: this.state.editing,
			completed: this.props.completed
		})
		return (
			<div className={todoItemClass} id="TodoItem">
				{/* <Checkbox checked={this.props.completed}
				          onChange={e=> this.updateTodo({completed: e.target.checked})}
				/> */}
				{Editing}
				{Text}
				{/* {this.state.editing?Editing:Text} */}
			</div>
		);
	}
}

// const mapStateToProps = (state, ownProps) => ({
// 	...ownProps
// })

// const mapDispatchToProps = {
// 	editTodo,
// 	updateTodo
// }

export default TodoItem;