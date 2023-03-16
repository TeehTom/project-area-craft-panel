import React, { useCallback, useRef } from 'react';
import isEqual from 'react-fast-compare';

import PAInput from '@/components/PAInput'
import PAButton from '@/components/PAButton'

const defaultProps = {
    value: []
}

const PAMultipleInput = React.forwardRef((props, ref) => {
    const {
        value: values,
        onChange,
        ...otherProps
    } = props;

    const multipleInputRef = useRef(ref);

    const onChangeValues = useCallback(({ event, target, value: valueInput }) => {
        const index = target?.dataset?.index;
        const current = multipleInputRef?.current;
        if (index && current) {
            const valuesTemps = [ ...values ];
            valuesTemps[ index ] = valueInput;
            onChange({
                event,
                target: current,
                value: valuesTemps,
                prevValue: values,
            });
        }
    }, [ values, onChange, multipleInputRef ]);

    const onClickAdd = useCallback(event => {
        const current = multipleInputRef?.current;
        if (current) {
            onChange({
                event,
                target: current,
                value: [ ...values, '' ],
                prevValue: values,
            });
        }
    }, [ values, onChange, multipleInputRef ]);

    const onPaste = useCallback(event => {
        const { target, clipboardData } = event;
        const index = target?.dataset?.index;
        const current = multipleInputRef?.current;

        if(current && index) {
            const valueInputSplit = (clipboardData || window.clipboardData).getData("text").replace(/[\r\n]+/gm, ' ').split(' ');
            let valuesTemps = [ ...values ];

            if (valueInputSplit.length > 1) {
                valuesTemps.splice(index, 0, ...valueInputSplit);
                onChange({
                    event,
                    target: multipleInputRef?.current,
                    value: valuesTemps.filter(Boolean),
                    prevValue: values,
                });
                event.preventDefault();
            }
        }
    }, [ values, onChange, multipleInputRef ]);

    const onClickRemove = useCallback(event => {
        const index = event.target?.dataset?.index;
        const current = multipleInputRef?.current;
        if (index && current) {
            const valuesTemps = [ ...values ];
            valuesTemps.splice(index, 1);
            onChange({
                event,
                target: current,
                value: valuesTemps,
                prevValue: values,
            });
        }
    }, [ values, onChange, multipleInputRef ]);

    return (
        <div className='pa-multiple' ref={multipleInputRef} {...otherProps}>
            {values.map((v, i) => (
                <div className='pa-multiple-input' key={i}>
                    <PAInput value={v} onChange={onChangeValues} data-index={i} onPaste={onPaste} />
                    {i > 0 && <PAButton onClick={onClickRemove} data-index={i} className='minus'>-</PAButton>}
                    {i === 0 && <PAButton onClick={onClickAdd}>+</PAButton>}
                </div>
            ))}
        </div>
    );
});

PAMultipleInput.displayName = 'PAMultipleInput';

export default React.memo(PAMultipleInput, isEqual);
