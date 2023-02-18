import React, { useCallback } from 'react';

import PAInputNumber from '@/components/PAInputNumber';
import PAMultipleInput from '@/components/PAMultipleInput';
import PAButton from '@/components/PAButton';
import PAToggle from '@/components/PAToggle';

const TYPE_PER_PARAMETER = {
    classnames: PAMultipleInput,
    m_MinDamageIngredient: PAInputNumber,
    m_MaxDamageIngredient: PAInputNumber,
    m_MinQuantityIngredient: PAInputNumber,
    m_MaxQuantityIngredient: PAInputNumber,
    m_IngredientAddHealth: PAInputNumber,
    m_IngredientSetHealth: PAInputNumber,
    m_IngredientAddQuantity: PAInputNumber,
    m_IngredientDestroy: PAToggle,
    m_IngredientUseSoftSkills: PAToggle
}


const Ingredient = props => {
    const {
        ingredient,
        onChangeIngredient,
    } = props;

    const onChange = useCallback(({ target, value }) => {
        const parameter = target?.dataset?.parameter;

        console.log(value);
        console.log(parameter);

        onChangeIngredient({ [ parameter ]: value });
    }, [ onChangeIngredient ]);

    console.log(ingredient);

    return (
        <div className='pa-ingredient'>
            {
                ingredient && Object.keys(ingredient).map(param => {
                    const Component = TYPE_PER_PARAMETER[ param ];
                    return (
                        <div className='pa-parameter'>
                            <span>{param}</span>
                            <Component value={ingredient?.[ param ]} onChange={onChange} data-parameter={param} />
                        </div>
                    )
                })
            }

        </div>
    )
};

export default Ingredient;
