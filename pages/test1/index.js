
// outsource dependencies
import Link from 'next/link';
import { END } from 'redux-saga';
import React, { useEffect } from 'react';
import { subscribeAction, useController } from 'redux-saga-controller';

// local dependencies
import Main from '../../src/index';
import styles from './test.module.css';
import { test1Ctrl } from './controller';
import { nextReduxWrapper } from '../../src/store';
import { Preloader } from '../../src/components/preloader';

export default function Test () {
  const [{ initialized }, { initialize }] = useController(test1Ctrl);

  // NOT client side run initialization on component mount
  useEffect(() => { initialize({}); }, [initialize]);

  return <Main>
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
  </Main>;
}

export const getStaticProps = nextReduxWrapper.getStaticProps(
  store => async ({ req, res, ...etc }) => {
    // NOTE server side run initialization
    store.dispatch(subscribeAction(test1Ctrl));
    store.dispatch(test1Ctrl.action.initialize());
    // NOTE end the saga
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);
