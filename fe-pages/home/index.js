
// outsource dependencies
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import styles from './home.module.css';
import { appRootCtrl } from '../_app/controller';
import { Preloader } from '../../fe-components/preloader';

// configure


export default function Index (props) {
  const state = useControllerData(appRootCtrl);
  const actions = useControllerActions(appRootCtrl);
  // NOTE app common actions
  useEffect(() => {
    console.log('%c Index ', 'color: #FF6766; font-weight: bolder; font-size: 12px;'
      , '\n state:', state
      , '\n actions:', actions
    );
  }, [state, actions]);

  return <div className={styles.container}>
    <h1> Props: <small> { JSON.stringify(props) } </small> </h1>
    <h2> State: <small> { JSON.stringify(state) } </small> </h2>
    <Preloader active={!state.initialized}>
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
    </Preloader>
  </div>;
}
