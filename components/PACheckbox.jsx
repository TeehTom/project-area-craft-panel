import React, { useCallback } from 'react';
import classnames from 'classnames';
import isEqual from 'react-fast-compare';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const defaultProps = {
    value: false,
    disabled: false,
    className: undefined,
};

const PACheckbox = React.forwardRef((props, ref) => {
    const {
        className,
        onChange,
        disabled,
        value,
        ...otherProps
    } = props;
    
    const onChangeCheckBox = useCallback(event => {
        if (disabled){
            return;
        }

        onChange({
            event: event,
            target: event.target,
            value: !value,
            prevValue: value,
        });
    }, [ value, disabled, onChange ]);

    return (
        <label className={classnames('PAcheckbox-wrapper', { disabled, checked: value === true })}>
            <input
                type='checkbox'
                className={classnames('PAcheckbox', className)}
                onChange={onChangeCheckBox}
                checked={value}
                disabled={disabled}
                {...otherProps}
            />
            {value && <FontAwesomeIcon className='PAcheckbox-icon' icon={faCheck} />}
        </label>
    );
});

PACheckbox.displayName = 'PACheckbox';
PACheckbox.defaultProps = defaultProps;

export default React.memo(PACheckbox, isEqual);
