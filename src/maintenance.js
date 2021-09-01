
// outsource dependencies
import React from 'react';

// local dependencies
import { FasIcon } from './components/fa-icon';

export default () => <div className="d-flex align-items-center justify-content-around h-100">
  <div className="text-center" style={{ width: 640, maxWidth: '95%' }}>
    <h1 className="mb-3 position-relative">
      <FasIcon icon="cog" size="3x" spin className="text-info" />
      <span className="position-absolute" style={{ left: '33%', top: '10%' }}>
        <FasIcon icon="cog" size="lg" spin className="text-success" />
      </span>
      <FasIcon icon="cog" size="5x" spin className="text-purple" />
      <FasIcon icon="cog" size="lg" spin className="text-warning ml-n2" />
    </h1>
    <h2> SITE IS UNDER MAINTENANCE </h2>
    <h5> We&#39;ll back online shortly! </h5>
  </div>
</div>;
