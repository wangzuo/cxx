/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule MarkAllTodosMutation.graphql
 * @generated SignedSource<<77fe1de26f329843358862563b80b5bc>>
 * @relayHash fee522a70531df428533546d8915484f
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type MarkAllTodosInput = {
  complete?: ?boolean;
};

export type MarkAllTodosMutationResponse = {
  changedTodos?: ?Array<?MarkAllTodosMutationResponse_changedTodos>;
  viewer?: ?MarkAllTodosMutationResponse_viewer;
};

export type MarkAllTodosMutationResponse_changedTodos = {
  id: string;
  complete?: ?boolean;
};

export type MarkAllTodosMutationResponse_viewer = {
  id: string;
  completedCount?: ?number;
};
*/


/*
mutation MarkAllTodosMutation(
  $input: MarkAllTodosInput!
) {
  markAllTodos(input: $input) {
    changedTodos {
      id
      complete
    }
    viewer {
      id
      completedCount
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "MarkAllTodosInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MarkAllTodosMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "MarkAllTodosInput!"
          }
        ],
        "concreteType": "MarkAllTodosPayload",
        "name": "markAllTodos",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "name": "changedTodos",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "complete",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "MarkAllTodosMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "MarkAllTodosInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "MarkAllTodosMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "MarkAllTodosInput!"
          }
        ],
        "concreteType": "MarkAllTodosPayload",
        "name": "markAllTodos",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "name": "changedTodos",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "complete",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation MarkAllTodosMutation(\n  $input: MarkAllTodosInput!\n) {\n  markAllTodos(input: $input) {\n    changedTodos {\n      id\n      complete\n    }\n    viewer {\n      id\n      completedCount\n    }\n  }\n}\n"
};

module.exports = batch;
