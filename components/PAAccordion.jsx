import React, { useState, useCallback, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'


const defaultProps = {
    AdditionalCondition: true
};

const PAAccordion = React.forwardRef((props, ref) => {
    const {
        title,
        children,
        className,
        AdditionalBtn,
        AdditionalCondition,
        open,
        ...otherProps
    } = props;

    const [ stateAccordion, setStateAccordion ] = useState('open');

    const onClick = useCallback(event => {
        if(event.target.nodeName !== 'BUTTON' && AdditionalCondition) {
            setStateAccordion(prev => prev === 'open' ? 'close' : 'open');
        }
    }, [ setStateAccordion, AdditionalCondition ]);

    useEffect(() => {
        if (open) {
            setStateAccordion(open);
        }
    }, [ open ]);

    return (
        <div {...otherProps} className={classnames('pa-accordion', className, stateAccordion)}>
            <div className='pa-accordion-title' onClick={onClick}>
                {title}
                <div className='pa-accordion-title-right'>
                    {AdditionalBtn}
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </div>
            <div className='pa-accordion-content'>
                {children}
            </div>
        </div>

    );
});

PAAccordion.displayName = 'PAAccordion';
PAAccordion.defaultProps = defaultProps;

export default React.memo(PAAccordion, isEqual);
