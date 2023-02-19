import React, { useCallback } from 'react';

import PAInputNumber from '@/components/PAInputNumber'
import PAInput from '@/components/PAInput'
import PAButton from '@/components/PAButton'
import PAToggle from '@/components/PAToggle'

const TYPE_PER_PARAMETER = {
    classname: PAInput,
    m_ResultSetFullQuantity: PAToggle,
    m_ResultSetQuantity: PAInputNumber,
    m_ResultSetHealth: PAInputNumber,
    m_ResultInheritsHealth: PAInputNumber,
    m_ResultInheritsColor: PAInputNumber,
    m_ResultToInventory: PAInputNumber,
    m_ResultUseSoftSkills: PAToggle,
    m_ResultReplacesIngredient: PAInputNumber
}

const Result = props => {
    const {
        result,
        onChangeResult,
    } = props;

    const onChange = useCallback(({ target, value }) => {
        const parameter = target?.dataset?.parameter;
        onChangeResult({ [ parameter ]: value });
    }, [ onChangeResult ]);

    return (
        <div className='pa-ingredient'>
            {
                result && Object.keys(result).map(param => {
                    const Component = TYPE_PER_PARAMETER[ param ];
                    return (
                        <div className='pa-parameter' key={param}>
                            <span>{param}</span>
                            <Component value={result?.[ param ]} onChange={onChange} data-parameter={param} />
                        </div>
                    )
                })
            }

        </div>
    )
};

export default Result;
