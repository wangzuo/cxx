import React from 'react';
import TodoApp from '../components/TodoApp';

export const query = graphql`
  query HomeQuery {
    viewer {
      ...TodoApp_viewer
    }
  }
`;

export default ({ props, error }) => <TodoApp viewer={props.viewer} />;
