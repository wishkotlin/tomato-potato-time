import { combineReducers } from "redux";//合并所有的reducer
// import visibilityFilter from "./visibilityFilter";
// import todos from "./todos";
import isshow from "./LoginRedux";//isshow 是 this.props.state里面的值

// export default combineReducers({ todos, visibilityFilter });
export default combineReducers({ isshow });
