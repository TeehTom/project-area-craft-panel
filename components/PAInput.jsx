import React, { useCallback } from 'react';
import classnames from 'classnames';
import isEqual from 'react-fast-compare';

const defaultProps = {
    type: 'text'
};

const PAInput = React.forwardRef((props, ref) => {
    const {
        value,
        onChange,
        type,
        invalid,
        className,
        ...otherProps
    } = props;

    const onChangeInput = useCallback(event => {
        onChange({
            event: event,
            target: event.target,
            value: event.target.value,
            prevValue: value,
        });
    }, [ onChange, value ]);

    return (
        <div className={classnames('pa-input-wrapper', className)}>
            <div className={classnames('pa-input', { invalid: Boolean(invalid)})}>
                <input {...otherProps} type={type} value={value} onChange={onChangeInput} ref={ref} />
            </div>
            {invalid && <span className='pa-input-invalid'>{invalid}</span>}
        </div>
    );
});


PAInput.displayName = 'PAInput';
PAInput.defaultProps = defaultProps;

export default React.memo(PAInput, isEqual);
