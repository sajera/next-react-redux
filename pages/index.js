
// outsource dependencies
import Link from 'next/link'
import { END } from 'redux-saga';
import React, { useEffect } from 'react';
import { useController, subscribeAction, unsubscribeAction } from 'redux-saga-controller';

// local dependencies
import { appCtrl } from '../src/app-controller';
import { nextReduxWrapper } from '../src/store';
import { Preloader } from '../src/components/preloader';

// configure


export default function Index (props) {
  const [state, { initialize }] = useController(appCtrl);

  useEffect(() => { initialize({}); }, [initialize]);

  return <div>
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
// export const getInitialProps = nextReduxWrapper.getInitialPageProps(
//   store => async ({ req, res, ...etc }) => {
//     console.log('Index.getInitialProps');
//
//     // regular stuff
//     store.dispatch(subscribeAction(controller));
//     store.dispatch(controller.action.initialize());
//     // end the saga
//     store.dispatch(END);
//     store.dispatch(unsubscribeAction(controller));
//
//     await store.sagaTask.toPromise();
//   }
// );

export const getStaticProps = nextReduxWrapper.getStaticProps(
  store => async ({ req, res, ...etc }) => {
    // regular stuff
    store.dispatch(subscribeAction(appCtrl));
    store.dispatch(appCtrl.action.initialize());
    // end the saga
    store.dispatch(END);
    store.dispatch(unsubscribeAction(appCtrl));

    await store.sagaTask.toPromise();
  }
);
