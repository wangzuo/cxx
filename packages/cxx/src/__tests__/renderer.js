import React from 'react';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import renderer from '../renderer';
import Head from '../head';

Head.canUseDOM = false;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'Hello'
      }
    }
  })
});

test('render without schema', async () => {
  const page = {
    default: () => <div>test</div>
  };
  const routes = {
    '/': page
  };

  const html = await renderer(routes)('/');
  expect(html).toMatchSnapshot();
});

test('render with head', async () => {
  const page = {
    default: () =>
      <div>
        <Head>
          <title>test</title>
        </Head>
        test
      </div>
  };
  const routes = {
    '/': page
  };

  const html = await renderer(routes)('/');
  expect(html).toMatchSnapshot();
});

test('default 404', async () => {
  const html = await renderer()('/');
  expect(html).toMatchSnapshot();
});
