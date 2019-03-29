import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from "./redux/store"


// const reducer = function (state:any,action:any){
//     switch(action.type){
//       case "INCREMENT":
//           return state + 1
//       case "DECREMENT":
//           return state - 1
//       case "add":
//           return state + action.payload
//       default:
//           return state
//   }
// }

// const store = createStore(reducer)

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)


// ReactDOM.render(
//   <App />,
//   document.getElementById('root') as HTMLElement
// );
registerServiceWorker();

