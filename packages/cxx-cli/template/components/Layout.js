import styles from './Layout.css';
import React from 'react';
import Head from 'cxx/head';

export default ({ children, title }) =>
  <div className={styles.layout}>
    <Head title={title} titleTemplate="%s" />
    {children}
  </div>;
