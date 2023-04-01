import React, { useState, useCallback, useContext  } from 'react';
import isEqual from 'react-fast-compare';
import classnames from 'classnames';
import { generateUUID } from '@/utils/generateUUID';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';

import PAAccordion from '@/components/PAAccordion';
import PAButton from '@/components/PAButton';
import PAInput from '@/components/PAInput';

import Item from '@/views/Item'

import TraderContext from '@/providers/TraderContext';

const defaultItemShop = () => {
    const uuid = generateUUID();
    return ({
        uuid,
        classObject: '',
        quantity: '*',
        priceBuy: -1,
        priceSell: -1
    });
};

const Category = props => {
    const {
        uuid,
        open
    } = props;

    const { trader, onAddChangeItems, onDeleteCategory, onRenameCategory } = useContext(TraderContext);

    const [ edit, setEdit ] = useState(false);

    const category = trader.categories?.[ uuid ] || {};

    const onAddItem = useCallback(event => {
        onAddChangeItems(uuid, defaultItemShop());
        event.preventDefault();
    }, [ onAddChangeItems, uuid ]);

    const onClickDeleteCategory = useCallback(() => onDeleteCategory(uuid), [ onDeleteCategory, uuid ]);

    const onRename = useCallback(({ value }) => onRenameCategory(uuid, value), [ uuid, onRenameCategory ]);
    const onClickAccept = useCallback(() => setEdit(false), [ setEdit ]);
    const onClickEdit = useCallback(() => setEdit(true), [ setEdit ]);
    const onKeyUpName = useCallback(event => {
        if(event.code === 'Enter') {
            setEdit(false);
        }
    }, [ setEdit ]);

    return (
        <div id='category-wrapper' className={classnames({ isEditing: edit })}>
            <PAAccordion
                open={open}
                AdditionalCondition={!edit}
                title={
                    <div className='category-name-wrapper'>
                        {
                            edit
                            ? (
                                <PAInput className='category-name-edit' value={category?.name} onChange={onRename} onKeyUp={onKeyUpName} />
                            )
                            : category?.name
                        }
                        <div className='category-actions'>
                            {
                                edit
                                ? (
                                    <PAButton onClick={onClickAccept}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </PAButton>
                                )
                                : (
                                    <PAButton onClick={onClickEdit}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </PAButton>
                                )
                            }
                        </div>
                    </div>
                }
                AdditionalBtn={
                    <React.Fragment>
                        <PAButton onClick={onAddItem}>
                            <div className='category-action-btn'>
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Ajouter un Item</span>
                            </div>
                        </PAButton>
                        <PAButton onClick={onClickDeleteCategory} invalid >
                            <div className='category-action-btn'>
                                <FontAwesomeIcon icon={faTrash} />
                                <span>Supprimer la catégorie</span>
                            </div>
                        </PAButton>
                    </React.Fragment>
                }
            >
                {
                    category && category?.items && Object.values(category?.items || {}).length > 0 && (
                        <div className='category-title'>
                            <span className='category-span'>Classname</span>
                            <span className='category-span'>Quantité(?)</span>
                            <span className='category-span'>Prix Achat</span>
                            <span className='category-span'>Prix Vente</span>
                            <span className='category-span icon-btn'></span>
                        </div>
                    )
                }
                <div className='category-body'>
                    {
                        category && category?.items && Object.values(category?.items || {}).map(item =>
                            <Item
                                key={item?.uuid}
                                itemId={item?.uuid}
                                categoryId={uuid}
                                classObject={item?.classObject}
                                quantity={item?.quantity}
                                priceBuy={item?.priceBuy}
                                priceSell={item?.priceSell}
                            />
                        )
                    }
                </div>
            </PAAccordion>
        </div>
    );
}

export default Category;
