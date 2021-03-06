/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule WorldQuery.graphql
 * @generated SignedSource<<a7326d708872c3a56c5bbf14c58f368f>>
 * @relayHash 71e823256a24b454efb717ef586ad4b1
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';

*/


/*
query WorldQuery {
  world
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorldQuery",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": null,
        "name": "world",
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "WorldQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "WorldQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": null,
        "name": "world",
        "storageKey": null
      }
    ]
  },
  "text": "query WorldQuery {\n  world\n}\n"
};

module.exports = batch;
