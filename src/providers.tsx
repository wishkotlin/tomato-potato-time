import React from 'react';
// import Food from './foods';
import TimeAction from './components/time/TimeAction';
const DEFAULT_STATE = { allFood: TimeAction, searchTerm: '' };

export const Audio = React.createContext(DEFAULT_STATE);

export default class Provider extends React.Component {
  state = DEFAULT_STATE;
//   searchTermChanged = searchTerm => {
//     this.setState({searchTerm});
//   };

  render() {
    return (
      <Audio.Provider value={{
        ...this.state,
        // searchTermChanged: this.searchTermChanged,
      }}> {this.props.children} </Audio.Provider>);
  }
}
