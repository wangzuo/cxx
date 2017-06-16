import { graphql } from 'graphql';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

export default (schema, context) => {
  const source = new RecordSource();
  const store = new Store(source);
  const handleProvider = null;
  const fetchQuery = async (operation, variables, cacheConfig, uploadables) => {
    const result = await graphql(
      schema,
      operation.text,
      {},
      context,
      variables
    );
    // todo: error
    if (result.errors) {
      console.error(result.errors);
    }
    return result;
  };
  const network = Network.create(fetchQuery);
  const environment = new Environment({
    handleProvider,
    network,
    store
  });

  return environment;
};
