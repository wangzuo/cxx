import { Component } from 'react';
import withSideEffect from 'react-side-effect';

class Head extends Component {
  render() {
    return null;
  }
}

function reducePropsToState(propsList) {
  const state = {};

  for (let i = 0, l = propsList.length; i < l; i++) {
    const props = propsList[i];

    if (props.title) state.title = props.title;
    if (props.titleTemplate) state.titleTemplate = props.titleTemplate;
    if (props.links) state.links = props.links;
    if (props.metas) state.metas = props.metas;
    if (props.scripts) state.scripts = props.scripts;
    if (props.stylesheets) state.stylesheets = props.stylesheets;
    if (props.ga) state.ga = props.ga;
  }

  return state;
}

function handleStateChangeOnClient(state) {
  const { title, titleTemplate } = state;

  if (title && titleTemplate) {
    document.title = titleTemplate.replace('%s', title);
  }
}

export default withSideEffect(reducePropsToState, handleStateChangeOnClient)(
  Head
);
