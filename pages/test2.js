
// outsource dependencies
import { END } from 'redux-saga';
import { subscribeAction } from 'redux-saga-controller';

// local dependencies
import Test2 from '../fe-pages/test2';
import { test2Ctrl } from '../fe-pages/test2/controller';
import { nextReduxWrapper } from '../fe-services/store.service';

// configure

export default Test2;

export const getStaticProps = nextReduxWrapper.getStaticProps(
  store => async ({ request, response, ...etc }) => {
    // NOTE ssr run initialization
    store.dispatch(subscribeAction(test2Ctrl));
    store.dispatch(test2Ctrl.action.initializeSSR(request));
    // NOTE end the saga
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);
