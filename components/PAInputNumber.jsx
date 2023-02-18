import React, { useCallback } from 'react';
import isEqual from 'react-fast-compare';

import PAInput from '@/components/PAInput'

const PAInputNumber = React.forwardRef((props, ref) => {
    const {
        value,
        onChange,
        ...otherProps
    } = props;

    return <PAInput {...otherProps} type='number' value={value} onChange={onChange} ref={ref} />;
});


PAInputNumber.displayName = 'PAInputNumber';

export default React.memo(PAInputNumber, isEqual);
