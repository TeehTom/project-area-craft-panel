import React, { useCallback } from 'react';
import isEqual from 'react-fast-compare';
import classnames from 'classnames';

const PAButton = React.forwardRef((props, ref) => {
        const {
            onClick,
            className,
            children,
            invalid,
            ...otherProps
        } = props;

    return (
        <button {...otherProps} className={classnames('pa-button', className, { invalid })} onClick={onClick}>
            {children}
        </button>
    );
});

PAButton.displayName = 'PAButton';

export default React.memo(PAButton, isEqual);
