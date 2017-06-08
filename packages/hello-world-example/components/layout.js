import styles from './layout.css';
import React from 'cxx/react';
import Head from 'cxx/head';

const Layout = ({ title, titleTemplate, children }) =>
  <div className={styles.layout}>
    <Head titleTemplate={titleTemplate} title={title} />
    <h1>Hello World Example</h1>
    {children}
  </div>;

Layout.defaultProps = {
  titleTemplate: '%s - Hello World Example'
};

export default Layout;
