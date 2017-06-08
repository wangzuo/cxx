import React from 'react';
import Link from 'cxx/link';

export default () =>
  <div>
    <h1>index</h1>
    <div>
      <Link href="/hello">hello</Link> &nbsp;
      <Link href="/world">world</Link>
    </div>
  </div>;
