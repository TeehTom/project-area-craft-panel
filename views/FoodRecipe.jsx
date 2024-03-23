import React, { useRef, useCallback, useState, useEffect } from 'react';

import PACheckbox  from '@/components/PACheckbox'
import PAInput from '@/components/PAInput'
import PAInputNumber from '@/components/PAInputNumber'

import WeaponContext from '@/providers/WeaponContext';

const EFFECTS = [
    "ENERGY",
    "WATER",
    "STOMACH",
    "BLOOD",
    "HEALTH",
    "m_sleepingLevel",
    "m_radiationSickness",
    "m_radioprotectionLevel",
    "m_bloodHemostaticEffect",
    "m_hematopoiesisEffect",
    "m_antibioticsLevel",
    "m_painkillerEffect",
    "m_adrenalinEffect",
    "m_stomatchpoisonLevel",
    "m_stomatchhealLevel",
    "m_psiEffect",
    "m_antidepresantLevel"
];

const FoodRecipeEffect = ({ onChange, effectKey, effectValue }) => {
    const [ valueInput, setValueInput ] = useState(effectValue);
    const [ checked, setChecked ] = useState(false);

    const inputRef = useRef(null);

    const onChangeCheck = useCallback(({ value }) => {
        setChecked(value);

        if (value) {
            inputRef.current.focus();
            onChange(effectKey, valueInput);
        }
    }, [ inputRef, setChecked, onChange, effectKey, valueInput ]);

    const onChangeEffect = useCallback(({ value }) => {
        setValueInput(value);

        if (checked) {
            onChange(effectKey, value);
        }
    }, [ onChange, effectKey, checked, setValueInput ]);

    return (
        <div className='foodRecipe'>
            <PACheckbox
                value={checked}
                onChange={onChangeCheck}
                id={effectKey}
            />
            <label
                className='foodRecipe-label'
                for={effectKey}
            >
                {effectKey}
            </label>
            <PAInputNumber
                ref={inputRef}
                value={valueInput}
                onChange={onChangeEffect}
            />
        </div>
    );
};

const FoodRecipe = props => {
    const [ modded, setModded ] = useState(false);
    const [ name, setName ] = useState('');
    const [ nameParent, setNameParent ] = useState('');
    const [ resultEffect, setResultEffect ] = useState({});

    const onChangeEffect = useCallback((key, value) => setResultEffect(prev => (prev[ key ] = value, prev)), [ setResultEffect ]);
    const onChangeModded = useCallback(({ value }) => setModded(value), [ setModded ]);
    const onChangeClassname = useCallback(({ value }) => setName(value), [ setName ]);
    const onChangeClassnameParent = useCallback(({ value }) => setNameParent(value), [ setNameParent ]);

    return (
        <div className='foodRecipes'>
            <div className='foodRecipe-wrapper'>
                <span>Effets Alimentation</span>
                <div className='foodRecipe-container flex'>
                    <div className='foodRecipe-input'>
                        <label
                            className='foodRecipe-label'
                            for='classname'
                        >
                            Class de l'item
                        </label>
                        <PAInput
                            id='classname'
                            value={name}
                            onChange={onChangeClassname}
                        />
                    </div>
                    {
                        !modded && (
                            <div className='foodRecipe-input'>
                                <label
                                    className='foodRecipe-label'
                                    for='herited'
                                >
                                    Class de l'item parent
                                </label>
                                <PAInput
                                    id='herited'
                                    value={nameParent}
                                    onChange={onChangeClassnameParent}
                                />
                            </div>
                        )
                    }
                    <div className='foodRecipe-input'>
                        <label
                            className='foodRecipe-label'
                            for='modded'
                        >
                            Class modded ?
                        </label>
                        <PACheckbox
                            id='modded'
                            value={modded}
                            onChange={onChangeModded}
                        />
                    </div>
                </div>

                <span>Effets Alimentation</span>
                <div className='foodRecipe-container grip'>
                    {
                        EFFECTS.map(e => (
                            <FoodRecipeEffect
                                onChange={onChangeEffect}
                                effectKey={e}
                                effectValue={resultEffect?.[ e ]}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FoodRecipe;
