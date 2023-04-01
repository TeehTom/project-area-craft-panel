import React, { useState, useCallback, useContext } from 'react';
import isEqual from 'react-fast-compare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import PAInput from '@/components/PAInput';
import PASelect from '@/components/PASelect';
import PAButton from '@/components/PAButton';
import PAInputNumber from '@/components/PAInputNumber';

import TraderContext from '@/providers/TraderContext';

const quantityValues = [
    { name: 'N\'importe (*)', value: '*' },
    { name: 'Armes (W)', value: 'W' },
    { name: 'Chargeurs (M)', value: 'M' },
    { name: 'Consommable (S)', value: 'S' },
    { name: 'Custom', custom: true },
];

const Item = props => {
    const {
        itemId,
        categoryId,
        classObject,
        quantity,
        priceBuy,
        priceSell,
        className,
        ...otherProps
    } = props;

    const { onAddChangeItems, onDeleteItems } = useContext(TraderContext);

    const custom = !quantityValues.filter(({ value }) => Boolean(value)).map(({ value }) => value.toUpperCase()).includes(quantity);

    const onChangeClass = useCallback(({ value }) =>
        onAddChangeItems(categoryId, {uuid: itemId, classObject: value, quantity, priceBuy, priceSell}) ,
        [ onAddChangeItems, categoryId, itemId, quantity, priceBuy, priceSell ]
    );

    const onChangePriceBuy = useCallback(({ value }) =>
        onAddChangeItems(categoryId, {uuid: itemId, classObject, quantity, priceBuy: Boolean(value) ? value : -1, priceSell}),
        [onAddChangeItems,categoryId,itemId,classObject,quantity,priceSell]
    );

    const onChangePriceSell = useCallback(({ value }) =>
        onAddChangeItems(categoryId, {uuid: itemId, classObject, quantity, priceBuy, priceSell: Boolean(value) ? value : -1}),
        [ onAddChangeItems, categoryId, itemId, classObject, quantity, priceBuy ]
    );

    const onChangeQuantity = useCallback(({ value }) => {
        const quantity = custom
            ? (Boolean(value) ? value : 1)
            : value === 'nodata'
                ? 1
                : value;
        onAddChangeItems(categoryId, {uuid: itemId, classObject, quantity, priceBuy, priceSell})
    }, [ onAddChangeItems, custom, categoryId, itemId, classObject, priceBuy, priceSell ]);

    const onClickDelete = useCallback(() => onDeleteItems(categoryId, itemId), [ onDeleteItems, categoryId, itemId ]);

    return (
        <div id='item-wrapper' {...otherProps} data-uuid={itemId}>
            <PAInput
                onChange={onChangeClass}
                value={classObject}
                className='item'
            />
            <PASelect
                onChange={onChangeQuantity}
                value={custom ? quantity : quantity.toUpperCase()}
                options={quantityValues}
                custom={custom}
                customComponent={(custom && <PAInputNumber onChange={onChangeQuantity} value={quantity} />) || null}
                className='item'
            />
            <PAInputNumber
                onChange={onChangePriceBuy}
                value={priceBuy}
                className='item'
                min={-1}
            />
            <PAInputNumber
                onChange={onChangePriceSell}
                value={priceSell}
                className='item'
                min={-1}
            />
            <PAButton
                onClick={onClickDelete}
                invalid
            >
                <FontAwesomeIcon icon={faTrash} />
            </PAButton>
        </div>
    );
}

export default Item;
