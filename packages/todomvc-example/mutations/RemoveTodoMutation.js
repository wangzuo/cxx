import { commitMutation, graphql } from 'cxx/react-relay';
import { ConnectionHandler } from 'cxx/relay-runtime';

const mutation = graphql`
  mutation RemoveTodoMutation($input: RemoveTodoInput!) {
    removeTodo(input: $input) {
      deletedTodoId,
      viewer {
        completedCount,
        totalCount,
      },
    }
  }
`;

function sharedUpdater(store, user, deletedID) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');
  ConnectionHandler.deleteNode(conn, deletedID);
}

function commit(environment, todo, user) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { id: todo.id }
    },
    updater: store => {
      const payload = store.getRootField('removeTodo');
      sharedUpdater(store, user, payload.getValue('deletedTodoId'));
    },
    optimisticUpdater: store => {
      sharedUpdater(store, user, todo.id);
    }
  });
}

export default { commit };
