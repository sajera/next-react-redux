
// outsource dependencies
import Link from 'next/link';
import { END } from 'redux-saga';
import React, { useEffect } from 'react';
import { subscribeAction, useControllerActions, useControllerData, useControllerSubscribe } from 'redux-saga-controller';

// local dependencies
import styles from './test.module.css';
import { test2Ctrl } from './controller';
import { nextReduxWrapper } from '../../src/store';
import { Preloader } from '../../src/components/preloader';

export default function Test () {
  useControllerSubscribe(test2Ctrl);
  const { initialized } = useControllerData(test2Ctrl);
  const { initialize } = useControllerActions(test2Ctrl);

  // NOT client side run initialization on component mount
  useEffect(() => { initialize({}); }, [initialize]);

  return <div>
    <Preloader active={!initialized}>
      <div className={styles.container}>
        <h1>
          test page 2
        </h1>
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
          <a className="test-class-name"> test 1</a>
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

export const getStaticProps = nextReduxWrapper.getStaticProps(
  store => async ({ req, res, ...etc }) => {
    // NOTE server side run initialization
    store.dispatch(subscribeAction(test2Ctrl));
    store.dispatch(test2Ctrl.action.initialize());
    // NOTE end the saga
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);
