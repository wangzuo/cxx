import styles from './Home.css';
import React from 'react';
import Layout from '../components/Layout';

export default () =>
  <Layout title="Home">
    <div className={styles.wrap}>
      <div className={styles.title}>Home</div>
    </div>
  </Layout>;
