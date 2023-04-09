import React, { useCallback } from 'react';
import classnames from 'classnames';
import isEqual from 'react-fast-compare';

const PALoader = React.forwardRef((props, ref) => <div className='spinner'></div>);

PALoader.displayName = 'PALoader';

export default React.memo(PALoader, isEqual);
