import React, { useCallback, useState, useContext } from 'react';
import isEqual from 'react-fast-compare';

import PAInput from '@/components/PAInput'
import PAButton from '@/components/PAButton'
import { generateUUID } from '@/utils/generateUUID'

import TraderContext from '@/providers/TraderContext';

const defaultCategory = name => ({
    uuid: generateUUID(),
    name,
    items: {}
});


const AddCategory = props => {
    const [ name, setName ] = useState('');
    const [ invalid, setInvalid ] = useState('');

    const { trader, onAddChangeCategory, getCategories } = useContext(TraderContext);

    const onChangeName = useCallback(({ value }) => {
        setName(value);
        const categories = getCategories();
        if(Object.values(categories || {}).every(category => category?.name !== value)) {
            setInvalid('');
        } else {
            setInvalid('Cette categorie existe déjà.');
        }
    }, [ setName, setInvalid, getCategories ]);

    const onClickAddCategory = useCallback(event => {
        const categories = getCategories();
        if(Boolean(name) && Object.values(categories || {}).every(category => category?.name !== name)) {
            setName('');
            onAddChangeCategory(defaultCategory(name));
        } else {
            if(Boolean(name)) {
                setInvalid('Cette categorie existe déjà.');
            } else {
                setInvalid('Il faut mettre un nom');
            }
        }
    }, [ onAddChangeCategory, name, getCategories ]);

    return (
        <div id='add-category-wrapper'>
            <p className='add-category-title'>Ajouter une categorie</p>
            <PAInput
                value={name}
                onChange={onChangeName}
                invalid={invalid}
            />
            <PAButton
                className='trader-btn-add-category'
                onClick={onClickAddCategory}
                invalid={Boolean(invalid)}
            >Ajouter une categorie</PAButton>
        </div>
    );
}

export default AddCategory;
