import React from 'react';
import Head from 'cxx/head';

export default ({ title, children }) =>
  <div>
    <Head titleTemplate="%s" title={title} />
    {children}
  </div>;
