
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// local dependencies


export const BtnLocal = memo(({ type, title, className, disabled, children, onClick, data }) => {
  const { t } = useTranslation();
  const localTitle = useMemo(() => t(title, data), [t, title, data]);
  // NOTE list of allowed properties to pass to in to the button
  return <button
    type={type}
    onClick={onClick}
    title={localTitle}
    disabled={disabled}
    aria-label={localTitle}
    className={cn('btn', className)}
  >
    { children }
  </button>;
});
BtnLocal.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  data: PropTypes.object,
};
BtnLocal.defaultProps = {
  disabled: false,
  type: 'button',
  onClick: null,
  className: '',
  title: null,
  data: null,
};

