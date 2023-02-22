import React, { useCallback, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'

import { BuildFile } from '@/utils/exportUtils';

import Ingredient from '@/components/Ingredient';
import Result from '@/components/Result';
import PAButton from '@/components/PAButton';

import PAInput from '@/components/PAInput';
import PAInputNumber from '@/components/PAInputNumber';
import PAMultipleInput from '@/components/PAMultipleInput';
import PAToggle from '@/components/PAToggle';

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
    // Craft information
    const [ craftClass, setCraftClass ] = useState('');
    const [ m_Name, setMName ] = useState('');
    const [ m_IsInstaRecipe, setMIsInstaRecipe ] = useState(false);
    const [ m_AnimationLength, setMAnimationLength ] = useState(4);

    // Ingredient 1 + 2 = Result
    const [ ingredientFirst, setIngredientFirst ] = useState(() => initIngredientValue());
    const [ ingredientSecond, setIngredientSecond ] = useState(() => initIngredientValue());
    const [ result, setResult ] = useState(() => initResultValue());

    // Export
    const [ resultString, setResultString ] = useState('');
    const [ copied, setCopied ] = useState(false);

    const onChangeIngredientFirst = useCallback(value => {
        setIngredientFirst(prev => ({ ...prev, ...value }));
    }, [ setIngredientFirst ]);
    const onChangeIngredientSecond = useCallback(value => {
        setIngredientSecond(prev => ({ ...prev, ...value }));
    }, [ setIngredientSecond ]);

    const onChangeResult = useCallback(value => setResult(prev => ({ ...prev, ...value })), [ setResult ]);
    const onChangeCraftClass = useCallback(({ value }) => setCraftClass(value), [ setCraftClass ]);
    const onChangeMName = useCallback(({ value }) => setMName(value), [ setMName ]);
    const onChangeMIsInstaRecipe = useCallback(({ value }) => setMIsInstaRecipe(value), [ setMIsInstaRecipe ]);
    const onChangeMAnimationLength = useCallback(({ value }) => setMAnimationLength(value), [ setMAnimationLength ]);

    const onClickExport = useCallback(() => {
        const hasIngredient1 = ingredientFirst?.classnames && ingredientFirst?.classnames.length > 0;
        const hasIngredient2 = ingredientSecond?.classnames && ingredientSecond?.classnames.length > 0;
        const hasResult = result?.classname;
        console.log('hasIngredient1', hasIngredient1);
        console.log('hasIngredient2', hasIngredient2);
        console.log('hasResult', hasResult);
        if(hasIngredient1 && hasIngredient2 && hasResult && Boolean(craftClass) && Boolean(m_Name)) {
            const file = BuildFile(ingredientFirst, ingredientSecond, result, craftClass, m_Name, m_IsInstaRecipe, m_AnimationLength);
            console.log(file);
            setResultString(file);
        }
    }, [
        ingredientFirst,
        ingredientSecond,
        result,
        craftClass,
        m_Name,
        m_IsInstaRecipe,
        m_AnimationLength
    ]);

    const onClickCopy = useCallback(() => {
        if(Boolean(resultString)) {
            navigator.clipboard.writeText(resultString);
            setCopied(true);
        }
    }, [ setCopied, resultString ]);

    return (
        <div className='pa-recipe'>
            <div className='pa-recipe-title'>
                <span>Recette Generator 3000</span>
            </div>
            <div className='pa-recipe-information'>
                <span>Information Craft</span>
                <div className='pa-recipe-information-content'>
                    <div className='pa-parameter'>
                        <span>Nom de la classe</span>
                        <PAInput value={craftClass} onChange={onChangeCraftClass} />
                    </div>
                    <div className='pa-parameter'>
                        <span>m_Name</span>
                        <PAInput value={m_Name} onChange={onChangeMName} />
                    </div>
                    <div className='pa-parameter'>
                        <span>m_AnimationLength</span>
                        <PAInputNumber value={m_AnimationLength} onChange={onChangeMAnimationLength} min={1}/>
                    </div>
                    <div className='pa-parameter'>
                        <span>m_IsInstaRecipe</span>
                        <PAToggle value={m_IsInstaRecipe} onChange={onChangeMIsInstaRecipe} />
                    </div>
                </div>
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
                <PAButton onClick={onClickExport}>Exporter Recette</PAButton>
            </div>

            {
                Boolean(resultString) && (
                    <div className='pa-recipe-file-wrapper'>
                        <PAButton className='pa-recipe-copy' onClick={onClickCopy}>
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copié' : 'Copier'}
                        </PAButton>
                        <p className='pa-recipe-file'>{resultString}</p>
                    </div>
                )
            }
        </div>
    );
};

export default Recipe;
