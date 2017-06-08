import React from 'cxx/react';
import Link from 'cxx/link';
import Layout from '../components/layout';

export default () =>
  <Layout titleTemplate="%s" title="Hello World Example">
    <div>
      <Link href="/hello">Hello</Link> &nbsp;
      <Link href="/world">World</Link>
    </div>
  </Layout>;
