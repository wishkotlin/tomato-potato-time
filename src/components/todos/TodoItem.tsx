import * as React from 'react';
import { Icon } from 'antd';
// import { connect } from 'react-redux';
// import {editTodo, updateTodo} from '../../redux/actions/todos'
import classNames from 'classnames';
import './TodoItem.scss'
// import axios from "../../config/axios";

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
	editback:any
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

	editTodo = () => {
		// this.props.editTodo(this.props.id)
		console.log('双击了')
		this.setState({
			editing: true
		})
		console.log("this.props.id",this.props.id)
		this.props.edit(this.props.id)
	}

	onKeyUp = (e:any)=>{
		if(e.keyCode === 13 && this.state.editText !== ''){
			this.updateTodo({description: this.state.editText})
		}
	}
	
	back = () => {
		this.props.editback()
	}

	componentDidMount(){
		
// 		var observe:any;  
 

//     observe = function (element:any, event:any, handler:any) {  
//         element.addEventListener(event, handler, false);  
//     };  
// function init () {  
// 	var text = document.querySelector('textarea');  
// 	if(text !== null){
// 		let  resize = () => {
// 			if(text !== null){
// 				text.style.height = 'auto';  
// 				text.style.height = text.scrollHeight+'px'; 
// 			} 
// 		}  
// 		/* 0-timeout to get the already changed text */  
// 		let delayedResize = () => {  
// 			window.setTimeout(resize, 0);  
// 		}  
// 		observe(text, 'change',  resize);  
// 		observe(text, 'cut',     delayedResize);  
// 		observe(text, 'paste',   delayedResize);  
// 		observe(text, 'drop',    delayedResize);  
// 		observe(text, 'keydown', delayedResize);  
	   
// 		text.focus();  
// 		text.select();  
// 		resize(); 
// 	}
     
// }  

// init ()

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
				<textarea value={this.state.editText}
				       onChange={e => this.setState({editText: e.target.value})}
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