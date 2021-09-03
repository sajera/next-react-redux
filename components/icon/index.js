
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import * as appIcons from './app-svg-icons';
import React, { memo, useMemo } from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// NOTE development only !!!
library.add(fas);
library.add(fab);
library.add(far);
// NOTE custom icons which we inject in font awesome
library.add({ ...appIcons });

/**
 * As main Icon component we will use the font-awesome really awesome component
 * @example
 * <Icon icon={['far', icon]} {...attr} />
 * <Icon icon={['fas', icon]} {...attr} />
 * <Icon icon={['fab', icon]} {...attr} />
 * <Icon icon={['app', icon]} {...attr} />
 */
export const Icon = FontAwesomeIcon;
/****************************************************
 *    prepared icons
 ****************************************************/
library.add(fas.faCog);
export const CogIcon = memo(function CogIcon (props) {
  return <FontAwesomeIcon icon={['fas', 'cog']} {...props} />;
});

library.add(fas.faSort);
export const SortIcon = memo(function SortIcon (props) {
  return <FontAwesomeIcon icon={['fas', 'sort']} {...props} />;
});

library.add(fas.faSortAmountUp);
export const SortAmountUpIcon = memo(function SortAmountUpIcon (props) {
  return <FontAwesomeIcon icon={['fas', 'sort-amount-up']} {...props} />;
});

library.add(fas.faSortAmountDown);
export const SortAmountDownIcon = memo(function SortAmountDownIcon (props) {
  return <FontAwesomeIcon icon={['fas', 'sort-amount-down']} {...props} />;
});

export const SorDirection = memo(function SortingIcon ({ status, classMap, statusMap, className, ...attr }) {
  const Icon = useMemo(() => statusMap(status), [statusMap, status]);
  return <Icon { ...attr } className={cn('sort-direction', classMap(status, attr), className)} />;
});
SorDirection.propTypes = {
  status: PropTypes.any,
  classMap: PropTypes.func,
  statusMap: PropTypes.func,
  className: PropTypes.string,
};
SorDirection.defaultProps = {
  status: null,
  className: '',
  statusMap: status => {
    switch (status) {
      default: return SortIcon;
      case true: return SortAmountUpIcon;
      case false: return SortAmountDownIcon;
    }
  },
  classMap: (status, { disabled }) => {
    switch (status) {
      default: return cn('ml-1 mr-1 text-thin', disabled ? 'text-muted' : 'text-gray');
      case true: return cn('ml-1 mr-1 text-bold', disabled ? 'text-muted' : 'text-gray-d');
      case false: return cn('ml-1 mr-1 text-bold', disabled ? 'text-muted' : 'text-gray-d');
    }
  }
};
