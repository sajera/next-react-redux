
// outsource dependencies
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useControllerSubscribe, useControllerData, useControllerActions } from 'redux-saga-controller';

// local dependencies
import styles from './test.module.css';
import { test1Ctrl } from './controller';
import { Preloader } from '../../fe-components/preloader';

export default function Test1 () {
  useControllerSubscribe(test1Ctrl);
  const { initialized } = useControllerData(test1Ctrl);
  const { initialize } = useControllerActions(test1Ctrl);

  // NOT client side run initialization on component mount
  useEffect(() => { initialize({}); }, [initialize]);

  return <div>
    <Preloader active={!initialized}>
      <div className={styles.container}>
        <h2>
          test page 1
        </h2>
      </div>
    </Preloader>
    <ul>
      <li>
        <Link href="/">
          <a> Home </a>
        </Link>
      </li>
      <li>
        <Link href="/test1">
          <a className="test-class-name"> test 1 </a>
        </Link>
      </li>
      <li>
        <Link href="/test2">
          <a className="test-class-name"> test 2 </a>
        </Link>
      </li>
    </ul>
  </div>;
}
