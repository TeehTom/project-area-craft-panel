import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import isEqual from 'react-fast-compare';

import PAInputNumber from '@/components/PAInputNumber'

const defaultProps = {
    type: 'text'
};

const PASelect = React.forwardRef((props, ref) => {
    const {
        value,
        onChange,
        options,
        type,
        className,
        custom,
        customComponent,
        ...otherProps
    } = props;

    const [ open, setOpen ] = useState(false);
    const onClick = useCallback(event => {
        setOpen(prev => !prev);
        event.stopPropagation();
    }, [ setOpen ]);

    const onChangeInput = useCallback(event => {
        onChange({
            event: event,
            target: event.target,
            value: event.target.dataset.value,
            prevValue: value,
        });
    }, [ onChange, value ]);

    const onClickOutside = useCallback(event => setOpen(false), [ setOpen ]);

    useEffect(() => {
        document.addEventListener('click', onClickOutside);
        return () => {
            document.removeEventListener('click', onClickOutside);
        }
    }, [ onClickOutside ]);

    return (
        <div {...otherProps} className={classnames('pa-select', className, { open })} ref={ref}>
            <div className='pa-select-wrapper'>
                <button
                    className='pa-select-btn'
                    onClick={onClick}
                >
                    {options?.find(option => custom ? custom && option.custom : option?.value === value )?.name}
                </button>
                <div className='pa-select-options'>
                    {
                        open && options.length > 0 && options.map((option, index) => (
                            <div
                                key={index}
                                className={classnames('pa-select-option', { selected: option?.value === value || (custom && option.custom)})}
                                data-value={option?.value || 'nodata'}
                                onClick={onChangeInput}
                            >
                                {(option?.name) || 'aucun nom'}
                            </div>
                        ))
                    }
                </div>
                {Boolean(custom) && <div>{customComponent}</div>}
            </div>
        </div>
    );
});


PASelect.displayName = 'PASelect';
PASelect.defaultProps = defaultProps;

export default React.memo(PASelect, isEqual);
