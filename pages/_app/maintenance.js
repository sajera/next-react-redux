
// outsource dependencies
import React, { memo } from 'react';

// local dependencies
import { CogIcon, SorDirection } from '../../components/icon';

// configure

export const Maintenance = memo(function Maintenance () {
  return <div className="d-flex align-items-center justify-content-center h-100">
    <div className="text-center" style={{ width: 640, maxWidth: '95%' }}>
      <h1 className="mb-3 position-relative">
        <CogIcon size="3x" spin className="text-info" />
        <span className="position-absolute" style={{ left: '33%', top: '10%' }}>
          <CogIcon size="lg" spin className="text-success" />
        </span>
        <CogIcon size="5x" spin className="text-purple" />
        <CogIcon size="lg" spin className="text-warning ml-n2" />
      </h1>
      <h2> SITE IS UNDER MAINTENANCE </h2>
      <h5> We&#39;ll back online shortly! </h5>
      <SorDirection />
      <SorDirection status={true} />
      <SorDirection status={false} />
    </div>
  </div>;
});
