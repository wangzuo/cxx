import react, { Component } from 'react';

export default class ClientOnly extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    return this.props.childern(this.state.loading);
  }
}

