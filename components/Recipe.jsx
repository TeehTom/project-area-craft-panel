import React, { useCallback, useState, useEffect } from 'react';

import Ingredient from '@/components/Ingredient';
import Result from '@/components/Result';
import PAButton from '@/components/PAButton';

const initIngredientValue = () => ({
    classnames: [''],
    m_MinDamageIngredient: -1,
    m_MaxDamageIngredient: -1,
    m_MinQuantityIngredient: -1,
    m_MaxQuantityIngredient: -1,
    m_IngredientAddHealth: 0,
    m_IngredientSetHealth: -1,
    m_IngredientAddQuantity: 0,
    m_IngredientDestroy: true,
    m_IngredientUseSoftSkills: false
});

const initResultValue = () => ({
    classname: '',
    m_ResultSetFullQuantity: true,
    m_ResultSetQuantity: -1,
    m_ResultSetHealth: -1,
    m_ResultInheritsHealth: -1,
    m_ResultInheritsColor: -1,
    m_ResultToInventory: -2,
    m_ResultUseSoftSkills: true,
    m_ResultReplacesIngredient: -1
});

const Recipe = props => {
    const [ ingredientFirst, setIngredientFirst ] = useState(() => initIngredientValue());
    const [ ingredientSecond, setIngredientSecond ] = useState(() => initIngredientValue());
    const [ result, setResult ] = useState(() => initResultValue());

    const onChangeIngredientFirst = useCallback(value => setIngredientFirst(prev => ({ ...prev, ...value })), [ setIngredientFirst ]);
    const onChangeIngredientSecond = useCallback(value => setIngredientSecond(prev => ({ ...prev, ...value })), [ setIngredientSecond ]);

    const onChangeResult = useCallback(value => setResult(prev => ({ ...prev, ...value })), [ setResult ]);

    const onClickExport = useCallback(() => {
        onExport(ingredientFirst, ingredientSecond, result);
    }, [ ingredientFirst, ingredientSecond, result ]);

    return (
        <div className='pa-recipe'>

            <div className='pa-recipe-title'>
                <span>Recette Generator 3000</span>
            </div>
            <div className='pa-recipe-wrapper'>
                <div className='pa-ingredient-wrapper'>
                    <span>Ingredient 1</span>
                    <Ingredient ingredient={ingredientFirst} onChangeIngredient={onChangeIngredientFirst} />
                </div>
                <div className='pa-ingredient-wrapper plus'>
                    <span>+</span>
                </div>
                <div className='pa-ingredient-wrapper'>
                    <span>Ingredient 2</span>
                    <Ingredient ingredient={ingredientSecond} onChangeIngredient={onChangeIngredientSecond} />
                </div>
                <div className='pa-ingredient-wrapper plus'>
                    <span>=</span>
                </div>
                <div className='pa-ingredient-wrapper'>
                    <span>Result</span>
                    <Result result={result} onChangeResult={onChangeResult} />
                </div>
            </div>

            <div className='pa-recipe-export'>
                <PAButton>Exporter Recette</PAButton>
            </div>
        </div>
    );
};

export default Recipe;
