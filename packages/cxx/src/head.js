import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Head extends Component {
  static set canUseDOM(canUseDOM) {
    Helmet.canUseDOM = canUseDOM;
  }

  handleChange = newState => {
    // console.log('handleChange', newState);
  };

  render() {
    return <Helmet {...this.props} onChangeClientState={this.handleChange} />;
  }
}

Head.renderStatic = Helmet.renderStatic;

export default Head;
