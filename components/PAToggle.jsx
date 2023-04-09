import React, { useCallback } from 'react';
import isEqual from 'react-fast-compare';
import classnames from 'classnames';

const texts = [ 'false', 'true' ];

const defaultProps = {
    showText: true
}

const PAToggle = React.forwardRef((props, ref) => {
    const {
        value,
        onChange,
        showText,
        ...otherProps
    } = props;

    const onToggle = useCallback(e => {
        onChange({
            event: e,
            target: e.target,
            value: !!e.target.checked,
            prevValue: value,
        });
    }, [ onChange, value ]);

    return (
        <div className={classnames('pa-toggle', { 'pa-toggle-true': value })}>
            <input {...otherProps} type='checkbox' checked={value} onChange={onToggle} ref={ref} />
            <div className="pa-toggle-btn"></div>
            {showText && <span className='pa-toggle-text'>{texts[ +value ]}</span>}
        </div>
    );
});

PAToggle.displayName = 'PAToggle';
PAToggle.defaultProps = defaultProps;

export default React.memo(PAToggle, isEqual);
