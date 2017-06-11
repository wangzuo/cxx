import styles from './Layout.css';
import React from 'react';
import Head from 'cxx/head';
import Link from 'cxx/link';

const metas = [
  { charset: 'utf-8' },
  { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
  { name: 'renderer', content: 'webkit' },
  {
    name: 'viewport',
    content:
      'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'
  }
];

const Layout = ({ title, titleTemplate, children }) =>
  <div className={styles.layout}>
    <Head metas={metas} titleTemplate={titleTemplate} title={title} />
    <h1>Hello World Example</h1>
    <div className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/hello">Hello</Link>
      <Link href="/world">World</Link>
      <a href="/q?query={ hello world }">Graphiql</a>
    </div>
    {children}
  </div>;

Layout.defaultProps = {
  titleTemplate: '%s - Hello World Example'
};

export default Layout;
