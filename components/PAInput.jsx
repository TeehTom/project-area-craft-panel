import React, { useCallback } from 'react';
import isEqual from 'react-fast-compare';

const defaultProps = {
    type: 'text'
};

const PAInput = React.forwardRef((props, ref) => {
    const {
        value,
        onChange,
        type,
        ...otherProps
    } = props;

    const onChangeInput = useCallback(event => {
        onChange({
            event: event,
            target: event.target,
            value: event.target.value,
            prevValue: value,
        });
    }, [ onChange ]);

    return (
        <div className='pa-input'>
            <input {...otherProps} type={type} value={value} onChange={onChangeInput} ref={ref} />
        </div>
    );
});


PAInput.displayName = 'PAInput';
PAInput.defaultProps = defaultProps;

export default React.memo(PAInput, isEqual);
