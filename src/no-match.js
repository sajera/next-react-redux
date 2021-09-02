/* eslint react/prop-types: "off" */

// outsource dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

// local dependencies
import * as ROUTES from './constants/routes';

// TODO developer component to test router features
export default props => <div className="container-fluid">
  <div className="row">
    <h3 className="col-10 offset-1 text-center top-indent-4">
            No Match page for&nbsp;
      <code> { props.location.pathname } </code>
    </h3>
  </div>
  <div className="row">
    <h3 className="col-10 offset-1 text-center top-indent-4">
            Props
      <hr/>
      <code> { JSON.stringify(props) } </code>
      <hr/>
    </h3>
  </div>
  <div className="row">
    <div className="h1 col-12">
            Toastr
    </div>
  </div>
  <div className="row align-items-center" style={{ height: '200px' }}>
    <div className="col-2">
      <button className="btn btn-block btn-dark" onClick={e => toastr.message('title', '1')}>
                1
      </button>
    </div>
    <div className="col-2">
      <button className="btn btn-block btn-light" onClick={e => toastr.light('title', '2')}>
                2
      </button>
    </div>
    <div className="col-2">
      <button className="btn btn-block btn-warning" onClick={e => toastr.warning('title', '3')}>
                3
      </button>
    </div>
    <div className="col-2">
      <button className="btn btn-block btn-danger" onClick={e => toastr.error('title', '4')}>
                4
      </button>
    </div>
    <div className="col-2">
      <button className="btn btn-block btn-info" onClick={e => toastr.info('title', '5')}>
                5
      </button>
    </div>
    <div className="col-2">
      <button className="btn btn-block btn-success" onClick={e => toastr.success('title', '6')}>
                6
      </button>
    </div>
  </div>
  <div className="row">
    <div className="h1 col-12">
            Router
    </div>
  </div>
  <div className="row">
    <div className="h3 col-12">
            Publick
    </div>
  </div>
  <div className="row align-items-center" style={{ height: '100px' }}>
    <div className="col-2">
      <Link to={'/'}>
        <button className="btn btn-sm btn-block btn-default">
                    /
        </button>
      </Link>
    </div>
    <div className="col-2">
      <Link to={ROUTES.SIGN_IN.LINK()}>
        <button className="btn btn-sm btn-block btn-primary">
          <i className="fa fa-sign-in" aria-hidden="true"> </i>
                    &nbsp;SIGN IN
        </button>
      </Link>
    </div>
    <div className="col-2">
      <Link to={ROUTES.FORGOT_PASSWORD.LINK()}>
        <button className="btn btn-sm btn-block btn-warning">
          <i className="fa fa-ban" aria-hidden="true"> </i>
                    &nbsp;FORGOT PASSWORD
        </button>
      </Link>
    </div>
    <div className="col-2">
      <Link to={ROUTES.CHANGE_PASSWORD.LINK({ token: 'test-token' })}>
        <button className="btn btn-sm btn-block btn-danger">
                    CHANGE PASSWORD
        </button>
      </Link>
    </div>
    <div className="col-2">
      <Link to={ROUTES.EMAIL_CONFIRMATION.LINK({ token: 'test-token' })}>
        <button className="btn btn-sm btn-block btn-info">
                    EMAIL CONFIRMATION
        </button>
      </Link>
    </div>
    <div className="col-2">
      <Link to={ROUTES.SIGN_UP.LINK()}>
        <button className="btn btn-sm btn-block btn-success">
                    SIGN UP
        </button>
      </Link>
    </div>
  </div>
  <div className="row">
    <div className="col-3">
      <h1>1</h1>
    </div>
  </div>
  <div className="row">
    <div className="col-3">
      <h1>2</h1>
    </div>
  </div>
  <div className="row">
    <div className="col-3">
      <h1>3</h1>
    </div>
  </div>
  <div className="row">
    <div className="col-3">
      <h1>4</h1>
    </div>
  </div>
  <div className="row">
    <div className="col-3">
      <h1>5</h1>
    </div>
  </div>
  <div className="row">
    <div className="col-3">
      <h1>6</h1>
    </div>
  </div>
  <div className="row">
    <div className="col-3">
      <h1>7</h1>
    </div>
  </div>
  <div className="row">
    <div className="col-3">
      <h1>8</h1>
    </div>
  </div>
</div>;
