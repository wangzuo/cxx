/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule HelloQuery.graphql
 * @generated SignedSource<<6cb10d397f2b5c27f2f8f438bf122f17>>
 * @relayHash d9918b30378378e884657ef6b6c17c20
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';

*/


/*
query HelloQuery {
  hello
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HelloQuery",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": null,
        "name": "hello",
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "HelloQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "HelloQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": null,
        "name": "hello",
        "storageKey": null
      }
    ]
  },
  "text": "query HelloQuery {\n  hello\n}\n"
};

module.exports = batch;
