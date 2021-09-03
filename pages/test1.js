
// outsource dependencies
import { END } from 'redux-saga';
import { subscribeAction } from 'redux-saga-controller';

// local dependencies
import Test2 from '../fe-pages/test1';
import { test1Ctrl } from '../fe-pages/test1/controller';
import { nextReduxWrapper } from '../fe-services/store.service';

// configure

export default Test2;

export const getStaticProps = nextReduxWrapper.getStaticProps(
  store => async ({ request, response, ...etc }) => {
    // NOTE ssr run initialization
    store.dispatch(subscribeAction(test1Ctrl));
    store.dispatch(test1Ctrl.action.initializeSSR(request));
    // NOTE end the saga
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);
