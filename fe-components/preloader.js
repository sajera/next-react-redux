
// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';

/**
 * contain logic to hide elements which wrapped by preloader
 */
export const withLoader = fn => ({ active = false, children = null, ...attr }) => !active ? children : fn(attr);
// NOTE common propTypes for wrapped components
withLoader.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.element, PropTypes.node])
};

/**
 * Prepared default preloader same as on "public/index.html"
 */
export const Preloader = withLoader(props => <div className="def-preloader" {...props}>
  <div id="SPW">
    <div id="SP_1" className="sp"> </div>
    <div id="SP_2" className="sp"> </div>
    <div id="SP_3" className="sp"> </div>
    <div id="SP_4" className="sp"> </div>
    <div id="SP_5" className="sp"> </div>
    <div id="SP_6" className="sp"> </div>
    <div id="SP_7" className="sp"> </div>
    <div id="SP_8" className="sp"> </div>
  </div>
</div>);
Preloader.propTypes = {
  ...withLoader.propTypes,
};

export const BoxLoader = props => <Preloader className="box-preloader h-100" {...props} />;

/**
 * Prepared Spinner
 */
export const Spinner = withLoader(props => {
  // NOTE detect IE8 and above, and edge
  const isShit = window.document.documentMode || /Edge/.test(window.navigator.userAgent);
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    viewBox="20 20 60 60"
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="img"
    // NOTE use fontawesome class to emulate animation
    className={isShit ? 'fa-spin' : ''}
    {...props}
  >
    { seeds.map((item, i) => <Seed key={i} {...item} />) }
  </svg>;
});
Spinner.propTypes = {
  ...withLoader.propTypes,
};
const seeds = [
  { transform: 'rotate(0 50 50)', begin: '-0.9166666666666666s' },
  { transform: 'rotate(30 50 50)', begin: '-0.8333333333333334s' },
  { transform: 'rotate(60 50 50)', begin: '-0.75s' },
  { transform: 'rotate(90 50 50)', begin: '-0.6666666666666666s' },
  { transform: 'rotate(120 50 50)', begin: '-0.5833333333333334s' },
  { transform: 'rotate(150 50 50)', begin: '-0.5s' },
  { transform: 'rotate(180 50 50)', begin: '-0.4166666666666667s' },
  { transform: 'rotate(210 50 50)', begin: '-0.3333333333333333s' },
  { transform: 'rotate(240 50 50)', begin: '-0.25s' },
  { transform: 'rotate(270 50 50)', begin: '-0.16666666666666666s' },
  { transform: 'rotate(300 50 50)', begin: '-0.08333333333333333s' },
  { transform: 'rotate(330 50 50)', begin: '0s' },
];
const Seed = ({ transform, begin }) => <g transform={transform}>
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin={begin} repeatCount="indefinite" />
  </rect>
</g>;
Seed.propTypes = {
  begin: PropTypes.string.isRequired,
  transform: PropTypes.string.isRequired,
};

export default Preloader;
