import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/Success.module.scss';
const success = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Success your order is received</h1>
    </div>
  );
};

export default success;
