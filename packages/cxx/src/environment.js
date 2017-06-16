import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const source = new RecordSource(
  typeof window === 'undefined' ? null : window.__DATA__
);
const store = new Store(source);
const handleProvider = null;
const fetchQuery = (operation, variables, cacheConfig, uploadables) =>
  fetch('/q', {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(resp => resp.json());
const network = Network.create(fetchQuery);

// shareable relay environment on client side
const environment = new Environment({
  handleProvider,
  network,
  store
});

if (typeof window !== 'undefined') {
  window.cxx = window.cxx || {};
  window.cxx.environment = environment;
}

export default environment;
